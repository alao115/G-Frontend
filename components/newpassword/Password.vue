<template>
  <div class="container flex-col bg-white lg:w-10/12 xl:w-9/12 border-t-4 border-blue-730 flex justify-center item-center pb-12 px-16 mx-auto" style="min-height: 516px">
    <div class="absolute h-1 border-t-8 border-sky-450 w-2/3 -mt-2 -ml-20 top-0" />
    <div class="w-full">
      <p class="title font-semibold text-3xl mt-24 mb-6 text-sky-450">
        Nouveau mot de passe
      </p>
      <form action="#" class="pt-4">
        <input v-model.trim="passwordData.password" type="password" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Mot de passe">
        <input v-model.trim="passwordData.confirmed" type="password" class="h-12 md:h-16 px-8 mt-1 mb-12 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Confirmer mot de passe">
        <div class="flex space-x-8">
          <div class="rounded-md shadow w-2/5 mb-8 mx-auto">
            <NuxtLink to="/auth/signin" class="shadow-sm w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-sky-550 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
              annuler
            </NuxtLink>
          </div>
          <div class="rounded-md shadow w-3/5 mb-8 mx-auto">
            <button class="relative shadow-btn-shadow w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-swhite md:py-4 md:text-lg md:px-10" :disabled="onRequest || passwordData.password !== passwordData.confirmed" @click.prevent="onPasswordReset">
              terminer
              <loader v-if="onRequest" class="ml-4 absolute top-1/2 right-2 transform -translate-y-1/2" />
            </button>
          </div>
        </div>
      </form>
      <!-- <p class="text-sm my-12 text-blue-920">
        Vous avez pas déjà un compte ?
        <NuxtLink to="/signin" class="text-blue-300 hover:text-blue-920 font-semibold">
          Connectez-vous !
        </NuxtLink>
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toFirst: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      passwordData: {
        confirmed: ''
      },
      onRequest: false
    }
  },
  methods: {
    onPasswordReset () {
      this.onRequest = true
      this.$api.authService.resetPassword({ password: this.passwordData.confirmed, email: this.$store.getters['customAuth/passwordEmailVerificationResponse'].email })
        .then(({ data }) => {
          // console.log(data)
          this.onRequest = false
          this.$router.push({ name: 'auth-password-forgotten-success-new-password', params: { success: !!data.success } })
        // eslint-disable-next-line node/handle-callback-err
        }).catch((error) => {
          this.onRequest = false
          // console.log(error)
        })
    }
  }
}
</script>
