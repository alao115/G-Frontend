// eslint-disable-next-line require-await
export default async ({ params, redirect, $api }) => {
  try {
    const { email } = params
    if (!email) { redirect({ name: 'auth-signin' }) }
    await $api.authService.sendVerificationEmail({ email })
  } catch (error) {
    redirect({ name: 'auth-signin' })
  }
}
