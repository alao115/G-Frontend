<template>
  <div class="contents">
    <a v-if="inDetail" class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="isDismissed = false">
      <span class="font-medium">Créneaux</span>
    </a>
    <span v-else class="icon cursor:pointer p-2 text-gray-400 hover:text-blue-990" @click.prevent="isDismissed = false">
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
            <p class="text-base mt-8 mb-4 text-gray-400">
              Jours de la semaine
            </p>
            <div class="grid grid-cols-4 gap-4 mb-4">
              <label for="selectAll" class="p-2 py-4 bg-sky-50 align-center justify-center col-span-4">
                <input id="selectAll" v-model="selectAllDays" type="checkbox" name="" class="mr-2">
                Tous les jours
              </label>
            </div>
            <p class="text-base my-4 text-gray-400">
              Faites votre choix
            </p>
            <div class="grid grid-cols-4 gap-4">
              <label v-for="(day, count) in days" :key="count" :for="day.label" class="p-2 py-4 bg-sky-50 align-center justify-center">
                <input
                  :id="day.day"
                  v-model="selectedDays"
                  :value="day"
                  type="checkbox"
                  :name="day.label"
                  class="mr-2"
                >
                {{ day.day }}
              </label>
            </div>
          </div>
          <div v-if="currentStep === 'second'" class="first">
            <div>
              <div>
                <p class="text-base mt-8 mb-4 text-gray-400">
                  Horaires disponibles
                </p>
                <div class="grid grid-cols-4 gap-4 mb-4">
                  <label for="#" class="p-2 py-4 bg-sky-50 align-center justify-center col-span-4">
                    <input id="" type="checkbox" name="" class="mr-2">
                    Tous les créneaux
                  </label>
                </div>
                <p class="text-base my-4 text-gray-400">
                  Faites votre choix
                </p>
                <!-- {{ selectedDays }} -->
                <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button v-for="slotData in selectedDays" :key="slotData.day" :class=" slotData.isSelected ? 'border-blue-500' : 'border-transparent'" class="h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none" @click.prevent="changeTab(slotData)">
                    {{ slotData.day }}
                  </button>
                </div>
                <template v-for="(slotData, index) in selectedDays">
                  <div v-if="slotData.isSelected" :key="index">
                    <div class="grid grid-cols-4 gap-4">
                      <label v-for="(slot, count) in timeSlots" :key="count" :for="slot" class="p-2 py-4 bg-sky-50 align-center justify-center">
                        <input
                          :id="slot"
                          v-model="slotData.selectedTimes"
                          type="checkbox"
                          :name="slot"
                          class="mr-2"
                          :value="slot"
                        >
                        {{ slot }}
                      </label>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Créneaux pour cet appartement ajoutés avec succès
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                ajouté avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep === 'second' ? currentStep = 'first' : isDismissed = true">
            <span v-if="currentStep === 'first'">Annuler</span>
            <span v-else>Revenir</span>
          </button>
          <!-- <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" :disabled="!newType.label || !newType.description " @click.prevent="createTimeslots"> -->
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="(currentStep === 'first' && selectedDays.length) ? [currentStep = 'second', selectedDays[0].isSelected = true] : !selectedDays.length ? false : createTimeslots()">
            <span v-if="currentStep === 'second'">
              Enregistrer les horaires
            </span>
            <span v-else>Suivant</span>
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
    },
    inDetail: {
      type: Boolean,
      default: false
    },
    appartment: {
      type: Object,
      required: true
    },
    loadAppartmentsFunc: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      activeDayToPopulate: '',
      activeDaySlots: [],
      currentStep: 'first',
      isDismissed: true,
      newType: {},
      onCreated: false,
      selectedDays: [],
      days: [
        { id: 1, label: 'Lundi' },
        { id: 2, label: 'Mardi' },
        { id: 3, label: 'Mercredi' },
        { id: 4, label: 'Jeudi' },
        { id: 5, label: 'Vendredi' },
        { id: 6, label: 'Samedi' },
        { id: 7, label: 'Dimanche' }
      ].map(item => ({ day: item.label, selectedTimes: [], isSelected: false })),
      timeSlots: [
        '8h - 9h',
        '9h - 10h',
        '10h - 11h',
        '11h - 12h',
        '12h - 13h',
        '13h - 14h',
        '14H - 15H',
        '15h - 16h',
        '16H - 17H',
        '17H - 18H'
      ]
    }
  },
  computed: {
    selectAllDays: {
      get () {
        return this.selectedDays.length === this.days.length
      },
      set (value) {
        if (value) {
          this.days.forEach((day) => {
            this.selectedDays.push(day)
          })
        } else {
          this.selectedDays = []
        }
      }
    }
  },
  watch: {
    conditions (value) {
      if (value.rent !== 0) {
        this.advancePayment = value.rent * value.prepaidRentMonths
      }
    }
  },
  created () {
    if (this.appartment && this.appartment.timeSlots) {
      // const timeSlots = []
      this.appartment.timeSlots.forEach((item) => {
        const foundDate = this.days.find(day => day.day === item.day)
        foundDate.selectedTimes = item.selectedTimes
        this.selectedDays.push(foundDate)
      })
    }
  },
  methods: {
    changeTab (slot) {
      this.allTabClosed()
      slot.isSelected = true
    },
    allTabClosed () {
      this.selectedDays.forEach((item) => { item.isSelected = false })
    },
    toDismiss () {
      this.isDismissed = true
      this.currentStep = 'first'
      this.selectedDays = []
    },
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    createTimeslots () {
      const areTimeSlotSelected = this.selectedDays.every(item => item.selectedTimes.length !== 0)
      if (areTimeSlotSelected) {
        this.onCreated = true
        this.$api.appartmentService.update({ variables: { appartmentId: this.appartment.id, data: { timeSlots: this.selectedDays.map(item => ({ day: item.day, selectedTimes: item.selectedTimes })) } } })
          .then(response => this.loadAppartmentsFunc())
          .then(() => {
            // this.selectedDays = []
            this.currentStep = 'congrats'
          })
          .finally(() => {
            this.onCreated = false
          })
      }
    }
  }
}
</script>
