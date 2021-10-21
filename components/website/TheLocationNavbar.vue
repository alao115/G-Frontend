<template>
  <div id="navbar" class="font-body flex w-full items-center flex-shrink-0 px-16 xl:px-36 justify-between fixed bg-white" :class="isMinified === true ? 'h-20' : 'h-32'">
    <NuxtLink to="/location" class="">
      <img src="/assets/images/dark_logo_lg.svg" alt="Logo Long Gontché" class="logo">
    </NuxtLink>
    <div class="space-x-4">
      <NuxtLink to="/" class="text-blue-990 text-lg">
        Je cherche
      </NuxtLink>
      <NuxtLink to="/location" class="text-blue-990 text-lg">
        Je loue
      </NuxtLink>
      <NuxtLink to="#" class="text-blue-990 text-lg">
        Nous contacter
      </NuxtLink>
      <NuxtLink to="/signin" class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg px-10'">
        Publier
      </NuxtLink>
      <NuxtLink to="/signin" class="btn shadow-btn-shadow w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg px-10'">
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
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      // console.log(window.scrollY)
      if (window.scrollY > 100) {
        this.isMinified = true
      } else {
        this.isMinified = false
      }
    }
  }
}
</script>

<style>
#navbar {
  transition: all .5s;
}
#navbar a.btn {
  transition: all .5s;
}
.logo {
  height: 28px;
}

a.text-lg.nuxt-link-exact-active.nuxt-link-active {
  border-bottom: 2px solid #0e265b;
}
</style>
