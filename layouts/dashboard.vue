<template>
  <div class="flex w-screen max-w-screen h-screen text-gray-700 font-body">
    <TheDashboardSidenav class="hidden lg:flex" />
    <div :class="isMinified ? 'ml-16' : 'lg:ml-64'" class="flex flex-col w-full">
      <div class="flex items-center justify-between h-16 px-8 w-full -z-10 bg-white">
        <h1 class="text-lg font-medium text-sky-550">
          {{ pageTitle }}
        </h1>
        <div class="flex justify-center items-center space-x-4">
          <button v-if="connectedUser && (connectedUser.user.userType !== 0 && connectedUser.user.userType !== 1)" class="hidden lg:flex btn flex space-x-4 items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-sky-550 text-white rounded hover:bg-blue-920" @click="switchingModalIsOpen = true">
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
                <button v-if="connectedUser && connectedUser.user.userType === userRole.REGULAR_USER" class="flex lg:hidden btn space-x-4 items-center h-10 px-0 font-medium text-sky-550 rounded" @click="switchingModalIsOpen = true">
                  <span class="">Publier une annonce</span>
                  <span class="block icon">
                    <i class="far fa-comment-alt-check" />
                  </span>
                </button>
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
    <div v-if="switchingModalIsOpen" id="switchingModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto absolute flex items-center top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div class="cover absolute bg-black opacity-70 top-0 left-0 w-screen h-screen" />
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Publier une annonce
            </h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="switchingModalIsOpen = false">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Vous devrez accepter nos <NuxtLink to="/CGU" class="font-bold text-black">
                termes et conditions
              </NuxtLink> et nous fournir un RIB afin que vous ne puissiez commencer à enregistrer des offres. Le délai d'étude de votre dossier est de 3 jours ouvrés. Voulez-vous continuer ?
            </p>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button data-modal-toggle="defaultModal" type="button" class="relative text-white bg-sky-550 hover:bg-blue-920 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="switchAccountType">
              <loader v-if="onUpdate" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
              Oui, je continue
            </button>
            <button data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" @click="switchingModalIsOpen = false">
              Non, une prochaine fois
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userRole } from '~/helpers/constants'

export default {
  middleware: 'isAdmin',

  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      addDropdownDismissed: true,
      authUserDropdownOpened: false,
      switchingModalIsOpen: false,
      onUpdate: false
    }
  },

  async fetch () {
    await this.$store.dispatch('account/getAuthUserAccount')
  },
  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    }),

    userRole: () => userRole,

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
      this.onUpdate = true
      this.$api.accountService.updateUser({ variables: { userId: this.connectedUser.user.id, data: { userType: 1 } } })
        .then(() => {
          this.onUpdate = false
          this.switchingModalIsOpen = false
          return this.$auth.logout()
        }).then(() => {
          this.$store.commit('account/setAuthUserAccount', null)
          this.$router.push({ name: 'dashboard-users-confirmation', params: { forward: true } })
        })
        .catch(err => console.log(err))
      // console.log(this.connectedUser)
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
