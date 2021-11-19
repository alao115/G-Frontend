<template>
  <div class="flex flex-col items-center h-full overflow-hidden text-gray-700 rounded border-r-2 border-gray-200 flex-none" :class="isMinified === true ? 'w-16' : 'w-64'">
    <div class="w-full px-2">
      <a class="flex items-center w-full h-16" href="#" @click.prevent="isMinified = !isMinified">
        <img src="/assets/images/logo.png" alt="" class="logo h-8">
        <span class="ml-2 text-sm font-bold" :class="isMinified === true ? 'hidden' : ''">Gontché</span>
      </a>
    </div>
    <div class="w-full px-2">
      <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
        <NewPublication v-if="routeName === 'dashboard-publications'" is-minisfied="isMinified" />
        <NewAppartment v-if="routeName === 'dashboard-appartements'" is-minisfied="isMinified" />
        <NewAppartmentType v-if="routeName === 'dashboard-types'" is-minisfied="isMinified" />
        <a v-if="routeName === 'dashboard-reservations'" class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg px-10" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. réservation</span>
        </a>
        <NuxtLink to="/dashboard" class="flex items-center relative w-full h-12 px-3 mt-2 rounded text-blue-730">
          <span class="icon w-6 block">
            <i class="far fa-tachometer-alt mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Dashboard</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full border-t border-gray-300">
        <NuxtLink to="/dashboard/publications" class="flex items-center relative w-full h-12 px-3 my-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
          <span class="icon w-6 block">
            <i class="far fa-bullhorn mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Publications</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/reservations" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-house-user mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réservations</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/visites" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-calendar-day mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Visites</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
        <NuxtLink to="/dashboard/appartements" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-house mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Appartements</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/types" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-tags mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Types d'appart</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
        <NuxtLink to="/dashboard/utilisateurs" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-users mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Utilisateurs</span>
        </NuxtLink>
        <a class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200" href="#">
          <span class="icon w-6 block">
            <i class="far fa-cog mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réglages</span>
        </a>
        <!-- <NuxtLink to="/clubs" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-file-signature mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Contrats</span>
        </NuxtLink> -->
      </div>
      <!-- <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
        <a class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200" href="#">
          <span class="icon w-6 block">
            <i class="far fa-cog mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réglages</span>
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false
    }
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    }
  }
}
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
