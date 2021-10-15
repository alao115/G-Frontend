<template>
  <div @click.prevent="toDetails(appartment)" class="card flex flex-col bg-transparent rounded-lg pb-8 mr-8 mb-8 border border-gray-100 hover:p-8 hover:shadow-btn-shadow">
    <!-- <div class="h-40 bg-gray-400 rounded-lg"></div> -->
    <img :src="appartment.mainImg" alt="">
    <div class="flex flex-col items-start mt-4 px-8">
      <h4 class="text-lg font-medium mb-2">
        {{ appartment.type }}
      </h4>
      <div class="flex items-center">
        <span class="icon mr-4 text-sky-450">
          <i class="fas fa-map-marker-alt" />
        </span>
        <label for="#" class="text-md">{{ appartment.location }}</label>
      </div>
      <a class="py-3 px-8 leading-none rounded font-medium mt-8 bg-sky-50 text-sm uppercase text-sky-450" href="#">
        {{ appartment.rent + 'F CFA' }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartment: {
      type: Object
    }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: 'details/:' + appartment.id })
    }
  }
}
</script>

<style scoped>
  img {
    height: 320px;
  }
  .card:nth-child(3n) {
    margin-right: 0 !important;
  }
</style>
