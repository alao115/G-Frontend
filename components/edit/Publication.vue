<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-full lg:h-5/6" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Modifier la publication
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p v-if="currentStep !== 'congrats'" class="text-lg mt-4 text-gray-600">
            Veuillez remplir ce formulaire pour créer une nouvelle publication
          </p>
          <div v-if="currentStep === 'first'" class="first">
            <div class="relative">
              <p class="text-base mt-8 text-gray-400">
                Type
              </p>
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0">
                <p v-if="publicationToEdit.appartment" class="leading-none text-left flex flex-col">
                  {{ publicationToEdit.appartment && publicationToEdit.appartment.appartmentType ? appartmentType(publicationToEdit.appartment.appartmentType).label : '' }}
                  <span class="text-sm mt-1 text-gray-400">{{ publicationToEdit.appartment && publicationToEdit.appartment.appartmentType ? appartmentType(publicationToEdit.appartment.appartmentType).description : '' }}</span>
                </p>
              </button>
            </div>
            <p class="text-base mt-4 text-gray-400">
              Appartement
            </p>
            <div class="relative inline-block w-full text-gray-700">
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0">
                <p v-if="publicationToEdit.appartment" class="leading-none text-left flex flex-col">
                  {{ publicationToEdit.appartment && publicationToEdit.appartment.appartmentType ? appartmentType(publicationToEdit.appartment.appartmentType).label : '' }}
                  <span class="text-sm mt-1 text-gray-400">{{ publicationToEdit.appartment.bedrooms + ' Chambres - ' + publicationToEdit.appartment.livingrooms + ' Salons' }}</span>
                </p>
              </button>
              <!-- <select v-model="publicationToEdit.appartment" class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                <option v-for="appart in appartments" :key="appart.id" :value="appart.id">
                  <span>{{ appartmentType(appart.appartmentType) && appartmentType(appart.appartmentType).label }}</span>
                  <span class="text-gray-400">{{ appart.bedrooms + ' Chambres - ' + appart.livingrooms + ' Salons' }}</span>
                </option>
              </select> -->
            </div>
            <div class="flex items-center h-10 my-4">
              <span class="text-lg mr-28">Publier maintenant ?</span>
              <label for="" class="mr-8"><input v-model="publishNow" type="radio" name="publishNow" class="appearance-none w-8 h-8 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400 mr-4" :value="true"> OUI</label>
              <label for=""><input v-model="publishNow" type="radio" name="publishNow" class="appearance-none w-8 h-8 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400 mr-4" :value="false"> NON</label>
            </div>
            <div v-if="!publishNow" class="">
              <div class="flex space-x-8">
                <input v-model="publicationToEdit.date" type="date" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
                <input type="time" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats">
            <div class="w-full">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-xl my-12 text-blue-920 text-center">
                Publication modifiée avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="updatePublication">
            Valider
          </button>
        </div>
        <div v-else class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="isDismissed = true">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    publication: {
      type: Object,
      default: () => ({})
    },
    isMinified: {
      type: Boolean,
      defaul: false
    }
  },
  data () {
    return {
      publicationToEdit: { ...this.publication },
      selectedType: '',
      currentStep: 'first',
      typeSelectIsOpen: false,
      isDismissed: true,
      contracts: [],
      locations: [],
      appartments: [],
      appartmentTypes: [],
      publications: [],
      reservations: [],
      visits: [],
      accounts: [],
      publishNow: false
    }
  },
  async fetch () {
    this.appartments = (await this.$api.appartmentService.getAll()).data.appartments
    this.appartmentTypes = (await this.$api.appartmentTypeService.getAll()).data.appartmentTypes
    this.publications = (await this.$api.publicationService.getAll()).data.publications
    this.reservations = (await this.$api.reservationService.getAll()).data.reservations
    this.visits = (await this.$api.visitService.getAll()).data.visits
    this.accounts = (await this.$api.accountService.getAll()).data.accounts
  },
  computed: {
    reservation () {
      return id => this.reservations.find(reservation => reservation.id === id)
    },
    visit () {
      return id => this.visits.find(visit => visit.id === id)
    },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    user () {
      return id => this.users.find(user => user.id === id)
    },
    contract () {
      return id => this.contracts.find(contract => contract.id === id)
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
    publishNow (value) {
      if (value === true) {
        this.publicationToEdit.date = new Date()
        this.publicationToEdit.status = 'Published'
      } else {
        this.publicationToEdit.status = 'Scheduled'
      }
    },
    isDismissed (value) {
      if (value === true) {
        this.publicationToEdit = this.publication
      }
    },
    selectedType (value) {
      if (value !== '') {
        this.appartments = this.appartments.filter(appart => appart.appartmentType === value.id)
      }
    },
    publication (value) {
      if (value !== null) {
        this.publicationToEdit = { ...value }
        this.isDismissed = false
      }
    }
  },
  created () {
    this.publicationoEdit = { ...this.publication }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    updatePublication () {
      this.publicationToEdit.appartment = this.publicationToEdit.appartment.id
      this.publicationToEdit.publisher = this.publicationToEdit.publisher.id
      this.publicationToEdit.date = new Date(this.publicationToEdit.date).valueOf().toString()

      this.$api.publicationService.update({ variables: { publicationId: this.publicationToEdit.id, data: this.publicationToEdit } })
        .then((response) => {
          this.publicationToEdit = {}
          this.currentStep = 'congrats'
        })
        .catch((error) => {
          this.errorToshow = error
        })
    }
  }
}
</script>
