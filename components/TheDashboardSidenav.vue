<template>
  <div class="fixed flex flex-col lg:flex items-center h-screen overflow-hidden text-gray-700 rounded border-r-2 border-gray-200 flex-none z-50 justify-between" :class="isMinified === true ? 'w-16' : 'w-64'">
    <div class="w-full relative">
      <div class="w-full">
        <a class="flex items-center w-full h-16 px-2" href="#" @click.prevent="isMinified = !isMinified, $nuxt.$emit('is-minified', isMinified)">
          <img v-if="isMinified" src="/assets/images/logo.png" alt="" class="logo" style="height: 24px">
          <img v-else src="/assets/images/dark_logo_lg.svg" alt="" class="logo" style="height: 24px">
        </a>
      </div>
      <div class="w-full px-2">
        <div class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
          <template v-if="connectedUser.userType !== userRole.REGULAR_USER ">
            <NewPublication v-if="routeName === 'dashboard-publications'" :isMinified="isMinified" :load-publications-func="loadPublications" :appartment-types="appartmentTypes" :appartments-prop="appartments" />
            <NewAppartment v-if="routeName === 'dashboard-appartements'" :isMinified="isMinified" :load-appartments-func="loadAppartments" :appartment-types="appartmentTypes" />
            <NewAppartmentType v-if="routeName === 'dashboard-types'" :isMinified="isMinified" :load-appartment-types-func="loadAppartmentTypes" />
            <!-- <NewVisit
              v-if="routeName === 'dashboard-visites'"
              :appartments-prop="appartments"
              :publications-prop="publications"
              :appartment-types="appartmentTypes"
              is-minisfied="isMinified"
              :load-visits-func="loadVisits"
            /> -->
            <!-- <NewReservation v-if="routeName === 'dashboard-reservations'" is-minisfied="isMinified" :load-reservations-func="loadReservations" :appartment-types="appartmentTypes" :appartments-prop="appartments" /> -->
          </template>

          <NuxtLink to="/dashboard/appartements" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
            <span class="icon w-6 block">
              <i class="far fa-house mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Appartements</span>
          </NuxtLink>
          <!-- <a href="#" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75" @click.prevent="toFavoris">
            <span class="icon w-6 block">
              <i class="far fa-heart mx-auto block" />
            </span>
            <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Favoris</span>
          </a> -->
          <template v-if="connectedUser.userType === userRole.ADMIN">
            <NuxtLink to="/dashboard/types" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
              <span class="icon w-6 block">
                <i class="far fa-tags mx-auto block" />
              </span>
              <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Types d'appart</span>
            </NuxtLink>
          </template>
        </div>

        <template v-if="1">
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
              <span v-if="connectedUser.userType === userRole.PUBLISHER" class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Mes réservations</span>
              <span v-else class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Réservations</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/visites" class="flex items-center relative w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75">
              <span class="icon w-6 block">
                <i class="far fa-calendar-day mx-auto block" />
              </span>
              <span v-if="connectedUser.userType === userRole.PUBLISHER" class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Mes visites</span>
              <span v-else class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Visites</span>
            </NuxtLink>
          </div>
          <div v-if="connectedUser.userType === userRole.ADMIN" class="flex flex-col items-center w-full mt-2 py-2 border-t border-gray-300">
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
    <!-- <template v-if="connectedUser">
      <div class="relative w-full">
        <button class="flex justify-center items-center space-x-2 h-16 border-t" @click.prevent="authUserDropdownOpened = !authUserDropdownOpened">
          <span class="icon "><i class="fal fa-user-circle fa-2x" /></span>
          <span class="w-full">{{ `${connectedUser.user ? connectedUser.user.firstname + ' ' + connectedUser.user.lastname : 'Mr./Mme.'}` }}</span>
          <span class="icon"><i class="far fa-caret-down fa-lg" /></span>
        </button>
        <div v-if="authUserDropdownOpened === true" class="absolute max-w-xs flex flex-col w-full p-8 border border-black shadow-lg z-50 bg-white mt-12">
          <div class="flex flex-col space-y-4">
            <NuxtLink to="/profile" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
              Mon profil
            </NuxtLink>
            <hr>
            <a class="nuxt-link-active cursor-pointer" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="() => $auth.logout().then(() => $store.commit('account/setAuthUserAccount', null)) ">
              Se déconnecter
            </a>
          </div>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script>
/* eslint-disable vue/attribute-hyphenation */
import { mapGetters, mapActions } from 'vuex'
import { userRole } from '~/helpers/constants'

export default {
  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      appartmentToVisit: {},
      menuIsOpen: false,
      authUserDropdownOpened: false
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
      loadAppartments: 'appartment/loadAppartments',
      loadReservations: 'reservation/loadReservations',
      loadVisits: 'visit/loadVisits',
      loadPublications: 'publication/loadPublications',
      loadAccounts: 'account/loadAccounts'
    }),
    toFavoris () {
      this.$router.push({ path: '/dashboard/appartements/', query: { favory: true } })
    }
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
  #navbar {
    transition: all .5s;
  }
  #navbar a.btn {
    transition: all .5s;
  }
  .logo {
    height: 28px;
  }

  a.text-lg.nuxt-link-exact-active.nuxt-link-active {
    border-bottom: 2px solid #0e265b;
    color: #0e265b;
  }
</style>
