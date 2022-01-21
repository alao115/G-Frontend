<template>
  <div class="contents">
    <div class="container bg-white rounded-xl h-auto p-10 font-body shadow-btn-shadow mt-16 -mb-16 bg-opacity-90 hidden lg:block">
      <div v-if="listOfTypes.length > 0" class="flex w-min mb-8 rounded-md bg-blue-50">
        <button
          v-for="type in listOfTypes"
          :key="type.id"
          class="flex whitespace-nowrap items-center justify-center py-4 px-8 rounded-md text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="type.id === selectedType.id ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <div v-else class="flex w-min mb-8 rounded-md bg-blue-50">
        <button
          v-for="type in types"
          :key="type.id"
          class="flex whitespace-nowrap items-center justify-center py-4 px-8 rounded-md text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="type.id === selectedType.id ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <form action="#" class="form text-blue-990 border-2 border-gray-200 p-8 rounded-md">
        <div class="flex justify-evenly">
          <div class="p-2 flex items-center">
            <span class="icon -ml-4">
              <i class="fas fa-map-marker-alt" />
            </span>
            <label for="#">Localisation</label>
          </div>
          <hr class="divider-v bg-gray-200 w-0.5 h-16">
          <div class="p-2 flex items-center">
            <span class="icon mr-4">
              <i class="fas fa-home" />
            </span>
            <label class="mr-4" for="#">Nombre de chambres</label>
            <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md" :class="roomsQty > 1 ? 'hover:bg-blue-990 hover:text-white' : 'opacity-20 bg-gray-400'" @click.prevent=" roomsQty > 1 ? roomsQty-- : '' ">
              <span class="icon">
                <i class="far fa-minus fa-sm" />
              </span>
            </a>
            <label class="mr-4" for="#">{{ roomsQty }}</label>
            <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white" @click.prevent="roomsQty++">
              <span class="icon">
                <i class="far fa-plus fa-sm" />
              </span>
            </a>
          </div>
          <hr class="divider-v bg-gray-200 w-0.5 h-16">
          <div class="p-2 flex items-center">
            <span class="icon mr-4">
              <i class="fas fa-money-bill-wave-alt" />
            </span>
            <label for="#">Votre budget</label>
          </div>
          <NuxtLink to="#" class="btn shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-4 text-lg px-10 h-16">
            <span>Rechercher</span>
          </NuxtLink>
        </div>
      </form>
    </div>
    <!-- <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg px-10 block lg:hidden mt-8" href="#" @click.prevent="mobileWidgetIsVisible = true">
      <span class="icon"><i class="fas fa-search" /></span>
      <span class="ml-3 text-sm font-medium">Rechercher</span>
    </a> -->
    <!-- <div class="to-animate mobile-widget flex items-end justify-center bg-black bg-opacity-75 w-screen absolute top-0 left-0 z-50" :class="mobileWidgetIsVisible === true ? 'h-screen fixed' : 'h-0'">
      <div class="to-animate flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow justify-between relative w-full" :class="mobileWidgetIsVisible === true ? 'h-screen' : 'h-0'">
        <div class="text-start w-full h-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center">
            <button class="hover:text-blue-730 p-4 relative" @click.prevent="mobileWidgetIsVisible = false">
              <span class="icon"><i class="fas fa-chevron-left" /></span>
            </button>
          </div>
          <div class="fkex flex-col divide-y">
            <h4 class="text-4xl font-medium text-blue-990">
              Trouver mon appartement
            </h4>
            <div class="p-2 flex flex-col space-y-4 mb-4">
              <p class="">
                <span class="icon mr-4">
                  <i class="fas fa-map-marker-alt" />
                </span>
                <label for="#">Localisation</label>
              </p>
              <input v-model="location" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Long, Lat.">
            </div>
            <div class="p-2 flex flex-col space-y-4 mb-4">
              <p class="">
                <span class="icon mr-4">
                  <i class="fas fa-home" />
                </span>
                <label class="mr-4" for="#">Nombre de chambres</label>
              </p>
              <div class="mt-1 flex justify-between">
                <a class="border-2 border-blue-990 p-3 md:p-4 mr-2 text-blue-990 rounded-md h-12 md:h-16 w-12 md:w-16 text-center" :class="roomsQty > 1 ? 'hover:bg-blue-990 hover:text-white' : 'opacity-20 bg-gray-400'" @click.prevent=" roomsQty > 1 ? roomsQty-- : '' ">
                  <span class="icon">
                    <i class="fas fa-minus fa-sm" />
                  </span>
                </a>
                <input v-model.number="roomsQty" type="number" class="w-auto h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <a class="border-2 border-blue-990 p-3 md:p-4 ml-2 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white h-12 md:h-16 w-12 md:w-16 text-center" @click.prevent="roomsQty++">
                  <span class="icon">
                    <i class="fas fa-plus fa-sm" />
                  </span>
                </a>
              </div>
            </div>
            <div class="p-2 flex flex-col space-y-4">
              <div>
                <span class="icon mr-4">
                  <i class="fas fa-money-bill-wave-alt" />
                </span>
                <label for="#">Votre budget</label>
              </div>
              <input v-model.number="budget" type="number" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
          </div>
        </div>
        <div class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-full shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920">
            <span>Trouver</span>
          </button>
        </div>
      </div>
    </div> -->
    <div class="container bg-white rounded-xl h-auto font-body shadow-btn-shadow mt-4 -mb-16 bg-opacity-90 block lg:hidden pb-4">
      <div v-if="listOfTypes.length > 0" class="flex w-full mb-4 rounded-md bg-blue-50">
        <button
          v-for="type in listOfTypes"
          :key="type.id"
          class="flex w-1/2 whitespace-nowrap items-center justify-center py-4 px-8 rounded-md rounded-b-none text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="type.id === selectedType.id ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <div v-else class="flex w-min mb-8 rounded-md bg-blue-50">
        <button
          v-for="type in types"
          :key="type.id"
          class="flex w-1/2 whitespace-nowrap items-center justify-center py-4 px-8 rounded-md rounded-b-none text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="type.id === selectedType.id ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <div class="fkex flex-col px-4">
        <div class="flex flex-col mb-8">
          <p class="mb-2 text-sm">
            <span class="icon mr-2">
              <i class="fas fa-map-marker-alt" />
            </span>
            <label for="#">Zone</label>
          </p>
          <input v-model="location" type="text" class="text-sm w-full h-12 md:h-16 px-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Ville, Quartier">
        </div>
        <div class="grid grid-cols-2 space-x-4">
          <div class="flex flex-col">
            <p class="mb-2 text-sm">
              <span class="icon mr-2">
                <i class="fas fa-home" />
              </span>
              <label class="mr-4" for="#">Chambres</label>
            </p>
            <div class="flex justify-between w-full">
              <!-- <a class="border-2 border-blue-990 p-3 md:p-4 ml-2 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white h-12 md:h-16 w-12 md:w-16 text-center" :class="roomsQty > 1 ? 'hover:bg-blue-990 hover:text-white' : 'opacity-20 bg-gray-400'" @click.prevent=" roomsQty > 1 ? roomsQty-- : '' ">
                <span class="icon">
                  <i class="fas fa-minus fa-sm" />
                </span>
              </a> -->
              <input v-model.number="roomsQty" type="number" class="text-sm w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="0">
              <!-- <a class="border-2 border-blue-990 p-3 md:p-4 ml-2 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white h-12 md:h-16 w-12 md:w-16 text-center" @click.prevent="roomsQty++">
                <span class="icon">
                  <i class="fas fa-plus fa-sm" />
                </span>
              </a> -->
            </div>
          </div>
          <div class="flex flex-col">
            <p class="mb-2 text-sm">
              <span class="icon mr-2">
                <i class="fas fa-money-bill-wave-alt" />
              </span>
              <label for="#">Budget</label>
            </p>
            <input v-model.number="budget" type="number" class="text-sm w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="0">
          </div>
        </div>
        <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-2 text-lg px-10 block lg:hidden mt-8 h-12" href="#">
          <span class="icon"><i class="fas fa-search" /></span>
          <span class="ml-3 text-sm font-medium">Rechercher</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roomsQty: 1,
      mobileWidgetIsVisible: false,
      budget: 0,
      location: '',
      types: [
        { id: 1, label: 'Chambres', descr: '' },
        { id: 2, label: 'Maison', descr: '' },
        { id: 3, label: 'Appartements meublés', descr: '' }
      ],
      // selectedType: 1,
      selectedType: '',
      appartments: [],
      appartmentTypes: [],
      publications: []
    }
  },
  async fetch () {
    this.appartments = (await this.$api.appartmentService.getAll()).data.appartments
    this.appartmentTypes = (await this.$api.appartmentTypeService.getAll()).data.appartmentTypes
    this.publications = (await this.$api.publicationService.getAll()).data.publications
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    typeAppartments () {
      return id => this.appartments.filter(appartment => appartment.appartmentType === id)
    },
    listOfTypes () {
      const returnedListOfTypes = []
      this.appartmentTypes.forEach((type) => {
        if (this.typeAppartments(type.id).length > 0) {
          returnedListOfTypes.push(type)
        }
      })
      return returnedListOfTypes
    }
  },
  watch: {
    isDismissed (value) {
      // console.log(value)
    },
    listOfTypes (value) {
      if (value.length > 0) {
        this.selectedType = this.listOfTypes[0]
      } else {
        this.selectedType = this.types[0]
      }
    }
    /* selectedType (value) {
      if (value !== '') {
        this.appartments = this.appartments.filter(appart => appart.appartmentType === value.id)
      }
    } */
  },
  methods: {
    selectType (type) {
      this.selectedType = type.id
    }
  }
}
</script>

<style scoped>
  .to-animate {
    transition: all .5s;
  }
  .to-animate.mobile-widget {
    transition: all .5s;
  }
</style>
