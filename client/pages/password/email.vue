<template>
  <div class="flex grow flex-col">
    <AuthPanel
      title="Reset password"
      description="Enter the email address associated with your account."
    >
      <form
        @submit.prevent="send"
      >
        <UAlert
          v-if="status"
          color="success"
          variant="subtle"
          :description="status"
          icon="i-heroicons-check-circle"
          class="mb-4"
        />

        <!-- Email -->
        <text-input
          name="email"
          :form="form"
          label="Email"
          :required="true"
        />

        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :loading="form.busy"
          type="submit"
          label="Send Password Reset Link"
        />
      </form>
      <NuxtLink
        :to="{ name: 'login' }"
        class="mt-5 inline-flex items-center gap-2 text-sm text-(--opn-muted) hover:text-(--opn-ink) hover:underline"
      >
        <UIcon name="i-heroicons-arrow-left" class="size-4" />
        Back to log in
      </NuxtLink>
    </AuthPanel>
    <OpenFormFooter :show-cta="false" />
  </div>
</template>

<script>
import AuthPanel from "~/components/pages/auth/AuthPanel.vue"

export default {
  components: { AuthPanel },
  setup() {
    definePageMeta({
      middleware: "guest",
    })
    useOpnSeoMeta({
      title: "Reset Password",
    })
  },

  data: () => ({
    status: "",
    form: useForm({
      email: "",
    }),
  }),

  methods: {
    async send() {
      const { status } = await this.form.post("/password/email")

      this.status = status

      this.form.reset()
    },
  },
}
</script>
