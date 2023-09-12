<template>
  <div id="navbar" class="font-body flex w-full items-center flex-shrink-0 px-8 xl:px-36 justify-between fixed bg-white z-50" :class="isMinified === true ? 'h-16 md:h-20' : 'h-24 md:h-32'">
    <NuxtLink to="/" class="">
      <img src="/assets/images/dark_logo_lg.svg" alt="Logo Long Gontché" class="logo">
    </NuxtLink>
    <div :class="connectedUser ? 'lg:flex' : 'lg:block'" class="space-x-4 hidden">
      <NuxtLink to="/" class="text-blue-990 text-lg py-2 mr-4">
        Je cherche
      </NuxtLink>
      <NuxtLink to="/location" class="text-blue-990 text-lg py-2 mr-4">
        Je loue
      </NuxtLink>
      <NuxtLink to="#" class="text-blue-990 text-lg py-2 mr-4">
        Nous contacter
      </NuxtLink>
      <NuxtLink v-if="$nuxt.$route.name === 'location'" to="/auth/signin" class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100" :class="isMinified === true ? 'py-3 px-0 text-base' : 'py-4 text-lg px-0'">
        Publier
      </NuxtLink>
      <template v-if="connectedUser">
        <button class="flex justify-center items-center space-x-2" @click.prevent="authUserDropdownOpened = !authUserDropdownOpened">
          <span class="icon "><i class="fal fa-user-circle fa-2x" /></span>
          <span class="icon"><i class="far fa-caret-down fa-lg" /></span>
        </button>
        <div v-if="authUserDropdownOpened === true" class="absolute max-w-xs flex flex-col w-full p-8 border border-black shadow-lg z-50 bg-white mt-12 right-36">
          <div class="flex flex-col space-y-4">
            <p class="text-sm text-gray-400">
              {{ 'Bonjour, ' + `${connectedUser ? connectedUser.firstname + ' ' + connectedUser.lastname : 'Mr./Mme.'}` }}
            </p>
            <hr>
            <NuxtLink to="/profile" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
              Mon profil
            </NuxtLink>
            <NuxtLink to="/dashboard" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
              Dashboard
            </NuxtLink>
            <hr>
            <a class="nuxt-link-active cursor-pointer" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="() => $auth.logout().then(() => $store.commit('account/setAuthUserAccount', null)) ">
              Se déconnecter
            </a>
          </div>
        </div>
      </template>
      <NuxtLink v-else to="/auth/signin" class="btn shadow-btn-shadow w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg px-10'">
        Se connecter
      </NuxtLink>
    </div>
    <div class="block md:hidden mobile-menu">
      <div class="flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="menuIsOpen = true">
        <span class="icon">
          <i class="fas fa-bars" />
        </span>
      </div>
      <div class="to-animate mobile-widget flex items-end justify-center bg-black bg-opacity-75 w-screen absolute top-0 left-0 z-50" :class="menuIsOpen === true ? 'h-screen fixed' : 'h-0'">
        <div class="to-animate flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow justify-between relative w-full" :class="menuIsOpen === true ? 'h-screen' : 'h-0'">
          <div class="text-start w-full h-full p-4 sm:px-6 lg:p-8 z-50 bg-white relative">
            <div class="flex flex-col items-end">
              <button class="hover:text-blue-730 p-4 relative mx-2" @click.prevent="menuIsOpen = false">
                <span class="icon"><i class="fas fa-times fa-lg" /></span>
              </button>
            </div>
            <div class="grid grid-cols-1 items-center text-center">
              <h4 class="text-4xl font-medium text-blue-990 mb-8 ml-4">
                Menu
              </h4>
              <div class="grid grid-cols-1 space-y-4 ml-4 py-8">
                <a href="/" class="text-gray-400 text-lg" @click="menuIsOpen = false">
                  Je cherche
                </a>
                <a href="/location" class="text-gray-400 text-lg" @click="menuIsOpen = false">
                  Je loue
                </a>
                <a href="#contact" class="text-gray-400 text-lg" @click="menuIsOpen = false">
                  Nous contacter
                </a>
              </div>
              <div class="grid grid-cols-1 space-4 ml-4 py-8">
                <NuxtLink v-if="$nuxt.$route.name === 'location'" to="/auth/signin" class="text-gray-400 text-lg mr-4 px-0" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg lg:px-10'" @click.prevent="goToPage('/signin')">
                  Publier
                </NuxtLink>
                <template v-if="connectedUser">
                  <NuxtLink to="#" class="text-gray-400 text-lg mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'">
                    Mon profil
                  </NuxtLink>
                  <NuxtLink v-if="connectedUser.user.userType !== userRole.REGULAR_USER" to="/dashboard" class="text-gray-400 text-lg mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'">
                    Dashboard
                  </NuxtLink>
                  <a class="text-gray-400 text-lg mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="() => $auth.logout().then(() => $store.commit('account/setAuthUserAccount', null))">
                    Se déconnecter
                  </a>
                </template>
                <NuxtLink v-else to="/auth/signin" class="text-gray-400 text-lg px-0 border" :class="isMinified === true ? 'py-3 px-0 text-base' : 'py-4 text-lg lg:px-0'" @click.prevent="goToPage('/signin')">
                  Se connecter
                </NuxtLink>
              </div>
              <div class="grid grid-cols-1 space-y-4 ml-4 py-2">
                <a href="/cgu" class="text-gray-400 text-sm py-1" @click="menuIsOpen = false">
                  À propos
                </a>
                <a href="/cgu" class="text-gray-400 text-sm py-1" @click="menuIsOpen = false">
                  CGU
                </a>
              </div>
              <div class="grid grid-cols-1 space-y-4 ml-4 py-8">
                <div class="flex space-x-3 mx-auto">
                  <a href="https://facebook.com/GontcheBj/" tagrt="_blank">
                    <span class="icon">
                      <i class="la la-facebook-f text-xl" />
                    </span>
                  </a>
                  <a href="https://twitter.com/gontche/" tagrt="_blank">
                    <span class="icon">
                      <i class="la la-twitter text-2xl" />
                    </span>
                  </a>
                  <a href="https://instagram.com/gontche_bj" tagrt="_blank">
                    <span class="icon">
                      <i class="la la-instagram text-2xl" />
                    </span>
                  </a>
                  <a href="#">
                    <span class="icon">
                      <i class="la la-linkedin-square text-2xl" />
                    </span>
                  </a>
                </div>
                <p class="text-gray-300">
                  © 2021 Gontché
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { userRole } from '~/helpers/constants'

export default defineComponent({
  props: {
    // connectedUser: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  data () {
    return {
      isMinified: false,
      menuIsOpen: false,
      authUserDropdownOpened: false
    }
  },
  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    }),

    userRole: () => userRole
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    // console.log(this.connectedUser)
  },

  methods: {
    handleScroll () {
      // console.log(window.scrollY)
      if (window.scrollY > 100) {
        this.isMinified = true
      } else {
        this.isMinified = false
      }
    },
    goToPage (address) {
      this.$router.push({ path: address })
      this.menuIsOpen = false
    }
  }
})
</script>

<style>
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
