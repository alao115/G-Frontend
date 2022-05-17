<template>
  <div class="flex space-x-8 justify-center">
    <div class="container flex flex-col lg:w-5/12 xl:w-4/12 justify-between" style="min-height: 516px">
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
    <div class="container flex-col bg-white lg:w-5/12 xl:w-4/12 border-t-4 border-blue-730 flex justify-center item-center pb-12 px-16" style="min-height: 516px">
      <div class="w-full">
        <p class="title font-semibold text-3xl mt-32 mb-6 text-sky-450">
          Connexion
        </p>
        <form action="#" class="pt-4">
          <input type="text" class="h-12 md:h-16 px-8 mt-1 mb-4 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Email">
          <input type="password" class="h-12 md:h-16 px-8 mb-4 mt-1 block w-full border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Mot de passe">
          <p class="text-sm mb-12 text-gray-400">
            <NuxtLink to="/password-forgotten" class="text-gray-400 hover:text-blue-920 font-semibold">
              Mot de passe oublié
            </NuxtLink>
          </p>
          <div class="rounded-md shadow w-full lg:w-2/3 xl:w-3/5 mb-8">
            <NuxtLink to="/dashboard" class="shadow-btn-shadow w-full flex items-center justify-center px-8 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 md:py-4 md:text-lg md:px-10">
              Se connecter
            </NuxtLink>
          </div>
        </form>
        <p class="text-sm my-12 text-blue-920">
          Vous n'avez pas encore de compte ?
          <NuxtLink :to="{ name: 'auth-signup' }" class="text-blue-300 hover:text-blue-920 font-semibold">
            Inscrivez-vous !
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    connexionSuccesssfull () {
      this.$router.push({ path: '/:' + true })
    }
  }
}
</script>
