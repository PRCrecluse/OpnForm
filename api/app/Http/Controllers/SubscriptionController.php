<?php

namespace App\Http\Controllers;

use App\Http\Requests\Subscriptions\UpdateStripeDetailsRequest;
use App\Service\Billing\BillingStateResolver;
use App\Service\BillingHelper;
use App\Service\UserHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SubscriptionController extends Controller
{
    public function __construct(protected BillingStateResolver $billingStateResolver)
    {
    }

    public const SUBSCRIPTION_PLANS = ['monthly', 'yearly'];

    public const SUBSCRIPTION_NAMES = [
        'default',
        'pro',
        'business',
        'enterprise',
    ];

    /**
     * Returns stripe checkout URL
     *
     * $pricing is the subscription name (pro, business, enterprise, or legacy 'default')
     * $plan is the billing interval (monthly/yearly) constrained with regex in api.php
     */
    public function checkout($pricing, $plan, $trial = null)
    {
        $this->middleware('not-subscribed');

        $user = Auth::user();
        $lockKey = "subscription_checkout:{$user->id}:{$pricing}";
        $checkoutLock = Cache::lock($lockKey, 15);

        if (!$checkoutLock->get()) {
            return $this->error([
                'message' => 'A checkout session is already being created. Please retry in a few seconds.',
            ], 429);
        }

        try {
            // Check User does not already have an active/trialing subscription
            if ($this->billingStateResolver->hasActivePaidSubscription($user)) {
                return $this->error([
                    'message' => 'You already have an active subscription.',
                ]);
            }

            // Check User does not have a pending subscription
            if ($user->subscriptions()->where('stripe_status', 'past_due')->first()) {
                return $this->error([
                    'message' => 'You already have a past due subscription. Please verify your details in the billing page, '
                        . 'and contact us if the issue persists.',
                ]);
            }

            $priceId = BillingHelper::getCheckoutPriceId($pricing, $plan);
            if ($priceId === null) {
                return $this->error([
                    'message' => 'Checkout is unavailable for this plan.',
                ], 503);
            }

            $checkoutBuilder = $user
                ->newSubscription($pricing, $priceId)
                ->allowPromotionCodes();

            // Disable trial for now
            // if ($trial != null) {
            //     $checkoutBuilder->trialUntil(now()->addDays(3)->addHour());
            // }

            $checkout = $checkoutBuilder
                ->collectTaxIds()
                ->checkout([
                    'success_url' => front_url('/subscriptions/success'),
                    'cancel_url' => front_url('/subscriptions/error'),
                    'automatic_tax' => ['enabled' => (bool) config('cashier.automatic_tax')],
                    'billing_address_collection' => 'required',
                    'customer_update' => [
                        'address' => 'auto',
                        'name' => 'never',
                    ],
                ]);

            return $this->success([
                'checkout_url' => $checkout->url,
            ]);
        } finally {
            $checkoutLock->release();
        }
    }

    public function getUsersCount()
    {
        $this->middleware('auth');
        return [
            'count' => (new UserHelper(Auth::user()))->getActiveMembersCount() - 1,
        ];
    }

    public function updateStripeDetails(UpdateStripeDetailsRequest $request)
    {
        $user = Auth::user();
        if (!$user->hasStripeId()) {
            $user->createAsStripeCustomer([
                'metadata' => [
                    'user_id' => $user->id,
                ],
            ]);
        }
        $user->updateStripeCustomer([
            'email' => $request->email,
            'name' => $request->name,
        ]);

        return $this->success([
            'message' => 'Details saved.',
        ]);
    }

    public function billingPortal()
    {
        $this->middleware('auth');
        if (!Auth::user()->has_customer_id) {
            return $this->error([
                'message' => 'Please subscribe before accessing your billing portal.',
            ]);
        }

        $configuration = config('cashier.billing_portal_configuration_id');
        $options = filled($configuration) ? ['configuration' => $configuration] : [];

        return $this->success([
            'portal_url' => Auth::user()->billingPortalUrl(front_url('/home'), $options),
        ]);
    }

    /**
     * Swap existing subscription to a different plan tier.
     * Stripe handles proration automatically.
     */
    public function changePlan(Request $request)
    {
        $request->validate([
            'plan' => 'required|string|in:pro,business,enterprise',
            'interval' => 'required|string|in:monthly,yearly',
        ]);

        $user = Auth::user();
        $subscription = $this->billingStateResolver->resolveActiveSubscription($user);
        if (!$subscription) {
            return $this->error([
                'message' => 'No active subscription found. Please subscribe first.',
            ]);
        }

        $targetPlan = $request->input('plan');
        $targetInterval = $request->input('interval');

        $newPriceId = BillingHelper::getCheckoutPriceId($targetPlan, $targetInterval);
        if ($newPriceId === null) {
            return $this->error([
                'message' => 'This plan is unavailable.',
            ], 503);
        }

        try {
            $subscription->swap($newPriceId);

            $subscription->type = $targetPlan;
            $subscription->save();

            $user->flushCache();
        } catch (\Exception $e) {
            return $this->error([
                'message' => $e->getMessage() ?: 'Failed to change plan. Please try again or contact support.',
            ]);
        }

        return $this->success([
            'message' => 'Your plan has been updated successfully.',
        ]);
    }

}
