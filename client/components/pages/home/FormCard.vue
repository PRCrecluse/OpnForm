<template>
  <li class="relative flex items-center gap-2 px-3 py-3 transition-colors hover:bg-(--opn-paper) focus-within:bg-(--opn-paper) sm:gap-4 sm:px-4">
    <!-- Title -->
    <div class="flex min-w-0 grow items-center gap-2.5">
      <span class="grid size-8 shrink-0 place-items-center rounded-md border border-(--opn-line) bg-(--opn-surface) text-(--opn-muted)">
        <UIcon name="i-heroicons-document-text" class="size-4" aria-hidden="true" />
      </span>
      <span class="truncate text-sm font-semibold text-(--opn-ink) sm:text-base">{{ form.title }}</span>
    </div>
    
    <!-- Stats and Menu -->
    <div class="relative flex shrink-0 items-center gap-2 text-sm text-(--opn-muted) tabular-nums sm:gap-4">
      <!-- Status Badges -->
      <FormStatusBadges class="hidden md:block" :form="form" :with-tags="false" size="sm" />
      
      <!-- Last Updated -->
      <span class="hidden lg:inline text-xs whitespace-nowrap" title="Last updated">Updated {{ form.last_edited_human }}</span>

      <!-- Views -->
      <UTooltip :text="`${formatNumberWithCommas(form.views_count)} views`">
        <div class="flex min-w-9 items-center gap-1 sm:min-w-11" title="Form views">
          <UIcon name="i-heroicons-eye" />
          <span>{{ formatNumber(form.views_count) }}</span>
        </div>
      </UTooltip>
      
      <!-- Submissions -->
      <UTooltip :text="`${formatNumberWithCommas(form.submissions_count)} submissions`">
        <div class="flex min-w-9 items-center gap-1 sm:min-w-11" title="Form submissions">
          <UIcon name="i-heroicons-document-text" />
          <span>{{ formatNumber(form.submissions_count) }}</span>
        </div>
      </UTooltip>
      
      <!-- Extra Menu -->
      <div class="relative z-20">
        <ExtraMenu :form="form" :is-main-page="true" portal="#home-portals">
          <template #default="{ loading }">
            <UButton
              aria-label="Form actions"
              color="neutral"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal"
              size="md"
              :loading="loading"
            />
          </template>
        </ExtraMenu>
      </div>
    </div>

    <!-- Link overlay covering entire card -->
    <NuxtLink
      :to="{name:'forms-slug-show-submissions', params: {slug:form.slug}}"
      :aria-label="`Manage ${form.title}`"
      class="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--opn-ink)"
    />
  </li>
</template>

<script setup>
import ExtraMenu from "~/components/pages/forms/show/ExtraMenu.vue"
import FormStatusBadges from "~/components/open/forms/components/FormStatusBadges.vue"
import { formatNumber, formatNumberWithCommas } from "~/lib/utils.js"

defineProps({
  form: {
    type: Object,
    required: true,
  },
})
</script>
