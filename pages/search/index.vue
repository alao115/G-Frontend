<template>
  <div class="font-body bg-contain bg-center h-screen w-screen overflow-x-hidden flex mt-32">
    <div class="container w-full px-8 2xl:px-16 xl:px-24 mx-auto" style="min-height: 516px">
      <h1 class="text-2xl font-semibold leading-snug mb-8">
        Résultats de la recherche
      </h1>
      <div class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <WebsiteRentable
            v-for="appartment in filteredAppartments"
            :key="appartment.id"
            :appartment="appartment"
            :appartment-type="appartmentType(appartment.appartmentType)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'website',
  data () {
    return {
      location: this.$route.query.location || '',
      roomQty: this.$route.query.roomQty || 1,
      budgetMin: this.$route.query.budgetMin || 0,
      budgetMax: this.$route.query.budgetMax,
      appartments: [],
      appartmentTypes: []
    }
  },
  async fetch () {
    if (this.$auth.loggedIn) { await this.$store.dispatch('account/getAuthUserAccount') }
    this.appartments = (await this.$api.appartmentService.getAllAppartmentFromREST()).data.appartments
    this.appartmentTypes = (await this.$api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes
  },
  computed: {
    filteredAppartments () {
      let appartmentsToFilter = this.appartments
      if (this.location !== '' && this.budgetMin === 0 && this.roomQty === 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location)
      }
      if (this.budgetMin !== 0 && this.location === '' && this.roomQty === 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.rent >= this.budgetMin)
      }
      if (this.roomQty >= 1 && this.budgetMin === 0 && this.location === '') {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      }
      if (this.location !== '' && this.budgetMin !== 0 && this.roomQty === 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && appartment.rent >= this.budgetMin)
      }
      if (this.location !== '' && this.budgetMin === 0 && this.roomQty >= 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      }
      if (this.location === '' && this.budgetMin !== 0 && this.roomQty >= 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.rent >= this.budgetMin && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      }
      if (this.location !== '' && this.budgetMin !== 0 && this.roomQty >= 1) {
        appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && appartment.rent >= this.budgetMin && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      }
      return appartmentsToFilter
    },
    computed: {
      appartmentType () {
        return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
      }
    }
  },
  created () {
    /* eslint-disable no-console */
    /* console.log(this.$route.query) */
  }
}
</script>

<style scoped>
</style>
