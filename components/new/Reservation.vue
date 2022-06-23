<template>
  <div class="contents">
    <a v-if="from === 'appartMenu'" class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="isDismissed = false">
      <span class="font-medium">Réserver</span>
    </a>
    <div v-else class="contents">
      <a v-if="routeName === 'dashboard-reservations'" :class="isMinified ? 'px-2' : 'px-10'" class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg" href="#" @click.prevent="isDismissed = false">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. Réservation</span>
      </a>
      <button v-else class="btn shadow-btn-shadow border border-transparent w-full font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-2 text-lg px-10 mr-8 h-12" @click.prevent="isDismissed = false">
        Réserver
      </button>
    </div>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden rounded-md mx-auto h-full lg:h-5/6" style="width: 584px">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Réserver un appartement
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form action="#" class="pt-0 grid grid-cols-1 divide-y divide-gray-300">
            <div v-if="currentStep === 'first'" class="overflow-scroll h-4/5 p-4 pb-24">
              <!-- <div class="relative">
                <p class="text-base mt-8 text-gray-400">
                  Type
                </p>
                <label for="#" class="text-base">{{ selectedType.label }}</label>
              </div> -->
              <p class="text-base text-gray-400">
                Appartment
              </p>
              <label class="text-base">
                <span>{{ appartment(newReservation.appartment) && appartmentType(appartment(newReservation.appartment).appartmentType) && appartmentType(appartment(newReservation.appartment).appartmentType).label }}</span>
                <span class="text-gray-400">{{ appartment(newReservation.appartment) && appartment(newReservation.appartment).bedrooms + ' Chambres - ' + appartment(newReservation.appartment).livingrooms + ' Salons' }}</span>
              </label>
              <p class="texte-xl text-gray-400 mt-8">Arrivée / Début du contrat</p>
              <div class="flex space-x-8">
                <input v-model="newReservation.reservationDateStart" type="date" class="mt-4 h-12 md:h-16 px-8 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
                <input v-model="newReservation.reservationTimeStart" type="time" class="h-12 md:h-16 px-8 mt-4 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
              </div>
              <div v-if="appartment(newReservation.appartment) && appartment(newReservation.appartment).forShortStay === true" class="flex space-x-8">
                <p class="texte-xl text-gray-300 mb-0">Départ</p>
                <div class="flex space-x-8">
                  <input v-model="newReservation.reservationDateEnd" type="date" class="mt-4 h-12 md:h-16 px-8 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
                  <input v-model="newReservation.reservationTimeEnd" type="time" class="h-12 md:h-16 px-8 mt-4 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
                </div>
              </div>
              <!-- <div v-else class="flex space-x-8">
                <input v-model="newReservation.date" type="date" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
                <input type="time" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
              </div> -->
            </div>
            <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
              <div class="w-full px-16">
                <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
                <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                  Nouvelle réservation
                </p>
                <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                  en cours de validation
                </p>
                <p class="text-sm">
                  Notre équipe se chargera de vérifier la disponibilité de l'appartement. Nous vous reviendrons très vite.
                </p>
              </div>
            </div>
          </form>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0 space-x-8">
          <button type="button" class="py-4 text-lg px-4 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mt-8" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="relative shadow-btn-shadow border border-transparent py-4 text-lg px-4 leading-none rounded font-medium lg:mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="payLater">
            Soumettre
            <loader v-if="onCreated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
          <!-- <button type="button" class="relative shadow-btn-shadow border border-transparent py-4 text-lg px-4 leading-none rounded font-medium lg:mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="createReservation">
            Payer puis Enreg.
            <loader v-if="onCreated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button> -->
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
    isMinified: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    loadReservationsFunc: {
      type: Function,
      required: true
    },
    appartmentsProp: {
      type: Array,
      default: () => ([]),
      required: true
    },
    appartmentTypes: {
      type: Array,
      default: () => ([]),
      required: true
    },
    from: {
      type: String,
      default: ''
    },
    appartmentToReserv: {
      type: Object,
      default: () => ({})
    },
    appartmentTypeForReserv: {
      type: Object,
      default: () => ({})
    },
    publicationsProp: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  data () {
    return {
      userSelected: '',
      selectedType: '',
      typeSelectIsOpen: false,
      currentStep: 'first',
      isDismissed: true,
      contracts: [],
      appartments: [...this.appartmentsProp],
      publications: [...this.publicationsProp],
      locations: [],
      newReservation: {
        status: 'Pending'
      },
      reservationResponse: null,
      selectedAppart: '',
      onCreated: false
    }
  },
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
    user () {
      return id => this.users.find(user => user.id === id)
    },
    connectedUser () {
      return this.$auth.user
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
    userSelected (value) {
      if (value === 'Connected user') {
        // console.log(this.connectedUser)
        this.newReservation.user = this.connectedUser.id
        /* this.newReservation.user.lastname = this.connectedUser.lastname
        this.newReservation.user.firstname = this.connectedUser.firstname
        this.newReservation.user.email = this.connectedUser.email */
      }
    }
  },
  mounted () {
    this.$addKkiapayListener('success', this.successHandler)
    if (this.appartmentTypeForReserv !== {}) {
      this.selectedType = this.appartmentTypeForReserv
    }
    if (this.appartmentToReserv !== {}) {
      this.newReservation.appartment = this.appartmentToReserv.id
    }
  },
  beforeDestroy () {
    this.$removeKkiapayListener('success', this.successHandler)
  },
  methods: {
    createReservation () {
      this.onCreated = true
      this.$api.reservationService.create({ variables: { data: this.newReservation } })
        .then(({ data }) => {
          this.reservationResponse = data.createReservation.id
          this.open()
        })
        .then(() => {
          this.onSaved = false
          this.newReservation = { status: 'Pending' }
          this.currentStep = 'congrats'
          // this.isDismissed = true
          // this.currentStep = 'first'
        })
        .catch((error) => {
          this.errorToshow = error
        })
    },

    payLater () {
      this.onCreated = true
      this.$api.reservationService.create({ variables: { data: this.newReservation } })
        .then(({ data }) => {
          this.reservationResponse = data.createReservation.id
        })
        .catch((error) => {
          this.errorToshow = error
        })
    },
    open () {
      this.$openKkiapayWidget({
        amount: 2000,
        api_key: 'f8095850886111ec953617ecac48fe09',
        sandbox: true,
        phone: ''
      })
    },
    successHandler (response) {
      if (this.reservationResponse) {
        this.$api.reservationService.update({ variables: { reservationId: this.reservationResponse, data: { status: 'reserved' } } })
          .then(async () => {
            await this.loadReservationsFunc()
            this.newReservation = {}
            this.currentStep = 'congrats'
          }).finally(() => {
            this.onCreated = false
          })
      }
    }
  }
}
</script>
