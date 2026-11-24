<template>
  <section class="py-9 sm:py-14">
    <Integrations />
  </section>
  <section class="border-t border-(--opn-line) px-5 py-10 sm:px-8 sm:py-16 lg:px-12">
    <div class="max-w-266 mx-auto">
      <div class="text-center">
        <h3
          class="opn-heading text-3xl font-semibold text-(--opn-ink) sm:text-5xl"
        >
          Share your form anywhere.
        </h3>
        <p
          class="mt-4 text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
        >
          Choose the distribution method that fits your workflow.
        </p>
      </div>

      <div class="mt-12 sm:mt-16 grid gap-6">
        <div class="grid gap-6 lg:grid-cols-2">
          <div
            v-for="card in shareCards"
            :key="card.key"
            class="rounded-lg border border-(--opn-line) bg-(--opn-surface) pl-5 pt-5 sm:pl-7 sm:pt-7 overflow-hidden"
            :class="card.size === 'large' ? 'lg:col-span-2' : ''"
          >
            <div
              class="grid gap-3 relative"
              :class="
                card.size === 'large'
                  ? 'items-end lg:grid-cols-12 gap-0 sm:gap-2 lg:gap-6'
                  : 'items-start sm:grid-cols-12 gap-2 sm:gap-6'
              "
            >
              <div
                class="flex flex-col items-start lg:pb-6"
                :class="
                  card.size === 'large'
                    ? 'sm:col-span-4 lg:col-span-3 gap-2 lg:gap-6'
                    : 'sm:col-span-6 md:col-span-5 gap-2 sm:gap-6'
                "
              >
                <div
                  class="grid size-11 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper)"
                >
                  <UIcon :name="card.icon" class="size-6 text-(--opn-ink)" />
                </div>
                <div class="text-xl leading-7 font-medium text-(--opn-ink)">
                  {{ card.title }}
                </div>
              </div>

              <div
                :class="
                  card.size === 'large'
                    ? '-ml-8 sm:ml-0 sm:col-span-8 lg:col-span-9'
                    : 'sm:col-span-6 md:col-span-7 max-w-[278.16px] ml-auto'
                "
              >
                <img
                  :src="card.imageSrc"
                  :alt="card.title"
                  class="w-full translate-y-4 grayscale"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-12 sm:mt-16 text-center text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
      >
        Your forms are accessible wherever your audience is.
      </div>
      <div class="mt-6 text-center">
        <div class="flex items-center justify-center">
          <UButton
            size="lg"
            :to="{
              name: authenticated ? 'forms-create' : 'forms-create-guest',
            }"
            trailing-icon="i-heroicons-arrow-up-right-20-solid"
            label="Create a free form"
            class="pl-4 pr-3.5 py-2.5 rounded-md text-base leading-7 tracking-[-1.1%] font-medium"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="border-t border-(--opn-line) py-9 sm:py-14">
    <div class="px-5 sm:px-8 lg:px-12">
      <div
        class="mx-auto w-full max-w-336 rounded-lg border border-(--opn-line) bg-(--opn-surface) overflow-hidden"
      >
        <div
          class="relative p-5 sm:p-8 lg:p-12"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10"
          >
            <div class="flex flex-col items-start gap-2">
              <h3
                class="opn-heading text-3xl font-semibold text-(--opn-ink) sm:text-5xl text-balance"
              >
                Open-source. Secure. Yours to host anywhere.
              </h3>
              <p
                class="my-4 text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
              >
                OpnForm is fully open-source and built for privacy-first
                organizations.
              </p>
              <p
                class="text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
              >
                Use our EU-based cloud or deploy on-premise to keep full control
                of your data.
              </p>

              <UButton
                :to="{
                  name: authenticated ? 'forms-create' : 'forms-create-guest',
                }"
                size="lg"
                class="my-4 lg:my-10 pl-4 pr-3.5 py-2.5 rounded-md text-base leading-7 tracking-[-1.1%] font-medium"
                trailing-icon="i-heroicons-arrow-up-right-20-solid"
                label="Create a Form"
              />

              <div class="flex flex-wrap gap-4 sm:gap-8 text-(--opn-ink)">
                <a
                  class="inline-flex items-center gap-1 underline-offset-4 hover:underline text-base font-medium leading-7 tracking-[-1.1%]"
                  :href="opnformConfig.links.github_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                  <UIcon
                    name="i-heroicons-arrow-up-right-20-solid"
                    class="h-5 w-5"
                  />
                </a>
                <a
                  class="inline-flex items-center gap-1 underline-offset-4 hover:underline text-base font-medium leading-7 tracking-[-1.1%]"
                  :href="opnformConfig.links.self_hosting"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Self-host OpnForm
                  <UIcon
                    name="i-heroicons-arrow-up-right-20-solid"
                    class="h-5 w-5"
                  />
                </a>
                <a
                  class="inline-flex items-center gap-1 underline-offset-4 hover:underline text-base font-medium leading-7 tracking-[-1.1%]"
                  :href="opnformConfig.links.tech_docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open-source Benefits
                  <UIcon
                    name="i-heroicons-arrow-up-right-20-solid"
                    class="h-5 w-5"
                  />
                </a>
              </div>
            </div>
            <div class="divide-y divide-(--opn-line)">
              <div
                v-for="feature in securityFeatures"
                :key="feature.label"
                class="flex min-h-11 items-center gap-3 py-2 text-sm font-medium text-(--opn-ink)"
              >
                <UIcon :name="feature.icon" class="size-5 shrink-0 text-(--opn-muted)" />
                <span>{{ feature.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="border-t border-(--opn-line) px-5 py-10 sm:px-8 sm:py-16 lg:px-12">
    <div class="max-w-266 mx-auto">
      <div class="text-center">
        <h3
          class="opn-heading text-3xl font-semibold text-(--opn-ink) sm:text-5xl"
        >
          Built for individuals and teams.
        </h3>
        <p
          class="mt-4 text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
        >
          Manage forms at scale with powerful collaboration and compliance
          features.
        </p>
      </div>

      <div class="my-12 sm:my-16 max-w-6xl mx-auto space-y-6">
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div
            v-for="block in teamFeatureBlocks.slice(0, 2)"
            :key="block.title"
            class="overflow-hidden relative rounded-lg border border-(--opn-line) bg-(--opn-surface) p-6"
          >
            <h4
              class="text-xl leading-7 tracking-[-0.6%] font-semibold text-(--opn-ink)"
            >
              {{ block.title }}
            </h4>
            <p
              class="mt-4 text-base font-normal text-(--opn-muted) leading-7 tracking-[-1.1%]"
            >
              {{ block.description }}
            </p>
            <div class="mt-4 -mx-8 -mb-8">
              <img
                :src="block.image"
                :alt="block.title"
                class="w-full max-w-[500px] mx-auto rounded-t-md object-cover grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <div
            v-for="block in teamFeatureBlocks.slice(2)"
            :key="block.title"
            class="overflow-hidden relative rounded-lg border border-(--opn-line) bg-(--opn-surface) p-6"
          >
            <h4 class="text-xl font-semibold text-(--opn-ink)">
              {{ block.title }}
            </h4>
            <p class="mt-4 text-base font-medium text-(--opn-muted) leading-7">
              {{ block.description }}
            </p>
            <div
              class="flex lg:block justify-end items-end mt-6 -mr-8 lg:-ml-2 -mb-12"
            >
              <img
                :src="block.image"
                :alt="block.title"
                class="w-full max-w-78.5 rounded-t-md object-cover grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <UButton
            size="lg"
            :to="{ name: 'enterprise' }"
            trailing-icon="i-heroicons-arrow-up-right-20-solid"
            label="Learn about Enterprise"
            class="pl-4 pr-3.5 py-2.5 rounded-md text-base leading-7 tracking-[-1.1%] font-medium"
          />
          <UButton
            :to="{ name: 'pricing' }"
            label="View Pricing"
            variant="outline"
            color="neutral"
            size="lg"
            class="px-4 py-2.5 rounded-md text-base leading-7 tracking-[-1.1%] font-medium"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import opnformConfig from "~/opnform.config.js"

const { isAuthenticated: authenticated } = useIsAuthenticated()

const shareCards = [
  {
    key: "link",
    size: "large",
    title: "Share with a simple link",
    icon: "i-heroicons-link",
    imageSrc: "/img/pages/welcome/share-1.png",
  },
  {
    key: "embed",
    size: "small",
    title: "Embed on your website or app",
    icon: "i-heroicons-code-bracket-square",
    imageSrc: "/img/pages/welcome/share-2.png",
  },
  {
    key: "notion",
    size: "small",
    title: "Add forms directly into Notion",
    icon: "i-simple-icons-notion",
    imageSrc: "/img/pages/welcome/share-3.png",
  },
  {
    key: "domain",
    size: "small",
    title: "Use your own custom domain",
    icon: "i-heroicons-globe-alt",
    imageSrc: "/img/pages/welcome/share-4.png",
  },
  {
    key: "qr",
    size: "small",
    title: "Generate QR codes for offline collection",
    icon: "i-heroicons-qr-code",
    imageSrc: "/img/pages/welcome/share-5.png",
  },
]

const securityFeatures = [
  {
    label: "100% open-source & auditable",
    icon: "i-heroicons-code-bracket-square",
  },
  {
    label: "EU hosting & GDPR-friendly architecture",
    icon: "i-heroicons-globe-europe-africa",
  },
  {
    label: "Self-hosting / on-premise deployments",
    icon: "i-heroicons-server-stack",
  },
  {
    label: "SSO & SAML support",
    icon: "i-heroicons-lock-closed",
  },
  {
    label: "Form & submission audit logs",
    icon: "i-heroicons-clipboard-document-check",
  },
  {
    label: "SOC2 compliance underway",
    icon: "i-heroicons-shield-check",
  },
  {
    label: "Two-factor authentication (2FA) support",
    icon: "i-heroicons-key",
  },
  {
    label: "End-to-end data encryption",
    icon: "i-heroicons-lock-closed",
  },
]

const teamFeatureBlocks = [
  {
    title: "Collaboration & Management",
    description:
      "Coordinate work across teams with shared workspaces, clear roles, and full audit visibility.",
    image: "/img/pages/welcome/team-1.png",
  },
  {
    title: "Security & Compliance",
    description:
      "Stay aligned with internal requirements through SSO access, domain control, and elevated support.",
    image: "/img/pages/welcome/team-2.png",
  },
  {
    title: "Branding Control",
    description: "Fully brand your forms or white-label them for clients.",
    image: "/img/pages/welcome/team-3.png",
  },
  {
    title: "Audit History",
    description: "Full visibility into form and submission activity.",
    image: "/img/pages/welcome/team-4.png",
  },
  {
    title: "Priority Support",
    description: "Get help fast with dedicated enterprise support.",
    image: "/img/pages/welcome/team-5.png",
  },
]
</script>
