<template>
  <div>
    <NewpasswordPassword />
  </div>
</template>

<script>
export default defineComponent({
  layout: 'signup',
  middleware: async ({ $api, route, redirect, store }) => {
    try {
      if (!route.query.token) {
        redirect({ name: 'auth-signin' })
      }
      const { data } = await $api.authService.passwordResetTokenVerification({ 'password-recovery-token': route.query.token })
      store.commit('customAuth/setPasswordEmailVerificationResponse', data.data.user)

      if (!data.success) { redirect({ name: 'auth-signin' }) }
    } catch (error) {
      redirect({ name: 'auth-signin' })
    }
  }
})
</script>

<style scoped>
  .cover{
    position: absolute;
    width: 100%; height: 100%;
    opacity: .1; z-index: 0;
    background-image: url('/assets/images/bg-motif.svg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .container {
    z-index: 1;
  }
</style>
