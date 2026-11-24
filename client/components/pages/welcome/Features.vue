<template>
  <section id="features" class="scroll-mt-5" aria-labelledby="features-title">
    <div class="mx-auto max-w-266 px-5 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-20">
      <h2 id="features-title" class="opn-heading max-w-2xl text-3xl text-(--opn-ink) sm:text-5xl">
        Build, collect, and connect.
      </h2>
    </div>

    <article
      v-for="(panel, index) in panels"
      :key="panel.eyebrow"
      class="border-t border-(--opn-line)"
    >
      <div class="mx-auto grid max-w-266 items-center gap-8 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-2 lg:gap-14">
        <div :class="{ 'lg:order-2': index % 2 }">
          <p class="text-sm font-medium text-(--opn-muted)">{{ panel.eyebrow }}</p>
          <h3 class="opn-heading mt-3 max-w-lg text-2xl text-(--opn-ink) sm:text-4xl">{{ panel.title }}</h3>
          <p class="mt-4 leading-relaxed text-(--opn-muted)">{{ panel.description }}</p>
          <ul class="mt-5 divide-y divide-(--opn-line) text-sm text-(--opn-ink)">
            <li v-for="item in panel.items" :key="item.title" class="flex min-h-10 items-center gap-3 py-2">
              <UIcon :name="item.icon" class="size-4 shrink-0 text-(--opn-muted)" />
              {{ item.title }}
            </li>
          </ul>
          <NuxtLink
            v-if="panel.link"
            :to="panel.link.to"
            class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-(--opn-ink) underline-offset-4 hover:underline"
          >
            {{ panel.link.label }}
            <UIcon name="i-heroicons-arrow-up-right-20-solid" class="size-4" />
          </NuxtLink>
        </div>
        <div class="feature-media grid place-items-center overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface) p-4 sm:p-7">
          <img
            :src="panel.imageSrc"
            :srcset="panelSrcset(panel)"
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 430px, calc(100vw - 100px)"
            :width="panel.imageWidth"
            :height="panel.imageWidth"
            alt=""
            class="h-auto w-full max-w-108 rounded-md grayscale"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </article>

    <div class="border-t border-(--opn-line)">
      <div class="mx-auto max-w-266 px-5 py-12 sm:px-8 sm:py-20">
        <h2 class="opn-heading max-w-2xl text-3xl text-(--opn-ink) sm:text-5xl">
          Everything you expect from a modern form builder.
        </h2>
        <div role="group" aria-label="Feature categories" class="mt-7 flex flex-wrap gap-2">
          <UButton
            v-for="tab in tabs"
            :key="tab.key"
            :aria-pressed="activeTab === tab.key"
            :variant="activeTab === tab.key ? 'solid' : 'outline'"
            :color="activeTab === tab.key ? 'primary' : 'neutral'"
            :icon="tab.icon"
            :label="tab.label"
            class="min-h-10 rounded-md"
            @click="activeTab = tab.key"
          />
        </div>

        <article aria-live="polite" class="mt-6 grid overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface) lg:grid-cols-2">
          <div class="p-5 sm:p-8">
            <h3 class="opn-heading text-2xl text-(--opn-ink) sm:text-3xl">{{ activeContent.title }}</h3>
            <p class="mt-3 leading-relaxed text-(--opn-muted)">{{ activeContent.description }}</p>
            <ul class="mt-5 space-y-3 text-sm text-(--opn-ink)">
              <li v-for="point in activeContent.points" :key="point" class="flex items-center gap-2.5">
                <UIcon name="i-heroicons-check-20-solid" class="size-4 shrink-0" />
                {{ point }}
              </li>
            </ul>
          </div>
          <div class="feature-media grid place-items-center border-t border-(--opn-line) p-5 lg:border-t-0 lg:border-l">
            <img
              :src="activeContent.imageSrc"
              alt=""
              class="aspect-[1.67] h-auto w-full max-w-110 rounded-md object-contain grayscale"
              loading="lazy"
            />
          </div>
        </article>

        <div class="mt-6 flex flex-wrap gap-2.5">
          <UButton
            size="lg"
            :to="{ name: authenticated ? 'forms-create' : 'forms-create-guest' }"
            trailing-icon="i-heroicons-arrow-up-right-20-solid"
            label="Create a free form"
            class="min-h-11 rounded-md"
          />
          <UButton
            :to="{ name: 'pricing' }"
            label="See the full feature list"
            variant="outline"
            color="neutral"
            size="lg"
            class="min-h-11 rounded-md"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { isAuthenticated: authenticated } = useIsAuthenticated()

function panelSrcset(panel) {
  const src = panel.imageSrc
  if (panel.imageWidth <= 640) return `${src} ${panel.imageWidth}w`
  return `${src.replace('.webp', '-480.webp')} 480w, ${src.replace('.webp', '-640.webp')} 640w, ${src} 968w`
}

