<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="flex flex-col relative bg-white dark:bg-gray-800 rounded-md shadow-btn-shadow mx-auto" style="width: 584px">
        <div class="text-start w-full p-4 pb-0 sm:px-6 lg:p-8 lg:pb-0 relative">
          <div class="flex items-center justify-between">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Valider la demande de visite
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="resetVisitorData">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div v-if="currentStep === 'first'" class="relative">
            <p class="text-base mt-4 text-gray-400 mb-2">
              Appartment
            </p>
            <label class="text-base">
              <span class="texte-lg">{{ visit.appartment && appartmentType(visit.appartment.appartmentType) && appartmentType(visit.appartment.appartmentType).label }}</span> <br>
              <span class="text-blue-990">{{ visit.appartment && (visit.appartment.bedrooms + ' Chambres - ' + visit.appartment.livingrooms + ' Salons') }}</span>
            </label>
            <div class="mt-4">
              <p class="texte-xl text-gray-400 mb-2">
                Visiteur
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-400">
                    Nom
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ visit.visitor && visit.visitor.lastname ? visit.visitor.lastname : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Prénom
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ visit.visitor && visit.visitor.firstname ? visit.visitor.firstname : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Email
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ visit.visitor && visit.visitor.email ? visit.visitor.email : '' }}</label>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400">
                    Téléphone
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-base">{{ visit.visitor && visit.visitor.phone ? visit.visitor.phone : '' }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p class="text-gray-400">
                    Date de visite l'appartement
                  </p>
                  <div class="flex items-center font">
                    <span class="text-base">{{ visit.date && `${visit.date.split(' ')[0]} à ${visit.date.split(' ')[1]}` }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Visite
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                mise à jour avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep !== 'congrats' && !visit.archive" class="footer p-8 flex justify-between w-full bg-white">
          <button type="button" class="relative w-full shadow-btn-shadow border border-transparent py-4 text-lg px-10 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="archiveVisit">
            Archiver
            <loader v-if="onArchiving" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </button>
        </div>
        <div v-else class="footer p-8 flex justify-between w-full bg-white">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="resetVisitorData">
            <span>Fermer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default defineComponent({
  props: {
    visit: {
      type: Object,
      default: null,
      required: true
    },
    isMinified: {
      type: Boolean,
      default: false
    },
    loadVisitsFunc: {
      type: Function,
      required: true
    },
    appartmentTypes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentStep: 'first',
      isDismissed: true,
      onArchiving: false
    }
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }
  },
  watch: {
    visit (value) {
      if (value !== null) {
        this.isDismissed = false
      }
    }
  },
  mounted () {

  },
  methods: {
    resetVisitorData () {
      this.isDismissed = true
      this.currentStep = 'first'
    },

    archiveVisit () {
      this.onArchiving = true

      this.$api.visitService.update({ variables: { visitId: this.visit.id, data: { archive: true } } })
        .then(() => this.loadVisitsFunc())
        .then((response) => {
          this.currentStep = 'congrats'
        })
        .catch((error) => {
          this.errorToshow = error.message
        }).finally(() => {
          this.onArchiving = false
        })
    }
  }
})
</script>
