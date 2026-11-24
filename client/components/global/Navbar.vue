<template>
  <nav v-if="hasNavbar" aria-label="Main navigation" class="opn-chrome border-b border-(--opn-line) bg-(--opn-paper)">
    <div class="mx-auto flex min-h-16 w-full max-w-[83rem] items-center justify-between gap-2 px-4 sm:min-h-18 sm:gap-4 sm:px-6">
      <div class="flex min-w-0 items-center gap-1 lg:gap-4">
        <NuxtLink
          :to="{ name: user ? 'home' : 'index' }"
          class="opn-heading flex min-w-0 items-center gap-2 text-lg font-semibold text-(--opn-ink) sm:text-xl"
        >
          <img
            :src="isSelfHosted ? instanceLogoUrl : '/img/logo.svg'"
            alt=""
            width="26"
            height="26"
            class="size-6 shrink-0 object-contain sm:size-[26px]"
            :class="{ 'brightness-0 dark:invert': !isSelfHosted }"
          />
          <span class="truncate">{{ isSelfHosted ? instanceName : 'OpnForm' }}</span>
        </NuxtLink>

        <WorkspaceDropdown v-if="user">
          <template #default="{ workspace }">
            <button v-if="workspace" :class="navLinkClasses" class="inline-flex" :aria-label="'Workspace: ' + workspace.name">
              <WorkspaceIcon :workspace="workspace" />
              <span class="ml-2 hidden max-w-24 truncate lg:block">{{ workspace.name }}</span>
            </button>
          </template>
        </WorkspaceDropdown>
      </div>

      <div class="hidden items-center md:flex">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.label"
          :to="item.to"
          :target="item.target"
          :class="[navLinkClasses, item.desktopClass ?? 'inline-flex']"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <UserDropdown v-if="user">
          <template #default="{ user }">
            <button
              id="dropdown-menu-button"
              type="button"
              :class="navLinkClasses"
              class="inline-flex"
              dusk="nav-dropdown-button"
              :aria-label="user.name"
            >
              <img :src="user.photo_url" alt="" class="size-6 rounded-full" width="24" height="24" />
              <span class="ml-2 hidden max-w-20 truncate lg:inline">{{ user.name }}</span>
            </button>
          </template>
        </UserDropdown>
        <template v-else>
          <UButton
            v-if="$route.name !== 'login'"
            :to="{ name: 'login' }"
            color="neutral"
            variant="ghost"
            class="min-h-10 rounded-md"
            label="Login"
          />
          <TrackClick v-if="!isSelfHosted" class="flex items-center" name="nav_create_form_click">
            <UButton
              :to="{ name: 'forms-create-guest' }"
              trailing-icon="i-heroicons-arrow-up-right-20-solid"
              label="Create a form"
              class="min-h-10 rounded-md px-2.5 sm:px-3"
              :ui="{ trailingIcon: 'hidden sm:block' }"
            />
          </TrackClick>
        </template>
        <details
          v-if="navigationItems.length"
          ref="mobileNavigation"
          class="relative md:hidden"
        >
          <summary
            aria-label="Open navigation menu"
            class="mobile-nav-trigger grid size-10 cursor-pointer list-none place-items-center rounded-md border border-(--opn-line) bg-(--opn-surface) text-(--opn-ink) hover:bg-(--opn-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <UIcon name="i-heroicons-bars-3" class="size-5" />
          </summary>
          <ul class="absolute end-0 top-full z-50 mt-2 w-48 space-y-0.5 rounded-lg border border-(--opn-line) bg-(--opn-surface) p-1.5 shadow-sm">
            <li v-for="item in navigationItems" :key="item.label">
              <NuxtLink
                :to="item.to"
                :target="item.target"
                :class="navLinkClasses"
                class="flex items-center"
                @click="closeMobileNavigation()"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </details>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue"
import { onClickOutside, onKeyStroke } from "@vueuse/core"
import { useRoute } from "#imports"

const WorkspaceDropdown = defineAsyncComponent(() => import("../dashboard/WorkspaceDropdown.vue"))
import WorkspaceIcon from "~/components/workspaces/WorkspaceIcon.vue"
const UserDropdown = defineAsyncComponent(() => import("../dashboard/UserDropdown.vue"))

import opnformConfig from "~/opnform.config.js"
import { useFeatureFlag } from "~/composables/useFeatureFlag"
import TrackClick from "~/components/global/TrackClick.vue"

// Stores & composables
const { current: workspace } = useCurrentWorkspace()

const { data: user } = useAuth().user()
const isIframe = useIsIframe()
const isSelfHosted = computed(() => useFeatureFlag("self_hosted"))
const { name: instanceName, logoUrl: instanceLogoUrl } = useSelfHostedPresentation()
const { workspaceIsPaid } = useBillingUpsell()
const route = useRoute()
const mobileNavigation = ref(null)

function closeMobileNavigation(restoreFocus = false) {
  if (!mobileNavigation.value?.open) return
  mobileNavigation.value.open = false
  if (restoreFocus) mobileNavigation.value.querySelector('summary')?.focus()
}

onClickOutside(mobileNavigation, () => closeMobileNavigation())
onKeyStroke("Escape", () => closeMobileNavigation(true))

// Get current form for forms-slug routes
const isFormSlugRoute = computed(
  () => route.name && route.name.startsWith("forms-slug"),
)
const formSlug = computed(() =>
  isFormSlugRoute.value ? route.params.slug : null,
)
const { data: form } = useForms().detail(formSlug.value, {
  usePrivate: true,
  enabled: computed(() => !!formSlug.value),
})

const navLinkClasses =
  "min-h-10 items-center rounded-md px-2.5 text-sm text-(--opn-muted) transition-colors hover:bg-neutral-500/8 hover:text-(--opn-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"

const navigationItems = computed(() => {
  const items = []
  if (user.value) items.push({ label: "My Forms", to: { name: "home" } })
  if (isSelfHosted.value) {
    items.push({ label: "Templates", to: { name: "templates" } })
  } else {
    if (!user.value) items.push({ label: "Features", to: { name: "index", hash: "#features" } })
    if (route.name !== "integrations") items.push({ label: "Integrations", to: { name: "integrations" } })
    if (route.name !== "enterprise") items.push({ label: "Enterprise", to: { name: "enterprise" } })
    if (!user.value && route.name !== "ai-form-builder" && useFeatureFlag("ai_features")) {
      items.push({ label: "AI Form Builder", to: { name: "ai-form-builder" } })
    }
    if (route.name !== "pricing" && useFeatureFlag("billing.enabled")) {
      items.push({
        label: user.value && workspace.value && !workspaceIsPaid.value ? "Upgrade" : "Pricing",
        to: { name: "pricing" },
      })
    }
    items.push({ label: "Documentation", to: opnformConfig.links.tech_docs, target: "_blank", desktopClass: "hidden 2xl:inline-flex" })
  }
  return items
})

const hasNavbar = computed(() => {
  if (isIframe.value) return false
  if (isSelfHosted.value && route.name === 'index') return false

  if (route.name && route.name === "forms-slug") {
    if (form.value || import.meta.server) {
      return false
    }
    // Form not found/404 case - show the navbar
    return true
  }
  return true
})

</script>

<style scoped>
.mobile-nav-trigger::-webkit-details-marker {
  display: none;
}
</style>
