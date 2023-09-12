<template>
  <div class="footer p-2 justify-center absolute w-full bg-white z-20 bottom-0 grid grid-cols-5 lg:hidden">
    <NuxtLink to="/dashboard" class="flex items-center justify-center relative w-full h-16 px-3 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
      <span class="icon w-6 block text-center">
        <i class="far fa-tachometer-alt mx-auto block" />
      </span>
    </NuxtLink>
    <NuxtLink to="/dashboard/appartements" class="flex items-center justify-center relative w-full h-16 px-3 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
      <span class="icon w-6 block text-center">
        <i class="far fa-house mx-auto block" />
      </span>
    </NuxtLink>
    <NuxtLink to="/dashboard/publications" class="flex items-center justify-center relative w-full h-16 px-3 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
      <span class="icon w-6 block text-center">
        <i class="far fa-bullhorn mx-auto block" />
      </span>
    </NuxtLink>
    <NuxtLink to="/dashboard/reservations" class="flex items-center justify-center relative w-full h-16 px-3 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
      <span class="icon w-6 block text-center">
        <i class="far fa-house-user mx-auto block" />
      </span>
    </NuxtLink>
    <NuxtLink to="/dashboard/visites" class="flex items-center justify-center relative w-full h-16 px-3 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
      <span class="icon w-6 block text-center">
        <i class="far fa-calendar-day mx-auto block" />
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default defineComponent({
  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      appartmentToVisit: {}
    }
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    }
  }
})
</script>

<style scoped>
.logo {
  height: 48px;
}
a.nuxt-link-exact-active.nuxt-link-active {
  background-color: #e8f9ff;
  color: #0e265b;
}
</style>
