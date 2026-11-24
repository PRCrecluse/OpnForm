<template>
  <div class="flex grow flex-col">
    <AuthPanel title="Create your account" title-test-id="register-page">
      <AppSumoRegister v-if="showAppSumoPanel" class="mb-6" />
      <UAlert
        v-if="isInvited"
        color="success"
        variant="subtle"
        icon="i-heroicons-envelope-open"
        title="Workspace invitation"
        description="Finish registration to accept your invite and join the shared workspace."
        class="mb-6"
      />

      <RegisterForm v-if="!useFeatureFlag('self_hosted') || isInvited" />
      <UAlert
        v-else
        color="warning"
        variant="subtle"
        icon="i-heroicons-information-circle"
        description="Registration is not allowed in self host mode."
      />
    </AuthPanel>
    <OpenFormFooter :show-cta="false" />
  </div>
</template>

<script setup>
import AuthPanel from "~/components/pages/auth/AuthPanel.vue"
import RegisterForm from "~/components/pages/auth/components/RegisterForm.vue"
import AppSumoRegister from "~/components/vendor/appsumo/AppSumoRegister.vue"

definePageMeta({
  middleware: ["self-hosted", "guest"],
})

defineRouteRules({
  swr: 3600,
})

useOpnSeoMeta({
  title: "Register",
})

const route = useRoute()

const isInvited = computed(() => {
  return route.query?.email && route.query?.invite_token
})

const showAppSumoPanel = computed(() => {
  return Boolean(route.query.appsumo_license || route.query.appsumo_error)
})
</script>
