<template>
  <div class="flex-grow px-6 pt-2 main__content">
    <EditVisit
      :visit="visitToEdit"
      :appartment-types="appartmentTypes"
      :load-visits-func="loadVisits"
    />
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
    <div v-if="visits.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
      <h1 class="text-3xl font-bold">
        0 visite trouvée
      </h1>
      <br>
      <p class="text-gray-400">
        Cliquez sur le bouton " + Nv. visite" en haut à gauche pour
        <span class="font-extrabold">programmer une visite</span>.
      </p>
    </div>
    <div v-else class="flex flex-col w-full table__container">
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-2 h-10 px-2 text-xs ml-16 mr-2">
          <!-- <span>ID</span> -->
        </div>
        <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
          <span>APPARTEMENT</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>VISITEUR</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>DATE</span>
        </div>
        <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
      </div>
      <div class="overflow-auto custom__scroll py-4">
        <div v-for="(vis, count) in visits" :key="vis.id" class="visit flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
          <div class="flex items-center w-min px-2">
            <input v-model="selectedVisits" type="checkbox" :value="vis" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex flex-col mx-2">
            <span class="rounded-full h-12 w-12">
              <img :src="vis.appartment.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
            </span>
          </div>
          <div class="flex items-center w-2 px-2 mx-1">
            <span> - </span>
          </div>
          <div class="flex flex-col w-56 px-2 mx-2">
            <p><span>{{ appartmentType(vis.appartment.appartmentType).label }}</span> | <span class="text-gray-400">{{ vis.appartment.bedrooms }} Chambre<span v-if="vis.appartment.bedrooms > 1">s</span> - {{ vis.appartment.livingrooms }} Salon<span v-if="vis.appartment.livingrooms > 1">s</span></span></p>
          </div>
          <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
            <span>{{ vis.appartment.location }}</span>
          </div>
          <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
            <span>{{ `${vis.visitor.firstname} ${vis.visitor.lastname }` }}</span>
          </div>
          <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
            <span>{{ vis.date }}</span>
          </div>
          <div class="hidden lg:flex justify-between items-center w-36 px-2 mx-2">
            <!-- <span>{{ displayVisitStatus[Number(vis.status)] }}</span> -->
            <span :class="vis.archive ? 'bg-red-600' : 'bg-blue-990'" class="px-2 py-1 text-center text-white text-xs rounded-full">{{ displayVisitStatus[Number(vis.status)] }}<span v-if="vis.archive">, archivé</span> </span>
          </div>
          <div class="hidden lg:flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setToEdition({ ...vis })">
            <span class="icon">
              <i class="far fa-edit" />
            </span>
          </div>
          <DeletePrompt :delete-placeholder="() => deleteVisit(vis)" />
        </div>
      </div>
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
        </div>
        <div class="flex items-center w-2 h-10 px-2 text-xs ml-16 mr-2">
          <!-- <span>ID</span> -->
        </div>
        <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
          <span>APPARTEMENT</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>LOCALISATION</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>VISITEUR</span>
        </div>
        <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
          <span>DATE</span>
        </div>
        <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
          <span>STATUS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from 'kkiapay'
import { mapGetters, mapActions } from 'vuex'
import { userRole, visitStatus } from '~/helpers/constants'

export default defineComponent({
  layout: 'dashboard',
  middleware: ({ redirect, $auth }) => {
    if ($auth.user.userType !== userRole.ADMIN) { redirect({ name: 'dashboard-appartements' }) }
  },

  async asyncData ({ $api, store }) {
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['appartmentType/appartmentTypes'].length) {
      await store.dispatch('appartmentType/loadAppartmentTypes')
    }

    if (!store.getters['visit/visits'].length) {
      await store.dispatch('visit/loadVisits')
    }

    return {
    }
  },
  data () {
    return {
      title: 'Visites',
      visitToEdit: { visitorInfos: {} },
      isListLayout: true,
      isFilterTrayOpened: false,
      selectedVisits: [],
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
      visits: 'visit/visits'
    }),

    userRole: () => userRole,

    visitStatus: () => visitStatus,

    displayVisitStatus () {
      return {
        0: 'Non reservé',
        1: 'En attente de paiement',
        2: 'Reservé'
      }
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
    ...mapActions({
      loadVisits: 'visit/loadVisits'
    }),

    setToEdition (visit) {
      this.visitToEdit = visit
    },
    deleteVisit (visit) {
      return this.$api.visitService.delete({ variables: { visitId: visit.id } })
        .then(async () => {
          await this.loadVisits()
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err))
    }
  }
})
</script>

<style>
  .visit .action-link {
    opacity: 0;
  }
  .visit:hover .action-link {
    opacity: 1;
  }
</style>
