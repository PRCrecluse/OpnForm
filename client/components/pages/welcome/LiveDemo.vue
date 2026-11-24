<template>
  <div class="relative z-10 mx-auto flex w-full max-w-266 items-center justify-center">
    <div
      class="relative w-full overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700"
    >
      <div class="overflow-hidden bg-white">
        <div class="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
          <UIcon name="i-heroicons-link-20-solid" class="size-4 shrink-0" />
          <span>opnform.com</span>
        </div>

        <div ref="demoContainer" class="relative min-h-[460px] bg-white sm:min-h-[620px]">
          <LazyLiveDemoForm
            v-if="hasBeenVisible"
            :key="scenario.key"
            :scenario="scenario"
            :primary-cta-to="primaryCtaTo"
            :secondary-cta-to="secondaryCtaTo"
          />
          <div v-else class="min-h-[460px] sm:min-h-[620px] flex flex-col justify-center gap-5 p-8 sm:p-12" aria-busy="true" aria-label="Loading live demo">
            <div class="h-6 w-32 rounded bg-neutral-100" aria-hidden="true" />
            <div class="h-12 w-3/4 rounded bg-neutral-100" aria-hidden="true" />
            <div class="h-4 w-full rounded bg-neutral-50" aria-hidden="true" />
            <div class="h-4 w-2/3 rounded bg-neutral-50" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIsAuthenticated } from "~/composables/useIsAuthenticated.js"
import {
  getLiveDemoScenario,
} from "~/data/live-demo-scenarios.js"

const demoContainer = ref(null)
const hasBeenVisible = ref(false)
let observer
onMounted(() => {
  if (!window.IntersectionObserver) {
    hasBeenVisible.value = true
    return
  }
  observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return
    hasBeenVisible.value = true
    observer.disconnect()
  }, { threshold: 0.35 })
  observer.observe(demoContainer.value)
})
onBeforeUnmount(() => observer?.disconnect())

const props = defineProps({
  variant: {
    type: String,
    default: "home",
  },
  competitorName: {
    type: String,
    default: null,
  },
  importSource: {
    type: String,
    default: null,
  },
})

const { isAuthenticated: authenticated } = useIsAuthenticated()

const scenario = computed(() =>
  getLiveDemoScenario({
    variant: props.variant,
    competitorName: props.competitorName,
    importSource: props.importSource,
  }),
)

const primaryCtaTo = computed(() => ({
  name: authenticated.value ? "forms-create" : "forms-create-guest",
}))

const secondaryCtaTo = computed(() => {
  if (!props.importSource || !scenario.value.secondaryCtaLabel) {
    return null
  }

  return {
    name: authenticated.value || props.importSource === "google_forms"
      ? "forms-create"
      : "forms-create-guest",
    query: { import: props.importSource },
  }
})
</script>
