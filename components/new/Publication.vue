<template>
  <div class="contents">
    <label v-if="inTable" :class="isSmall ? 'small' : ''" class="switch" @click.prevent="isDismissed = false">
      <input v-model="checkedValue" type="checkbox">
      <span :class="isSmall ? 'small' : ''" class="slider round" />
    </label>
    <div v-else>
      <a v-if="isMobile" class="flex lg:hidden items-center border border-transparent font-medium rounded-full text-white bg-sky-550 hover:bg-blue-920 text-lg h-16 w-16 justify-center absolute right-8 bottom-20" href="#" @click.prevent="isDismissed = false">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </a>
      <a v-else :class="isMinified ? 'px-2' : 'px-10'" class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg" href="#" @click.prevent="isDismissed = false">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. publication</span>
      </a>
    </div>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="relative bg-white dark:bg-gray-800 overflow-hidden rounded-md h-full lg:h-5/6" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Nouvelle publication
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
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
                CHoississez le type
              </p>
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                <div>
                  <span v-if="!selectedType" class="leading-none">
                    Choisissez un type
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ selectedType && selectedType.label }}
                    <span class="text-sm mt-1 text-gray-400">{{ selectedType && selectedType.description }}</span>
                  </p>
                </div>
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
              Veuillez sélectionner un appartement à publier
            </p>
            <div class="relative inline-block w-full text-gray-700">
              <select v-model="newPublication.appartment" class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                <option v-if="newPublication.appartment === {}" value="">
                  Sélectionnez un appartment
                </option>
                <option v-for="appart in appartments" v-else :key="appart.id" :value="appart.id">
                  <span>{{ appartmentType(appart.appartmentType) && appartmentType(appart.appartmentType).label }}</span>
                  <span class="text-gray-400">{{ appart.bedrooms + ' Chambres - ' + appart.livingrooms + ' Salons' }}</span>
                </option>
              </select>
            </div>
            <div class="flex items-center h-10 my-4">
              <span class="text-lg mr-28">Publier maintenant ?</span>
              <label for="" class="mr-8"><input v-model="publishNow" type="radio" name="publishNow" class="appearance-none w-8 h-8 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400 mr-4" :value="true"> OUI</label>
              <label for=""><input v-model="publishNow" type="radio" name="publishNow" class="appearance-none w-8 h-8 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400 mr-4" :value="false"> NON</label>
            </div>
            <div v-if="!publishNow" class="">
              <div class="flex space-x-8">
                <input v-model="newPublication.date" type="date" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
                <input type="time" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Nouvelle publication
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                ajoutée avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920" @click="createPublication">
            Valider
            <loader v-if="onCreated" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="isDismissed = true, currentStep = 'first'">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    defaultState: {
      type: Boolean,
      default: false
    },
    inTable: {
      type: Boolean,
      default: false
    },
    isMinified: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    loadPublicationsFunc: {
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
      required: true
    },
    appartmentProp: {
      type: Object,
      required: false,
      default: () => ({})
    },
    appartmentTypeProp: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      currentState: this.defaultState,
      isSmall: true,
      selectedType: '',
      currentStep: 'first',
      typeSelectIsOpen: false,
      isDismissed: true,
      contracts: [],
      locations: [],
      newPublication: {
        appartment: {},
        status: 'Scheduled',
        publisher: this.$auth.user._id
      },
      appartments: [...this.appartmentsProp],
      onCreated: false,
      publishNow: false
    }
  },

  computed: {
    checkedValue: {
      get () {
        return this.defaultState
      },
      set (newValue) {
        this.currentState = newValue
      }
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
        this.newPublication.date = new Date()
        this.newPublication.status = 'Published'
      } else {
        this.newPublication.status = 'Scheduled'
      }
    },
    selectedType (value) {
      if (value !== '') {
        this.appartments = this.appartments.filter(appart => appart.appartmentType === value.id)
      }
    }
  },

  created () {
    if (this.inTable === true) {
      this.selectedType = this.appartmentTypeProp
      this.newPublication.appartment = this.appartmentProp?.id
    }
  },

  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    createPublication () {
      this.onCreated = true
      this.newPublication.date = new Date(this.newPublication.date).valueOf().toString()
      this.$api.publicationService.create({ variables: { data: this.newPublication } })
        .then(response => this.loadPublicationsFunc())
        .then(() => {
          this.newPublication = {}
          this.currentStep = 'congrats'
        })
        .catch((error) => {
          this.errorToshow = error
        }).finally(() => {
          this.onCreated = false
        })
    }
  }
})
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

.switch.small {
  width: 32px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider.small:before {
  height: 12px;
  width: 12px;
}

input:checked + .slider {
  background-color: #03a8df;
}

input:focus + .slider {
  box-shadow: 0 0 1px #03a8df;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

input:checked + .slider.small:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 28px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
