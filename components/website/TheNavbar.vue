<template>
  <div class="flex w-full items-center flex-shrink-0 h-32 px-8 justify-between">
    <NuxtLink to="/" class="">
      <img src="/assets/images/dark_logo_lg.svg" alt="Logo Long Gontché" class="logo">
    </NuxtLink>
    <div class="space-x-4">
      <NuxtLink to="/signin" class="px-8 h-14 border border-blue-990 text-base font-medium rounded-md text-blue-990 hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
        Publier
      </NuxtLink>
      <NuxtLink to="/signin" class="shadow-btn-shadow px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-sky-550 md:py-4 md:text-lg md:px-10">
        Se connecter
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.logo {
  height: 32px;
}
</style>
