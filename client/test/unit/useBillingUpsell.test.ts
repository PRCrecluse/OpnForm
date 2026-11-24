import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { computed, ref } from 'vue'
import { useBillingUpsell } from '../../composables/useBillingUpsell.js'

describe('useBillingUpsell', () => {
  beforeEach(() => {
    const user = ref({ plan_tier: 'free' })
    const workspace = ref({ plan_tier: 'free' })

    globalThis.computed = computed
    globalThis.useAuth = () => ({
      user: () => ({ data: user }),
    })
    globalThis.useCurrentWorkspace = () => ({ current: workspace })
    globalThis.usePlanCatalog = () => ({
      tiers: computed(() => ({
        free: { order: 0, name: 'Free', price_monthly: 0, price_yearly: 0, price_yearly_per_month: 0 },
        pro: { order: 1, name: 'Pro', price_monthly: 27, price_yearly: 288, price_yearly_per_month: 24 },
        business: { order: 2, name: 'Business', price_monthly: 75, price_yearly: 768, price_yearly_per_month: 64 },
        enterprise: { order: 3, name: 'Enterprise', price_monthly: 239, price_yearly: 2520, price_yearly_per_month: 210 },
        self_hosted: { order: 4, name: 'Self-hosted Enterprise', price_monthly: 199, price_yearly: 1999, price_yearly_per_month: 167 },
      })),
    })
  })

  afterEach(() => {
    delete globalThis.computed
    delete globalThis.useAuth
    delete globalThis.useCurrentWorkspace
    delete globalThis.usePlanCatalog
  })

  it('reads yearly pricing from the loaded plan catalog', () => {
    const { getPlanPrice, getBilledPlanTotal, getTierDisplayName } = useBillingUpsell()

    expect(getPlanPrice('enterprise', true)).toBe(210)
    expect(getBilledPlanTotal('enterprise', true)).toBe(2520)
    expect(getBilledPlanTotal('enterprise', false)).toBe(239)
    expect(getTierDisplayName('enterprise')).toBe('Enterprise')
    expect(getPlanPrice('self_hosted', true)).toBe(167)
    expect(getBilledPlanTotal('self_hosted', true)).toBe(1999)
    expect(getTierDisplayName('self_hosted')).toBe('Self-hosted Enterprise')
  })
})
