export default async ({ $api, route, redirect }) => {
  try {
    if (!route.query.token) {
      redirect({ name: 'auth-signin' })
    }
    const { data } = await $api.authService.verifyEmail({ 'email-token': route.query.token })

    if (!data.data.emailVerified) { redirect({ name: 'auth-signin' }) }
  } catch (error) {
    redirect({ name: 'auth-signin' })
  }
}
