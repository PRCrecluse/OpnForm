<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ content: 'sm:max-w-3xl overflow-hidden' }"
    :dismissible="!loading"
  >
    <template #content>
      <div class="opn-chrome overflow-hidden bg-(--opn-paper) p-2">
        <SlidingTransition
          :style="transitionContainerStyle"
          direction="horizontal"
          :step="currentStep"
          :speed="transitionDurationMs"
        >
          <div
            :key="currentStep"
            class="w-full"
          >
            <!-- Step 1: Choose style -->
            <div
              v-if="currentStep === 1"
              key="step1"
              ref="step1Ref"
              class="rounded-lg border border-(--opn-line) bg-(--opn-surface) p-5 sm:p-6"
            >
              <div class="mx-auto mb-4 max-w-lg text-center">
                <div class="mx-auto mb-3 grid size-9 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                  <Icon
                    name="i-heroicons-sparkles"
                    class="h-4 w-4"
                  />
                </div>
                <h2 class="opn-heading text-2xl font-semibold text-(--opn-ink)">Choose a form style</h2>
                <p class="mt-1 text-sm text-(--opn-muted)">
                  Pick the respondent experience first. You can still change it later.
                </p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  data-testid="form-style-classic"
                  class="group relative overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface) p-4 text-left transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--opn-ink)"
                  @click="selectStyle('classic')"
                >
                  <div class="rounded-md border border-(--opn-line) bg-(--opn-paper) p-3">
                    <Icon
                      name="opnform:form-style-classic"
                      mode="svg"
                      class="mx-auto h-[84px] w-[120px] rounded-md **:transition-colors duration-150 ease-out [--icon-fg:#737373] [--icon-muted:#d4d4d4] group-hover:[--icon-fg:#252525] group-hover:[--icon-muted:#a3a3a3]"
                    />
                  </div>
                  <div class="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p class="font-semibold text-(--opn-ink)">Classic</p>
                      <p class="mt-1 text-xs leading-5 text-(--opn-muted)">
                        Multi-page forms with layout blocks.
                      </p>
                    </div>
                    <Icon
                      name="i-heroicons-arrow-right"
                      class="mt-1 h-4 w-4 text-(--opn-muted) transition group-hover:translate-x-0.5 group-hover:text-(--opn-ink)"
                    />
                  </div>
                </button>
                <button
                  type="button"
                  data-testid="form-style-focused"
                  class="group relative overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface) p-4 text-left transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--opn-ink)"
                  @click="selectStyle('focused')"
                >
                  <div class="rounded-md border border-(--opn-line) bg-(--opn-paper) p-3">
                    <Icon
                      name="opnform:form-style-focused"
                      mode="svg"
                      class="mx-auto h-[84px] w-[120px] rounded-md **:transition-colors duration-150 ease-out [--icon-fg:#737373] [--icon-muted:#d4d4d4] group-hover:[--icon-fg:#252525] group-hover:[--icon-muted:#a3a3a3]"
                    />
                  </div>
                  <div class="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p class="font-semibold text-(--opn-ink)">Focused</p>
                      <p class="mt-1 text-xs leading-5 text-(--opn-muted)">
                        One question at a time.
                      </p>
                    </div>
                    <Icon
                      name="i-heroicons-arrow-right"
                      class="mt-1 h-4 w-4 text-(--opn-muted) transition group-hover:translate-x-0.5 group-hover:text-(--opn-ink)"
                    />
                  </div>
                </button>
              </div>
            </div>

            <!-- Step 2: Choose base -->
            <div
              v-else-if="currentStep === 2"
              key="step2"
              ref="step1Ref"
              class="rounded-lg border border-(--opn-line) bg-(--opn-surface)"
            >
              <div class="flex items-center justify-between gap-3 border-b border-(--opn-line) px-4 py-3 sm:px-5">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-heroicons-arrow-left"
                  @click="goBackToStep1"
                  label="Back to styles"
                  class="-ml-2"
                />
                <span class="rounded-md border border-(--opn-line) bg-(--opn-paper) px-2 py-1 text-xs font-medium text-(--opn-muted)">
                  {{ selectedStyleLabel }}
                </span>
              </div>

              <div class="p-4 sm:p-5">
                <div class="mb-4">
                  <h2 class="opn-heading text-2xl font-semibold text-(--opn-ink)">How do you want to start?</h2>
                  <p class="mt-1 text-sm text-(--opn-muted)">
                    {{ useFeatureFlag('ai_features') ? 'Start from a prompt, a template, an import, or a clean contact form.' : 'Start from a template, an import, or a clean contact form.' }}
                  </p>
                </div>

                <div
                  v-if="useFeatureFlag('ai_features')"
                  class="relative overflow-hidden rounded-lg border border-(--opn-line) bg-(--opn-surface)"
                >
                  <div class="flex items-center justify-between gap-3 border-b border-(--opn-line) bg-(--opn-paper) px-3 py-2">
                    <div class="flex items-center gap-2">
                      <span class="flex h-7 w-7 items-center justify-center rounded-md bg-(--opn-ink) text-(--opn-surface)">
                        <Icon
                          name="i-heroicons-bolt"
                          class="h-4 w-4"
                        />
                      </span>
                      <div>
                        <p class="text-sm font-semibold text-(--opn-ink)">AI form generator</p>
                        <p class="text-xs text-(--opn-muted)">Describe the result you want.</p>
                      </div>
                    </div>
                  </div>

                  <text-area-input
                    :disabled="loading ? true : null"
                    :form="aiForm"
                    name="form_prompt"
                    placeholder="A lead qualification form for a B2B SaaS demo, with budget, team size, timeline, and a short project brief."
                    :has-validation="false"
                    :ui="{
                      slots: {
                        input: 'min-h-[150px] resize-none border-0 bg-white px-4 py-4 text-base leading-7 text-neutral-900 shadow-none placeholder:text-neutral-400 focus:border-transparent focus:ring-0 disabled:!bg-white'
                      }
                    }"
                    @input-filled="generateForm"
                  />

                  <div class="border-t border-(--opn-line) px-3 py-3">
                    <div
                      v-if="loading"
                      class="mb-3"
                    >
                      <div class="mb-2 flex items-center justify-between gap-3">
                        <span class="text-xs font-medium text-neutral-600">Generating your form</span>
                        <span class="text-xs tabular-nums text-(--opn-muted)">{{ Math.round(generationProgress) }}%</span>
                      </div>
                      <div class="h-1.5 overflow-hidden rounded-md bg-neutral-100">
                        <div
                          class="h-full rounded-md bg-(--opn-ink) transition-[width] duration-500 ease-out"
                          :style="{ width: `${generationProgress}%` }"
                        />
                      </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <AIFormLoadingMessages
                        v-if="loading"
                        class="min-w-0 flex-1"
                      />
                      <div
                        v-else
                        class="flex min-w-0 flex-1 items-center gap-2 text-xs text-(--opn-muted)"
                      >
                        <Icon
                          name="i-heroicons-adjustments-horizontal"
                          class="h-4 w-4 text-neutral-400"
                        />
                        <span class="truncate">We will use the {{ selectedStyleLabel.toLowerCase() }} style.</span>
                      </div>

                      <UButton
                        data-testid="form-base-ai"
                        :loading="loading"
                        :disabled="!hasPrompt || loading"
                        :color="hasPrompt || loading ? 'primary' : 'neutral'"
                        :variant="hasPrompt || loading ? 'solid' : 'soft'"
                        icon="i-heroicons-sparkles"
                        trailing-icon="i-heroicons-arrow-right"
                        label="Generate"
                        class="justify-center"
                        @click="generateForm"
                      />
                    </div>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <TrackClick name="select_form_base" :properties="{ base: 'contact-form' }">
                    <button
                      type="button"
                      data-testid="form-base-simple-contact"
                      class="group flex h-full min-h-28 w-full flex-col justify-between rounded-md border border-(--opn-line) bg-(--opn-surface) p-4 text-left transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--opn-ink)"
                      @click="startFromContactForm"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <span class="grid size-9 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                          <UIcon
                            name="i-heroicons-envelope"
                            class="h-5 w-5"
                          />
                        </span>
                        <Icon
                          name="i-heroicons-arrow-right"
                          class="h-4 w-4 text-(--opn-muted) transition group-hover:translate-x-0.5 group-hover:text-(--opn-ink)"
                        />
                      </div>
                      <div class="mt-4">
                        <p class="font-semibold text-(--opn-ink)">Contact form</p>
                        <p class="mt-1 text-xs leading-5 text-(--opn-muted)">Name, email, and message.</p>
                      </div>
                    </button>
                  </TrackClick>
                  <div
                    class="group relative flex min-h-28 flex-col justify-between rounded-md border border-(--opn-line) bg-(--opn-surface) p-4 text-left transition-colors hover:border-neutral-400"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <span class="grid size-9 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                        <UIcon
                          name="i-heroicons-squares-2x2"
                          class="h-5 w-5"
                        />
                      </span>
                      <Icon
                        name="i-heroicons-arrow-up-right"
                        class="h-4 w-4 text-(--opn-muted) transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--opn-ink)"
                      />
                    </div>
                    <div class="mt-4">
                      <p class="font-semibold text-(--opn-ink)">Templates</p>
                      <p class="mt-1 text-xs leading-5 text-(--opn-muted)">Browse proven starting points.</p>
                    </div>
                    <TrackClick name="select_form_base" :properties="{ base: 'template' }">
                      <NuxtLink
                        :to="{ name: 'templates' }"
                        aria-label="Browse templates"
                        class="absolute inset-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--opn-ink)"
                      />
                    </TrackClick>
                  </div>
                  <TrackClick name="select_form_base" :properties="{ base: 'import' }">
                    <button
                      type="button"
                      class="group flex h-full min-h-28 w-full flex-col justify-between rounded-md border border-(--opn-line) bg-(--opn-surface) p-4 text-left transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--opn-ink)"
                      @click="showImportModal = true"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <span class="grid size-9 place-items-center rounded-md border border-(--opn-line) bg-(--opn-paper) text-(--opn-ink)">
                          <UIcon
                            name="i-heroicons-arrow-down-tray"
                            class="h-5 w-5"
                          />
                        </span>
                        <Icon
                          name="i-heroicons-arrow-right"
                          class="h-4 w-4 text-(--opn-muted) transition group-hover:translate-x-0.5 group-hover:text-(--opn-ink)"
                        />
                      </div>
                      <div class="mt-4">
                        <p class="font-semibold text-(--opn-ink)">Import</p>
                        <p class="mt-1 text-xs leading-5 text-(--opn-muted)">{{ importSourcesLabel }}.</p>
                      </div>
                    </button>
                  </TrackClick>
                </div>
              </div>
            </div>
          </div>
        </SlidingTransition>
      </div>
    </template>
  </UModal>

  <FormImportModal
    :show="showImportModal"
    :default-source="defaultImportSource"
    @close="showImportModal = false"
    @imported="handleFormImported"
  />
