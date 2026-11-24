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
          <div class="grid w-full max-w-sm grid-cols-5 gap-2 sm:gap-3">
            <div
              v-for="app in integrationApps"
              :key="app"
              class="grid aspect-square place-items-center rounded-md border border-white/15 bg-white/5"
            >
              <UIcon
                :name="app"
                class="size-5 text-neutral-200 sm:size-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const integrationApps = [
  "i-simple-icons-zendesk",
  "heroicons:envelope-20-solid",
  "ic:baseline-discord",
  "mdi:telegram",
  "material-symbols:webhook",
  "i-simple-icons-zapier",
  "simple-icons:n8n",
  "opnform:activepieces",
  "mdi:google-spreadsheet",
  "i-simple-icons-zoom",
  "i-simple-icons-linear",
  "i-simple-icons-evernote",
  "i-simple-icons-notion",
  "i-simple-icons-airtable",
  "i-simple-icons-meta",
]
</script>
