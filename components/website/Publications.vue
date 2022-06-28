<template>
  <div class="md:container w-full p-8 pb-8 lg:py-36 lg:px-0 2xl:p-36 xl:pb-12 xl:pt-32 flex flex-col justify-center md:mx-auto h-1/2 font-body" style="min-height: 516px">
    <form v-if="inHomePage" action="#" class="form text-blue-990 bg-sky-10 p-4 rounded-md">
      <div class="flex divide-x divide-gray-320 justify-between">
        <input type="text" class="px-8 mr-4 block w-full bg-transparent border-transparent focus:border-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Affinez vos recherches de logement">
        <NuxtLink to="#" class="shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-white py-4 text-lg px-10">
          Rechercher
        </NuxtLink>
      </div>
    </form>
    <div v-if="inIndex" class="text-blue-920 w-full lg:w-5/12 mb-4">
      <h1 class="text-3xl font-semibold leading-snug">
        Trouvez votre prochain lieu de résidence
      </h1>
    </div>
    <div v-if="inIndex" class="flex justify-between">
      <p>Récentes publications</p>
      <NuxtLink to="/home" class="text-blue-990 border-b-2 border-transparent hover:border-blue-990">
        Voir plus
      </NuxtLink>
    </div>
    <div v-if="inDetails" class="text-blue-990 w-full lg:w-7/12 mt-8 lg:mb-4">
      <h1 class="text-2xl lg:text-3xl font-semibold leading-snug">
        Autres appartements du même type
      </h1>
    </div>
    <div class="grid lg:grid-cols-3 gap-8 mt-8">
      <WebsiteRentable
        v-for="appartmnt in appartments"
        :key="appartmnt.id"
        :appartment="appartmnt"
        :favories="favories"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartments: {
      type: Array,
      required: true,
      default: () => ([])
    },
    favories: {
      type: Array,
      // required: true,
      default: () => ([])
    },
    appartmentTypes: {
      type: Array,
      required: true,
      default: () => ([])
    },
    inIndex: {
      type: Boolean,
      default: false
    },
    inHomePage: {
      type: Boolean,
      default: false
    },
    inDetails: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    typeAppartments () {
      return id => this.appartments.filter(appartment => appartment.appartmentType === id)
    },
    listOfTypes () {
      const returnedListOfTypes = []
      this.appartmentTypes.forEach((type) => {
        // console.log(this.typeAppartments(type.id))
        if (this.typeAppartments(type.id).length > 0) {
          returnedListOfTypes.push(type)
        }
      })
      return returnedListOfTypes
    }
  }
}
</script>