</template>

<script setup>
import { rememberAiCompletion } from "~/lib/aiCompletionToken"
import SlidingTransition from '~/components/global/transitions/SlidingTransition.vue'
import AIFormLoadingMessages from "~/components/open/forms/components/AIFormLoadingMessages.vue"
import FormImportModal from "~/components/forms/import/FormImportModal.vue"
import { formsApi } from "~/api/forms"
import { useElementSize } from '@vueuse/core'
import TrackClick from '~/components/global/TrackClick.vue'
import seedFocusedFirstBlockImage from '~/lib/forms/seed-focused-image'
import { ensureSettingsObject } from '~/composables/forms/initForm'

const props = defineProps({
  show: { type: Boolean, required: true },
  defaultImportSource: { type: String, default: null },
})

const emit = defineEmits(["close", "form-generated", "form-imported"])

// Modal state
const isOpen = computed({
  get() {
    return props.show
  },
  set(value) {
    if (!value) {
      emit("close")
    }
  }
})

// Steps: 1) style, 2) base
const currentStep = ref(1)
const selectedStyle = ref('classic')

const aiForm = useForm({
  form_prompt: "",
})
const loading = ref(false)
const showImportModal = ref(false)
const generationProgress = ref(0)
const seededFocusedImageUrl = ref(null)
let generationProgressTimer = null

