<template>
  <div class="card relative flex flex-col bg-transparent rounded-lg pb-8 lg:mr-8 mb-8 border border-gray-100 hover:p-8 hover:shadow-lg">
    <!-- <div class="h-40 bg-gray-400 rounded-lg"></div> -->
    <span class="icon h-4 w-4 absolute right-4 top-4 text-white favorite cursor:pointer" @click.prevent="addToFavorite()"><i class="far fa-heart fa-lg" /></span>
    <div @click.prevent="toDetails(appartment)">
      <img :src="appartment.mainImg" alt="">
      <div class="flex flex-col items-start mt-4 px-8 justify-center lg:justify-start">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    appartment: {
      type: Object,
      default: null
    }
  },
  async asyncData ({ $api, store }) {
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['favory/favories'].length) {
      await store.dispatch('favory/loadFavories')
    }

    return {
    }
  },
  data () {
    return {
      onCreated: false,
      newFavory: {
        user: '',
        appartment: this.appartment.id
      }
    }
  },
  computed: {
    connectedUser () {
      return this.$auth.user
    },
    ...mapGetters({
      appartments: 'appartment/appartments',
      favories: 'favory/favories'
    })
  },
  methods: {
    ...mapActions({
      loadAppartments: 'appartment/loadAppartments',
      loadFavories: 'appartment/loadFavories'
    }),
    toDetails (appartment) {
      this.$router.push({ path: '/appartments/' + appartment.id })
    },
    addToFavorite () {
      if (this.connectedUser) {
        this.onCreated = true
        this.newFavory.user = this.connectedUser.id
        this.$api.favoryService.create({ variables: { data: this.newFavory } })
          .then((response) => {
            this.newFavory = {}
            // this.currentStep = 'congrats'
            // await this.loadAppartmentTypesFunc()
          })
          .finally(() => {
            this.onCreated = false
          })
      } else {
        alert('you will be asked to conneect or register')
      }
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
  /* .card .favorite {
    opacity: 0;
    transition: all .2s;
  }
  .card:hover .favorite {
    opacity: 1;
  } */
</style>
