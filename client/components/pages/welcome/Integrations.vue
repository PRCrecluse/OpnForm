<template>
  <div class="px-5 sm:px-8 lg:px-12">
    <div
      class="mx-auto w-full max-w-336 rounded-lg border border-neutral-800 bg-[#191919] overflow-hidden"
    >
      <div
        class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center p-5 sm:p-8 lg:p-12"
      >
        <div class="max-w-124">
          <div
            class="text-sm font-medium text-neutral-300"
          >
            Integrations
          </div>
          <h3
            class="opn-heading my-4 text-3xl font-semibold text-white sm:text-5xl"
          >
            Connect OpnForm to your workflow.
          </h3>
          <p
            class="text-base tracking-[-1.1%] font-medium leading-7 text-neutral-300"
          >
            Send responses instantly to your tools. Automate notifications. Sync
            data across your stack with one click.
          </p>

          <div class="mt-7">
            <UButton
              :to="{ name: 'integrations' }"
              label="Explore All Integrations"
              trailing-icon="i-heroicons-arrow-up-right-20-solid"
              class="min-h-11 rounded-md bg-white px-4 text-neutral-900 hover:bg-neutral-200"
            />
          </div>
        </div>

        <div class="flex justify-center xl:justify-end">
          <div class="grid w-full max-w-sm grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
            <div
              v-for="[slug, name] in integrationApps"
              :key="slug"
              class="grid aspect-square place-items-center rounded-md bg-white"
            >
              <img
                :src="getIntegrationLogo(slug)"
                :alt="name"
                width="28"
                height="28"
                class="size-6 object-contain sm:size-7"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getIntegrationLogo } from '~/lib/integrations.js'

const integrationApps = [
  ['slack', 'Slack'],
  ['discord', 'Discord'],
  ['telegram', 'Telegram'],
  ['zapier', 'Zapier'],
  ['make', 'Make'],
  ['n8n', 'n8n'],
  ['activepieces', 'Activepieces'],
  ['pabbly', 'Pabbly Connect'],
  ['albato', 'Albato'],
  ['google-sheets', 'Google Sheets'],
  ['stripe', 'Stripe'],
  ['webhook', 'Webhook'],
]
</script>
