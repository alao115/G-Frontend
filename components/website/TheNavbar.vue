<template>
  <div id="navbar" class="font-body flex w-full items-center flex-shrink-0 px-8 xl:px-36 justify-between fixed bg-white" :class="isMinified === true ? 'h-16 md:h-20' : 'h-24 md:h-32'">
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
      <NuxtLink v-if="$nuxt.$route.name === 'location'" to="/auth/signin" class="btn border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg px-10'">
        Publier
      </NuxtLink>
      <template v-if="connectedUser">
        <button class="flex justify-center items-center space-x-2" @click.prevent="authUserDropdownOpened = !authUserDropdownOpened">
          <span class="icon "><i class="fal fa-user-circle fa-2x" /></span>
          <span class="icon"><i class="far fa-caret-down fa-lg" /></span>
        </button>
        <div v-if="authUserDropdownOpened === true" class="absolute max-w-xs flex flex-col w-full p-8 border border-black shadow-lg z-50 bg-white mt-12 right-36">
          <div class="flex flex-col space-y-4">
            <NuxtLink to="#" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
              Mon profil
            </NuxtLink>
            <NuxtLink v-if="connectedUser.userType === 0 || connectedUser.userType === 1" to="/dashboard" class="nuxt-link-active" :class="isMinified === true ? 'text-base' : 'text-lg'">
              Dashboard
            </NuxtLink>
            <a v-else class="nuxt-link-active cursor-pointer" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="$auth.logout()">
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
            <div class="grid grid-cols-1 divide-y items-center">
              <h4 class="text-4xl font-medium text-blue-990 mb-8 ml-4">
                Menu
              </h4>
              <div class="grid grid-cols-1 space-y-4 ml-4 py-8">
                <NuxtLink to="/" class="text-gray-400 text-lg py-2" @click="menuIsOpen = false">
                  Je cherche
                </NuxtLink>
                <NuxtLink to="/location" class="text-gray-400 text-lg py-2" @click="menuIsOpen = false">
                  Je loue
                </NuxtLink>
                <NuxtLink to="#contact" class="text-gray-400 text-lg py-2" @click="menuIsOpen = false">
                  Nous contacter
                </NuxtLink>
              </div>
              <div class="grid grid-cols-1 space-4 ml-4 py-8">
                <NuxtLink v-if="$nuxt.$route.name === 'location'" to="/auth/signin" class="text-gray-400 text-lg py-2 mr-4 px-0" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg lg:px-10'" @click.prevent="goToPage('/signin')">
                  Publier
                </NuxtLink>
                <template v-if="connectedUser">
                  <NuxtLink to="#" class="text-gray-400 text-lg py-2 mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'">
                    Mon profil
                  </NuxtLink>
                  <NuxtLink v-if="connectedUser.userType === 0 || connectedUser.userType === 1" to="/dashboard" class="text-gray-400 text-lg py-2 mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'">
                    Dashboard
                  </NuxtLink>
                  <a v-else class="text-gray-400 text-lg py-2 mr-4 px-0" :class="isMinified === true ? 'text-base' : 'text-lg'" @click.prevent="$auth.logout()">
                    Se déconnecter
                  </a>
                </template>
                <NuxtLink v-else to="/auth/signin" class="text-gray-400 text-lg py-2 mr-4 px-0" :class="isMinified === true ? 'py-3 px-6 text-base' : 'py-4 text-lg lg:px-10'" @click.prevent="goToPage('/signin')">
                  Se connecter
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="footer p-8 flex justify-center absolute w-full bg-white z-20 bottom-0">
            <p class="text-gray-300">
              © 2021 Gontché
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMinified: false,
      menuIsOpen: false,
      authUserDropdownOpened: false
    }
  },
  computed: {
    connectedUser () {
      return this.$auth.user
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
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
}
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
