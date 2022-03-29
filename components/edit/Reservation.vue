<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow mx-auto h-full lg:h-5/6" style="width: 584px">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Modifier une réservation
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div v-if="currentStep === 'first'" class="relative">
            <p class="text-base mt-4 text-gray-400">
              Veuillez sélectionner un appartement à réserver
            </p>
            <div class="relative inline-block w-full text-gray-700">
              <select v-model="reservationToEdit.appartment" class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                <option v-for="appart in appartments" :key="appart.id" :value="appart.id">
                  <span>{{ appartmentType(appart.appartmentType) && appartmentType(appart.appartmentType).label }}</span>
                  <span class="text-gray-400">{{ appart.bedrooms + ' Chambres - ' + appart.livingrooms + ' Salons' }}</span>
                </option>
              </select>
            </div>
            <div class="flex space-x-8">
              <input v-model="reservationToEdit.user" type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Nom">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Prénom(s)">
            </div>
            <div class="flex space-x-8">
              <input type="text" class="mt-4 h-12 md:h-16 px-8 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Téléphone">
              <input type="email" class="mt-4 h-12 md:h-16 px-8 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
            </div>
            <div class="flex space-x-8">
              <input v-model="reservationToEdit.date" type="date" class="mt-4 h-12 md:h-16 px-8 mt-1 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
              <input type="time" class="h-12 md:h-16 px-8 mt-4 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Réservation
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">mise à jour avec succès</p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="editReservation">
            Envoyer
            <loader v-if="onUpdated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true, currentStep = 'first'">
            <span>Fermer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reservation: {
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
      selectedType: '',
      reservationToEdit: { ...this.reservation },
      typeSelectIsOpen: false,
      currentStep: 'first',
      isDismissed: true,
      users: [
        { id: 1, name: 'RONY', firstname: 'Monsieur', phone: '+22991234567', email: 'monsieur.rony@gmail.com', user: '1', userType: 'admin', favorites: [], likes: [] },
        { id: 2, name: 'CHEGUN', firstname: 'Mouss', phone: '+22998765432', email: 'mouss15@gmail.com', user: '2', userType: 'publisher', favorites: [], likes: [] },
        { id: 2, name: 'ThG', firstname: 'Micrette', phone: '+22965432123', email: 'micress16@gmail.com', user: '3', userType: 'visitor', favorites: [], likes: [] }
      ],
      contracts: [],
      appartments: [],
      appartmentTypes: [],
      publications: [],
      reservations: [],
      locations: [],
      selectedAppart: '',
      onUpdated: false
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
    routeName () {
      return this.$nuxt.$route.name
    },
    publication () {
      return id => this.publications.find(publication => publication.id === id)
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
    isDismissed (value) {
      // console.log(value)
    },
    selectedType (value) {
      if (value !== '') {
        this.appartments = this.appartments.filter(appart => appart.appartmentType === value.id)
      }
    },
    reservation (value) {
      if (value !== null) {
        this.reservationToEdit = { ...value }
        this.isDismissed = false
      }
    }
  },
  created () {
    this.reserrvationToEdit = { ...this.reservation }
  },
  methods: {
    editReservation () {
      this.onUpdated = true
      this.reservationToEdit.appartment = this.reservationToEdit.appartment.id
      this.reservationToEdit.user = this.reservationToEdit.user.id
      this.reservationToEdit.date = new Date(this.reservationToEdit.date).valueOf().toString()

      this.$api.reservationService.update({ variables: { reservationId: this.reservation.id, data: this.reservationToEdit } })
        .then((response) => {
          this.reservationToEdit = {}
          this.currentStep = 'congrats'
        })
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onUpdated = false
        })
    }
  }
}
</script>
