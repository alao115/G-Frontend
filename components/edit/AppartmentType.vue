<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-full lg:h-5/6 justify-between" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 pb-0 lg:pb-0 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Éditer le type
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p v-if="currentStep !== 'congrats'" class="text-lg mt-4 text-gray-600">
            Modifiez les infos du type
          </p>
          <div v-if="currentStep === 'first'" class="first">
            <p class="text-base mt-8 text-gray-400">
              Libellé
            </p>
            <input v-model="appartTypeToEdit.label" type="text" class="w-full h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Libellé">
            <p class="text-base mt-8 text-gray-400">
              Description
            </p>
            <textarea v-model="appartTypeToEdit.description" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Description du type " />
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Type
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                mis à jour avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true">
            <span>Annuler</span>
          </button>
          <button type="button" class="relative w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="editAppartType">
            Enregistrer les modifs.
            <loader v-if="onUpdated" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
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
    appartmentType: {
      type: Object,
      default: () => ({})
    },
    isMinified: {
      type: Boolean,
      default: false
    },
    loadAppartmentTypesFunc: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      appartTypeToEdit: { ...this.appartmentType },
      currentStep: 'first',
      isDismissed: true,
      locations: [],
      onUpdated: false
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
    appartmentType (value) {
      if (value !== null) {
        this.appartTypeToEdit = { ...value }
        this.isDismissed = false
      }
    }
  },
  created () {
    this.appartmentTypeToEdit = { ...this.appartmentType }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    editAppartType () {
      this.onUpdated = true
      this.$api.appartmentTypeService.update({ variables: { appartmentTypeId: this.appartTypeToEdit.id, data: this.appartTypeToEdit } })
        .then((response) => {
          this.appartTypeToEdit = { }
          this.currentStep = 'congrats'
        })
        .then(async () => await this.loadAppartmentTypesFunc())
        // eslint-disable-next-line node/handle-callback-err
        .catch((error) => {
          // console.log(error)
        }).finally(() => {
          this.onUpdated = false
        })
    }
  }
}
</script>
