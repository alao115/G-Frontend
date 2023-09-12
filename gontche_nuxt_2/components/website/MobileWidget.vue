<template>
  <div class="contents">
    <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-2 text-lg px-10 block lg:hidden mt-8 h-12" href="#"  @click.prevent="isDismissed = false">
      <span class="icon"><i class="fas fa-search" /></span>
      <span class="ml-3 text-sm font-medium">Rechercher</span>
    </a>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="bg-white  rounded-t-xl p-8 w-full h-full bottom-0 relative flex space-between mt-8">
        <span class="icon absolute top-4 right-4 block" @click.prevent="isDismissed = true"><i class="far fa-times fa-2x"></i></span>
        <div class="container bg-white h-auto font-body mt-4 -mb-16 bg-opacity-90 block lg:hidden pb-4 pt-16">
          <h3 class="text-3xl mb-8">Que cherchez-vous ? </h3>
          <p class="mb-2 text-sm">
            <span class="icon mr-2">
              <i class="fas fa-tag" />
            </span>
            <label for="#">Type d'appart</label>
          </p>
          <select v-if="listOfTypes.length > 0" v-model="selectedType" class="w-full h-12 md:h-16 mb-4 pl-3 pr-6 text-base placeholder-gray-600 rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
            <option v-for="type in listOfTypes" :key="type.id" :value="type.id">
              {{ type.label + ' (' + typeAppartments(type.id).length + ')' }}
            </option>
          </select>
          <select v-else v-model="selectedType" class="w-full h-12 md:h-16 mb-4 pl-3 pr-6 text-base placeholder-gray-600 rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.label }}
            </option>
          </select>
          <div class="fkex flex-col">
            <div class="flex flex-col mb-8">
              <p class="mb-2 text-sm">
                <span class="icon mr-2">
                  <i class="fas fa-map-marker-alt" />
                </span>
                <label for="#">Zone</label>
              </p>
              <input v-model="location" type="text" class="text-sm w-full h-12 md:h-16 px-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Ville, Quartier">
            </div>
            <div class="flex flex-col">
              <p class="mb-2 text-sm">
                <span class="icon mr-2">
                  <i class="fas fa-home" />
                </span>
                <label class="mr-4" for="#">Chambres</label>
              </p>
              <div class="flex justify-between w-full">
                <input v-model.number="roomsQty" type="number" class="text-sm w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="0">
              </div>
            </div>
            <div class="mb-2">
              <p class=" text-sm">
                <span class="icon mr-2">
                  <i class="fas fa-money-bill-wave-alt" />
                </span>
                <label for="#">Budget</label>
              </p>
              <div class="flex space-x-2 mt-4">
                <div>
                  <label class=" py-4">
                    Entre
                  </label>
                  <input v-model.number="budgetMin" type="number" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                </div>
                <div>
                  <label class="py-4">
                    Et
                  </label>
                  <input v-model.number="budgetMax" type="number" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                </div>
              </div>
            </div>
            <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-2 text-lg px-10 block lg:hidden mt-8 h-12" href="#">
              <span class="icon"><i class="fas fa-search" /></span>
              <span class="ml-3 text-sm font-medium">Rechercher</span>
            </a>
          </div>
        </div>
      </div>
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

  data () {
    return {
      isDismissed: true,
      roomsQty: 1,
      budget: '',
      budgetMin: 0,
      budgetMax: 0,
      location: '',
      types: [
        /* { id: 0, label: 'Choisissez un type', descr: '' }, */
        { id: 1, label: 'Chambres', descr: '' },
        { id: 2, label: 'Maison', descr: '' },
        { id: 3, label: 'Appartements meublés', descr: '' }
      ],
      selectedType: 0
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

  .list-of-types button:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .list-of-types button:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
</style>
