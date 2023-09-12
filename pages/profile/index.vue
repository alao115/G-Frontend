<template>
  <h1>Profile</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default defineComponent({
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
