<template>
  <div class="w-screen overflow-x-hidden font-body">
    <WebsiteTheNavbar :connected-user="connectedUser" />
    <div class="pt-8 lg:pt-48 px-8 xl:px-36 max-w-7xl">
      <div class="flex mb-8">
        <h4 class="text-2xl font-medium mb-2">
          {{ appartment && appartmentType(appartment.appartmentType) && appartmentType(appartment.appartmentType).label }} <br>
          <span class="text-gray-400 text-sm">{{ appartment && appartment.bedrooms ? appartment.bedrooms : '' }} Chambre<span v-if="appartment && appartment.bedrooms > 1">s</span> - {{ appartment && appartment.livingrooms }} Salon<span v-if="appartment && appartment.livingrooms > 1">s</span></span>  <span class="text-gray-400 text-sm"> à {{ appartment && appartment.location }}</span>
        </h4>
        <button class="flex items-center justify-center w-12 h-12 p-4 bg-white  text-center text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="goBack()">
          <p class="leading-none text-left flex flex-col">
            <span class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
          </p>
        </button>
        <!-- <div class="flex flex-col absolute top-24 right-8 items-end">
          <button class="flex items-center justify-center w-12 h-12 p-4 bg-white  text-center text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="contextMenuIsOpen = !contextMenuIsOpen">
            <p class="leading-none text-left flex flex-col">
              <span v-if="contextMenuIsOpen" class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
              <span v-else class="text-sm mt-1 text-gray-400"><i class="fas fa-ellipsis-v fa-lg" /></span>
            </p>
          </button>
          <div v-if="contextMenuIsOpen" class="absolute flex flex-col mt-14 lg:mt-20 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
            <a class="flex flex-col py-1 px-8 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false, setToEdition(appartment)">
              <span class="font-medium">Modifier</span>
            </a>
            <a class="flex flex-col py-1 px-8 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
              <span class="font-medium">Réserver</span>
            </a>
            <a class="flex flex-col py-1 px-8 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
              <span class="font-medium">Visiter</span>
            </a>
            <NuxtLink to="/dashboard/appartements" class="flex flex-col px-8 py-4 hover:bg-gray-200">
              <span class="font-medium">Retour</span>
            </NuxtLink>
          </div>
        </div> -->
      </div>
      <div class="flex space-x-8 flex-col md:flex-row">
        <img :src="appartment && appartment.mainImg !== '' ? appartment.mainImg : ''" alt="" class="w-full md:w-1/2 mb-4 md:mb-0">
        <div class="grid grid-cols-3 md:grid-cols-2 gap-8">
          <img :src="appartment && appartment.secondImg !== '' ? appartment.secondImg : ''" alt="" class="">
          <img :src="appartment && appartment.thirdImg !== '' ? appartment.thirdImg : ''" alt="" class="">
          <img :src="appartment && appartment.fourthImg !== '' ? appartment.fourthImg : ''" alt="" class="">
        </div>
      </div>
      <div class="flex lg:space-x-8 flex-col md:flex-row">
        <div class="flex flex-col items-start w-full lg:w-3/5">
          <div class="content font-body">
            <!-- <h3 class="block text-3xl font-medium mt-4 text-sky-450">
              <span>{{ appartment && appartment.rent }} F CFA <sup class="text-sm relative -top-6">TTC</sup></span>
            </h3> -->
            <div class="grid grid-cols-2 w-min space-x-16 my-4">
              <span class="icon">
                <i class="fab fa-whatsapp text-3xl" />
              </span>
              <span class="icon">
                <i class="far fa-envelope-open-text text-2xl" />
              </span>
            </div>
            <div class="details">
              <h4 class="text-sky-450 text-xl mt-8">
                Details
              </h4>
              <p class="font-body text-base mb-8">
                {{ appartment && appartment.details }}
              </p>
            </div>
            <div class="rooms w-full pr-4">
              <h4 class="text-sky-450 text-xl">
                Caractéristiques
              </h4>
              <div class="grid grid-cols-3 md:grid-cols-4 mt-2">
                <div v-if="appartment && appartment.bedrooms" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-bed-alt text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.bedrooms }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Chambre(s)
                  </p>
                </div>
                <div v-if="appartment && appartment.livingrooms" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-couch text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.livingrooms }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Salon (s)
                  </p>
                </div>
                <div v-if="appartment && appartment.kitchen" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-oven text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.kitchen }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Cuisine (s)
                  </p>
                </div>
                <div v-if="appartment && appartment.bathrooms" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.bathrooms }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Salle(s) d'eau
                  </p>
                </div>
                <div v-if="appartment && appartment.storageroom" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-cabinet-filing text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.storageroom }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Débarras
                  </p>
                </div>
                <div v-if="appartment && appartment.garage" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-garage-open text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.garage }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Garage
                  </p>
                </div>
                <div v-if="appartment && appartment.garden" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-flower-tulip text-sm" /><i class="far fa-flower-daffodil text-sm" /><i class="far fa-flower text-sm" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.garden }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Jardin
                  </p>
                </div>
                <div v-if="appartment && appartment.floor" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-list-ol text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.floor }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Niveau
                  </p>
                </div>
                <div v-if="appartment && appartment.householdsTotal" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-4">
                      <i class="far fa-users text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.householdsTotal }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Voisins
                  </p>
                </div>
                <div v-if="appartment && appartment.ac" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-2 lg:mr-4">
                      <i class="far fa-air-conditioner text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.ac === true ? 'Oui' : 'Non' }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Climatiseur
                  </p>
                </div>
                <div v-if="appartment && appartment.pool" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-2 lg:mr-4">
                      <i class="far fa-swimming-pool text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.pool === true ? 'Oui' : 'Non' }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Piscine
                  </p>
                </div>
                <div v-if="appartment && appartment.keeper" class="w-full pr-4">
                  <div class="flex items-center">
                    <span class="icon mr-2 lg:mr-4">
                      <i class="far fa-user-shield text-xl" />
                    </span>
                    <label for="#" class="text-xl">{{ appartment && appartment.keeper === true ? 'Oui' : 'Non' }}</label>
                  </div>
                  <p class="mb-8 text-gray-400">
                    Gardien
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="details lg:w-1/2">
            <h4 class="text-sky-450 text-xl mt-8 mb-4">
              Informations sur le propriétaire
            </h4>
            <p class="font-body text-base">
              Maison appartenant à {{ appartment && appartment.ownerInfos.name }} vivant au {{ appartment && appartment.ownerInfos.address }}
            </p>
            <p class="font-body text-base">
              Contact: {{ appartment && appartment.ownerInfos.phone }}
            </p>
            <p class="font-body text-base">
              Email: {{ appartment && appartment.ownerInfos.email }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-2/5">
          <div class="others p-8 mt-4 lg:mt-8 w-full rounded-md border border-gray-400">
            <div class="">
              <h4 class="text-sky-450 text-xl mb-4">
                Conditions
              </h4>
              <div class="grid md:grid-cols-1 lg:grid-cols-2">
                <div class="w-auto mb-4">
                  <p class="text-gray-400">
                    Loyer
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-xl font-semibold">{{ appartment && appartment.rent }}</label>
                  </div>
                </div>
                <div v-if="appartment.forShortStay === false" class=" mt-2 lg:mt-0 mb-4">
                  <p class="text-gray-400">
                    {{ appartment && appartment.conditions.prepaidRentMonths }} mois d'avance
                  </p>
                  <div class="flex items-center font">
                    <label v-if="appartment && appartment.rent" for="#" class="text-xl font-semibold">{{ 3*appartment.rent }}</label>
                  </div>
                </div>
              </div>
              <div class=" mt-2 lg:mt-0 mb-4">
                <p class="text-gray-400">
                  Commission Eau / Elec
                </p>
                <div class="flex items-center font">
                  <label for="#" class="text-xl font-semibold">{{ appartment && appartment.conditions.energyCommission }}</label>
                </div>
              </div>
            </div>
            <button class="btn shadow-btn-shadow border border-transparent w-full font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-2 text-lg px-10 mr-8 h-12">
              Réserver
            </button>
          </div>
          <div class="others bg-sky-50 p-8 mt-4 lg:mt-8 w-full rounded-md">
            <p class="mb-4">
              Les frais de visites s’élève à 1500 f cfa par visite. Une équipe est mise à votre disposition pour un service de qualité.
            </p>
            <NewVisit
              :appartments-prop="appartments"
              :appartment-types="appartmentTypes"
              :load-visits-func="() => {}"
            />
          </div>
        </div>
      </div>
    </div>
    <WebsitePublications :in-details="true" :appartments="appartments" :appartment-types="appartmentTypes" />
    <WebsiteTheFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData ({ $api, $auth, store }) {
    if ($auth.loggedIn) { await store.dispatch('account/getAuthUserAccount') }
    const appartments = (await $api.appartmentService.getAllAppartmentFromREST()).data.appartments
    const appartmentTypes = (await $api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes

    return {
      appartments,
      appartmentTypes
    }
  },

  data () {
    return {
      id: this.$route.params.id,
      contextMenuIsOpen: false,
      appartments: [],
      appartmentTypes: []
    }
  },
  // async fetch () {
  //   if (this.$auth.loggedIn) { await this.$store.dispatch('account/getAuthUserAccount') }

  //   this.appartments = (await this.$api.appartmentService.getAllAppartmentFromREST()).data.appartments
  //   this.appartmentTypes = (await this.$api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes
  // },

  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    }),
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
