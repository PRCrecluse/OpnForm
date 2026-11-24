<template>
  <LazySelfHostedWelcome v-if="isSelfHosted" />
  <main v-else class="marketing-landing">
    <section class="landing-frame overflow-hidden text-center">
      <div class="relative z-10 mx-auto max-w-3xl px-5 pb-7 pt-14 sm:pb-8 sm:pt-20">
        <h1 class="opn-heading text-(--opn-ink) text-[clamp(2.55rem,5.3vw,4.5rem)] leading-[0.99] font-semibold text-balance">
          Beautiful forms.<br />
          Unlimited responses.
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-(--opn-muted) sm:text-lg">
          Create forms, surveys, and workflows with OpnForm. Collect as many responses as you need in the cloud or on your own infrastructure.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <UButton
            size="lg"
            :to="{ name: authenticated ? 'forms-create' : 'forms-create-guest' }"
            trailing-icon="i-heroicons-arrow-up-right-20-solid"
            label="Create a free form"
            class="min-h-11 rounded-md px-4"
          />
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            to="#live-demo"
            icon="i-heroicons-play"
            label="Try the demo"
            class="min-h-11 rounded-md px-4"
          />
        </div>
      </div>

      <div class="hero-art relative mx-auto w-full max-w-5xl" aria-hidden="true">
        <img
          src="/img/pages/welcome/form-workflow.webp"
          alt=""
          width="1440"
          height="614"
          fetchpriority="high"
          decoding="async"
          class="block h-auto w-full"
        />
      </div>
    </section>

    <TrustedTeams class="landing-frame" />

    <section id="live-demo" class="landing-frame scroll-mt-5 px-4 py-12 sm:px-8 sm:py-20" aria-labelledby="live-demo-title">
      <div class="mx-auto mb-8 flex max-w-266 flex-wrap items-end justify-between gap-3">
        <h2 id="live-demo-title" class="opn-heading text-(--opn-ink) text-3xl sm:text-5xl">
          Try a live form
        </h2>
        <NuxtLink
          :to="{ name: 'templates' }"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-(--opn-ink) underline-offset-4 hover:underline"
        >
          Browse templates
          <UIcon name="i-heroicons-arrow-up-right-20-solid" class="size-4" />
        </NuxtLink>
      </div>
      <LazyLiveDemo variant="home" />
    </section>

    <LazyFeatures class="landing-frame" />

    <div class="landing-frame">
      <LazyMoreFeatures />
    </div>

    <LazyOpenFormFooter />
  </main>
</template>

<script setup>
import { useIsAuthenticated } from "~/composables/useIsAuthenticated.js"

definePageMeta({
  layout: "default",
  middleware: ["root-redirect"],
})


const { isAuthenticated: authenticated } = useIsAuthenticated()
const featureFlags = useState('featureFlags', () => ({}))
const isSelfHosted = computed(() => !!featureFlags.value.self_hosted)
const { name: instanceName } = useSelfHostedPresentation()

useOpnSeoMeta({
  title: () => isSelfHosted.value ? `${instanceName} workspace` : "Free Online Form Builder with Unlimited Responses",
  description: () => isSelfHosted.value
    ? 'Sign in to your self-hosted form workspace.'
    : "Build beautiful online forms with OpnForm. Create forms, surveys, and workflows for free, collect unlimited responses, and keep control of your data.",
  robots: () => isSelfHosted.value ? 'noindex, nofollow' : null,
})
</script>

<style scoped>
.landing-frame {
  width: min(calc(100% - 2rem), 83rem);
  margin-inline: auto;
  border-inline: 1px solid var(--opn-line);
  border-bottom: 1px solid var(--opn-line);
}

.hero-art img {
  mix-blend-mode: multiply;
  mask-image: radial-gradient(ellipse 78% 80%, #000 45%, transparent 100%);
}

:global(.dark) .hero-art img {
  mix-blend-mode: normal;
  filter: invert(0.91);
  mask-image: radial-gradient(ellipse 75% 70%, #000 42%, transparent 100%);
}
</style>
