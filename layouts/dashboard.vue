<template>
  <div class="flex w-screen max-w-screen h-screen text-gray-700 font-body">
    <TheDashboardSidenav class="hidden lg:block" />
    <div :class="isMinified ? 'ml-16' : 'lg:ml-64'" class="flex flex-col w-full">
      <div class="fixed flex items-center justify-between h-16 px-8 w-full -z-10 bg-white">
        <h1 class="text-lg font-medium text-sky-550">
          {{ pageTitle }}
        </h1>
        <div class="flex justify-center items-center space-x-2">
          <button class="btn flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300" @click="logout">
            <span class="hidden lg:block">Se déconnecter</span>
            <span class="block lg:hidden icon">
              <i class="far fa-sign-out-alt" />
            </span>
          </button>
        </div>
      </div>
      <Nuxt class="pt-16" />
    </div>
    <TheDashboardBottomBar />
    <div class="flex items-center h-16 border border-gray-300 pr-4 w-full max-w-md shadow-lg font-body absolute right-0 lg:right-2 top-0 lg:top-2 z-10 bg-sky-50" :class="isDismissed === true ? 'hidden' : ''">
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
export default {
  middleware: 'isAdmin',

  data () {
    return {
      isLoggedUserDropdownnClosed: true,
      isMinified: false,
      isDismissed: false,
      addDropdownDismissed: true
    }
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    connectedUser () {
      return this.$auth.user
    },
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
    this.$nuxt.$on('is-minified', ($value) => {
      // alert('dans layout dashboard')
      this.isMinified = $value
    })
  },
  methods: {
    logout () {
      this.$auth.logout()
        .then(() => this.$router.push({ name: 'index' }))
    }
  }
}
</script>
