<template>
  <div>
    <div class="container flex-col bg-white w-full lg:w-5/12 xl:w-4/12 flex justify-center item-center p-12 mx-auto" style="min-height: 516px">
      <div class="w-full">
        <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
        <p class="text-sm my-12 text-blue-920">
          Votre compte n'est pas activé. Veuillez vérifier votre compte et cliquez sur le lien pour activer votre compte.
        </p>
        <NuxtLink to="/auth/signin" class="w-1/2 py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920 shadow-btn-shadow border border-transparent">
          Se connecter
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  layout: 'signup',
  middleware: async ({ params, redirect, $api, store }) => {
    try {
      const { email } = params

      console.log('Email: ', email)

      if (!email) { redirect({ name: 'auth-signin' }) }

      await $api.authService.sendVerificationEmail({ email })
      store.commit('customAuth/setOnSignin', false)
    } catch (error) {
      const message = error?.response?.data.error.message || error.message
      // console.log(message)
      store.commit('customAuth/setOnSignin', false)
      store.commit('customAuth/setSigninError', message)
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
  .success-img {
    height: 354px;
  }
</style>
