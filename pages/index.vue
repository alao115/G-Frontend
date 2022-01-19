<template>
  <div id="landing-section" class="font-body bg-contain bg-center h-screen w-screen pt-32 overflow-x-hidden flex items-center">
    <div class="container w-full px-8 2xl:px-16 xl:px-24 flex flex-col justify-center mx-auto h-1/2" style="min-height: 516px">
      <!-- <div class="text-blue-990 xl:w-6/12 mb-16"> -->
      <div class="text-blue-990 mb-16">
        <h1 class="text-3xl lg:text-3xl xl:text-5xl font-bold">
          <span class=" leading-snug">Trouvez l'appartement <br> de vos rêves !</span>
        </h1>
        <WebsiteMainWidget />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

export default {
  layout: 'website',
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
