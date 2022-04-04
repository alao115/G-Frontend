<template>
  <div class="flex-grow px-6 pt-2 main__content w-full">
    <NewAppartment :is-mobile="true" :appartment-types="appartmentTypes" :load-appartments-func="loadAppartments" />
    <EditAppartment :appartment="appartmentToEdit" :appartment-types="appartmentTypes" :load-appartments-func="loadAppartments" />
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
    <div v-if="appartments.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
      <h1 class="text-3xl font-bold">
        0 appartement trouvé
      </h1>
      <br>
      <p class="text-gray-400">
        Cliquez sur le bouton " + Nv. appartement" en haut à gauche pour
        <span class="font-extrabold">rajouter un appartement</span>.
      </p>
    </div>
    <div v-else>
      <div v-if="isListLayout" class="flex flex-col table__container w-full">
        <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
          <div class="flex items-center w-min h-10 px-2">
            <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
            <span>TYPE</span>
          </div>
          <div class="hidden lg:flex items-center w-40 h-10 px-4 text-xs mx-1 lg:mx-2">
            <span>LOCALISATION</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>LOYER</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>ETAT</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>STATUS</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>VISITES</span>
          </div>
        </div>
        <div class="overflow-auto custom__scroll py-4">
          <div v-for="(appart, count) in appartments" :key="appart.id" class="appart flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 cursor-pointer relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
            <div class="flex flex-col w-min px-2">
              <input v-model="selectedAppartments" type="checkbox" :value="appart" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex flex-col mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span class="rounded-full h-12 w-12">
                <img :src="appart.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
              </span>
            </div>
            <!-- <div class="flex flex-col w-12 h-10 px-2 mx-1">
              <span>{{ appart.id }}</span>
            </div> -->
            <div class="flex flex-col w-60 lg:w-64 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <p>
                {{ appartmentType(appart.appartmentType).label }} <br>
                <span class="text-gray-400">{{ appart.bedrooms }}
                  <span class="hidden lg:contents">Chambre<span v-if="appart.bedrooms > 1">s</span></span> <span class="inline-block lg:hidden"><!-- <i class="far fa-bed-alt" /> --> Ch. </span> -
                  {{ appart.livingrooms }} <span class="hidden lg:contents">Salon<span v-if="appart.livingrooms > 1">s</span></span> <span class="inline-block lg:hidden"><!-- <i class="far fa-couch" /> --> Salon </span>
                </span>
              </p>
              <p class="lg:hidden">
                {{ appart.rent }} | <span class="text-gray-400">{{ appart.location }}</span>
              </p>
            </div>
            <div class="hidden lg:flex  flex-col w-40 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span>{{ appart.location }}</span>
            </div>
            <div class="hidden lg:flex  flex-col w-20 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span>{{ appart.rent }}</span>
            </div>
            <div class="hidden lg:flex  flex-col w-24 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span />
            </div>
            <div class="hidden lg:flex  flex-col w-20 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span />
            </div>
            <div class="hidden lg:flex  flex-col w-20 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <span>{{ appartVisits(appart.id).length }}</span>
            </div>
            <div class="hidden lg:flex  flex-col w-24 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(appart)">
              <ToggleSwitch />
            </div>
            <div class="hidden lg:flex  flex-col w-20 px-2 mx-1 lg:mx-2">
              <span class="icon cursor:pointer p-2">
                <i class="far fa-calendar-alt" />
              </span>
            </div>
            <div class="hidden lg:flex flex-col px-2 mx-1 lg:mx-2 cursor-pointer action-link" @click.prevent="setToEdition(appart)">
              <span class="icon cursor:pointer p-2">
                <i class="far fa-edit" />
              </span>
            </div>
            <DeletePrompt :delete-placeholder="() => deleteAppartment(appart)" />
          </div>
        </div>
        <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
          <div class="flex items-center w-min h-10 px-2">
            <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
            <span>TYPE</span>
          </div>
          <div class="hidden lg:flex items-center w-40 h-10 px-4 text-xs mx-1 lg:mx-2">
            <span>LOCALISATION</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>LOYER</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>ETAT</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>STATUS</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>VISITES</span>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-3">
        <div v-for="appartmnt in appartments" :key="appartmnt.id" class="card flex flex-col bg-transparent rounded-lg pb-8 lg:mr-8 mb-8 border border-gray-100 hover:p-8 hover:shadow-lg" @click.prevent="toDetails(appartmnt)">
          <img :src="appartmnt.mainImg" alt="">
          <div class="flex flex-col items-start mt-4 px-8 justify-center lg:justify-start">
            <h4 class="text-lg font-medium mb-2">
              {{ appartmnt.type }}
            </h4>
            <div class="flex items-center">
              <span class="icon mr-4 text-sky-450">
                <i class="fas fa-map-marker-alt" />
              </span>
              <label for="#" class="text-md">{{ appartmnt.location }}</label>
            </div>
            <a class="py-3 px-8 leading-none rounded font-medium mt-8 bg-sky-50 text-sm uppercase text-sky-450" href="#">
              {{ appartmnt.rent + 'F CFA' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import path from 'path'
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'dashboard',

  // eslint-disable-next-line require-await
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
      isListLayout: true,
      appartmentToEdit: {},
      isFilterTrayOpened: false,
      selectedAppartments: [],
      contracts: [],
      locations: [],
      timeSlots: [
        [
          'Monday',
          [
            { '8h - 9h': false },
            { '9h - 10h': false },
            { '10h - 11h': false },
            { '11h - 12h': false },
            { '11h - 12h': false },
            { '11h - 12h': false },
            { '11h - 12h': false },
            { '11h - 12h': false },
            { '11h - 12h': false },
            { '11h - 12h': false }
          ]
        ]
      ]
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
    appartVisits () {
      return id => this.visits.filter(visit => visit.appartment === id)
    }
  },
  methods: {
    ...mapActions({
      loadAppartments: 'appartment/loadAppartments'
    }),

    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },
    setToEdition (appartment) {
      this.appartmentToEdit = appartment
    },
    async deleteAppartment (appartment) {
      try {
        await this.$api.appartmentService.delete({ variables: { appartmentId: appartment.id } })
        for await (const key of ['main', 'first', 'second', 'third', 'fourth']) {
          const imgUrl = appartment[`${key}Img`]

          if (imgUrl) {
            const baseUrl = imgUrl.split('?')[0]
            const filename = path.basename(baseUrl)
            const filePath = `appartments/${appartment.id}/${filename}`
            await this.$api.firebaseStorageService.delete({ filePath })
          }

          await this.loadAppartments()
        }
      } catch (error) {
        // console.log(error)
      }
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
