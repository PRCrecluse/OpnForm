<template>
  <div class="flex grow flex-col">
    <AuthPanel
      title="Choose a new password"
      description="Update the password for your OpnForm account."
    >
      <form
        @submit.prevent="reset"
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

        <!-- Password -->
        <text-input
          native-type="password"
          name="password"
          :form="form"
          label="Password"
          :required="true"
        />

        <!-- Password Confirmation-->
        <text-input
          native-type="password"
          class="mb-5"
          name="password_confirmation"
          :form="form"
          label="Confirm Password"
          :required="true"
        />

        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :loading="form.busy"
          type="submit"
          label="Reset Password"
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
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    }),
  }),

  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset() {
      
      const data  = await this.form.post("/password/reset")
      this.status = data.status

      this.form.reset()
    },
  },
}
</script>
