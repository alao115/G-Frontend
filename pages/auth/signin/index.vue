<template>
  <div class="flex items-center h-screen bg-blue-920 font-body">
    <div class="cover" />
    <div class="container mx-auto">
      <div class="flex lg:space-x-8 justify-center">
        <div class="container flex-col lg:w-5/12 xl:w-4/12 justify-between hidden lg:flex" style="min-height: 516px">
          <GontcheLogo />
          <div class="text-white">
            <h1 class="text-2xl lg:text-3xl xl:text-5xl font-bold">
              Prêt pour une nouvelle aventure
            </h1>
            <p class="text-lg lg:text-xl xl:text-3xl mt-6">
              Un logement pour tous.
            </p>
          </div>
          <div class="copyright text-white lg:mt-10 xl:mt-16">
            <p>
              © 2021 Gontché
            </p>
            <div class="flex space-x-3">
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-facebook-f text-2xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-twitter text-3xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-instagram text-3xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-linkedin-square text-3xl" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="container flex-col bg-white w-full lg:w-5/12 xl:w-4/12 flex justify-center item-center pb-12 relative" style="min-height: 516px">
          <div v-if="errorToShow" class="w-full text-white bg-red-500 absolute top-0" :class="isDismissed === true ? 'hidden' : ''">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
              <div class="flex">
                <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
                <p class="mx-3">
                  {{ errorToShow }}
                </p>
              </div>
              <button class="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" @click="isDismissed = true">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div v-if="notificationToShow" class="w-full text-white bg-green-500 absolute top-0" :class="isDismissed === true ? 'hidden' : ''">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
              <div class="flex">
                <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
                <p class="mx-3">
                  {{ notificationToShow }}
                </p>
              </div>
              <button class="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" @click="isDismissed = true">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div class="w-full px-8 lg:px-16">
            <p class="title font-semibold text-3xl mt-32 mb-6 text-sky-450">
              Connexion
            </p>
            <form class="pt-4" @submit.prevent="loginUser">
              <input v-model.trim="user.email" type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
              <input v-model="user.password" type="password" class="h-12 md:h-16 px-8 mb-4 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Mot de passe">
              <p class="text-sm mb-12 text-gray-400">
                <NuxtLink to="/auth/password-forgotten" class="text-gray-400 hover:text-blue-920 font-semibold">
                  Mot de passe oublié
                </NuxtLink>
              </p>
              <div class="rounded-md shadow w-full">
                <button class="relative shadow-btn-shadow w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 md:py-4 md:text-lg md:px-10" :disabled="onSignin">
                  Se connecter
                  <loader v-if="onSignin" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
                </button>
              </div>
            </form>
            <p class="text-sm my-12 text-blue-920">
              Vous n'avez pas encore de compte ?
              <NuxtLink to="/auth/signup" class="text-blue-300 hover:text-blue-920 font-semibold">
                Inscrivez-vous !
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import loader from '~/components/loader.vue'

export default {
  components: { loader },
  middleware: 'isloggedIn',
  data () {
    return {
      user: {},
      isDismissed: true,
      // errorToShow: '',
      notificationToShow: ''
    }
  },
  computed: {
    ...mapGetters({
      onSignin: 'customAuth/onSignin',
      errorToShow: 'customAuth/signinError'
    })
  },
  methods: {
    ...mapMutations({
      setOnSignin: 'customAuth/setOnSignin',
      setSigninError: 'customAuth/setSigninError'
    }),

    loginUser () {
      this.setOnSignin(true)

      this.$auth.loginWith('customStrategy', { data: this.user })
        .then((response) => {
          /* this.notificationToShow = 'Connection réussie' */
          switch (this.$auth.user.emailVerified) {
            case false:
              this.$auth.logout()
              // console.log('Redirecting...')
              this.$router.push({ name: 'auth-signup-request-email-verification', params: { email: this.user.email } })
              break
            case true:
              this.$store.dispatch('account/getAuthUserAccount')
              this.setOnSignin(false)
              this.$router.push({ name: 'dashboard' })
              break
          }
        })
        .catch((error) => {
          this.setOnSignin(false)
          const message = error?.response?.data.error.message || error.message
          this.setSigninError(message)
          this.isDismissed = false
        })
    }
  }
}
</script>

<style scoped>
  .cover{
    position: absolute;
    width: 100%; height: 100%;
    opacity: 1; z-index: 0;
    background-image: url('/assets/images/bg_icon.svg');
    background-position: bottom right;
    background-size: 60%;
    background-repeat: no-repeat;
  }
  .container {
    z-index: 1;
  }
</style>
