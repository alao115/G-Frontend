<template>
  <div class="container flex-col bg-white w-full lg:w-10/12 xl:w-9/12 flex justify-center item-center pb-12 mx-auto" style="min-height: 516px">
    <div class="absolute h-1 border-t-8 border-sky-450 w-1/3 -mt-2 -ml-20 top-0" />
    <div class="w-full px-8 lg:px-16">
      <p class="title font-semibold text-3xl mt-24 mb-6 text-sky-450">
        Inscription
      </p>
      <form action="#" class="pt-4">
        <div v-if="currentStep === 'Email'">
          <input type="email" v-model="testEmail" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Entrez votre email">
          <input v-model="newAccount.email" type="email" :class="newAccount.email && newAccount.email !== testEmail ? 'mb-0' : 'mb-12'" class="h-12 md:h-16 px-8 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Confirmez votre email">
          <p v-if="newAccount.email && newAccount.email !== testEmail" class="text-red-300 mt-4 mb-12">Les emails ne correspondent pas</p>
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
            <button type="button" class="w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="currentStep = 'Password'">
              <span>Suivant</span>
            </button>
          </div>
        </div>
        <div v-if="currentStep === 'Password'">
          <input type="password" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Mot de passe">
          <input v-model="newAccount.password" type="password" class="h-12 md:h-16 px-8 mt-1 mb-12 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Confirmer mot de passe">
          <div class="footer py-4  flex justify-between">
            <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep = 'Name'">
              <span>Retour</span>
            </button>
            <button type="button" class="w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="createAccount">
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      </form>
      <p class="text-sm my-12 text-blue-920">
        Vous avez pas déjà un compte ?
        <NuxtLink to="/signin" class="text-blue-300 hover:text-blue-920 font-semibold">
          Connectez-vous !
        </NuxtLink>
      </p>
    </div>
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
      currentStep: 'Email',
      newAccount: {}
    }
  },
  methods: {
    backToSignin () {
      this.$router.push({ path: '/signin' })
    },
    createAccount () {
      this.$api.accountService.signup(this.newAccount)
        .then(() => this.$router.push({ name: 'signin' }))
    }
  }
}
</script>
