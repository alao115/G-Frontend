<template>
  <div class="container w-full p-16 xl:p-24 pb-8 xl:pb-12 flex flex-col justify-center mx-auto h-1/2 font-body" style="min-height: 516px">
    <div class="text-blue-990 w-5/12 mb-4">
      <h1 class="text-3xl font-semibold leading-snug">
        Trouvez votre prochain lieu de résidence
      </h1>
    </div>
    <div class="flex justify-between">
      <p>Récentes publications</p>
      <NuxtLink to="/home" class="text-blue-990 border-b-2 border-transparent hover:border-blue-990">
        Voir plus
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-3 mt-8">
      <WebsiteRentable
        v-for="appartment in appartments"
        :key="appartment.id"
        :appartment="appartment"
      />
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    appartments: {
      type: Array,
      required: true,
      default: () => ([])
    },
    appartmentTypes: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  data () {
    return {
    }
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
})
</script>
