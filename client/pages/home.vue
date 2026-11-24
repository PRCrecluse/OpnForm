<template>
  <div
    v-if="workspace"
    data-testid="home-page"
    class="mx-auto flex h-full max-w-6xl flex-col px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
  >
    <header class="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
      <h1 class="opn-heading text-4xl font-semibold text-(--opn-ink) sm:text-5xl">Forms</h1>
      <TrackClick name="home_top_bar_create_form_click">
        <UButton
          v-if="!workspace?.is_readonly"
          icon="i-heroicons-plus"
          label="Create Form"
          size="lg"
          :to="{ name: 'forms-create' }"
        />
      </TrackClick>
    </header>

    <div>
      <section aria-label="Workspace forms" class="overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface)">
        <div
          v-if="forms?.length > 0 || isFilteringForms"
          class="flex flex-wrap items-center gap-2 border-b border-(--opn-line) px-3 py-3 sm:px-4"
        >
          <UInput
            v-model="search"
            aria-label="Search forms"
            placeholder="Search forms..."
            icon="i-heroicons-magnifying-glass"
            class="min-w-0 flex-1 sm:max-w-64"
          />

          <USelectMenu
            v-if="allTags.length > 0"
            v-model="selectedTags"
            :items="tagOptions"
            multiple
            aria-label="Filter forms by tags"
            placeholder="Tags"
            class="hidden max-w-56 sm:inline-flex"
            :ui="{ content: 'min-w-fit' }"
          />

          <UButton
            v-if="isFilteringForms"
            label="Clear"
            variant="ghost"
            color="neutral"
            @click="clearFilters"
          />
        </div>

        <ClientOnly>
          <VTransition name="fade">
            <div
              v-if="isFetched && !isFormsLoading && forms?.length === 0"
              class="text-center py-16 px-4"
            >
              <span class="mx-auto grid size-10 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                <UIcon name="i-heroicons-document-plus" class="size-5" />
              </span>
              <h2 class="opn-heading mt-4 text-xl font-semibold text-(--opn-ink)">
                Create your first form
              </h2>
              <p class="mt-1 text-sm text-neutral-500">
                Get started by creating a new form to collect responses.
              </p>
              <UButton
                v-if="!workspace?.is_readonly"
                class="mt-6"
                icon="i-heroicons-plus"
                label="Create Form"
                :to="{ name: 'forms-create' }"
              />
            </div>

            <div
              v-else-if="
                isFetched &&
                !isFormsLoading &&
                forms?.length > 0 &&
                enrichedForms.length === 0
              "
              class="text-center py-16 px-4"
            >
              <span class="mx-auto grid size-10 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                <UIcon name="i-heroicons-magnifying-glass" class="size-5" />
              </span>
              <h2 class="opn-heading mt-4 text-xl font-semibold text-(--opn-ink)">
                No forms found
              </h2>
              <p class="mt-1 text-sm text-neutral-500">
                Your search and filter criteria did not match any forms.
              </p>
              <UButton
                v-if="isFilteringForms"
                class="mt-6"
                label="Clear Filters"
                variant="soft"
                @click="clearFilters"
              />
            </div>

            <div v-else-if="enrichedForms.length > 0">
              <ul class="divide-y divide-(--opn-line)">
                <FormCard
                  v-for="form in enrichedForms"
                  :key="form.id"
                  :form="form"
                />
              </ul>

              <div v-if="isLoadingMore" class="divide-y divide-(--opn-line) border-t border-(--opn-line)">
                <FormCardSkeleton />
                <FormCardSkeleton class="opacity-60" />
                <FormCardSkeleton class="opacity-30" />
              </div>

              <div
                v-else-if="!isComplete && totalPages > 1"
                class="flex justify-center items-center py-4"
              >
                <div class="text-sm text-neutral-500">
                  Loaded {{ currentPage }} of {{ totalPages }} pages
                </div>
              </div>
            </div>

            <div v-else-if="isFormsLoading" class="divide-y divide-(--opn-line)">
              <FormCardSkeleton />
              <FormCardSkeleton />
              <FormCardSkeleton />
            </div>
          </VTransition>
          <template #fallback>
            <div class="divide-y divide-(--opn-line)">
              <FormCardSkeleton />
              <FormCardSkeleton />
              <FormCardSkeleton />
            </div>
          </template>
        </ClientOnly>
      </section>

      <UpgradeBanner v-if="enrichedForms.length >= 2" />
    </div>
    <div id="home-portals" class="z-20" />

  </div>
</template>

<script setup>
import { useFuse } from "@vueuse/integrations/useFuse"
import FormCard from "~/components/pages/home/FormCard.vue"
import FormCardSkeleton from "~/components/pages/home/FormCardSkeleton.vue"
import TrackClick from "~/components/global/TrackClick.vue"
import UpgradeBanner from "~/components/dashboard/UpgradeBanner.vue"

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
})

useOpnSeoMeta({
  title: "Your Forms",
  description:
    "All of your OpnForm are here. Create new forms, or update your existing forms.",
})

// Composables
const { current: workspace, currentId: workspaceId } = useCurrentWorkspace()

const {
  forms,
  isLoading: isFormsLoading,
  isFetchingNextPage: isLoadingMore,
  isFetched,
  currentPage,
  totalPages,
  isComplete,
} = useFormsList(workspaceId, {
  fetchAll: true,
  enabled: computed(() => import.meta.client && !!workspaceId.value),
})

// State
const search = ref("")
const debouncedSearch = refDebounced(search, 500)
const selectedTags = ref([])

// Methods
const clearFilters = () => {
  search.value = ""
  selectedTags.value = []
}

// Computed
const isFilteringForms = computed(() => {
  return (
    (search.value !== "" && search.value !== null) ||
    selectedTags.value.length > 0
  )
})

// Extract all unique tags from forms
const allTags = computed(() => {
  if (!forms.value) return []

  const tagsSet = new Set()
  forms.value.forEach((form) => {
    if (form.tags && form.tags.length) {
      form.tags.forEach((tag) => tagsSet.add(tag))
    }
  })

  return Array.from(tagsSet).sort()
})

const tagOptions = computed(() =>
  allTags.value.map((tag) => ({ label: tag, value: tag })),
)

const baseForms = computed(() => {
  if (!forms.value) return []
  return forms.value.filter((form) => {
    if (selectedTags.value.length === 0) return true
    const selectedTagStrings = selectedTags.value
      .map((t) => (typeof t === "string" ? t : t?.value))
      .filter(Boolean)
    return form.tags && form.tags.length
      ? selectedTagStrings.every((tag) => form.tags.includes(tag))
      : false
  })
})

const { results: fuseResults } = useFuse(debouncedSearch, baseForms, {
  fuseOptions: {
    keys: ["title", "slug", "tags"],
    threshold: 0.3,
    ignoreLocation: true,
    includeScore: false,
  },
  matchAllWhenSearchEmpty: true,
})

const enrichedForms = computed(() => {
  const base = baseForms.value
  if (!base || base.length === 0) return []
  const results = fuseResults.value
  return results && results.length > 0 ? results.map((r) => r.item) : base
})
</script>
