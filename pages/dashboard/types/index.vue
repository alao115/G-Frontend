<template>
  <div class="flex-grow px-6 pt-2 main__content">
    <EditAppartmentType :appartment-type="appartmentTypeToEdit" :load-appartment-types-func="loadAppartmentTypes" />
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
        <span class="font-extrabold">créer un type</span>.
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
          <DeletePrompt :delete-placeholder="() => deleteAppartmentType(type)" />
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
import { mapGetters, mapActions } from 'vuex'
import { userRole } from '~/helpers/constants'

export default {
  layout: 'dashboard',
  middleware: ({ redirect, $auth }) => {
    if ($auth.user.userType === userRole.REGULAR_USER) { redirect({ name: 'dashboard-appartements' }) }
  },
  async asyncData ({ $api, store }) {
    // await store.dispatch('appartment/loadAppartments')
    // await store.dispatch('appartmentType/loadAppartmentTypes')
    // await store.dispatch('account/loadAccounts')
    // await store.dispatch('reservation/loadReservations')
    // await store.dispatch('publication/loadPublications')
    // await store.dispatch('visit/loadVisits')
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['appartmentType/appartmentTypes'].length) {
      await store.dispatch('appartmentType/loadAppartmentTypes')
    }

    if (!store.getters['account/accounts'].length) {
      await store.dispatch('account/loadAccounts')
    }

    if (!store.getters['reservation/reservations'].length) {
      await store.dispatch('reservation/loadReservations')
    }

    if (!store.getters['publication/publications'].length) {
      await store.dispatch('publication/loadPublications')
    }

    if (!store.getters['visit/visits'].length) {
      await store.dispatch('visit/loadVisits')
    }

    return {
    }
  },
  data () {
    return {
      title: 'Publications',
      appartmentTypeToEdit: {},
      isListLayout: true,
      isFilterTrayOpened: false,
      selectedTypes: [],
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
      publications: 'publication/publications',
      reservations: 'reservation/reservations',
      visits: 'visit/visits',
      accounts: 'account/accounts'
    }),

    userRole: () => userRole,

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
    ...mapActions({
      loadAppartmentTypes: 'appartmentType/loadAppartmentTypes'
    }),

    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    setToEdition (type) {
      this.appartmentTypeToEdit = type
    },
    deleteAppartmentType (type) {
      return this.$api.appartmentTypeService.delete({ variables: { appartmentTypeId: type.id } })
        .then(() => this.$api.appartmentTypeService.getAll())
        .then(async ({ data }) => {
          await this.loadAppartmentTypes()
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error))
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
