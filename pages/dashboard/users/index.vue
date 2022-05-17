<template>
  <div class="flex-grow px-6 pt-2 main__content w-full">
    <!-- <NewAppartment :is-mobile="true" />
    <EditAppartment :appartment="appartmentToEdit" /> -->
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
    <div v-if="accounts.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
      <h1 class="text-3xl font-bold">
        0 compte trouvé
      </h1>
      <br>
      <p class="text-gray-400">
        Cliquez sur le bouton " + Nv. utilisateur" en haut à gauche pour
        <span class="font-extrabold">rajouter un utilisateur</span>.
      </p>
    </div>
    <div v-else>
      <!-- {{ connectedUser.email }} -->
      <div v-if="isListLayout" class="flex flex-col w-full table__container">
        <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
          <div class="flex items-center w-min h-10 px-2">
            <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
            <span>NOM COMPLET</span>
          </div>
          <div class="hidden lg:flex items-center w-64 h-10 px-4 text-xs mx-1 lg:mx-2">
            <span>EMAIL</span>
          </div>
          <div class="hidden lg:flex items-center w-32 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>TYPE</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>STATUS</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>DERNIÈRE CONNEX.</span>
          </div>
        </div>
        <div class="overflow-auto custom__scroll py-4">
          <div v-for="(account, count) in accounts" :key="account.id" class="appart flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 cursor-pointer relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
            <div class="flex flex-col w-min px-2">
              <input v-model="selectedAccounts" type="checkbox" :value="account" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex flex-col mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <span class="rounded-full h-12 w-12">
                <img :src="account.picture" alt="" class="rounded-full h-12 w-12 m-0">
              </span>
            </div>
            <div class="flex flex-col w-60 lg:w-64 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <!-- <p>
                {{ userType(account.userType).label }} <br>
              </p> -->
              <p>
                {{ account.firstname + ' ' + account.lastname }}
              </p>
            </div>
            <div class="hidden lg:flex  flex-col w-64 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <span>{{ account.email }}</span>
            </div>
            <div class="hidden lg:flex  flex-col w-32 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <span v-if="account.user">{{ account.user.userType }}</span>
            </div>
            <div class="hidden lg:flex  flex-col w-24 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <span v-if="account.user && account.user.email === connectedUser.email">Connecté</span>
            </div>
            <div class="hidden lg:flex  flex-col w-20 px-2 mx-1 lg:mx-2" @click.prevent="toDetails(account)">
              <span />
            </div>
            <div class="hidden lg:flex flex-col px-2 mx-1 lg:mx-2 cursor-pointer action-link" @click.prevent="setToEdition(account)">
              <span class="icon">
                <i class="far fa-edit" />
              </span>
            </div>
            <DeletePrompt :delete-placeholder="() => deleteUser(account)" />
          </div>
        </div>
        <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
          <div class="flex items-center w-min h-10 px-2">
            <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
          </div>
          <div class="flex items-center w-64 h-10 px-4 text-xs mr-2 ml-16">
            <span>NOM COMPLET</span>
          </div>
          <div class="hidden lg:flex items-center w-40 h-10 px-4 text-xs mx-1 lg:mx-2">
            <span>EMAIL</span>
          </div>
          <div class="hidden lg:flex items-center w-32 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>TYPE</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>STATUS</span>
          </div>
          <div class="hidden lg:flex items-center w-20 h-10 px-2 text-xs mx-1 lg:mx-2">
            <span>DERNIÈRE CONNEX.</span>
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
            <!-- <a class="py-3 px-8 leading-none rounded font-medium mt-8 bg-sky-50 text-sm uppercase text-sky-450" href="#">
              {{ appartment.rent + 'F CFA' }}
            </a> -->
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
  middleware: ({ redirect, $auth }) => {
    if ($auth.user.userType !== 0) { redirect({ name: 'dashboard-appartements' }) }
  },

  // eslint-disable-next-line require-await
  async asyncData ({ $api, store }) {
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['account/accounts'].length) {
      await store.dispatch('account/loadAccounts')
    }

    return {
    }
  },

  data () {
    return {
      title: 'Utilisateurs',
      isListLayout: true,
      appartmentToEdit: {},
      isFilterTrayOpened: false,
      selectedAccounts: [],
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
      accounts: 'account/accounts',
      appartments: 'appartment/appartments'
    }),

    connectedUser () {
      return this.$auth.user
    },
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
      loadAccounts: 'account/loadAccounts'
    }),

    toDetails (account) {
      this.$router.push({ path: '/dashboard/accounts/' + account.id })
    },
    setToEdition (account) {
      this.accountToEdit = account
    },
    async deleteUser (account) {
      try {
        await this.$api.accountService.delete({ variables: { accountId: account.id } })
        for await (const key of ['main', 'first', 'second', 'third', 'fourth']) {
          const imgUrl = account[`${key}Img`]

          if (imgUrl) {
            const baseUrl = imgUrl.split('?')[0]
            const filename = path.basename(baseUrl)
            const filePath = `accounts/${account.id}/${filename}`
            await this.$api.firebaseStorageService.delete({ filePath })
          }
        }
        await this.loadAccounts()
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