const transitionDurationMs = 300
const step1Ref = ref(null)
const { height: step1Height } = useElementSize(step1Ref)
const cachedStep1Height = ref(0)
const cachedStepScrollHeight = ref(0)
watchEffect(() => {
  if (step1Height?.value) {
    cachedStep1Height.value = step1Height.value
  }
  if (step1Ref.value) {
    cachedStepScrollHeight.value = step1Ref.value.scrollHeight
  }
})
const transitionContainerStyle = computed(() => {
  const h = Math.max(cachedStep1Height.value, cachedStepScrollHeight.value)
  return h ? { height: h + 'px' } : {}
})

watch([currentStep, () => props.show], () => {
  nextTick(() => {
    if (!step1Ref.value) return

    cachedStep1Height.value = step1Ref.value.offsetHeight
    cachedStepScrollHeight.value = step1Ref.value.scrollHeight
  })
}, { flush: 'post' })

watch(() => props.show, (open) => {
  if (open) {
    currentStep.value = 1
    selectedStyle.value = 'classic'
    loading.value = false
    showImportModal.value = !!props.defaultImportSource
    aiForm.form_prompt = ''
    seededFocusedImageUrl.value = null
    resetGenerationProgress()
  } else {
    loading.value = false
    showImportModal.value = false
    seededFocusedImageUrl.value = null
    resetGenerationProgress()
  }
})

const hasPrompt = computed(() => {
  return !!aiForm.form_prompt?.trim()
})

const { isAuthenticated: authenticated } = useIsAuthenticated()
const googleImportAvailable = computed(() => {
  return authenticated.value && !!useFeatureFlag('services.google.auth', false) && !useFeatureFlag('self_hosted', false)
})
const importSourcesLabel = computed(() => {
  return googleImportAvailable.value
    ? 'Typeform, Tally, Fillout, or Google Forms'
    : 'Typeform, Tally, or Fillout'
})

