<template>
  <button class="btn shadow-btn-shadow border border-transparent w-full font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-2 text-lg px-10 mr-8 h-12" @click.prevent="() => openKkiapayWidget()">
    Payer ({{ `${amount} Fcfa` }})
    <loader v-if="onUpdating" class="absolute top-1/2 right-2 transform -translate-y-1/2" />
  </button>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    },
    onSuccessHandlerProp: {
      type: Function,
      required: true,
      default: null
    }
  },
  data () {
    return {
      onUpdating: false
    }
  },
  mounted () {
    this.$addKkiapayListener('success', this.successHandler)
  },
  beforeDestroy () {
    this.$removeKkiapayListener('success', this.successHandler)
  },
  methods: {
    openKkiapayWidget () {
      this.$openKkiapayWidget({
        amount: this.amount,
        api_key: 'f8095850886111ec953617ecac48fe09',
        sandbox: true,
        phone: ''
      })
    },

    successHandler () {
      if (this.onSuccessHandlerProp) {
        this.onUpdating = true
        this.onSuccessHandlerProp()
          .finally(() => {
            this.onUpdating = false
          })
      }
    }
  }
}
</script>

<style>

</style>
