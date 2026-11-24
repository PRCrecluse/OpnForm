<template>
  <div class="opn-chrome relative flex max-h-screen w-full grow flex-col bg-(--opn-paper)">
    <!-- Mobile warning (same as FormEditor) -->
    <div
      class="fixed inset-0 z-50 flex w-full flex-col items-center justify-center bg-(--opn-paper) px-6 md:hidden"
    >
      <Icon
        name="i-heroicons-computer-desktop"
        class="size-8 text-(--opn-ink)"
      />
      <div class="max-w-sm p-5 text-center text-(--opn-ink)">
        OpnForm is not optimized for mobile devices. Please open this page on a device with a larger screen.
      </div>
      <div>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
          class="w-full"
          :to="{ name: 'home' }"
        >
          Back to dashboard
        </UButton>
      </div>
    </div>

    <!-- Navbar Skeleton -->
    <div class="flex min-h-16 items-center justify-between border-b border-(--opn-line) bg-(--opn-surface) px-4 py-2">
      <!-- Back button and title -->
      <div class="flex items-center gap-3">
        <a
          v-if="backButton"
          href="#"
          aria-label="Go back"
          class="grid size-8 shrink-0 place-items-center rounded-md text-(--opn-ink) hover:bg-neutral-100 dark:hover:bg-neutral-800"
          @click.prevent="$emit('go-back')"
        >
          <UIcon name="i-heroicons-arrow-left" class="size-4" />
        </a>
        <USkeleton v-else class="h-9 w-9" />
        <USkeleton class="h-6 w-32" />
      </div>
      
      <!-- Save button -->
      <USkeleton class="h-9 w-20" />
    </div>

    <!-- Main content area -->
    <div class="relative flex w-full grow overflow-y-scroll">
      <!-- Left sidebar skeleton -->
      <div class="relative w-full shrink-0 overflow-y-scroll border-r border-(--opn-line) bg-(--opn-surface) md:w-1/2 md:max-w-xs lg:w-2/5">
        <div class="p-4 space-y-4">
          <!-- Tab buttons -->
          <div class="flex gap-2 mb-6">
            <USkeleton class="h-8 w-16" />
            <USkeleton class="h-8 w-16" />
          </div>
          
          <!-- Form fields section -->
          <div class="space-y-4">
            <USkeleton class="h-5 w-24" />
            <USkeleton class="h-10 w-full" />
            <USkeleton class="h-5 w-32" />
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-5 w-28" />
            <USkeleton class="h-12 w-full" />
            <USkeleton class="h-5 w-20" />
            <USkeleton class="h-6 w-full" />
          </div>
          
          <!-- Additional form options -->
          <div class="space-y-3 mt-6">
            <USkeleton class="h-4 w-36" />
            <USkeleton class="h-9 w-full" />
            <USkeleton class="h-4 w-28" />
            <USkeleton class="h-9 w-full" />
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-16 w-full" />
          </div>
        </div>
      </div>

      <!-- Center preview area skeleton -->
      <div class="flex flex-1 flex-col">
        <div class="border-b border-(--opn-line) bg-(--opn-surface) p-4">
          <div class="flex items-center justify-between">
            <USkeleton class="h-6 w-32" />
            <div class="flex gap-2">
              <USkeleton class="h-8 w-8" />
              <USkeleton class="h-8 w-8" />
            </div>
          </div>
        </div>
        
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="mx-auto max-w-lg rounded-lg border border-(--opn-line) bg-(--opn-surface) p-6">
            <!-- Form preview skeleton -->
            <div class="space-y-6">
              <div class="space-y-2">
                <USkeleton class="h-8 w-3/4" />
                <USkeleton class="h-4 w-full" />
                <USkeleton class="h-4 w-2/3" />
              </div>
              
              <div class="space-y-4">
                <div class="space-y-2">
                  <USkeleton class="h-4 w-24" />
                  <USkeleton class="h-10 w-full" />
                </div>
                
                <div class="space-y-2">
                  <USkeleton class="h-4 w-32" />
                  <USkeleton class="h-10 w-full" />
                </div>
                
                <div class="space-y-2">
                  <USkeleton class="h-4 w-28" />
                  <USkeleton class="h-24 w-full" />
                </div>
                
                <div class="space-y-2">
                  <USkeleton class="h-4 w-20" />
                  <USkeleton class="h-10 w-full" />
                </div>
              </div>
              
              <USkeleton class="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar skeleton -->
      <div class="w-80 space-y-4 border-l border-(--opn-line) bg-(--opn-surface) p-4">
        <div class="flex items-center justify-between">
          <USkeleton class="h-6 w-24" />
          <USkeleton class="h-6 w-6" />
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <USkeleton class="h-4 w-20" />
            <USkeleton class="h-9 w-full" />
          </div>
          
          <div class="space-y-2">
            <USkeleton class="h-4 w-24" />
            <USkeleton class="h-9 w-full" />
          </div>
          
          <div class="space-y-2">
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-16 w-full" />
          </div>
          
          <div class="space-y-2">
            <USkeleton class="h-4 w-28" />
            <USkeleton class="h-9 w-full" />
          </div>
          
          <!-- Field options -->
          <div class="border-t pt-4 space-y-3">
            <USkeleton class="h-4 w-36" />
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-4 w-28" />
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
defineProps({
  backButton: {
    type: Boolean,
    default: true
  }
})

// Define emits
defineEmits(['go-back'])
</script>
