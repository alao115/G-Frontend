<template>
  <div class="font-body bg-contain bg-center h-screen w-screen overflow-x-hidden flex items-center">
    <div class="container w-full px-8 2xl:px-16 xl:px-24 mx-auto" style="min-height: 516px">
      <h1 class="text-3xl font-semibold leading-snug">
        Résultats de la recherche
      </h1>
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
  fetch (params) {
    this.location = params.location
    this.roomQty = params.roomQty
    this.budgetMin = params.budgetMin
    this.budgetMax = params.budgetMax
  },
  data () {
    return {
      location: '',
      roomQty: '',
      budgetMin: '',
      budgetMax: ''
    }
  }
}
</script>

<style scoped>
</style>
