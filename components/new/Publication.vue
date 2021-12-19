<template>
  <div class="contents">
    <a class="flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg px-10" href="#" @click.prevent="isDismissed = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. publication</span>
    </a>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-5/6" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full p-4 sm:px-6 lg:p-8 z-20 relative">
          <h2 class="text-lg font-light text-black dark:text-white font-body">
            <h4 class="text-2xl font-medium mb-8 text-blue-990">
              Nouvelle publication
            </h4>
          </h2>
          <p class="text-base mt-4 text-gray-400">
            Veuillez sélectionner un appartement parmi ceux en attente de publication
          </p>
          <div class="relative inline-block w-full text-gray-700">
            <select class="w-full h-12 md:h-16 my-4 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
              <option v-for="appart in appartments" :key="appart.id">
                <span>{{ appartmentType(appart.appartmentType).label }}</span>
                <span class="text-gray-400">{{ appart.bedrooms + ' Chambres - ' + appart.livingrooms + ' Salons' }}</span>
              </option>
            </select>
          </div>
          <div class="">
            <div class="flex space-x-8">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Date">
              <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Heure">
            </div>
          </div>
          <button type="button" class="py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true">
            Annuler
          </button>
          <button type="button" class="shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920">
            Valider
          </button>
          <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
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
      defaul: false
    }
  },
  data () {
    return {
      isDismissed: true,
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
      locations: [],
      newPublication: {}
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
    }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    }
  }
}
</script>
