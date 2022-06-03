<template>
  <div class="contents">
    <a v-if="isMobile" class="flex lg:hidden items-center border border-transparent font-medium rounded-full text-white bg-sky-550 hover:bg-blue-920 text-lg h-16 w-16 justify-center absolute right-8 bottom-20" href="#" @click.prevent="isDismissed = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </a>
    <div v-else class="contents">
      <a v-if="routeName === 'dashboard-visites'" :class="isMinified ? 'px-2' : 'px-10'" class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg" href="#" @click.prevent="isDismissed = false">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. visite</span>
      </a>
      <button v-else class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 py-2 h-12 text-lg px-10 w-full" @click.prevent="isDismissed = false">
        Visiter
      </button>
    </div>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden rounded-md mx-auto h-full lg:h-5/6" style="width: 584px">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Demande de visite
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form action="#" class="pt-0 grid grid-cols-1 divide-y divide-gray-300">
            <div v-if="currentStep === 'first'" class="overflow-scroll h-4/5 pb-16 p-4">
              <div class="relative">
                <p class="text-base mt-8 text-gray-400">
                  Type
                </p>
                {{ appartmentType(appartment.appartmentType) && appartmentType(appartment.appartmentType).label }}
                <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                  <span v-if="!selectedType" class="leading-none">
                    Choisissez un type
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ selectedType && selectedType.label }}
                    <span class="text-sm mt-1 text-gray-400">{{ selectedType && selectedType.description }}</span>
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="typeSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <!-- <input class="flex items-center h-8 px-3 text-sm border-b border-black hover:bg-gray-200 focus:outline-none" type="search" name="" id="" placeholder="Search…"> -->
                  <a v-for="type in listOfTypes" :key="type.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedType = type, typeSelectIsOpen = false">
                    {{ type && type.label }}
                    <span class="text-gray-400">{{ type.description }}</span>
                  </a>
                </div>
              </div>
              <p class="text-base mt-4 text-gray-400">
                Veuillez sélectionner un appartement à réserver
              </p>
              <div class="relative inline-block w-full text-gray-700">
                <select v-model="newVisit.appartment" class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                  <option v-for="appart in appartments" :key="appart.id" :value="appart.id">
                    <span>{{ appartmentType(appart.appartmentType) && appartmentType(appart.appartmentType).label }}</span>
                    <span class="text-gray-400">{{ appart.bedrooms + ' Chambres - ' + appart.livingrooms + ' Salons' }}</span>
                  </option>
                </select>
              </div>
              <p class="text-base mt-4 text-gray-400">
                Qui le visitera ?
              </p>
              <select id="" v-model="visitorSelected" name="visitorSelect" class="w-full m-h-12 md:h-16 mt-2 mb-4 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0">
                <option value="Connected user" selected>
                  <span>Moi-même</span>
                </option>
                <option value="Other">
                  <span>Autre</span>
                </option>
              </select>
              <div v-if="visitorSelected === 'Other'">
                <div class="flex space-x-8">
                  <input v-model.trim="newVisit.visitorInfos.firstname" type="text" class="h-12 md:h-16 px-8 mt-1 my-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Nom">
                  <input v-model.trim="newVisit.visitorInfos.lastname" type="text" class="h-12 md:h-16 px-8 mt-1 my-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Prénom(s)">
                </div>
                <div class="flex space-x-8">
                  <input v-model.trim="newVisit.visitorInfos.phone" type="text" class="h-12 md:h-16 px-8 mt-4 my-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Téléphone">
                  <input v-model.trim="newVisit.visitorInfos.email" type="email" class="h-12 md:h-16 px-8 mt-4 my-4 block w-1/2 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
                </div>
              </div>
              <p class="text-base mt-4 text-gray-400">
                Jour de la visite
              </p>
              <div class="flex flex-col space-x-8">
                <select v-model="newVisit.date" class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                  <option selected>
                    Choisissez un jour
                  </option>
                  <template v-if="selectedAppart">
                    <option v-for="day in selectedAppart.timeSlots" :key="day.day" :value="day.day">
                      {{ day.day }}
                    </option>
                  </template>
                </select>
                <div class="grid grid-cols-4 gap-4">
                  <template v-if="selectedDate">
                    <label v-for="(slot, count) in selectedDate.selectedTimes" :key="count" :for="slot" class="p-2 py-4 bg-sky-50 align-center justify-center">
                      <input
                        :id="slot"
                        type="checkbox"
                        :name="slot"
                        class="mr-2"
                        :value="slot"
                      >
                      {{ slot }}
                    </label>
                  </template>
                </div>
              </div>
              <div class="others bg-sky-50 p-8 mt-4 lg:mt-8 w-full rounded-md mb-48">
                <p>
                  Les frais de visites s’élèvent à 1500 f cfa par visite.
                  Vous avez la possibilité de 3 visites. Une équipe est mise à votre disposition pour un service de qualité.
                </p>
              </div>
            </div>
            <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
              <div class="w-full px-16">
                <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
                <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                  Nouvelle visite
                </p>
                <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                  ajoutée avec succès
                </p>
              </div>
            </div>
          </form>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer py-4 px-8 lg:px-8 flex justify-between absolute w-full bg-white z-20 bottom-0 space-x-4">
          <button type="button" class="w-1/2 py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 lg:mt-8" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="relative w-1/3 shadow-btn-shadow border border-transparent py-4 text-lg px-4 leading-none rounded font-medium lg:mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="payLater">
            Enreg.
            <loader v-if="onCreated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium lg:mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="createVisit">
            Payer puis Enreg.
            <loader v-if="onCreated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer py-4 px-8 lg:p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
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
    loadVisitsFunc: {
      type: Function,
      default: () => {}
      // required: true
    },
    appartmentsProp: {
      type: Array,
      required: true,
      default: () => ([])
    },
    appartmentTypes: {
      type: Array,
      required: true,
      default: () => ([])
    },
    appartmentIdProp: {
      type: String,
      required: false,
      default: () => ('')
    }
  },
  data () {
    return {
      visitorSelected: 'Connected user',
      appartmentId: this.$route.params.id,
      selectedType: '',
      typeSelectIsOpen: false,
      currentStep: 'first',
      isDismissed: true,
      contracts: [],
      locations: [],
      newVisit: { visitorInfos: {}, day: 'default' },
      appartments: [...this.appartmentsProp],
      visitResponse: null,
      onCreated: false,
      selectedTimeslot: '',
      selectedVisitDay: '',
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
    routeName () {
      return this.$nuxt.$route.name
    },
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
    user () {
      return id => this.users.find(user => user.id === id)
    },
    account () {
      return id => this.accounts.find(account => account.id === id)
    },
    selectedAppart () {
      return this.appartmentsProp.find(app => app.id === this.newVisit.appartment)
    },
    selectedDate () {
      return this.selectedAppart?.timeSlots.find(item => item.day === this.newVisit.date)
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
    }
  },
  mounted () {
    // this.$fetch()
    this.$addKkiapayListener('success', this.successHandler)
    if (this.appartmentIdProp) {
      this.newVisit.appartment = this.appartmentIdProp
      this.selectedType = this.appartmentType(this.appartment(this.appartmentIdProp).appartmentType)
    }
  },
  beforeDestroy () {
    this.$removeKkiapayListener('success', this.successHandler)
  },
  methods: {
    createVisit () {
      this.onCreated = true
      this.$api.visitService.create({ variables: { data: this.newVisit } })
        .then(({ data }) => {
          this.visitResponse = data.createVisit
          this.open()
        })
        .catch((error) => {
          this.errorToshow = error
        })
    },
    payLater () {
      this.onCreated = true
      this.$api.visitService.create({ variables: { data: this.newVisit } })
        .then(({ data }) => {
          this.visitResponse = data.createVisit
        })
        .catch((error) => {
          this.errorToshow = error
        })
    },
    open () {
      // console.log(this.$openKkiapayWidget)
      this.$openKkiapayWidget({
        amount: 1500,
        api_key: 'f8095850886111ec953617ecac48fe09',
        sandbox: true,
        phone: ''
      })
    },
    successHandler (response) {
      if (this.visitResponse) {
        this.$api.visitService.update({ variables: { visitId: this.visitResponse.id, data: { status: 'paid' } } })
          .then(async () => {
            await this.loadVisitsFunc()
            this.newVisit = {}
            this.currentStep = 'congrats'
            this.isDismissed = true
            this.currentStep = 'first'
          }).finally(() => {
            this.onCreated = false
          })
      }
    }
  }
}
</script>
