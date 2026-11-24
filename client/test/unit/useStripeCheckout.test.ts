import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, readonly, ref } from 'vue'
import { billingApi } from '~/api'
import { useStripeCheckout } from '../../composables/useStripeCheckout.js'

vi.mock('~/api', () => ({ billingApi: { getCheckoutUrl: vi.fn() } }))

describe('useStripeCheckout', () => {
  const intendedUrl = ref<string | null>(null)
  const router = {
    push: vi.fn(),
    resolve: vi.fn(() => ({ fullPath: '/redirect/checkout?plan=business&yearly=false&currency=usd' })),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    intendedUrl.value = null
    vi.stubGlobal('ref', ref)
    vi.stubGlobal('computed', computed)
    vi.stubGlobal('readonly', readonly)
    vi.stubGlobal('useRouter', () => router)
    vi.stubGlobal('useRoute', () => ({ query: {} }))
    vi.stubGlobal('useAuth', () => ({ invalidateUser: vi.fn() }))
    vi.stubGlobal('useWorkspaces', () => ({ invalidateAll: vi.fn() }))
    vi.stubGlobal('useIsAuthenticated', () => ({ isAuthenticated: ref(false) }))
    vi.stubGlobal('useBillingUpsell', () => ({ userIsSubscribed: ref(false) }))
    vi.stubGlobal('useCookie', () => intendedUrl)
    vi.stubGlobal('useFeatureFlag', () => ({ business: { monthly: true, yearly: false } }))
    vi.stubGlobal('useAlert', () => ({ error: vi.fn() }))
  })

  afterEach(() => vi.unstubAllGlobals())

  it('retains the selected tier and billing interval when going to registration', async () => {
    const { startCheckout } = useStripeCheckout()

    await startCheckout('business', { yearly: false })

    expect(router.resolve).toHaveBeenCalledWith({
      name: 'redirect-checkout',
      query: { plan: 'business', yearly: 'false', currency: 'usd' },
    })
    expect(intendedUrl.value).toBe('/redirect/checkout?plan=business&yearly=false&currency=usd')
    expect(router.push).toHaveBeenCalledWith({ name: 'register' })
    expect(billingApi.getCheckoutUrl).not.toHaveBeenCalled()
  })

  it('allows only the configured intervals', async () => {
    const { canStartCheckout, startCheckout } = useStripeCheckout()

    expect(canStartCheckout('business', false)).toBe(true)
    expect(canStartCheckout('business')).toBe(false)
    await expect(startCheckout('business')).rejects.toThrow('Checkout is unavailable')
    expect(router.push).not.toHaveBeenCalled()
    expect(billingApi.getCheckoutUrl).not.toHaveBeenCalled()
  })
})
