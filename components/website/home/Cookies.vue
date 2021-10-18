<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden absolute rounded-md bottom-20 right-20 shadow-btn-shadow" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
    <div class="text-start w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 relative">
      <h2 class="text-2xl font-light text-black dark:text-white font-base">
        <span class="block">
          Cookies
        </span>
      </h2>
      <p class="text-xl mt-4 text-gray-400">
        Nous utilisons des cookies pour améliorer votre expérience d'utilisateur sur gontche.com.
        En savoir plus sur notre politique en matière de cookies et comment refuser les cookies en cliquant ici.
      </p>
      <button type="button" class="py-4 text-lg px-10 leading-none rounded font-medium mt-8 bg-sky-50 text-sm text-sky-450">
        J'accepte
      </button>
      <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDismissed: false
    }
  }
}
</script>
