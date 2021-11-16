<template>
  <div class="contents">
    <button class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 py-4 text-lg px-10" @click.prevent="isDismissed = false">
      Visiter
    </button>
    <div class="bg-black bg-opacity-90 w-screen h-screen fixed top-0 left-0 flex items-center py-8" :class="isDismissed === true ? 'hidden' : ''">
      <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow mx-auto h-full" style="width: 584px">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <h4 class="text-2xl font-medium mb-8 text-blue-990">
            Demande de visite
          </h4>
          <div class="p-8 bg-sky-50 flex justify-between">
            <div>
              <h4 class="text-xl font-medium mb-2">
                {{ appartment.type }}
              </h4>
              <div class="flex items-center">
                <span class="icon mr-4 text-sky-450">
                  <i class="fas fa-map-marker-alt" />
                </span>
                <label for="#" class="text-md">{{ appartment.location }}</label>
              </div>
            </div>
            <h3 class="block text-xl font-medium mt-4 text-sky-450">
              <span>{{ appartment.rent }} F CFA <sup class="text-sm relative -top-6">TTC</sup></span>
            </h3>
          </div>
          <form action="#" class="pt-4 grid grid-cols-1 divide-y divide-gray-300">
            <div class="">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Nom">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Prénom(s)">
            </div>
            <div class="">
              <input type="text" class="mt-4 h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Téléphone">
              <input type="email" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
            </div>
            <div class="">
              <input type="text" class="mt-4 h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Horaire">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Prénom(s)">
            </div>
          </form>
          <div class="mx-auto w-auto">
            <button type="button" class="py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true">
              Annuler
            </button>
            <button type="button" class="shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920">
              Envoyer
            </button>
          </div>
          <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartment: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isDismissed: true
    }
  },
  watch: {
    isDismissed (value) {
      console.log(value)
    }
  },
  created () {
    console.log(this.isDismissed)
  }
}
</script>
