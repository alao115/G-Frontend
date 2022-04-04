<template>
  <div class="contents">
    <span class="icon cursor:pointer p-2" @click.prevent="isDismissed = false">
      <i class="far fa-calendar-alt" />
    </span>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md h-full lg:h-5/6 justify-between" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 pb-0 lg:pb-0 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Créneaux horaires
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p v-if="currentStep !== 'congrats'" class="text-lg mt-4 text-gray-600">
            Choisissez un jour et cliquez sur les créneaux horaires désirés
          </p>
          <div v-if="currentStep === 'first'" class="first">
            <p class="text-base mt-8 text-gray-400">
              Jour de la semaine
            </p>
            <select v-model="newTimeslot.day" type="text" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Libellé">
              <option v-for="day in days" :key="day.id" :value="day.id">
                  <span>{{ day.label }}</span>
                </option>
            </select>
            <p class="text-base mt-8 text-gray-400">
              Horaires disponibles
            </p>
            <div class="grid grid-cols-4 gap-4">
              <label v-for="(timeslot, count) in timeSlots" for="#" :key="count"><input type="checkbox" name="" id="">{{ timeslot }}</label>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Nouveau type
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                ajouté avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true">
            <span>Annuler</span>
          </button>
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" :disabled="!newType.label || !newType.description " @click.prevent="createAppartType">
            Enregistrer le type
            <loader v-if="onCreated" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
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
    isMinified: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentStep: 'first',
      isDismissed: true,
      newType: {},
      locations: [],
      onCreated: false,
      newTimeslot: {},
      newTimeslots: [],
      days: [
        { id: 1, label: 'Lundi' },
        { id: 2, label: 'Mardi' },
        { id: 3, label: 'Mercredi' },
        { id: 4, label: 'Jeudi' },
        { id: 5, label: 'Vendredi' },
        { id: 6, label: 'Samedi' },
        { id: 7, label: 'Dimanche' }
      ],
      timeSlots: ['8h - 9h', '9h - 10h', '10h - 11h', '11h - 12h', '12h - 13h', '13h - 14h', '14H - 15H', '15h - 16h', '16H - 17H', '17H - 18H']
    }
  },
  computed: {
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
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
    paymentFrequency () {
      return id => this.paymentFrequencies.find(payment => payment.id === id)
    },
    user () {
      return id => this.users.find(user => user.id === id)
    },
    contract () {
      return id => this.contracts.find(contract => contract.id === id)
    }
  },
  watch: {
    conditions (value) {
      if (value.rent !== 0) {
        this.advancePayment = value.rent * value.prepaidRentMonths
      }
    }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    createAppartType () {
      this.onCreated = true
      this.$api.appartmentTypeService.create({ variables: { data: this.newType } })
        .then(async (response) => {
          this.newType = {}
          this.currentStep = 'congrats'
          await this.loadAppartmentTypesFunc()
        })
        .finally(() => {
          this.onCreated = false
        })
    }
  }
}
</script>
