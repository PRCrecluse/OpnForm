<template>
  <aside
    :class="[
      'opn-chrome bg-(--opn-surface) border-(--opn-line) flex flex-col z-60',
      isMobileMenuOpen
        ? 'fixed inset-0'
        : 'sticky top-0 w-full h-[49px] overflow-hidden sm:flex sm:fixed sm:h-full sm:w-58 sm:border-r',
    ]"
  >
    <!-- Top Section - Only show if there's header content or on mobile -->
    <div 
      v-if="hasHeaderContent || isMobileMenuOpen"
      class="flex h-[49px] shrink-0 items-center border-b border-(--opn-line) px-2 sm:h-16"
    >
      <div class="flex items-center justify-between gap-1 w-full">
        <!-- Header Content Slot -->
        <slot name="header" :isMobileMenuOpen="isMobileMenuOpen" />
        
        <div class="grow" v-if="hasMobileHeaderContent">
          <slot name="mobile-header" :isMobileMenuOpen="isMobileMenuOpen" />
        </div>

        <!-- Mobile Menu Toggle -->
        <div :class="{ 'sm:hidden': !isMobileMenuOpen }">
          <UButton
            square
            size="xl"
            :aria-label="isMobileMenuOpen ? 'Close workspace navigation' : 'Open workspace navigation'"
            :aria-expanded="isMobileMenuOpen"
            :icon="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            variant="ghost"
            color="neutral"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Toggle (when header is hidden on desktop) -->
    <div 
      v-else
      class="flex h-[49px] shrink-0 items-center gap-2 border-b border-(--opn-line) px-2 sm:hidden"
    >
      <div class="grow">
        <slot name="mobile-header" :isMobileMenuOpen="isMobileMenuOpen" />
      </div>
      <UButton
        square
        size="xl"
        aria-label="Open workspace navigation"
        :aria-expanded="isMobileMenuOpen"
        icon="i-heroicons-bars-3"
        variant="ghost"
        color="neutral"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      />
    </div>

    <!-- Navigation Content -->
    <nav 
      aria-label="Workspace navigation"
      class="flex flex-1 flex-col overflow-y-auto px-3 py-4"
      :class="{ 'hidden': !isMobileMenuOpen, 'sm:flex': true }"
    >
      <slot name="navigation" :isMobileMenuOpen="isMobileMenuOpen" />
    </nav>

    <!-- Footer -->
    <div 
      class="border-t border-(--opn-line) px-3 py-3"
      :class="{ 'hidden': !isMobileMenuOpen, 'sm:block': true }"
    >
      <slot name="footer" :isMobileMenuOpen="isMobileMenuOpen">
        <p class="flex items-center justify-between gap-2 px-1 text-xs text-(--opn-muted)">
          <NuxtLink class="font-display text-sm font-semibold text-(--opn-ink)" :to="{ name: 'home' }">OpnForm</NuxtLink>
          <span v-if="version">v{{ version }}</span>
        </p>
      </slot>
    </div>
  </aside>
</template>

<script setup>
const slots = useSlots()

const isMobileMenuOpen = ref(false)
const version = computed(() => useFeatureFlag('version'))

// Check if header slot has content
const hasHeaderContent = computed(() => {
  return !!(slots.header && slots.header().length > 0)
})

const hasMobileHeaderContent = computed(() => {
  return !!(slots['mobile-header'] && slots['mobile-header']().length > 0)
})

// Handle body overflow when mobile menu is open
watchEffect(() => {
  if (import.meta.client) {
    document.body.classList.toggle('overflow-hidden', isMobileMenuOpen.value)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.classList.remove('overflow-hidden')
  }
})

// Expose the mobile menu state to parent components
defineExpose({
  isMobileMenuOpen
})
</script>
