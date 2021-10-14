<template>
  <div id="navbar" class="font-body flex w-full items-center flex-shrink-0 h-32 px-16 xl:px-36 justify-between fixed" :class="isMinified === true ? 'bg-blue-990' : 'bg-white'">
    <NuxtLink to="/" class="">
      <img src="/assets/images/dark_logo_lg.svg" alt="Logo Long Gontché" class="logo">
    </NuxtLink>
    <div class="space-x-4">
      <NuxtLink to="/signin" class="xl:px-6 xl:py-3 border border-blue-990 text-base font-medium rounded-md text-blue-990 hover:bg-gray-100  xl:text-base">
        Publier
      </NuxtLink>
      <NuxtLink to="/signin" class="shadow-btn-shadow xl:px-6 xl:py-3 border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-white xl:text-base">
        Se connecter
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMinified: false
    }
  },
  mounted () {
    const navbar = document.getElementById('navbar')
    const scrollpos = window.scrollY
    window.addEventListener('scroll', function () {
      if (scrollpos > 50) {
        navbar.classList.add('fade-in')
        this.isMinified = true
      } else {
        navbar.classList.remove('fade-in')
        this.isMinified = false
      }
    })
  }
}
</script>

<style>
.logo {
  height: 28px;
}
</style>
