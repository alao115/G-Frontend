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
export default defineComponent({
  beforeRouteEnter (to, from, next) {
    if (!to.params.searchOpts) { next({ name: 'index' }) }
    next()
  },
  layout: 'website',
  async asyncData ({ params, $api }) {
    const { searchOpts } = params
    const { appartments } = (await $api.appartmentService.searchAppartmentFromREST(searchOpts)).data

    return {
      appartments
    }
  },
  data () {
    return {
      location: '',
      roomQty: 1,
      budgetMin: 0,
      budgetMax: 0,
      // appartments: [],
      appartmentTypes: [],
      searchOpts: this.$route.params.searchOpts || {}
    }
  },
  computed: {
    filteredAppartments () {
      const appartmentsToFilter = this.appartments
      // if (this.location !== '' && this.budgetMin === 0 && this.roomQty === 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location)
      // }
      // if (this.budgetMin !== 0 && this.location === '' && this.roomQty === 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.rent >= this.budgetMin)
      // }
      // if (this.roomQty >= 1 && this.budgetMin === 0 && this.location === '') {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      // }
      // if (this.location !== '' && this.budgetMin !== 0 && this.roomQty === 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && appartment.rent >= this.budgetMin)
      // }
      // if (this.location !== '' && this.budgetMin === 0 && this.roomQty >= 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      // }
      // if (this.location === '' && this.budgetMin !== 0 && this.roomQty >= 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.rent >= this.budgetMin && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      // }
      // if (this.location !== '' && this.budgetMin !== 0 && this.roomQty >= 1) {
      //   appartmentsToFilter = appartmentsToFilter.filter(appartment => appartment.location === this.location && appartment.rent >= this.budgetMin && (appartment.bedrooms + appartment.livingrooms) >= this.roomQty)
      // }
      return appartmentsToFilter
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }

  },
  mounted () {
  },
  created () {
  }
})
</script>

<style scoped>
</style>
