<template>
  <div class="relative container flex-col bg-white border-t-8 border-blue-730 flex justify-center item-center pb-12 px-20" style="min-height: 516px">
    <div class="absolute h-1 border-t-8 border-sky-450 w-1/3 -mt-2 -ml-20 top-0" />
    <div class="w-full">
      <p class="title font-semibold text-3xl mt-24 mb-6 text-sky-450">
        Inscription
      </p>
      <form action="#" class="pt-4">
        <input type="email" class="h-20 mx-auto px-8 mt-1 mb-12 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
        <div class="flex space-x-8">
          <div class="rounded-md shadow w-2/5 mb-8 mx-auto">
            <NuxtLink to="/" class="shadow-sm w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-sky-550 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
              annuler
            </NuxtLink>
          </div>
          <div class="rounded-md shadow w-3/5 mb-8 mx-auto">
            <NuxtLink to="/signup_name" class="shadow-btn-shadow w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-sky-550 md:py-4 md:text-lg md:px-10">
              continuer
            </NuxtLink>
          </div>
        </div>
      </form>
      <p class="text-sm my-12 text-blue-920">
        Vous avez pas déjà un compte ?
        <NuxtLink to="/signin" class="text-blue-300 hover:text-blue-920 font-semibold">
          Connectez-vous !
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toSecond: {
      type: Boolean,
      default: false
    }
  }
}
</script>
