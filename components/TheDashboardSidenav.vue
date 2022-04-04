<template>
  <div class="fixed flex flex-col items-center h-full overflow-hidden text-gray-700 rounded border-r-2 border-gray-200 flex-none" :class="isMinified === true ? 'w-16' : 'w-64'">
    <div class="w-full px-2">
      <a class="flex items-center w-full h-16" href="#" @click.prevent="isMinified = !isMinified, $nuxt.$emit('is-minified', isMinified)">
        <img v-if="isMinified" src="/assets/images/logo.png" alt="" class="logo" style="height: 24px">
        <img v-else src="/assets/images/dark_logo_lg.svg" alt="" class="logo" style="height: 24px">
      </a>
    </div>
    <div class="w-full px-2">
      <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
        <template v-if="connectedUser">
          <NewPublication v-if="routeName === 'dashboard-publications'" is-minisfied="isMinified" :load-publications-func="loadPublications" :appartment-types="appartmentTypes" :appartments-prop="appartments" />
          <NewAppartment v-if="routeName === 'dashboard-appartements'" is-minisfied="isMinified" :load-appartments-func="loadAppartments" :appartment-types="appartmentTypes" />
          <NewAppartmentType v-if="routeName === 'dashboard-types'" is-minisfied="isMinified" :load-appartment-types-func="loadAppartmentTypes" />
          <NewVisit
            v-if="routeName === 'dashboard-visites'"
            :appartments-prop="appartments"
            :appartment-types="appartmentTypes"
            is-minisfied="isMinified"
            :load-visits-func="loadVisits"
          />
          <NewReservation v-if="routeName === 'dashboard-reservations'" is-minisfied="isMinified" :load-reservations-func="loadReservations" :appartment-types="appartmentTypes" :appartments-prop="appartments" />
        </template>

        <template v-if="connectedUser.userType === 0 || connectedUser.userType === 1">
          <NuxtLink to="/dashboard/appartements" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-house mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Appartements</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/types" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-tags mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Types d'appart</span>
          </NuxtLink>
        </template>
      </div>

      <template v-if="connectedUser.userType === 0">
        <div class="flex flex-col items-center w-full border-t border-gray-300">
          <NuxtLink to="/dashboard/publications" class="flex items-center relative w-full h-12 px-3 my-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75 active:bg-sky-50">
            <span class="icon w-6 block">
              <i class="far fa-bullhorn mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Publications</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/reservations" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-house-user mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réservations</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/visites" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-calendar-day mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Visites</span>
          </NuxtLink>
        </div>
        <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
          <NuxtLink to="/dashboard" class="flex items-center relative w-full h-12 px-3 mt-2 rounded text-blue-730">
            <span class="icon w-6 block">
              <i class="far fa-chart-bar mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Statistiques</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/users" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-users mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Utilisateurs</span>
          </NuxtLink>
          <a class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200" href="#">
            <span class="icon w-6 block">
              <i class="far fa-cog mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réglages</span>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      appartmentToVisit: {}
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

    connectedUser () {
      return this.$auth.user
    },

    routeName () {
      return this.$nuxt.$route.name
    }
  },
  methods: {
    ...mapActions({
      loadAppartmentTypes: 'appartmentType/loadAppartmentTypes',
      loadAppartments: 'appartmentType/loadAppartments',
      loadReservations: 'reservation/loadReservations',
      loadVisits: 'visit/loadVisits',
      loadPublications: 'publication/loadPublications',
      loadAccounts: 'account/loadAccounts'
    })
  }
}
</script>

<style scoped>
.logo {
  height: 48px;
}
a.nuxt-link-exact-active.nuxt-link-active {
  background-color: #e8f9ff;
  color: #0e265b;
}
</style>
