<template>
  <div class="container flex-col bg-white w-full lg:w-5/12 xl:w-4/12 flex justify-center item-center pb-12 mx-auto">
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
    <div class="absolute h-1 border-t-8 border-sky-450 w-1/3 -mt-2 -ml-20 top-0" />
    <div class="w-full px-8 lg:px-16">
      <p class="title font-semibold text-3xl mt-24 mb-6 text-sky-450">
        Inscription
      </p>
      <form action="#" class="pt-4">
        <div v-if="currentStep === 'Email'">
          <input v-model="testEmail" type="email" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Entrez votre email">
          <input v-model="newAccount.email" type="email" :class="newAccount.email && newAccount.email !== testEmail ? 'mb-0' : 'mb-12'" class="h-12 md:h-16 px-8 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Confirmez votre email">
          <p v-if="newAccount.email && newAccount.email !== testEmail" class="text-red-300 mt-4 mb-12">
            Les emails ne correspondent pas
          </p>
          <div class="footer py-4  flex justify-between">
            <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="backToSignin">
              <span>Annuler</span>
            </button>
            <button type="button" :class="newAccount.email !== testEmail ? 'cursor-not-allowed bg-gray-100 text-gray-400' : ' text-white bg-sky-550 hover:bg-blue-920 shadow-btn-shadow border border-transparent'" class="w-1/2 py-4 text-sm px-8 leading-none rounded font-medium" @click.prevent="newAccount.email === testEmail ? currentStep = 'Name' : ''">
              <span>Suivant</span>
            </button>
          </div>
        </div>
        <div v-if="currentStep === 'Name'">
          <input v-model="newAccount.firstname" type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Nom">
          <input v-model="newAccount.lastname" type="text" class="h-12 md:h-16 px-8 mt-1 mb-12 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Prénom(s)">
          <div class="footer py-4  flex justify-between">
            <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep = 'Email'">
              <span>Retour</span>
            </button>
            <button type="button" :class="(newAccount.firstname && newAccount.firstname !== '') || (newAccount.lastname && newAccount.lastname !== '') ? 'text-white bg-sky-550 hover:bg-blue-920 shadow-btn-shadow border border-transparent' : 'cursor-not-allowed bg-gray-100 text-gray-400'" class="w-1/2 py-4 text-sm px-8 leading-none rounded font-medium" @click.prevent="currentStep = 'Password'">
              <span>Suivant</span>
            </button>
          </div>
        </div>
        <div v-if="currentStep === 'Password'">
          <input v-model="testPassword" type="password" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Mot de passe">
          <input v-model="newAccount.password" type="password" :class="newAccount.password && newAccount.password !== testPassword ? 'mb-0' : 'mb-12'" class="h-12 md:h-16 px-8 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Confirmer mot de passe">
          <p v-if="newAccount.password && newAccount.password !== testPassword" class="text-red-300 mt-4 mb-12">
            Les mots de passe ne correspondent pas
          </p>
          <div class="footer py-4  flex justify-between">
            <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep = 'Name'">
              <span>Retour</span>
            </button>
            <button type="button" :class="newAccount.password !== testPassword ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'relative text-white bg-sky-550 hover:bg-blue-920 shadow-btn-shadow border border-transparent'" class="w-1/2 py-4 text-sm px-8 leading-none rounded font-medium" @click.prevent="newAccount.password === testPassword ? createAccount() : ''">
              <span>Enregistrer</span>
              <loader v-if="onSignup" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
            </button>
          </div>
        </div>
      </form>
      <p class="text-sm my-12 text-blue-920">
        Vous avez pas déjà un compte ? <br class="md:hidden">
        <NuxtLink to="/auth/signin" class="text-blue-300 hover:text-blue-920 font-semibold">
          Connectez-vous !
        </NuxtLink>
      </p>
    </div>
    <NuxtLink to="/" class="text-gray-300 underline decoration-2 underline-offset-8">
      Retour à l'accueil
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    toSecond: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      testEmail: '',
      testPassword: '',
      currentStep: 'Email',
      newAccount: {},
      isDismissed: true,
      errorToShow: '',
      notificationToShow: '',
      onSignup: false
    }
  },
  methods: {
    backToSignin () {
      this.$router.push({ path: '/signin' })
    },
    createAccount () {
      this.onSignup = true
      this.$api.accountService.signup({ ...this.newAccount })
        .then(({ data }) => {
          this.$store.commit('customAuth/setSuccessSignup', true)
          this.$router.push({ name: 'auth-signup-success' })
        })
        .catch((error) => {
          if (error) {
            this.errorToShow = error?.response?.data.error.message || error.message
            this.isDismissed = false
          }
        }).finally(() => {
          this.onSignup = false
        })
    }
  }
}
</script>
