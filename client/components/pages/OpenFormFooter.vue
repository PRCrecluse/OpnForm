<template>
  <SelfHostedFooter v-if="isSelfHosted" />
  <template v-else>
  <section v-if="showCta" class="opn-chrome mx-auto w-full max-w-[83rem] px-4 py-10 sm:px-6 sm:py-16">
    <div class="footer-hero relative isolate overflow-hidden rounded-lg bg-[#191919] px-6 py-10 text-white sm:px-10 sm:py-14">
      <div class="relative grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h2 class="opn-heading text-3xl text-white sm:text-5xl">Build your first form today.</h2>
          <p class="mt-3 max-w-md text-base leading-relaxed text-neutral-300">
            Start free and collect unlimited submissions. Upgrade when you need more control and customization.
          </p>
        </div>
        <div class="flex flex-wrap gap-2.5">
          <UButton
            :to="{ name: authenticated ? 'forms-create' : 'forms-create-guest' }"
            label="Create a free form"
            trailing-icon="i-heroicons-arrow-up-right-20-solid"
            class="min-h-11 rounded-md bg-white px-4 text-neutral-900 hover:bg-neutral-200 focus-visible:outline-white"
          />
          <UButton
            :to="{ name: 'pricing' }"
            label="View pricing"
            color="neutral"
            variant="outline"
            class="min-h-11 rounded-md bg-transparent px-4 text-white ring-white/30 hover:bg-white/10 focus-visible:outline-white"
          />
        </div>
      </div>
    </div>
  </section>

  <footer class="opn-chrome border-t border-(--opn-line) bg-(--opn-paper)">
    <div class="px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div
        class="max-w-266 mx-auto grid gap-10 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,2.2fr)] lg:gap-14 xl:gap-20"
      >
        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between lg:flex-col lg:justify-start lg:gap-0"
        >
          <div>
            <NuxtLink
              :to="{ name: user ? 'home' : 'index' }"
              class="inline-flex items-center gap-2 hover:no-underline"
            >
              <img src="/img/logo.svg" alt="" width="32" height="32" class="size-8 brightness-0 dark:invert" />
              <span class="opn-heading text-2xl font-semibold text-(--opn-ink)"
                >OpnForm</span
              >
            </NuxtLink>

            <div class="mt-6 flex items-center gap-3 lg:mt-8">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="h-11 w-11 sm:h-10 sm:w-10 rounded-md flex items-center justify-center transition-colors border border-(--opn-line) hover:bg-neutral-500/10"
                :aria-label="social.label"
              >
                <UIcon :name="social.icon" class="h-4 w-4 text-(--opn-muted)" />
              </a>
            </div>
          </div>

          <div
            class="text-sm leading-5 tracking-[0.6%] font-medium text-(--opn-muted) sm:text-right lg:mt-8 lg:text-left"
          >
            © {{ currYear }} OpnForm
            <span v-if="version" class="block mt-1">
              Version {{ version }}
            </span>
          </div>
        </div>

        <nav aria-label="Footer navigation" class="lg:pt-1">
          <div class="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 md:grid-cols-5 md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
            <div
              v-for="group in linkGroups"
              :key="group.title"
              :class="group.wide ? 'min-[480px]:col-span-2 md:col-span-2' : ''"
            >
              <div
                class="text-sm leading-5 tracking-[0.6%] font-medium text-(--opn-ink)"
              >
                {{ group.title }}
              </div>

              <div
                :class="[
                  'mt-3 gap-2.5 sm:gap-3',
                  group.wide
                    ? 'grid grid-cols-1 min-[480px]:grid-cols-2 min-[480px]:gap-x-6 md:gap-x-8'
                    : 'flex flex-col items-start',
                ]"
              >
                <template v-for="link in group.links" :key="link.label">
                  <NuxtLink
                    v-if="link.to"
                    :to="link.to"
                    class="flex min-h-7 w-fit items-center whitespace-nowrap text-sm leading-5 tracking-[-0.6%] font-medium transition-colors text-(--opn-muted) hover:text-(--opn-ink) underline-offset-4 hover:underline"
                  >
                    {{ link.label }}
                  </NuxtLink>

                  <a
                    v-else
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex min-h-7 w-fit items-center whitespace-nowrap text-sm leading-5 tracking-[-0.6%] font-medium transition-colors text-(--opn-muted) hover:text-(--opn-ink) underline-offset-4 hover:underline"
                  >
                    {{ link.label }}
                  </a>
                </template>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </footer>
  </template>
