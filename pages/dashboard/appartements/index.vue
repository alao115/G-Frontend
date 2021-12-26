<template>
  <div class="flex-grow px-6 pt-2 main__content">
    <EditAppartment :appartment="appartmentToEdit" />
    <div class="relative flex pt-3 pb-0 border-t border-b border-gray-300">
      <div class="w-full relative">
        <input id="" type="text" class="h-12 px-10 mt-1 mb-4 block w-full border-gray-200 focus:border-blue-75 bg-gray-100 focus:bg-blue-75 focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" :class="isFilterTrayOpened === true ? 'rounded-t-md' : 'rounded-md'" placeholder="Recherche">
        <a class="flex items-center h-12 px-3 mt-1 bg-white border border-gray-200 absolute top-0 right-0" :class="isFilterTrayOpened === true ? 'rounded-tr-md' : 'rounded-r-md'" href="#" @click.prevent="isFilterTrayOpened = !isFilterTrayOpened">
          <span class="ml-3 text-sm font-medium">Filtres</span>
          <span class="icon ml-3">
            <i class="far fa-chevron-down fa-sm" />
          </span>
        </a>
        <span class="icon w-8 block absolute left-2 top-5 h-9">
          <i class="far fa-search mx-auto block" />
        </span>
      </div>
      <div class="grid grid-cols-2 divide-x-2 divide-gray-300">
        <a class="flex items-center h-12 px-3 mt-1 ml-2 hover:bg-blue-75" :class="isListLayout ? 'text-blue-730' : 'text-gray-400'" href="#" @click.prevent="isListLayout = true">
          <span class="icon w-6 block">
            <i class="far fa-th-list mx-auto block fa-lg" />
          </span>
        </a>
        <a class="flex items-center h-12 px-3 mt-1 hover:bg-blue-75" :class="isListLayout ? 'text-gray-400' : 'text-blue-730'" href="#" @click.prevent="isListLayout = false">
          <span class="icon w-6 block">
            <i class="far fa-th-large mx-auto block fa-lg" />
          </span>
        </a>
      </div>
    </div>
    <div v-if="appartments.length === 0" class="flex flex-col w-full items-center justify-center">
      0 appartement
    </div>
    <div v-else class="flex flex-col w-full table__container">
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-56 h-10 px-4 text-xs mr-2 ml-16">
          <span>TYPE</span>
        </div>
        <div class="flex items-center w-40 h-10 px-4 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>LOYER</span>
        </div>
        <div class="flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>ETAT</span>
        </div>
        <div class="flex items-center w-36 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
        <div class="flex items-center w-48 h-10 px-2 text-xs mx-2">
          <span>NIVEAU</span>
        </div>
      </div>
      <div class="overflow-auto custom__scroll py-4">
        <div v-for="appart in appartments" :key="appart.id" class="appart flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 cursor-pointer">
          <div class="flex flex-col w-min h-10 px-2" @click.prevent="toDetails(appart)">
            <input v-model="selectedAppartments" type="checkbox" :value="appart" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex flex-col mx-2" @click.prevent="toDetails(appart)">
            <span class="rounded-full h-12 w-12">
              <img :src="appart.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
            </span>
          </div>
          <!-- <div class="flex flex-col w-12 h-10 px-2 mx-1">
            <span>{{ appart.id }}</span>
          </div> -->
          <div class="flex flex-col w-56 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span>{{ appartmentType(appart.appartmentType).label }}</span>
            <p class="text-gray-400">
              {{ appart.bedrooms }} Chambre<span v-if="appart.bedrooms > 1">s</span> - {{ appart.livingrooms }} Salon<span v-if="appart.livingrooms > 1">s</span>
            </p>
          </div>
          <div class="flex flex-col w-40 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span>{{ appart.location }}</span>
          </div>
          <div class="flex flex-col w-20 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span>{{ appart.rent }}</span>
          </div>
          <div class="flex flex-col w-24 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span />
          </div>
          <div class="flex flex-col w-36 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span />
          </div>
          <div class="flex flex-col w-36 h-10 px-2 mx-2" @click.prevent="toDetails(appart)">
            <span />
          </div>
          <!-- <div class="flex flex-col h-10 px-2 mx-2 cursor-pointer" @click.prevent="setToEdition(appart)"> -->
          <div class="flex flex-col h-10 px-2 mx-2 cursor-pointer action-link">
            <span class="icon">
              <i class="far fa-edit" />
            </span>
          </div>
          <!-- <div class="flex flex-col h-10 px-2 mx-2 cursor-pointer" @click.prevent="delete(appart)"> -->
          <div class="flex flex-col h-10 px-2 mx-2 cursor-pointer action-link">
            <span class="icon">
              <i class="far fa-trash" />
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-56 h-10 px-4 text-xs mr-2 ml-16">
          <span>TYPE</span>
        </div>
        <div class="flex items-center w-40 h-10 px-4 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>LOYER</span>
        </div>
        <div class="flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>ETAT</span>
        </div>
        <div class="flex items-center w-36 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
        <div class="flex items-center w-48 h-10 px-2 text-xs mx-2">
          <span>NIVEAU</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  layout: 'dashboard',

  // eslint-disable-next-line require-await
  async asyncData ({ $api }) {
    const appartments = (await $api.appartmentService.getAll()).data.appartments
    const appartmentTypes = (await $api.appartmentTypeService.getAll()).data.appartmentTypes
    const publications = (await $api.publicationService.getAll()).data.publications
    const reservations = (await $api.reservationService.getAll()).data.reservations
    const visits = (await $api.visitService.getAll()).data.visits
    const accounts = (await $api.accountService.getAll()).data.accounts

    return {
      appartments,
      appartmentTypes,
      publications,
      reservations,
      visits,
      accounts
    }
  },

  data () {
    return {
      title: 'Publications',
      isListLayout: true,
      appartmentToEdit: {},
      isFilterTrayOpened: false,
      selectedAppartments: [],
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
  head () {
    return {
      title: this.title
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
    },
    setToEdition (appartment) {
      this.appartments = appartment
    }
  }
}
</script>

<style>
  .appart .action-link {
    opacity: 0;
  }
  .appart:hover .action-link {
    opacity: 1;
  }
</style>
