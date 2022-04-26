<template>
  <div class="font-body bg-contain bg-center h-screen w-screen pt-32 overflow-x-hidden flex items-center">
    <div class="container w-full px-8 2xl:px-16 xl:px-24 flex flex-col justify-center mx-auto" style="min-height: 516px">
      <h3>Résultats de la recherche</h3>
      <div class="flex">
        <div class="filters w-1/4">
          {{ location }}
        </div>
        <div class="content w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'website',
  data () {
    return {
      location: this.$route.params.location,
      search: {
        location: this.$route.params.location,
        roomQty: this.$route.params.roomQty,
        budgetMin: this.$route.params.budgetMin,
        budgetMax: this.$route.params.budgetMax
      }
    }
  }
}
</script>

<style scoped>
</style>
