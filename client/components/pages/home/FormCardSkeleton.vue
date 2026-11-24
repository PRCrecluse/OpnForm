<template>
  <div class="flex items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
    <!-- Title Skeleton -->
    <div class="flex min-w-0 grow items-center gap-2.5">
      <USkeleton class="size-8 shrink-0 rounded-md" />
      <USkeleton class="h-5 w-2/5" />
    </div>
    
    <!-- Stats and Menu Skeleton -->
    <div class="flex items-center gap-2 text-sm sm:gap-4">
      <!-- Last Updated Skeleton -->
      <USkeleton class="h-4 w-24 hidden md:inline" />
      <USkeleton class="h-4 w-2 hidden md:inline" />

      <!-- Views Skeleton -->
      <div class="flex items-center gap-1">
        <USkeleton class="h-5 w-5" />
        <USkeleton class="h-4 w-6" />
      </div>
      
      <!-- Submissions Skeleton -->
      <div class="flex items-center gap-1">
        <USkeleton class="h-5 w-5" />
        <USkeleton class="h-4 w-6" />
      </div>
      
      <!-- Extra Menu Skeleton -->
      <USkeleton class="h-8 w-8" />
    </div>
  </div>
</template>
