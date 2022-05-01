<template>
  <div id="landing-section" class="font-body bg-contain bg-center min-h-screen w-screen py-32 overflow-x-hidden flex items-center">
    <div class="container w-full px-8 2xl:px-16 xl:px-24 flex flex-col mx-auto pt-16 md:pt-0" style="min-height: 516px">
      <!-- <div class="text-blue-990 xl:w-6/12 mb-16"> -->
      <div class="text-blue-920 md:mb-16">
        <h1 class="text-2xl lg:text-3xl xl:text-5xl font-bold">
          <span class=" leading-snug">Trouvez l'appartement <br> de vos rêves !</span>
        </h1>
        <WebsiteMainWidget :appartments="appartments" :appartment-types="appartmentTypes" />
        <!-- <WebsiteMobileWidget :appartments="appartments" :appartment-types="appartmentTypes" /> -->
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

export default {
  layout: 'website',
  async asyncData ({ $api, store, $auth }) {
    // console.log('Auth: ', $auth.loggedIn)
    if ($auth.loggedIn) { await store.dispatch('account/getAuthUserAccount') }

    const appartments = (await $api.appartmentService.getAllAppartmentFromREST()).data.appartments
    const appartmentTypes = (await $api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes

    return {
      appartments,
      appartmentTypes
    }
  },
  created () {}
}
</script>

<style scoped>
  #landing-section {
    background-image: url('/assets/images/landing.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
