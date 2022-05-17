<template>
  <div class="contents">
    <div class="container max-w-5xl bg-white rounded-xl h-auto p-10 font-body shadow-btn-shadow mt-16 -mb-16 bg-opacity-90 ">
      <div class="md:hidden">
        <p class="mb-2 text-sm">
          <span class="icon mr-2">
            <i class="fas fa-tag" />
          </span>
          <label for="#">Type d'appart</label>
        </p>
        <select v-model="selectedType" class="w-full h-12 md:h-16 mb-4 pl-3 pr-6 text-base placeholder-gray-600 rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
          <!-- <option v-for="type in listOfTypes" :key="type.id" :value="type.id"> -->
          <option v-for="type in appartmentTypes" :key="type.id" :value="type.id">
            {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
          </option>
        </select>
      </div>
      <div v-if="listOfTypes.length > 0" class="w-min mb-8 rounded-md bg-blue-50 list-of-type hidden md:flex">
        <button
          v-for="type in listOfTypes"
          :key="type.id"
          class="flex whitespace-nowrap items-center justify-center py-4 px-8 text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="selectedType && (type.id === selectedType.id) ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <div v-else class="hidden md:flex w-min mb-8 rounded-md bg-blue-50 list-of-types">
        <button
          v-for="type in types"
          :key="type.id"
          class="flex whitespace-nowrap items-center justify-center py-4 px-8 text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
          :class="type.id === selectedType.id ? 'bg-sky-550 text-white' : ''"
          @click.prevent="selectedType = type"
        >
          {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
        </button>
      </div>
      <form action="#" class="form text-blue-990 md:border-2 border-gray-200 md:p-8 rounded-md divide-y space-y-8">
        <div class="flex md:justify-between items-center flex-col md:flex-row">
          <div class="w-full grid grid-cols-1 md:grid-cols-3 items-center md:justify-between lg:justify-start md:divide-x md:space-x-8">
            <div class="flex flex-col md:my-0">
              <div class="mb-2 md:mb-4 text-left">
                <span class="icon mr-4">
                  <i class="fas fa-map-marker-alt" />
                </span>
                <label for="#">Localisation</label>
              </div>
              <input v-model="search.location" ref="searchTextField" type="text" placeholder="Ex: Cotonou" class="placeholder-gray-400 focus:placeholder-blue-380 w-full md:w-48 h-12 md:h-12 md:px-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 relative">
              <!-- <select id="" v-model="search.location" name="location rounded-lg" class="w-full h-12 pl-3 pr-6 text-base placeholder-gray-600 rounded-lg appearance-none focus:shadow-outline">
                <option v-if="search.location === ''" value="">
                  Choisissez une localité
                </option>
                <option v-for="(location, count) in locations" :key="count" :value="location">
                  {{ location }}
                </option>
              </select> -->
            </div>
            <div class="md:p-2 flex-col my-4 md:my-0 hidden md:block">
              <div class="mb-2 md:mb-4 text-left">
                <span class="icon mr-4">
                  <i class="fas fa-home" />
                </span>
                <label class="mr-4" for="#">Nbre de Pièces min.</label>
              </div>
              <div class="relative flex justify-between items-center">
                <a class="border-2 border-blue-990 px-4 py-3 text-blue-990 rounded-md h-12" :class="search.roomQty > 1 ? 'hover:bg-blue-990 hover:text-white' : 'opacity-20 bg-gray-400'" @click.prevent=" search.roomQty > 1 ? search.roomQty-- : '' ">
                  <span class="icon">
                    <i class="far fa-minus fa-sm" />
                  </span>
                </a>
                <input v-model.number="search.roomQty" type="number" class="h-12 w-24 md:h-12 md:px-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative">
                <a class="border-2 border-blue-990 h-12 px-4 py-3 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white" @click.prevent="search.roomQty++">
                  <span class="icon">
                    <i class="far fa-plus fa-sm" />
                  </span>
                </a>
              </div>
            </div>
            <div class="flex items-center w-full">
              <!-- <Slider /> -->
              <!-- <div class="p-2 flex flex-col" @click.prevent="budgetDropdownOpened = !budgetDropdownOpened"> -->
              <div class="flex flex-col my-4 md=my-0">
                <div class="mb-4 text-left">
                  <span class="icon mr-4">
                    <i class="fas fa-money-bill-wave-alt" />
                  </span>
                  <label v-if="search.budget">
                    {{ search.budget }}
                  </label>
                  <label v-else>
                    Budget minimum
                  </label>
                </div>
                <div class="flex space-x-2">
                  <div>
                    <input v-model.number="search.budgetMin" type="number" class="placeholder-gray-400 focus:placeholder-blue-380 w-full md:w-48 h-12 md:h-12 md:px-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 relative" placeholder="Min">
                  </div>
                  <!-- <div>
                    <input v-model.number="search.budgetMax" type="number" class="w-24 h-12 md:h-12 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Max">
                  </div> -->
                </div>
              </div>
              <!-- <div v-if="budgetDropdownOpened === true" class="absolute max-w-xs flex flex-col w-full p-8 border border-black shadow-lg z-50 bg-white">
                <div class="flex justify-between">
                  <a href="#" @click.prevent="search.budgetMax = 0, search.budgetMin = 0">Vider les champs</a>
                  <span class="icon absolute top-4 right-4" @click.prevent="budgetDropdownOpened = false"><i class="far fa-times fa-lg"></i></span>
                </div>
                <div class="flex space-x-2 mt-4">
                  <div>
                    <label class=" py-4">
                      Entre
                    </label>
                    <input v-model.number="search.budgetMin" type="number" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  </div>
                  <div>
                    <label class="py-4">
                      Et
                    </label>
                    <input v-model.number="search.budgetMax" type="number" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  </div>
                </div>
                <a href="#" class="mt-4 relative shadow-btn-shadow w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 md:py-4 md:text-lg md:px-10" @click.prevent="budgetDropdownOpened = false">
                  Valider
                </a>
              </div> -->
            </div>
          </div>
          <div class="md:mt-10">
            <a class="btn shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-4 text-lg px-10 h-16" @click.prevent="searchResult">
              <span class="icon"><i class="fas fa-search fa-lg" /></span>
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartments: {
      type: Array,
      required: true,
      default: () => ([])
    },
    appartmentTypes: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },

  mounted () {
    const google = window.google
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631)
    )
    // const input = document.getElementById('searchTextField')
    const input = this.$refs.searchTextField
    console.log('input => ', input)
    console.log('dollar el ', this.$el)
    const options = {
      bounds: defaultBounds,
      types: ['establishment']
    }
    this.autocomplete = new google.maps.places.Autocomplete(
      input, options
    )
  },

  data () {
    return {
      mobileWidgetIsVisible: false,
      budgetDropdownOpened: false,
      search: {
        roomQty: 1,
        budget: '',
        budgetMin: 0,
        budgetMax: 0,
        location: ''
      },
      types: [
        /* { id: 0, label: 'Choisissez un type', descr: '' }, */
        { id: 1, label: 'Chambres', descr: '' },
        { id: 2, label: 'Maison', descr: '' },
        { id: 3, label: 'Appartements meublés', descr: '' }
      ],
      searchedLocation: '',
      // selectedType: 1,
      selectedType: 'Sélectionnez un type'
      // appartments: [],
      // appartmentTypes: []
      // publications: []
    }
  },
  // async fetch () {
  //   this.appartments = (await this.$api.appartmentService.getAllAppartmentFromREST()).data.appartments
  //   // console.log(this.appartments)
  //   this.appartmentTypes = (await this.$api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes
  //   // console.log(this.appartmentTypes)
  //   // this.publications = (await this.$api.publicationService.getAll()).data.publications
  // },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    // publication () {
    //   return id => this.publications.find(publication => publication.id === id)
    // },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    typeAppartments () {
      return id => this.appartments.filter(appartment => appartment.appartmentType === id)
    },
    locationAppartments () {
      return location => this.appartments.filter(appartment => appartment.location === location)
    },
    listOfTypes () {
      const returnedListOfTypes = []
      this.appartmentTypes.forEach((type) => {
        // console.log(this.typeAppartments(type.id))
        if (this.typeAppartments(type.id).length > 0) {
          returnedListOfTypes.push(type)
        }
      })
      return returnedListOfTypes
    },
    locations () {
      const locations = []
      this.appartments.forEach((appartment) => {
        // if (locations.includes(appartment.location) === -1) {
        if (this.locationAppartments(appartment.location).length >= 1) {
          locations.push(appartment.location)
          // console.log(locations)
        }
      })
      return locations
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
    },
    budgetMin (value) {
      if (value !== 0) {
        if (this.budgetMax !== 0) {
          this.budget = 'Entre ' + value + ' et ' + this.budgetMax
        } else {
          this.budget = 'Budget min ' + value
        }
      }
    },
    budgetMax (value) {
      if (value !== 0) {
        if (this.budgetMin !== 0) {
          this.budget = 'Entre ' + this.budgetMin + ' et ' + value
        } else {
          this.budget = 'Budget max ' + value
        }
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
    },
    searchResult () {
      this.$router.push({ path: '/search/', query: { location: this.search.location, roomQty: this.search.roomQty, budgetMin: this.search.budgetMin, budgetMax: this.search.budgetMax } })
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

  .list-of-types button:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .list-of-types button:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
</style>
