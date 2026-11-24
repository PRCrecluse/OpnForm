<template>
  <div class="flex grow flex-col">
    <AuthPanel :title="`Log in to ${workspaceName}`" title-test-id="login-page">
      <LoginForm />
    </AuthPanel>
    <OpenFormFooter :show-cta="false" />
  </div>
</template>

<script setup>
import AuthPanel from "~/components/pages/auth/AuthPanel.vue"
import LoginForm from "~/components/pages/auth/components/LoginForm.vue"

definePageMeta({
  middleware: "guest",
})

const { name: instanceName } = useSelfHostedPresentation()
const workspaceName = computed(() => useFeatureFlag('self_hosted') ? instanceName : 'OpnForm')

useOpnSeoMeta({
  title: "Login",
})
</script>
