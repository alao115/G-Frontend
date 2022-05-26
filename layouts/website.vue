<template>
  <div class="w-screen overflow-x-hidden">
    <WebsiteTheNavbar :connected-user="connectedUser" />
    <Nuxt />
    <WebsiteHomeAdvantages />
    <WebsitePublications :in-home-page="false" :in-index="true" :appartments="appartments" :favories="favories" :appartment-types="appartmentTypes" />
    <WebsiteContactSection />
    <WebsiteHomeCookies />
    <WebsiteTheFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      appartments: [],
      favories: [],
      appartmentTypes: []
    }
  },

  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    })
  },

  // eslint-disable-next-line vue/order-in-components
  async fetch () {
    if (this.$auth.loggedIn) { await this.$store.dispatch('account/getAuthUserAccount') }

    this.appartments = (await this.$api.appartmentService.getAllAppartmentFromREST()).data.appartments
    this.appartmentTypes = (await this.$api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes
  },

  mounted () {
    this.$fetch()
  }
}
</script>

<style scoped>
  .cover{
    position: absolute;
    width: 100%; height: 100%;
    opacity: .1; z-index: 0;
    background-image: url('/assets/images/bg-motif.svg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .container {
    z-index: 1;
  }
</style>
