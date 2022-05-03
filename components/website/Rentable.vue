<template>
  <div class="card relative flex flex-col bg-transparent rounded-lg pb-8 lg:mr-8 mb-8 border border-gray-100 hover:p-8 hover:shadow-lg">
    <!-- <div class="h-40 bg-gray-400 rounded-lg"></div> -->
    <template v-if="favoryExisted">
      <span v-if="!onUpdate" class="icon h-8 w-8 absolute right-4 top-4 text-red-400 favorite cursor-pointer flex justify-center items-center" @click.prevent="removeFromFavorite()"><i class="fa fa-heart fa-lg" /></span>
      <span v-else class="icon h-8 w-8 absolute right-4 top-4 text-white favorite cursor-pointer flex justify-center items-center">
        <loader />
      </span>
    </template>
    <template v-else>
      <span v-if="!onCreate" class="icon h-8 w-8 absolute right-4 top-4 text-white favorite cursor-pointer flex justify-center items-center" @click.prevent="addToFavorite()"><i class="far fa-heart fa-lg" /></span>
      <span v-else class="icon h-8 w-8 absolute right-4 top-4 text-white favorite cursor-pointer flex justify-center items-center">
        <loader />
      </span>
    </template>
    <div @click.prevent="toDetails(appartment)">
      <img :src="appartment.mainImg" class="w-full" alt="">
      <h4 class="text-2xl font-medium mb-2">
        {{ appartmentType ? appartmentType.label : '' }} <br>
        <span class="text-gray-400 text-sm">{{ appartment && appartment.bedrooms ? appartment.bedrooms : '' }} Chambre<span v-if="appartment && appartment.bedrooms > 1">s</span> - {{ appartment && appartment.livingrooms }} Salon<span v-if="appartment && appartment.livingrooms > 1">s</span></span>  <span class="text-gray-400 text-sm"> à {{ appartment && appartment.location }}</span>
      </h4>
      <div class="flex flex-col items-start mt-4 px-8 justify-center lg:justify-start">
        <h4 class="text-lg font-medium mb-2">
          {{ appartmentType ? appartmentType.label : '' }}
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
import loader from '../loader.vue'
export default {
  components: { loader },
  props: {
    appartment: {
      type: Object,
      default: null
    },
    appartmentType: {
      type: Object,
      default: null
    }
    // favories: {
    //   type: Array,
    //   // required: true,
    //   default: () => ([])
    // }
  },
  data () {
    return {
      onCreate: false,
      onUpdate: false,
      newFavory: {
        user: '',
        appartment: this.appartment.id
      }
    }
  },
  async fetch () {
    if (!this.$store.getters['favory/favories'].length) {
      await this.loadFavories()
    }
  },
  computed: {
    ...mapGetters({
      favories: 'favory/favories'
    }),
    favoryExisted () {
      return this.favories.find(f => f.id === this.appartment?.id)
    },
    connectedUser () {
      return this.$auth.user
    }
  },
  created () {
    this.$fetch()
  },
  methods: {
    ...mapActions({
      loadFavories: 'favory/loadFavories'
    }),
    toDetails (appartment) {
      this.$router.push({ path: '/appartments/' + appartment.id })
    },
    removeFromFavorite () {
      if (this.connectedUser) {
        this.onUpdate = true
        this.$api.favoryService.delete({ variables: { favoryId: this.favoryExisted.fID } })
          .then(() => this.loadFavories())
          .then(() => {
            this.onUpdate = false
          })
      } else {
        this.$router.push({ name: 'auth-signin' })
      }
    },
    addToFavorite () {
      if (this.connectedUser) {
        this.onCreate = true
        this.newFavory.user = this.connectedUser.id
        this.$api.favoryService.create({ variables: { data: this.newFavory } })
          .then((response) => {
            this.newFavory = {}
            return this.loadFavories()
          })
          .finally(() => {
            this.onCreate = false
          })
      } else {
        this.$router.push({ name: 'auth-signin' })
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
