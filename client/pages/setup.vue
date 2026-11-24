<template>
  <AuthPanel
    class="opn-chrome min-h-screen"
    title="Create your admin account"
    description="Set up your OpnForm instance to start building forms."
  >
    <template #brand>
      <div class="mb-5 flex items-center gap-2.5 text-sm font-semibold text-(--opn-ink)">
        <img
          :src="logoUrl"
          alt=""
          class="size-6 shrink-0 object-contain"
          :class="{ 'brightness-0 dark:invert': logoUrl === '/img/logo.svg' }"
        >
        <span class="min-w-0 wrap-anywhere">{{ instanceName }}</span>
      </div>
    </template>

    <RegisterForm
      :is-quick="false"
      :is-setup="true"
      @registered="handleSetupComplete"
    />
  </AuthPanel>
</template>

<script setup>
import AuthPanel from "~/components/pages/auth/AuthPanel.vue"
import RegisterForm from '~/components/pages/auth/components/RegisterForm.vue'

const { invalidateFlags } = useFeatureFlags()
const router = useRouter()
const { name: instanceName, logoUrl } = useSelfHostedPresentation()

// Check if setup is required
const setupRequired = useFeatureFlag('setup_required', false)
const selfHosted = useFeatureFlag('self_hosted', false)

// Show 404 if setup not required or not self-hosted
if (!setupRequired || !selfHosted) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

// SEO
useOpnSeoMeta({
  title: "Setup - OpnForm",
  description: "Set up your OpnForm instance",
  robots: "noindex, nofollow"
})

definePageMeta({
  layout: 'empty'
})

// Handle successful setup completion
const handleSetupComplete = async () => {
  // Invalidate feature flags to update setup_required status
  await invalidateFlags()
  
  // Show success message
  useAlert().success({
    title: "Setup Complete! 🎉",
    description: "Your OpnForm instance is ready. Time to create your first form!"
  })
  
  // Redirect to dashboard
  router.push({ name: "home" })
}
</script>
