// eslint-disable-next-line require-await
export default async ({ params, redirect, $api, store }) => {
  try {
    const { email } = params

    if (!email) { redirect({ name: 'auth-signin' }) }

    await $api.authService.sendVerificationEmail({ email })
    store.commit('customAuth/setOnSignin', false)
  } catch (error) {
    const message = error?.response?.data.error.message || error.message
    console.log(message)
    store.commit('customAuth/setOnSignin', false)
    store.commit('customAuth/setSigninError', message)
    redirect({ name: 'auth-signin' })
  }
}
