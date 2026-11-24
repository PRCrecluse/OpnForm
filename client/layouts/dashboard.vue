<template>
  <div class="dashboard-layout opn-chrome min-h-screen bg-(--opn-paper)">
    <AppSidebar />
    <main class="min-h-screen sm:pl-58">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from "~/components/layouts/AppSidebar.vue"
</script>
