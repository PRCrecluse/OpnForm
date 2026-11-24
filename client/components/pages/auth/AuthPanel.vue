<template>
  <main class="flex grow bg-(--opn-paper) px-4 text-(--opn-ink) sm:px-6">
    <div class="mx-auto flex w-full max-w-5xl items-center justify-center border-x border-(--opn-line) px-4 py-10 sm:px-8 sm:py-16">
      <section class="w-full max-w-md rounded-lg border border-(--opn-line) bg-(--opn-surface)">
        <header class="border-b border-(--opn-line) px-5 py-6 sm:px-8 sm:py-8">
          <slot name="brand" />
          <h1 :data-testid="titleTestId" class="opn-heading text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] font-semibold text-(--opn-ink) [overflow-wrap:anywhere]">
            {{ title }}
          </h1>
          <p v-if="description" class="mt-3 text-sm leading-6 text-(--opn-muted)">
            {{ description }}
          </p>
        </header>
        <div class="auth-form p-5 sm:p-8">
          <slot />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  titleTestId: { type: String, default: undefined },
  description: { type: String, default: '' },
})
</script>

<style scoped>
.auth-form {
  --form-color: var(--opn-ink);
}
</style>