const panels = [
  {
    eyebrow: "Modern Form Builder",
    title: "Design forms that look professional, without needing a designer.",
    description:
      "Drag and drop fields, apply themes, use multi-page layouts, and choose between conversational or classic form styles. Everything feels fast, smooth, and focused.",
    items: [
      {
        title: "Modern multi-step & single-page forms",
        icon: "i-heroicons-rectangle-stack",
      },
      {
        title: "Typeform-style or classic layouts",
        icon: "i-heroicons-view-columns",
      },
      {
        title: "Conditional logic",
        icon: "i-heroicons-arrows-right-left",
      },
      {
        title: "Custom themes, brand colors & fonts",
        icon: "i-heroicons-paint-brush",
      },
      {
        title: "Remove OpnForm branding on paid plans",
        icon: "i-heroicons-no-symbol",
      },
      {
        title: "Optional AI assistance",
        icon: "i-heroicons-sparkles",
      },
    ],
    imageSrc: "/img/pages/welcome/feature-1.webp",
    imageWidth: 484,
    link: null,
  },
  {
    eyebrow: "Unlimited Submissions",
    title: "Collect as many responses as you need, even on the free plan.",
    description:
      "Collect unlimited submissions without per-response charges, including on the free plan.",
    items: [
      {
        title: "Unlimited submissions",
        icon: "i-ph-infinity-bold",
      },
      {
        title: "Generous free tier",
        icon: "i-heroicons-gift",
      },
      {
        title: "Fair, transparent pricing",
        icon: "i-heroicons-banknotes",
      },
    ],
    imageSrc: "/img/pages/welcome/feature-2.webp",
    imageWidth: 484,
    link: null,
  },
  {
    eyebrow: "Integrations & Automation",
    title: "Connect OpnForm to the tools you already use.",
    description:
      "Automate your workflows with native integrations or connect anything with webhooks and our public API.",
    items: [
      {
        title: "Slack, Discord, Telegram",
        icon: "i-heroicons-chat-bubble-left-right",
      },
      {
        title: "Google Sheets & Zapier",
        icon: "i-heroicons-table-cells",
      },
      {
        title: "Stripe payments",
        icon: "i-heroicons-credit-card",
      },
      {
        title: "Webhooks + REST API",
        icon: "i-heroicons-link",
      },
      {
        title: "Auto-notifications & routing",
        icon: "i-heroicons-arrow-path-rounded-square",
      },
    ],
    imageSrc: "/img/pages/welcome/feature-3.webp",
    imageWidth: 968,
    link: {
      to: { name: "pricing" },
      label: "Explore All Features",
    },
  },
]

const tabs = [
  { key: "smart", label: "Smart Forms", icon: "i-heroicons-sparkles" },
  { key: "inputs", label: "Rich Inputs", icon: "i-heroicons-bars-3-20-solid" },
  {
    key: "security",
    label: "Quality & Security",
    icon: "i-heroicons-shield-check",
  },
  {
    key: "control",
    label: "Experience & Control",
    icon: "i-heroicons-adjustments-horizontal",
  },
]

const activeTab = ref("smart")

const tabContent = {
  smart: {
    title: "Smart Forms",
    description:
      "Automate your workflows with native integrations or connect anything with webhooks and our public API.",
    points: [
      "Conditional logic",
      "Calculations & computed fields",
      "Answer piping & hidden fields",
      "Redirect on submit",
    ],
    imageSrc: "/img/pages/welcome/feature-4.png",
  },
  inputs: {
    title: "Rich Inputs",
    description:
      "Collect higher-quality data with powerful field types, validations, and advanced input experiences.",
    points: [
      "File uploads",
      "Address & phone inputs",
      "Payments & signatures",
      "Validation rules",
    ],
    imageSrc: "/img/pages/welcome/feature-5.png",
  },
  security: {
    title: "Quality & Security",
    description:
      "Keep your data safe and your pipeline clean with built-in protections and control over submissions.",
    points: [
      "Spam protection",
      "reCAPTCHA support",
      "Email notifications",
      "Data exports",
    ],
    imageSrc: "/img/pages/welcome/feature-6.png",
  },
  control: {
    title: "Experience & Control",
    description:
      "Fine-tune the end-to-end experience with themes, customization, and powerful routing options.",
    points: [
      "Custom themes & branding",
      "Multi-page forms",
      "Thank-you pages",
      "Webhooks & integrations",
    ],
    imageSrc: "/img/pages/welcome/feature-7.png",
  },
}

const activeContent = computed(
  () => tabContent[activeTab.value] || tabContent.smart,
)

</script>

<style scoped>
.feature-media {
  background-image: radial-gradient(circle, var(--opn-line) 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
