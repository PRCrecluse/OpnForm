<template>
  <BaseSidebar ref="sidebar">
    <!-- Header Slot -->
    <template #header>
      <!-- Workspace Dropdown -->
      <div class="min-w-0 grow">
        <WorkspaceDropdown>
          <template #default="{ workspace }">
            <button
              v-if="workspace"
              aria-label="Workspace menu"
              :title="workspace.name"
              class="flex w-full items-center gap-1.5 rounded-md p-1.5 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <WorkspaceIcon :workspace="workspace" />
              <div class="flex-1 min-w-0">
                <p class="truncate font-display text-sm font-semibold text-(--opn-ink)">
                  {{ workspace.name }}
                </p>
              </div>
              <UIcon name="i-heroicons-chevron-up-down" class="size-3.5 shrink-0 text-(--opn-muted)" />
            </button>
          </template>
        </WorkspaceDropdown>
      </div>
      
      <!-- User Dropdown -->
      <div class="flex gap-2 items-center">
        <UserDropdown>
          <template #default="{ user }">
            <button
              aria-label="User menu"
              class="flex items-center rounded-md p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <ClientOnly>
                <UAvatar
                  :as="{ img: 'img' }"
                  :src="user?.photo_url"
                  :alt="user?.name"
                  size="sm"
                  aria-hidden="true"
                />
                <template #fallback>
                  <UAvatar :alt="user?.name" size="sm" aria-hidden="true" />
                </template>
              </ClientOnly>
            </button>
          </template>
        </UserDropdown>
      </div>
    </template>

    <!-- Navigation Slot -->
    <template #navigation>
      <div 
        v-for="(section, index) in navigationSections" 
        :key="section.name || 'main'"
        :class="[
          index !== navigationSections.length - 1 ? 'mb-6' : '',
          // Push Product and Help sections to bottom
          index === 1 ? 'mt-auto' : ''
        ]"
      >
        <!-- Section Title (if exists) -->
        <h3 
          v-if="section.name"
          class="mb-2 px-2.5 text-xs font-medium text-(--opn-muted)"
        >
          {{ section.name }}
        </h3>
        
        <!-- Section Items -->
        <NavigationList
          :items="section.items"
          button-class="w-full justify-start rounded-md px-2.5 py-2"
          tracking-name="sidebar_nav_click"
          :tracking-properties="(item) => ({ label: item.label })"
          @item-click="handleItemClick"
        />
      </div>
    </template>
  </BaseSidebar>
</template>

<script setup>
import BaseSidebar from "~/components/layouts/BaseSidebar.vue"
import WorkspaceDropdown from "~/components/dashboard/WorkspaceDropdown.vue"
import WorkspaceIcon from "~/components/workspaces/WorkspaceIcon.vue"
import UserDropdown from "~/components/dashboard/UserDropdown.vue"
import NavigationList from "~/components/global/NavigationList.vue"
import { useSharedNavigation } from "~/composables/components/useSharedNavigation"

const route = useRoute()
const sidebar = ref(null)

const { sharedNavigationSections, createNavItem } = useSharedNavigation()

const { current: workspace } = useCurrentWorkspace()
const isSelfHosted = computed(() => useFeatureFlag('self_hosted'))
const { can } = useWorkspaceAbilities()
const { openSubscriptionModal } = useAppModals()

// Check if current route matches a prefix
function isActiveRoute(prefix) {
  if (!prefix) return false
  return route.name?.startsWith(prefix)
}

// Navigation sections structure
const navigationSections = computed(() => [
  // Section 1: Main navigation (no name)
  {
    name: null,
    items: [
      createNavItem({
        label: 'Create Form',
        icon: 'i-heroicons-plus',
        to: { name: 'forms-create' },
        active: isActiveRoute('forms-create'),
        color: 'primary',
        variant: 'solid',
        kbd: ['N'],
      }),
      createNavItem({
        label: 'Home', 
        icon: 'i-heroicons-home',
        to: { name: 'home' },
        active: isActiveRoute('home')
      }),
      createNavItem({
        label: 'Templates',
        icon: 'i-heroicons-document-duplicate',
        to: { name: 'templates-my-templates' },
        active: isActiveRoute('templates')
      }),
      // Show upgrade for non-pro users
      ...(workspace.value && !can('workspaces.multiple') && !isSelfHosted.value ? [createNavItem({
        label: 'Upgrade to Pro',
        icon: 'i-heroicons-sparkles-solid', 
        onClick: () => {
          useAmplitude().logEvent('app_sidebar_upgrade_click')
          openSubscriptionModal({
            plan: 'pro',
            modal_title: 'Upgrade to Pro plan',
          })
        },
        color: 'primary'
      })] : []),
      ...(workspace.value && can('workspaces.multiple') && !can('multi_user.roles') && !isSelfHosted.value ? [createNavItem({
        label: 'Upgrade to Business',
        icon: 'i-heroicons-sparkles-solid',
        onClick: () => {
          useAmplitude().logEvent('app_sidebar_upgrade_click')
          openSubscriptionModal({
            plan: 'business',
            modal_title: 'Upgrade to Business plan',
          })
        },
        color: 'primary'
      })] : [])
    ]
  },
  // Add shared navigation sections (Product and Help)
  ...sharedNavigationSections.value
])

function handleItemClick(_item) {
  if (sidebar.value && sidebar.value.isMobileMenuOpen) {
    sidebar.value.isMobileMenuOpen = false
  }
}
</script> 
