<template>
  <div class="contents">
    <a v-if="from === 'appartMenu'" class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="isDismissed = false">
      <span class="font-medium">Visiter</span>
    </a>
    <div v-else class="contents">
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
        <button v-else class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 py-2 h-12 text-lg px-10 w-full" @click.prevent="bookVisit">
          Visiter
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md mx-auto h-auto w-148">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-4 text-sky-550">
              Demande de visite
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form action="#" class="pt-0 grid grid-cols-1 divide-y divide-gray-300">
            <div v-if="currentStep === 'first'" class="p-4 pb-0">
              <p class="text-base mt-4 text-gray-400">
                Jour de la visite
              </p>
              <div class="flex flex-col space-x-8">
                <input v-model.trim="selectedDateFromCalandar" type="date" class="h-12 md:h-16 px-8 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Nom">
              </div>

              <template v-if="selectedDateFromCalandar">
                <p class="text-base mt-4 text-gray-400">
                  Horaires disponibles le {{ selectedCalendarDay }}
                </p>
                <div :class=" selectedDate ? 'grid grid-col-2 lg:grid-cols-3 gap-4 max-h-32 overflow-y-auto' : 'flex'">
                  <template v-if="selectedDate">
                    <label v-for="(slot, count) in selectedDate.selectedTimes" :key="count" :for="slot" class="p-2 py-4 bg-sky-50 align-center justify-center">
                      <input
                        :id="slot"
                        v-model="selectedSlot"
                        type="checkbox"
                        :name="slot"
                        class="mr-2"
                        :value="slot"
                      >
                      {{ slot }}
                    </label>
                  </template>
                  <p v-else>
                    Aucun horaire de disponible ce <b>{{ selectedCalendarDay + ' ' + selectedDateFromCalandar }}</b>
                  </p>
                </div>
              </template>

              <div class="others bg-sky-50 p-8 pb-0 mt-4 lg:mt-8 w-full rounded-md">
                <p>
                  Les frais de visites s’élèvent à 1500 f cfa par visite. Une équipe est mise à votre disposition pour un service de qualité.
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
        <div v-if="currentStep !== 'congrats'" class="footer py-4 px-8 lg:px-8 flex justify-between w-full bg-white space-x-4">
          <button type="button" class="w-1/2 py-4 text-lg px-10 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" :disabled="!newVisit.date || !newVisit.visitor || !newVisit.appartment" @click.prevent="openKkiapayWidget">
            Payer Maintenant
            <loader v-if="onCreated" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
          <button type="button" class="relative w-1/3 shadow-btn-shadow border border-transparent py-4 text-lg px-4 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" :disabled="!newVisit.date || !newVisit.visitor || !newVisit.appartment" @click.prevent="payLater">
            Payer Plutard
            <loader v-if="onSaved" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer py-4 px-8 lg:p-8 flex justify-between w-full bg-white">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true, currentStep = 'first'">
            <span>Fermer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { visitStatus } from '~/helpers/constants'

export default defineComponent({
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
      required: true
    },
    appartmentIdProp: {
      type: String,
      required: true
      // default: ''
    },
    from: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedDateFromCalandar: '',
      typeSelectIsOpen: false,
      currentStep: 'first',
      isDismissed: true,
      newVisit: { visitor: this.$auth.user && this.$auth.user.id, date: '', appartment: this.appartmentIdProp },
      visitResponse: null,
      onCreated: false,
      onSaved: false,
      selectedTimeslot: '',
      selectedCalendarDay: '',
      selectedSlot: [],
      timeSlots: ['8h - 9h', '9h - 10h', '10h - 11h', '11h - 12h', '12h - 13h', '13h - 14h', '14H - 15H', '15h - 16h', '16H - 17H', '17H - 18H']
    }
  },

  computed: {
    ...mapGetters({
      authUserAccount: 'account/authUserAccount'
    }),

    visitStatus: () => visitStatus,

    routeName () {
      return this.$nuxt.$route.name
    },
    selectedAppart () {
      return this.appartmentsProp.find(app => app.id === this.appartmentIdProp)
    },
    selectedDate () {
      return this.connectedUser && this.selectedAppart?.timeSlots ? this.selectedAppart?.timeSlots.find(item => item.day === this.selectedCalendarDay) : {}
    },
    connectedUser () {
      return this.authUserAccount
    }
  },
  watch: {
    selectedDateFromCalandar (value) {
      if (value) {
        switch (new Date(value).getDay()) {
          case 0:
            this.selectedCalendarDay = 'Dimanche'
            break
          case 1:
            this.selectedCalendarDay = 'Lundi'
            break
          case 2:
            this.selectedCalendarDay = 'Mardi'
            break
          case 3:
            this.selectedCalendarDay = 'Mercredi'
            break
          case 4:
            this.selectedCalendarDay = 'Jeudi'
            break
          case 5:
            this.selectedCalendarDay = 'Vendredi'
            break
          case 6:
            this.selectedCalendarDay = 'Samedi'
            break
          default:
            this.selectedCalendarDay = ''
            break
        }
      }
    },
    selectedSlot (value) {
      // console.log('slot => ', value)
      if (value.length > 1) {
        this.selectedSlot = [value[value.length - 1]]
      }
      if (value[0]) {
        this.newVisit.date = `${this.selectedDateFromCalandar} ${value[0].split('-')[0].replace('H', '').trim()}:00`
      }
    }
  },
  mounted () {
    this.$addKkiapayListener('success', this.successHandler)
  },
  beforeDestroy () {
    this.$removeKkiapayListener('success', this.successHandler)
  },

  created () {
    if (this.appartmentIdProp && this.connectedUser) {
      this.newVisit.appartment = this.appartmentIdProp
      this.newVisit.visitor = this.connectedUser.user.id
    }
  },
  updated () {
    // console.log('updated')
    // console.log('Selected appart: ', this.selectedAppart)
    // console.log('AppartID: ', this.appartmentIdProp)
    // console.log('Appartments: ', this.appartmentsProp)
    // console.log('currentStep', this.currentStep)
    // console.log('Data: ', this.newVisit)
  },

  methods: {
    clearFormData () {
      this.newVisit.date = ''
      this.selectedSlot = []
      this.selectedDateFromCalandar = ''
      this.currentStep = 'congrats'
    },
    bookVisit () {
      if (!this.connectedUser) { this.$router.push({ name: 'auth-signin' }) }
      // console.log(this.connectedUser)
      this.isDismissed = false
    },
    createVisit ({ status }) {
      this.onCreated = true
      this.$api.visitService.create({ variables: { data: { ...this.newVisit, status } } })
        .then(() => this.loadVisitsFunc())
        .then(() => this.clearFormData())
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onCreated = false
        })
    },
    payLater () {
      this.onSaved = true
      this.$api.visitService.create({ variables: { data: { ...this.newVisit, status: visitStatus.WAITING_FOR_PAYMENT } } })
        .then(() => this.loadVisitsFunc())
        .then(() => this.clearFormData())
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onSaved = false
        })
    },
    openKkiapayWidget () {
      this.$openKkiapayWidget({
        amount: 1500,
        api_key: 'f8095850886111ec953617ecac48fe09',
        sandbox: true,
        phone: ''
      })
    },
    successHandler (response) {
      this.createVisit({ status: visitStatus.RESERVED })
    }
  }
})
</script>
