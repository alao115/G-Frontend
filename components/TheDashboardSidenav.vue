<template>
  <div class="flex flex-col items-center h-full overflow-hidden text-gray-700 rounded border-r-2 border-gray-200 flex-none" :class="isMinified === true ? 'w-16' : 'w-56'">
    <div class="w-full px-2">
      <a class="flex items-center w-full h-16" href="#" @click.prevent="isMinified = !isMinified">
        <img src="/assets/images/logo.png" alt="" class="logo">
        <span class="ml-2 text-sm font-bold" :class="isMinified === true ? 'hidden' : ''">Annuaire du DM</span>
      </a>
    </div>
    <div class="w-full px-2">
      <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
        <a class="flex items-center w-full h-12 px-3 my-2 text-white bg-blue-730 rounded" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Ajouter un membre</span>
        </a>
      </div>
      <div class="flex flex-col items-center w-full border-t border-gray-300">
        <NuxtLink to="/directory" class="flex items-center w-full h-12 px-3 my-2 rounded text-blue-730 bg-blue-75">
          <span class="icon w-6 block">
            <i class="far fa-book-open mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Annuaire</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full border-t border-gray-300">
        <NuxtLink to="/districts" class="flex items-center w-full h-12 px-3 my-2 rounded hover:bg-gray-200">
          <span class="icon w-6 block">
            <i class="far fa-square mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Districts</span>
        </NuxtLink>
        <NuxtLink to="/countries" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200">
          <span class="icon w-6 block">
            <i class="far fa-flag mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Pays</span>
        </NuxtLink>
        <NuxtLink to="/regions" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200">
          <span class="icon w-6 block">
            <i class="far fa-th-large mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Régions</span>
        </NuxtLink>
        <NuxtLink to="/zones" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200">
          <span class="icon w-6 block">
            <i class="far fa-th mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Zones</span>
        </NuxtLink>
        <NuxtLink to="/clubs" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200">
          <span class="icon w-6 block">
            <i class="far fa-users mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Clubs</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200" href="#">
          <span class="icon w-6 block">
            <i class="far fa-cog mx-auto block" />
          </span>
          <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réglages</span>
        </a>
      </div>
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
  }
}
</script>

<style scoped>
.logo {
  height: 48px;
}
</style>
