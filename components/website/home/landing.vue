<template>
  <div id="landing-section" class="font-body bg-contain bg-center h-screen w-screen pt-32 overflow-x-hidden flex items-center">
    <div class="container w-full 2xl:px-16 xl:px-24 flex flex-col justify-center mx-auto h-1/2" style="min-height: 516px">
      <div class="text-blue-920 w-full mb-16">
        <h1 class="text-2xl lg:text-3xl xl:text-5xl font-semibold">
          <span v-if="noWidget" class=" leading-snug">Créez une publication <br> et partagez-la !</span>
          <span v-else class=" leading-snug">Trouvez l'appartement <br> de vos rêves !</span>
        </h1>
        <p class="text-lg lg:text-xl xl:text-2xl mt-6 xl:w-7/12 mb-12">
          <span v-if="noWidget">Trouver un locataire le plus simplement possible</span>
          <!-- <span v-else>Trouver un logement le plus simplement possible</span> -->
        </p>
        <NuxtLink v-if="noWidget" to="/auth/signin" class="btn shadow-btn-shadow w-max border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-4 text-lg px-10">
          Je crée une publication
        </NuxtLink>
        <WebsiteMainWidget v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    noWidget: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
  #landing-section {
    background-image: url('/assets/images/landing.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
