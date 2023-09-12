<template>
  <div class="flex-grow px-8 pt-2 main__content w-full">
    <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
      Bonjour, {{ connectedUser.firstname }}
    </h1>
    <p class="text-lg mb-16">Retrouvez ici vos infos profil.</p>
    <p class="text-xl text-gray-400">Nom complet</p>
    <p class="text-2xl font-semibold">{{ connectedUser.firstname + ' ' + connectedUser.lastname }}</p>
    <p class="text-xl text-gray-400 mt-8">Email</p>
    <p class="text-2xl font-semibold">{{ connectedUser.email }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default defineComponent({
  layout: 'dashboard',
  async asyncData ({ store, $api }) {
    if (!store.getters['account/authUserAccount']) {
      await store.dispatch('account/getAuthUserAccount')
    }

    return {

    }
  },
  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    })
  }
})
</script>

<style>

</style>
