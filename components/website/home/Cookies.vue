<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden fixed rounded-md bottom-20 right-12 left-10 lg:left-auto lg:right-20 shadow-btn-shadow w-80 lg:w-1/4" style="" :class="isDismissed === true ? 'hidden' : ''">
    <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
      <h2 class="text-lg font-light text-black dark:text-white font-body">
        <span class="block">
          Cookies
        </span>
      </h2>
      <p class="text-base mt-4 text-gray-400">
        Nous utilisons des cookies pour améliorer votre expérience d'utilisateur sur gontche.com.
        En savoir plus sur notre politique en matière de cookies et comment refuser les cookies en cliquant ici.
      </p>
      <button type="button" class="py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true">
        Refuser
      </button>
      <button type="button" class="shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920">
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
export default defineComponent({
  data () {
    return {
      isDismissed: true
    }
  }
})
</script>
