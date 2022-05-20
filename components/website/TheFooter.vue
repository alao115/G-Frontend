<template>
  <div class="bg-blue-990 flex justify-evenly px-8 lg:px-16 xl:px-24 h-24 lg:h-48 items-center lg:space-x-16 text-white font-body text-sm flex-col lg:flex-row">
    <GontcheLogoWhite class="hidden lg:block" />
    <p class="w-full lg:w-4/12 hidden lg:block">
      Site exploité par Gankeke SARL
    </p>
    <p>
      © 2021 Gontché
    </p>
    <NuxtLink class="hidden lg:block" to="/cgu">CGU</NuxtLink>
    <div class="hidden lg:flex space-x-3">
      <a href="https://facebook.com/GontcheBj/" tagrt="_blank">
        <span class="icon">
          <i class="la la-facebook-f text-xl" />
        </span>
      </a>
      <a href="https://twitter.com/gontche/" tagrt="_blank">
        <span class="icon">
          <i class="la la-twitter text-2xl" />
        </span>
      </a>
      <a href="https://instagram.com/gontche_bj" tagrt="_blank">
        <span class="icon">
          <i class="la la-instagram text-2xl" />
        </span>
      </a>
      <a href="#">
        <span class="icon">
          <i class="la la-linkedin-square text-2xl" />
        </span>
      </a>
    </div>
  </div>
</template>

<style>
.logo {
  height: 28px;
}
</style>