const selectedStyleLabel = computed(() => {
  return selectedStyle.value === 'focused' ? 'Focused' : 'Classic'
})

function selectStyle(style) {
  selectedStyle.value = style
  applySelectedStyleToWorkingForm()
  currentStep.value = 2
}

function applySelectedStyleToWorkingForm() {
  const workingFormStore = useWorkingFormStore()
  if (workingFormStore?.content) {
    workingFormStore.content.presentation_style = selectedStyle.value
    ensureSettingsObject(workingFormStore.content)
    if (selectedStyle.value === 'focused') {
      workingFormStore.content.size = 'lg'
      // Enable navigation arrows by default in focused mode
      workingFormStore.content.settings.navigation_arrows = true
      // Enable auto-next by default in focused mode
      workingFormStore.content.settings.auto_next = true
      // Seed first block image to highlight focused mode
      const firstBlock = workingFormStore.content.properties?.[0]
      const hadImageUrl = !!firstBlock?.image?.url
      seedFocusedFirstBlockImage(workingFormStore.content)
      if (!hadImageUrl && firstBlock?.image?.url) {
        seededFocusedImageUrl.value = firstBlock.image.url
      }
    } else {
      workingFormStore.content.size = 'md'
      delete workingFormStore.content.settings.navigation_arrows
      delete workingFormStore.content.settings.auto_next
      clearSeededFocusedImage(workingFormStore.content)
    }
  }
}

function clearSeededFocusedImage(content) {
  const firstBlock = content?.properties?.[0]
  if (!seededFocusedImageUrl.value || firstBlock?.image?.url !== seededFocusedImageUrl.value) {
    seededFocusedImageUrl.value = null
    return
  }

  delete firstBlock.image
  seededFocusedImageUrl.value = null
}

function goBackToStep1() {
  currentStep.value = 1
}

function startFromContactForm() {
  applySelectedStyleToWorkingForm()
  emit('close')
}

const handleFormImported = (formData) => {
  showImportModal.value = false
  emit('form-imported', formData)
  emit('close')
}

const generateForm = () => {
  if (loading.value || !hasPrompt.value) return

  loading.value = true
  startGenerationProgress()
  aiForm
    .post("/forms/ai/generate", {
      body: {
        generation_params: { presentation_style: selectedStyle.value }
      }
    })
    .then((response) => {
      rememberAiCompletion(response)
      useAlert().success(response.message)
      fetchGeneratedForm(response.ai_form_completion_id)
    })
    .catch((error) => {
      console.error(error)
      loading.value = false
      resetGenerationProgress()
    })
}

const fetchGeneratedForm = (generationId) => {
  // check every 4 seconds if form is generated
  setTimeout(() => {
    formsApi.ai.get(generationId)
      .then((data) => {
        if (data.ai_form_completion.status === "completed") {
          useAlert().success(data.message)
          const generated = (typeof data.ai_form_completion.result === 'string' ? JSON.parse(data.ai_form_completion.result) : data.ai_form_completion.result)
          // Apply seeding based on user's style choice in the modal
          if (selectedStyle.value === 'focused') {
            seedFocusedFirstBlockImage(generated)
          }
          completeGenerationProgress()
          loading.value = false
          emit("form-generated", generated)
          emit("close")
        } else if (data.ai_form_completion.status === "failed") {
          useAlert().error("Something went wrong, please try again.")
          currentStep.value = 2
          loading.value = false
          resetGenerationProgress()
        } else {
          fetchGeneratedForm(generationId)
        }
      })
      .catch((error) => {
        if (error?.data?.message) {
          useAlert().error(error.data.message)
        }
        currentStep.value = 2
        loading.value = false
        resetGenerationProgress()
      })
  }, 4000)
}

function startGenerationProgress() {
  resetGenerationProgress()
  generationProgress.value = 6

  if (!import.meta.client) return

  const startTime = Date.now()
  generationProgressTimer = window.setInterval(() => {
    const elapsed = Date.now() - startTime
    if (elapsed <= 30000) {
      generationProgress.value = Math.min(80, 6 + (elapsed / 30000) * 74)
      return
    }

    const extraSeconds = (elapsed - 30000) / 1000
    generationProgress.value = Math.min(95, 80 + Math.log1p(extraSeconds) * 4)
  }, 350)
}

function completeGenerationProgress() {
  stopGenerationProgress()
  generationProgress.value = 100
}

function resetGenerationProgress() {
  stopGenerationProgress()
  generationProgress.value = 0
}

function stopGenerationProgress() {
  if (!generationProgressTimer) return
  clearInterval(generationProgressTimer)
  generationProgressTimer = null
}

onUnmounted(() => {
  stopGenerationProgress()
})
</script>
