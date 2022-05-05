<template>
  <div class="flex w-screen max-w-screen h-screen text-gray-700 font-body">
    <TheDashboardSidenav class="hidden lg:flex" />
    <div :class="isMinified ? 'ml-16' : 'lg:ml-64'" class="flex flex-col w-full">
      <div class="flex items-center justify-between h-16 px-8 w-full -z-10 bg-white">
        <h1 class="text-lg font-medium text-sky-550">
          {{ pageTitle }}
        </h1>
        <div class="flex justify-center items-center space-x-4">
          <button v-if="connectedUser && (connectedUser.user.userType !== 0 && connectedUser.user.userType !== 1)" class="btn flex space-x-4 items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-sky-550 text-white rounded hover:bg-gray-300" @click.prevent="switchAccountType">
            <span class="hidden lg:block">Publier une annonce</span>
            <span class="block icon">
              <i class="far fa-comment-alt-check" />
            </span>
          </button>
          <template v-if="connectedUser">
            <button class="flex justify-center items-center space-x-2" @click.prevent="authUserDropdownOpened = !authUserDropdownOpened">
              <span class="icon "><i class="fal fa-user-circle fa-2x" /></span>
              <span class="icon"><i class="far fa-caret-down fa-lg" /></span>
            </button>
            <div v-if="authUserDropdownOpened === true" class="absolute max-w-xs flex flex-col w-full p-8 border border-black shadow-lg z-50 bg-white mt-12 top-2 right-12">
              <div class="flex flex-col space-y-4">
                <p class="text-sm text-gray-400">
                  {{ 'Bonjour, ' + `${connectedUser ? connectedUser.firstname + ' ' + connectedUser.lastname : 'Mr./Mme.'}` }}
                </p>
                <hr>
                <NuxtLink to="/dashboard/profile" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
                  Mon profil
                </NuxtLink>
                <NuxtLink to="/" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
                  Retour au site
                </NuxtLink>
                <hr>
                <a class="nuxt-link-active cursor-pointer" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="() => $auth.logout().then(() => $store.commit('account/setAuthUserAccount', null)) ">
                  Se déconnecter
                </a>
              </div>
            </div>
          </template>
          <!-- <button class="btn flex space-x-4 items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300" @click="logout">
            <span class="hidden lg:block">Se déconnecter</span>
            <span class="block icon">
              <i class="far fa-sign-out-alt" />
            </span>
          </button> -->
        </div>
      </div>
      <Nuxt class="" />
    </div>
    <TheDashboardBottomBar />
    <div v-if="0" class="flex items-center h-16 border border-gray-300 pr-4 w-full max-w-md shadow-lg font-body absolute right-0 lg:right-2 top-0 lg:top-2 z-10 bg-sky-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class="flex items-center text-white justify-center bg-sky-450 w-12 h-full text-blue-75">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="px-6">
        <h5 class="font-semibold text-sky-450">
          Hey heads up!
        </h5>
        <p class="text-sm">
          You should notice this alert!
        </p>
      </div>
      <button class="ml-auto hover:text-blue-730" @click.prevent="isDismissed = true">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'isAdmin',

  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      addDropdownDismissed: true,
      authUserDropdownOpened: false
    }
  },

  async fetch () {
    await this.$store.dispatch('account/getAuthUserAccount')
  },
  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    }),

    routeName () {
      return this.$nuxt.$route.name
    },
    // connectedUser () {
    //   console.log(this.authUser)
    //   return this.$auth.user
    // },
    pageTitle () {
      let returnableValue
      switch (this.routeName) {
        case 'dashboard-publications':
          returnableValue = 'Publications'
          break
        case 'dashboard-appartements':
          returnableValue = 'Appartements'
          break
        case 'dashboard-reservations':
          returnableValue = 'Réservations'
          break
        case 'dashboard-visites':
          returnableValue = 'Visites'
          break
        case 'dashboard-types':
          returnableValue = 'Types d\'appartement'
          break
        default:
          returnableValue = 'Dashboard'
          break
      }
      return returnableValue
    }
  },
  created () {
    this.$fetch()
    this.$nuxt.$on('is-minified', ($value) => {
      // alert('dans layout dashboard')
      this.isMinified = $value
    })
  },
  methods: {
    switchAccountType () {
      /* eslint-disable no-console */
      console.log('connected user type :=> ' + this.connectedUser.user.userType)
    },
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$store.commit('account/setAuthUserAccount', null)
          this.$router.push({ name: 'index' })
        })
    }
  }
}
</script>
