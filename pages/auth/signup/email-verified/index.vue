<template>
  <div>
    <div class="container flex-col bg-white w-full lg:w-5/12 xl:w-4/12 flex justify-center item-center p-12 mx-auto" style="min-height: 516px">
      <div class="w-full">
        <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
        <p class="text-sm my-12 text-blue-920">
          Votre compte a été activé avec succès.
        </p>
        <NuxtLink to="/auth/signin" class="w-1/2 py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920 shadow-btn-shadow border border-transparent">
          Se connecter
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'signup',
  middleware: async ({ $api, route, redirect }) => {
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

}
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
