<template>
  <div class="bg-blue-990 flex justify-evenly px-16 xl:px-24 h-48 items-center space-x-16 text-white font-body">
    <GontcheLogoWhite />
    <p class="w-4/12">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
      © 2021 Gontché
    </p>
    <a href="#">Nous contacter</a>
    <div class="flex space-x-3">
      <NuxtLink to="#">
        <span class="icon">
          <i class="la la-facebook-f text-2xl" />
        </span>
      </NuxtLink>
      <NuxtLink to="#">
        <span class="icon">
          <i class="la la-twitter text-3xl" />
        </span>
      </NuxtLink>
      <NuxtLink to="#">
        <span class="icon">
          <i class="la la-instagram text-3xl" />
        </span>
      </NuxtLink>
      <NuxtLink to="#">
        <span class="icon">
          <i class="la la-linkedin-square text-3xl" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
