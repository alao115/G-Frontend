<template>
  <div class="flex-grow px-6 pt-2 main__content">
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
    <div v-if="appartmentTypes.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
      <h1 class="text-3xl font-bold">
        0 type trouvé
      </h1>
      <br>
      <p class="text-gray-400">
        Cliquez sur le bouton " + Nv. publication" en haut à gauche pour
        <span class="font-bold text-blue-920">créer un type</span>.
      </p>
    </div>
    <div v-else class="flex flex-col w-full table__container">
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
          <span>TYPE</span>
        </div>
        <div class="flex items-center w-80 h-10 px-2 text-xs mx-2">
          <span>DESCRIPTION</span>
        </div>
        <div class="flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>APPART.</span>
        </div>
      </div>
      <div class="overflow-auto custom__scroll py-4">
        <div v-for="(type, count) in appartmentTypes" :key="type.id" class="type flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
          <div class="flex flex-col w-min px-2">
            <input v-model="selectedTypes" type="checkbox" :value="type" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <!-- <div class="flex flex-col w-12 h-10 px-2 mx-1">
            <span>{{ appart.id }}</span>
          </div> -->
          <div class="flex flex-col w-56 px-2 mx-2">
            <span>{{ type.label }}</span>
          </div>
          <div class="flex flex-col w-80 h-10 px-2 mx-2">
            <span>{{ type.description }}</span>
          </div>
          <div class="flex flex-col w-20 px-2 mx-2 text-center">
            <span>{{ typeAppartments(type.id).length }}</span>
          </div>
          <div class="flex flex-col w-24 h-10 px-2 mx-2">
            <span />
          </div>
          <!-- <div class="flex flex-col w-36 h-10 px-2 mx-2">
            <span />
          </div>
          <div class="flex flex-col w-36 h-10 px-2 mx-2">
            <span />
          </div> -->
          <div class="flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setToEdition(type)">
            <span class="icon">
              <i class="far fa-edit" />
            </span>
          </div>
          <DeletePrompt />
        </div>
      </div>
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
          <span>TYPE</span>
        </div>
        <div class="flex items-center w-80 h-10 px-2 text-xs mx-2">
          <span>DESCRIPTION</span>
        </div>
        <div class="flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>APPART.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  layout: 'dashboard',
  async asyncData ({ $api }) {
    const appartmentTypes = (await $api.appartmentTypeService.getAll()).data.appartmentTypes
    const appartments = (await $api.appartmentService.getAll()).data.appartments
    const publications = (await $api.publicationService.getAll()).data.publications
    const reservations = (await $api.reservationService.getAll()).data.reservations
    const visits = (await $api.visitService.getAll()).data.visits
    const accounts = (await $api.accountService.getAll()).data.accounts

    return {
      appartmentTypes,
      appartments,
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
      isFilterTrayOpened: false,
      selectedTypes: [],
      users: [
        { id: 1, name: 'RONY', firstname: 'Monsieur', phone: '+22991234567', email: 'monsieur.rony@gmail.com', user: '1', userType: 'admin', favorites: [], likes: [] },
        { id: 2, name: 'CHEGUN', firstname: 'Mouss', phone: '+22998765432', email: 'mouss15@gmail.com', user: '2', userType: 'publisher', favorites: [], likes: [] },
        { id: 2, name: 'ThG', firstname: 'Micrette', phone: '+22965432123', email: 'micress16@gmail.com', user: '3', userType: 'visitor', favorites: [], likes: [] }
      ],
      contracts: [],
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
    },
    typeAppartments () {
      return id => this.appartments.filter(appartment => appartment.appartmentType === id)
    }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    }
  }
}
</script>

<style>
  .type .action-link {
    opacity: 0;
  }
  .type:hover .action-link {
    opacity: 1;
  }
</style>
