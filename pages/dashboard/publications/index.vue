<template>
  <div class="flex-grow px-6 pt-2 main__content">
    <NewPublication :is-mobile="true" :load-publications-func="loadPublications" :appartment-types="appartmentTypes" :appartments-prop="appartments" />
    <EditPublication :publication="publicationToEdit" :load-publications-func="loadPublications" :appartments-prop="appartments" :appartment-types="appartmentTypes" />
    <div class="relative flex pt-3 pb-0 border-t border-b border-gray-300 justify-between space-x-4">
      <div class="w-full relative">
        <input id="" type="text" class="h-12 px-10 mt-1 mb-4 block w-full border-gray-200 focus:border-blue-75 bg-gray-100 focus:bg-blue-75 focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" :class="isFilterTrayOpened === true ? 'rounded-t-md' : 'rounded-md'" placeholder="Recherche">
        <a class="flex items-center h-12 px-3 mt-1 bg-white border border-gray-200 absolute top-0 right-0" :class="isFilterTrayOpened === true ? 'rounded-tr-md' : 'rounded-r-md'" href="#" @click.prevent="isFilterTrayOpened = !isFilterTrayOpened">
          <span class="ml-3 text-sm font-medium hidden md:visible">Filtres</span>
          <span class="icon ml-3">
            <i class="far fa-chevron-down fa-sm" />
          </span>
        </a>
        <span class="icon w-8 block absolute left-2 top-5 h-9">
          <i class="far fa-search mx-auto block" />
        </span>
      </div>
      <div class="grid grid-cols-2 divide-x-2 divide-gray-300 w-auto">
        <a class="flex items-center h-12 px-3 mt-1 hover:bg-blue-75 justify-end" :class="isListLayout ? 'text-blue-730' : 'text-gray-400'" href="#" @click.prevent="isListLayout = true">
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
    <div v-if="publications.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
      <h1 class="text-3xl font-bold">
        0 publication trouvée
      </h1><br>
      <p class="text-gray-400">
        Cliquez sur le bouton " + Nv. publication" en haut à gauche pour <span class="font-extrabold">publier une annonce</span>.
      </p>
    </div>
    <div v-else class="flex flex-col w-full table__container">
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
          <span>TYPE</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>LOYER</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>ETAT</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>NIVEAU</span>
        </div>
      </div>
      <div class="overflow-auto custom__scroll py-4">
        <div v-for="(pub, count) in publications" :key="pub.id" class="publication flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 cursor-pointer relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
          <div class="flex items-center w-min px-2">
            <input v-model="selectedPublications" type="checkbox" :value="pub" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex flex-col mx-2">
            <span class="rounded-full h-12 w-12">
              <img :src="pub.appartment.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
            </span>
          </div>
          <div class="flex flex-col w-64 px-2 mx-2">
            <p>
              {{ appartmentType(pub.appartment.appartmentType).label }}  <br> <span class="text-gray-400">{{ pub.appartment.bedrooms }} Chambre<span v-if="pub.appartment.bedrooms > 1">s</span> - {{ pub.appartment.livingrooms }} Salon<span v-if="pub.appartment.livingrooms > 1">s</span></span>
              <br>
              <span class="block lg:hidden">{{ pub.date }}</span>
            </p>
          </div>
          <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
            <span>{{ pub.appartment.location }}</span>
          </div>
          <div class="hidden lg:flex flex-col w-20 px-2 mx-2">
            <span>{{ pub.appartment.rent }}</span>
          </div>
          <div class="hidden lg:flex flex-col w-24 px-2 mx-2">
            <span />
          </div>
          <div class="hidden lg:flex flex-col w-24 px-2 mx-2">
            <span />
          </div>
          <div class="hidden lg:flex flex-col w-24 px-2 mx-2">
            <span />
          </div>
          <div class="hidden lg:flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setToEdition(pub)">
            <span class="icon">
              <i class="far fa-edit" />
            </span>
          </div>
          <DeletePrompt :delete-placeholder="() => deletePublication(pub)" />
        </div>
      </div>
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
          <span>TYPE</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-2">
          <span>LOYER</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>ETAT</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
        <div class="hidden lg:flex items-center w-24 h-10 px-2 text-xs mx-2">
          <span>NIVEAU</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'dashboard',
  async asyncData ({ $api, store }) {
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['appartmentType/appartmentTypes'].length) {
      await store.dispatch('appartmentType/loadAppartmentTypes')
    }

    // if (!store.getters['account/accounts'].length) {
    //   await store.dispatch('account/loadAccounts')
    // }

    // if (!store.getters['reservation/reservations'].length) {
    //   await store.dispatch('reservation/loadReservations')
    // }

    if (!store.getters['publication/publications'].length) {
      await store.dispatch('publication/loadPublications')
    }

    // if (!store.getters['visit/visits'].length) {
    //   await store.dispatch('visit/loadVisits')
    // }

    return {
    }
  },
  data () {
    return {
      title: 'Publications',
      publicationToEdit: {},
      isListLayout: true,
      isFilterTrayOpened: false,
      selectedPublications: [],
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
    ...mapGetters({
      appartments: 'appartment/appartments',
      appartmentTypes: 'appartmentType/appartmentTypes',
      publications: 'publication/publications'
      // reservations: 'reservation/reservations',
      // visits: 'visit/visits',
      // accounts: 'account/accounts'
    }),

    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    reservation () {
      return id => this.reservations.find(reservation => reservation.id === id)
    },
    visit () {
      return id => this.visits.find(visit => visit.id === id)
    },
    user () {
      return id => this.users.find(user => user.id === id)
    },
    contract () {
      return id => this.contracts.find(contract => contract.id === id)
    }
  },
  methods: {
    ...mapActions({
      loadPublications: 'publication/loadPublications'
    }),

    setToEdition (publication) {
      this.publicationToEdit = publication
    },
    deletePublication (publication) {
      return this.$api.publicationService.delete({ variables: { publicationId: publication.id } })
        .then(async () => {
          await this.loadPublications()
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>
  .publication .action-link {
    opacity: 0;
  }
  .publication:hover .action-link {
    opacity: 1;
  }
</style>