</template>

<script setup>
import opnformConfig from "~/opnform.config.js"

defineProps({
  showCta: {
    type: Boolean,
    default: true,
  },
})

const { isAuthenticated: authenticated } = useIsAuthenticated()
const isSelfHosted = computed(() => !!useFeatureFlag('self_hosted'))
const { data: user } = useAuth().user()
const currYear = ref(new Date().getFullYear())

// Use the reactive version for proper template reactivity
const version = computed(() => useFeatureFlag("version"))

const socialLinks = computed(() => [
  { label: "X", href: opnformConfig.links.twitter, icon: "i-simple-icons-x" },
  {
    label: "Discord",
    href: opnformConfig.links.discord,
    icon: "i-simple-icons-discord",
  },
  {
    label: "GitHub",
    href: opnformConfig.links.github_url,
    icon: "i-simple-icons-github",
  },
])

const linkGroups = computed(() => [
  {
    title: "Product",
    links: [
      { label: "Pricing", to: { name: "pricing" } },
      { label: "Features", to: { name: "index", hash: "#features" } },
      { label: "Integrations", to: { name: "integrations" } },
      { label: "Enterprise", to: { name: "enterprise" } },
      { label: "Industry", to: { name: "industry" } },
      { label: "Templates", to: { name: "templates" } },
    ],
  },
  {
    title: "Comparisons",
    wide: true,
    links: [
      { label: "vs Google Forms", to: { name: "opnform-vs-googleforms" } },
      { label: "vs Typeform", to: { name: "opnform-vs-typeform" } },
      { label: "vs Fillout", to: { name: "opnform-vs-fillout" } },
      { label: "vs Jotform", to: { name: "opnform-vs-jotform" } },
      { label: "vs Tally", to: { name: "opnform-vs-tally" } },
      { label: "vs Youform", to: { name: "opnform-vs-youform" } },
      { label: "vs HeyForm", to: { name: "opnform-vs-heyform" } },
      { label: "vs Form.io", to: { name: "opnform-vs-formio" } },
      { label: "vs Formbricks", to: { name: "opnform-vs-formbricks" } },
      { label: "vs 123FormBuilder", to: { name: "opnform-vs-123formbuilder" } },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "MCP for AI agents", to: { name: "mcp" } },
      { label: "Open-source", href: opnformConfig.links.github_url },
      { label: "Self-hosting", href: opnformConfig.links.self_hosting },
      { label: "Documentation", href: opnformConfig.links.tech_docs },
      { label: "GitHub", href: opnformConfig.links.github_url },
    ],
  },
  {
    title: "Updates",
    links: [
      { label: "Feedback", href: "https://feedback.opnform.com/" },
      { label: "Changelog", href: "https://feedback.opnform.com/changelog" },
      { label: "Report abuse", to: { name: "report-abuse" } },
      { label: "Privacy Policy", to: { name: "privacy-policy" } },
      { label: "Terms & Conditions", to: { name: "terms-conditions" } },
    ],
  },
])
</script>

<style scoped>
.footer-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(to bottom, transparent 31px, rgb(255 255 255 / 0.45) 32px),
    linear-gradient(to right, transparent 31px, rgb(255 255 255 / 0.45) 32px);
  background-size: 32px 32px;
  mask-image: linear-gradient(to left, #000, transparent 78%);
}
</style>
