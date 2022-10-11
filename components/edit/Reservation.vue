<template>
  <div class="contents">
    <button v-if="inTable" class="btn shadow-btn-shadow border border-transparent w-36 font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-0 text-xs h-6" @click.prevent="isDismissed = false">
      Valider / Rejeter
    </button>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden flex flex-col rounded-md shadow-btn-shadow mx-auto h-auto lg:h-auto" style="width: 584px">
        <div class="text-start w-full p-4 pb-0 sm:px-6 lg:p-8 lg:pb-0 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Valider une réservation
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div v-if="currentStep === 'first'" class="relative text-left">
            <p class="text-base mt-4 text-gray-400 mb-2">
              Appartment
            </p>
            <label class="text-base">
              <span class="texte-lg">{{ appartment(reservationToEdit.appartment) && appartmentType(appartment(reservationToEdit.appartment).appartmentType) && appartmentType(appartment(reservationToEdit.appartment).appartmentType).label }}</span> <br>
              <span class="text-blue-990">{{ appartment(reservationToEdit.appartment) && appartment(reservationToEdit.appartment).bedrooms + ' Chambres - ' + appartment(reservationToEdit.appartment).livingrooms + ' Salons' }}</span>
            </label>
            <div class="mt-4">
              <p class="texte-xl text-gray-400 mb-2">
                Locataire
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-400">
                    Nom
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ account.lastname ? account.lastname : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Prénom
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ account.firstname ? account.firstname : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Email
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ account.email ? account.email : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Téléphone
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ account.phone ? account.phone : '' }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p class="text-gray-400">
                    Date de prise de possession de l'appartement
                  </p>
                  <div class="flex items-center font">
                    <span class="text-base">{{ reservationToEdit.startDate }}</span>
                  </div>
                </div>
                <div v-if="reservationToEdit.appartment && appartment(reservationToEdit.appartment).forShortStay === true">
                  <p class="text-gray-400">
                    Date de libération de l'appartement
                  </p>
                  <div class="flex items-center font">
                    <span class="text-base">{{ reservationToEdit.endDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Réservation
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                mise à jour avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 pt-0 flex justify-between w-full bg-white">
          <template v-if="reservationToEdit.status === reservationStatus.PENDING">
            <button type="button" class="relative w-1/2 py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="validateReservation(reservationStatus.REJECTED)">
              Rejeter
              <loader v-if="onValidating" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
            </button>
            <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-lg px-4 leading-none rounded font-medium lg:mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="validateReservation(reservationStatus.WAITING_FOR_PAYMENT)">
              Accepter
              <loader v-if="onValidating" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
            </button>
          </template>
          <button v-else-if="reservationToEdit.status === reservationStatus.WAITING_FOR_PAYMENT" type="button" class="relative w-full py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="validateReservation(reservationStatus.REJECTED)">
            Rejeter
            <loader v-if="onValidating" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
          <button v-else-if="(reservationToEdit.status === reservationStatus.RESERVED || reservationToEdit.status === reservationStatus.REJECTED) && !reservationToEdit.archive" type="button" class="relative w-full shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="archivedReservation">
            Archiver
            <loader v-if="onArchiving" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer p-8 pt-0 flex justify-between w-full bg-white">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true, currentStep = 'first'">
            <span>Fermer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reservationStatus } from '~/helpers/constants'
export default {
  props: {
    step: {
      type: String,
      default: ''
    },
    defaultState: {
      type: Boolean,
      default: false
    },
    inTable: {
      type: Boolean,
      default: false
    },
    reservation: {
      type: Object,
      default: () => ({})
    },
    isMinified: {
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
    accountProp: {
      type: Object,
      default: () => ({})
    },
    appartmentTypes: {
      type: Array,
      default: () => ([]),
      required: true
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedType: '',
      isSmall: true,
      reservationToEdit: { ...this.reservation },
      typeSelectIsOpen: false,
      currentStep: 'first',
      isDismissed: true,
      appartments: [...this.appartmentsProp],
      account: { ...this.accountProp },
      onValidating: false,
      onPaying: false,
      onArchiving: false,
      reservationResponse: null
    }
  },
  async fetch () {
    this.appartments = (await this.$api.appartmentService.getAll()).data.appartments
  },
  computed: {
    reservationStatus: () => reservationStatus,

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
    },
    accountProp (value) {
      if (value !== undefined) {
        this.account = value
      }
    }
  },
  created () {
    this.reservationToEdit = { ...this.reservation }
    this.account = { ...this.accountProp }
  },
  methods: {
    archivedReservation () {
      this.onArchiving = true

      this.$api.reservationService.update({ variables: { reservationId: this.reservation.id, data: { ...this.reservationToEdit, archive: true } } })
        .then(async (response) => {
          this.currentStep = 'congrats'
          await this.loadReservationsFunc()
        })
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onArchiving = false
        })
    },
    validateReservation (status) {
      this.onValidating = true

      this.$api.reservationService.update({ variables: { reservationId: this.reservation.id, data: { ...this.reservationToEdit, status } } })
        .then(async (response) => {
          this.reservationToEdit = {}
          this.currentStep = 'congrats'
          await this.loadReservationsFunc()
        })
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onValidating = false
        })
    },
    openKkiapayWidget () {
      this.$openKkiapayWidget({
        amount: this.amount,
        api_key: 'f8095850886111ec953617ecac48fe09',
        sandbox: true,
        phone: ''
      })
    }

    // successHandler (response) {
    //   this.bookReservation(reservationStatus.RESERVED)
    //   // if (this.reservationResponse) {
    //   //   this.$api.reservationService.update({ variables: { reservationId: this.reservationResponse, data: { status: 'reserved' } } })
    //   //     .then(async () => {
    //   //       await this.loadReservationsFunc()
    //   //       this.newReservation = {}
    //   //       this.currentStep = 'congrats'
    //   //     }).finally(() => {
    //   //       this.onCreated = false
    //   //     })
    //   // }
    // },
    // onCreated () {}
  }
}
</script>
