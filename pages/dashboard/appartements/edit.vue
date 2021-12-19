<template>
  <div class="contents">
    <!-- <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg px-10" href="#" @click.prevent="isDismissed = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. appartment</span>
    </a> -->
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class=" flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-5/6 justify-between" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 pb-0 lg:pb-0 relative">
          <h4 class="text-2xl font-medium mb-8 text-blue-990">
            Nv. location
          </h4>
          <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = first">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <p class="text-lg mt-4 text-gray-600">
            Veuillez remplir ce formulaire pour enregistrer une nouvelle location / vente
          </p>
          <div v-if="currentStep === 'first'" class="first">
            <div class="relative">
              <p class="text-base mt-8 text-gray-400">
                Type
              </p>
              <button class="flex items-center w-full m-h-12 md:h-16 mt-2 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                <span v-if="selectedType === ''" class="leading-none">
                  Choisissez un type
                </span>
                <p v-else class="leading-none text-left flex flex-col">
                  {{ appartment. selectedType.label }}
                  <span class="text-sm mt-1 text-gray-400">{{ appartment. selectedType.description }}</span>
                </p>
                <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="typeSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                <!-- <input class="flex items-center h-8 px-3 text-sm border-b border-black hover:bg-gray-200 focus:outline-none" type="search" name="" id="" placeholder="Search…"> -->
                <a v-for="type in appartmentTypes" :key="type.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedType = type, typeSelectIsOpen = false">
                  {{ appartment. type.label }}
                  <span class="text-gray-400">{{ appartment. type.description }}</span>
                </a>
              </div>
            </div>
            <p class="text-base mt-8 text-gray-400">
              Détails
            </p>
            <textarea v-model="details" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />

            <p class="text-base mt-4 text-gray-400">
              Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model="conditions.rent" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <div class="relative w-2/3">
                <button class="flex items-center w-full m-h-12 md:h-16 mb-4 p-4 block text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="paymentFrequenciesIsOpen = !paymentFrequenciesIsOpen">
                  <span v-if="conditions.paymentFrequency === ''" class="leading-none">
                    Choisissez une fréquence
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ appartment. paymentFrequency(conditions.paymentFrequency).label }}
                    <span class="text-sm mt-1 text-gray-400">{{ appartment. paymentFrequency(conditions.paymentFrequency).description }}</span>
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="paymentFrequenciesIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <!-- <input class="flex items-center h-8 px-3 text-sm border-b border-black hover:bg-gray-200 focus:outline-none" type="search" name="" id="" placeholder="Search…"> -->
                  <a v-for="frequency in paymentFrequencies" :key="frequency.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="conditions.paymentFrequency = frequency, paymentFrequenciesIsOpen = false">
                    {{ appartment. frequency.label }}
                    <span class="text-gray-400">{{ appartment. frequency.description }}</span>
                  </a>
                </div>
              </div>
            </div>
            <p class="text-base mt-4 text-gray-400">
              Caution Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model="conditions.prepaidRentMonths" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <input :value="conditions.prepaidRentMonths * conditions.rent" type="number" class="w-2/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
          </div>
          <div v-if="currentStep === 'second'" class="second">
            <p class="text-2xl mt-12 mb-4 text-gray-400">
              Caratéristiques
            </p>
            <div class="grid grid-cols-2">
              <div class="w-full pr-8 relative">
                <input v-model="features.bedrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-bed-alt fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Chambre(s)
                </p>
              </div>
              <div class="w-full pl-8 relative">
                <input v-model="features.livingrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-couch fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salon(s)
                </p>
              </div>
              <div class="w-full pr-8 relative">
                <input v-model="features.kitchen" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-oven fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Cuisine(s)
                </p>
              </div>
              <div class="w-full pl-8 relative">
                <input v-model="features.bathrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salle(s) d'eau
                </p>
              </div>
              <div class="w-full pr-8 relative">
                <input v-model="features.storageroom" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-cabinet-filing fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Débarras
                </p>
              </div><div class="w-full pl-8 relative">
                <input v-model="features.garage" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-garage-open fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Garage
                </p>
              </div><div class="w-full pr-8 relative">
                <input v-model="features.groundLevel" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-list-ol fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Niveau
                </p>
              </div><div class="w-full pl-8 relative">
                <input v-model="features.householdsTotal" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-3 h-12 w-16 block">
                  <i class="far fa-users fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Voisinage
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer p-4 sm:px-6 lg:p-8">
          <button type="button" class="py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep === 'first' ? isDismissed = true : currentStep === 'second' ? currentStep = 'first' : currentStep = 'second'">
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
      currentStep: 'first',
      isDismissed: false,
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
      appartments: [
        {
          id: 1,
          mainImg: '/assets/images/rentables/example1.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 8,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '+229 60 000000',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 2,
          mainImg: '/assets/images/rentables/example2.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 1,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 3,
          mainImg: '/assets/images/rentables/example3.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 3,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 4,
          appartmentType: 4,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example4.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 4,
          livingrooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 5,
          appartmentType: 2,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example5.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 6,
          appartmentType: 3,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example6.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 3,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          groundLevel: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        }
      ],
      appartmentTypes: [
        { id: 1, label: 'Studio', description: 'Entrée - coucher; Studios' },
        { id: 2, label: 'Appartement', description: 'Appartement d\'au moins une chambre et un salon' },
        { id: 3, label: 'Villa', description: '-' },
        { id: 4, label: 'Duplex', description: '-' }
      ],
      locations: []
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
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    }
  }
}
</script>
