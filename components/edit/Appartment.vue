<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class=" flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-5/6 justify-between relative" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 pb-0 lg:pb-0 relative">
          <h4 class="text-2xl font-medium mb-8 text-blue-990">
            Éditer l'appartement
          </h4>
          <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <p class="text-lg mt-4 text-gray-600">
            Modifier les informations de cet appartement
            <!-- {{ appartment }} -->
            <!-- je ne comprends toujours pas -->
          </p>
          <div v-if="currentStep === 'first'" class="first overflow-scroll h-4/5 pb-16 pr-4">
            <div class="relative">
              <p class="text-base mt-8 text-gray-400">
                Type
              </p>
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                <span v-if="!appartment.appartmentType" class="leading-none">
                  Choisissez un type
                </span>
                <p v-else class="leading-none text-left flex flex-col">
                  {{ appartment.appartmentType && appartmentType(appartment.appartmentType).label }}
                  <span class="text-sm mt-1 text-gray-400">{{ appartment.appartmentType && appartmentType(appartment.appartmentType).description }}</span>
                </p>
                <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="typeSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                <a v-for="type in appartmentTypes" :key="type.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="appartToEdit.appartmentType = type.id, typeSelectIsOpen = false">
                  {{ type.label }}
                  <span class="text-gray-400">{{ type.description }}</span>
                </a>
              </div>
            </div>
            <!-- <p class="text-base mt-8 text-gray-400">
              Détails
            </p>
            <textarea v-model="appartment.details" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />
            <p class="text-base mt-4 text-gray-400">
              Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model.number="appartment.rent" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <div class="relative w-2/3">
                <button class="flex items-center w-full m-h-12 md:h-16 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="paymentFrequenciesIsOpen = !paymentFrequenciesIsOpen">
                  <span v-if="selectedPaymentFrequency === ''" class="leading-none">
                    Choisissez une fréquence
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ selectedPaymentFrequency.label }}
                    <span class="text-sm mt-1 text-gray-400">{{ selectedPaymentFrequency.description }}</span>
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="paymentFrequenciesIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a v-for="frequency in paymentFrequencies" :key="frequency.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedPaymentFrequency = frequency, paymentFrequenciesIsOpen = false">
                    {{ frequency.label }}
                    <span class="text-gray-400">{{ frequency.description }}</span>
                  </a>
                </div>
              </div>
            </div>
            <p class="text-base mt-4 text-gray-400">
              Caution Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model.number="appartment.conditions.prepaidRentMonths" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <input :value="appartment.conditions.prepaidRentMonths * appartment.rent" type="number" class="w-2/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
            <div class="relative col-span-2 mb-8">
              <p class="text-base mt-1 text-gray-400">
                Localisation
              </p>
              <input v-model="appartment.location" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Long, Lat.">
            </div> -->
          </div>
          <!-- <div v-if="currentStep === 'second'" class="second">
            <p class="text-2xl mt-12 mb-4 text-gray-400 font-normal">
              Caratéristiques
            </p>
            <div class="grid grid-cols-2">
              <div class="w-full pr-4 relative">
                <input v-model.number="appartment.bedrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-bed-alt fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Chambre(s)
                </p>
              </div>
              <div class="w-full pl-4 relative">
                <input v-model.number="appartment.livingrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-couch fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salon(s)
                </p>
              </div>
              <div class="w-full pr-4 relative">
                <input v-model.number="appartment.kitchen" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-oven fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Cuisine(s)
                </p>
              </div>
              <div class="w-full pl-4 relative">
                <input v-model.number="appartment.bathrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salle(s) d'eau
                </p>
              </div>
              <div class="w-full pr-4 relative">
                <input v-model.number="appartment.storageroom" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-cabinet-filing fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Débarras
                </p>
              </div><div class="w-full pl-4 relative">
                <input v-model.number="appartment.garage" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-garage-open fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Garage
                </p>
              </div><div class="w-full pr-4 relative">
                <input v-model.number="appartment.groundLevel" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-list-ol fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Niveau
                </p>
              </div><div class="w-full pl-4 relative">
                <input v-model.number="appartment.householdsTotal" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-users fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Voisinage
                </p>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'third'" class="third overflow-scroll h-4/5 pb-16 pr-4">
            <p class="text-2xl mt-12 text-gray-400 font-normal">
              Infos sur le propriétaire
            </p>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-8 text-gray-400">
                  Civilité
                </p>
                <button class="flex items-center w-full m-h-12 md:h-16 mt-2 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="civilitySelectIsOpen = !civilitySelectIsOpen">
                  <span v-if="selectedCivility === ''" class="leading-none">
                    Choisissez un type
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ selectedCivility.value }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="civilitySelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a v-for="civility in civilities" :key="civility.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedCivility = civility, civilitySelectIsOpen = false">
                    {{ civility.value }}
                  </a>
                </div>
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-8 text-gray-400">
                  Est vivant(e)
                </p>
                <button class="flex items-center w-full m-h-12 md:h-16 mt-2 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="livingStatusSelectIsOpen = !livingStatusSelectIsOpen">
                  <span v-if="ownerInfos && ownerInfos.isAlive === ''" class="leading-none">
                    -
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ ownerInfos && ownerInfos.isAlive && ownerInfos.isAlive === true ? "Vivant(e)" : 'Décédé(e)' }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="livingStatusSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="ownerInfos.isAlive = true, livingStatusSelectIsOpen = false">
                    Vivant(e)
                  </a>
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="ownerInfos.isAlive = false, livingStatusSelectIsOpen = false">
                    Décédée(e)
                  </a>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-1 text-gray-400">
                  Prénom
                </p>
                <input v-model="ownerInfos.firstname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Prénom">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Nom
                </p>
                <input v-model="ownerInfos.lastname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Nom">
              </div>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-1 text-gray-400">
                  Téléphone
                </p>
                <input v-model="ownerInfos.phone" type="number" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Téléphone">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Email
                </p>
                <input v-model="ownerInfos.email" type="email" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Email">
              </div>
            </div>
            <div class="w-full relative">
              <p class="text-base mt-1 text-gray-400">
                Adresse
              </p>
              <textarea v-model="ownerInfos.address" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />
            </div>
            <div class="retative">
              <a href="#" class="text-gray-400 hover:" @click.prevent="currentStep='photos'">Rajouter les photos maintenant</a>
            </div>
          </div>
          <div v-if="currentStep === 'photos'" class="photos">
            <p class="text-2xl mt-12 text-gray-400 font-normal">
              Photos de l'appartememnt
            </p>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-xl my-12 text-blue-920 text-center">
                Nouvel appartement ajouté avec succès
              </p>
            </div>
          </div> -->
        </div>
        <div class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4 mt-8" @click.prevent="currentStep === 'first' ? isDismissed = true : currentStep === 'second' ? currentStep = 'first' : currentStep = 'second'">
            <span v-if="currentStep === 'first'">Annuler</span>
            <span v-else>Retour</span>
          </button>
          <button type="button" class="shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920" @click.prevent="currentStep === 'first' ? currentStep = 'second' : currentStep = 'third'">
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartment: {
      type: Object,
      default () {}
    },
    isMinified: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      appartToEdit: null,
      currentStep: 'first',
      isDismissed: true,
      typeSelectIsOpen: false,
      paymentFrequenciesIsOpen: false,
      selectedType: '',
      details: '',
      isFurnished: false,
      advancePayment: 0,
      paymentFrequencies: [
        { id: 1, value: 'Month', label: 'Par mois', description: 'Paimements par mois' },
        { id: 2, value: 'Week', label: 'Par semaine', description: 'Paiements par semaine' },
        { id: 3, value: 'Day', label: 'Par jour', description: 'Paiements par jour' },
        { id: 4, value: 'Night', label: 'Par nuit', description: 'Paiements à la nuité' }
      ],
      features: {
        bedrooms: 0,
        livingrooms: 0,
        kitchen: 0,
        bathrooms: 0,
        storageroom: 0,
        garage: 0,
        garden: 0,
        groundLevel: 0,
        householdsTotal: 0,
        ac: 'Non',
        pool: 'Non',
        keeper: 'Non'
      },
      conditions: {
        rent: 0,
        paymentFrequency: 1,
        energyCommission: 0,
        prepaidRentMonths: 3
      },
      selectedPaymentFrequency: '',
      ownerInfos: {
        name: '',
        address: '',
        status: '',
        phone: '',
        email: ''
      },
      publications: [
        { id: 1, date: '', appartment: 1, isNew: true, publisher: 1, status: '', views: 0 },
        { id: 2, date: '', appartment: 2, isNew: true, publisher: 2, status: '', views: 0 },
        { id: 3, date: '', appartment: 3, isNew: true, publisher: 3, status: '', views: 0 },
        { id: 4, date: '', appartment: 4, isNew: true, publisher: 4, status: '', views: 0 },
        { id: 5, date: '', appartment: 5, isNew: true, publisher: 5, status: '', views: 0 },
        { id: 6, date: '', appartment: 6, isNew: true, publisher: 6, status: '', views: 0 }
      ],
      reservations: [
        { id: 1, date: '', user: 1, appartment: 1, reservationStatus: '' }
      ],
      visits: [
        { id: 1, date: '', user: 1, appartment: 2, visitStatus: '' }
      ],
      users: [
        { id: 1, name: 'RONY', firstname: 'Monsieur', phone: '+22991234567', email: 'monsieur.rony@gmail.com', user: '1', userType: 'admin', favorites: [], likes: [] },
        { id: 2, name: 'CHEGUN', firstname: 'Mouss', phone: '+22998765432', email: 'mouss15@gmail.com', user: '2', userType: 'publisher', favorites: [], likes: [] },
        { id: 2, name: 'ThG', firstname: 'Micrette', phone: '+22965432123', email: 'micress16@gmail.com', user: '3', userType: 'visitor', favorites: [], likes: [] }
      ],
      contracts: [],
      appartments: [],
      appartmentTypes: [],
      locations: []
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
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    reservation () {
      return id => this.reservations.find(reservation => reservation.id === id)
    },
    visit () {
      return id => this.visits.find(visit => visit.id === id)
    },
    /* appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    }, */
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
    },
    appartment (value) {
      if (value !== null) {
        this.isDismissed = false
      }
    }
  },
  created () {
    this.appartToEdit = this.appartment
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },

    editAppartment () {
      this.$api.appartmentService.update({ variables: { appartmentId: this.appartToEdit.id, data: this.appartToEdit } })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
