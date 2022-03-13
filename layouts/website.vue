<template>
  <div class="w-screen overflow-x-hidden">
    <WebsiteTheNavbar />
    <Nuxt />
    <WebsiteHomeAdvantages />
    <WebsitePublications :in-home-page="false" :in-index="true" />
    <WebsiteContactSection />
    <WebsiteHomeCookies />
    <WebsiteTheFooter />
  </div>
</template>

<script>
export default {}
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
