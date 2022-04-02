export default async ({ $api, route, redirect, store }) => {
  try {
    if (!route.query.token) {
      redirect({ name: 'auth-signin' })
    }
    const { data } = await $api.authService.passwordResetTokenVerification({ 'password-recovery-token': route.query.token })
    // console.log(data.data.user)
    store.commit('customAuth/setPasswordEmailVerificationResponse', data.data.user)

    if (!data.success) { redirect({ name: 'auth-signin' }) }
  } catch (error) {
    redirect({ name: 'auth-signin' })
  }
}
