<template>
  <div class="overflow-x-hidden font-body p-8 lg:px-8 lg:py-16">
    <EditAppartment :appartment="appartmentToEdit" />
    <div class="flex space-x-8">
      <!-- <div>
        <img :src="appartment.mainImg !== '' ? appartment.mainImg : ''" alt="" class="w-full pr-4 mb-16">
        <div class="flex space-x-8 lg:w-5/12">
          <img :src="appartment.mainImg !== '' ? appartment.mainImg : ''" alt="">
          <img :src="appartment.mainImg !== '' ? appartment.mainImg : ''" alt="">
        </div>
      </div> -->
      {{ appartment.mainImg }}
      <div class="container flex flex-col items-start lg:w-6/12">
        <div class="content font-body">
          <h4 class="text-2xl font-medium mb-2">
            {{ appartmentType(appartment.appartmentType).label }} <br>
            <span class="text-gray-400 text-sm">{{ appartment.bedrooms }} Chambre<span v-if="appartment.bedrooms > 1">s</span> - {{ appartment.livingrooms }} Salon<span v-if="appartment.livingrooms > 1">s</span></span>
          </h4>
          <div class="flex flex-col absolute top-24 right-8 items-end">
            <button class="flex items-center justify-center w-12 lg:w-14 h-12 md:h-16 p-4 block text-center text-base border rounded-lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="contextMenuIsOpen = !contextMenuIsOpen">
              <p class="leading-none text-left flex flex-col">
                <span v-if="contextMenuIsOpen" class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
                <span v-else class="text-sm mt-1 text-gray-400"><i class="fas fa-ellipsis-v fa-lg" /></span>
              </p>
            </button>
            <div v-if="contextMenuIsOpen" class="absolute flex flex-col mt-14 lg:mt-20 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
              <a class="flex flex-col py-1 px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false, setToEdition(appartment)">
                <span class="font-medium">Modifier</span>
              </a>
              <a class="flex flex-col py-1 px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
                <span class="font-medium">Réserver</span>
              </a>
              <a class="flex flex-col py-1 px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
                <span class="font-medium">Visiter</span>
              </a>
              <NuxtLink to="/dashboard/appartements" class="flex flex-col py-1 px-8 py-4 hover:bg-gray-200">
                <span class="font-medium">Retour</span>
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center">
            <span class="icon mr-4 text-sky-450">
              <i class="fas fa-map-marker-alt" />
            </span>
            <label for="#" class="text-md">{{ appartment.location }}</label>
          </div>
          <h3 class="block text-3xl font-medium mt-4 text-sky-450">
            <span>{{ appartment.rent }} F CFA <sup class="text-sm relative -top-6">TTC</sup></span>
          </h3>
          <div class="grid grid-cols-2 w-min space-x-16 my-4">
            <span class="icon">
              <i class="fab fa-whatsapp text-3xl" />
            </span>
            <span class="icon">
              <i class="far fa-envelope-open-text text-2xl" />
            </span>
          </div>
          <div class="details">
            <h4 class="text-sky-450 text-xl mt-8 mb-4">
              Details
            </h4>
            <p class="font-body text-base mb-8">
              {{ appartment.details }}
            </p>
          </div>
          <div class="rooms w-full pr-4">
            <h4 class="text-sky-450 text-xl mb-4">
              Caractéristiques
            </h4>
            <div class="grid grid-cols-3 md:grid-cols-4 my-4">
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-bed-alt text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.bedrooms }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Chambre(s)
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-couch text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.livingrooms }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Salon (s)
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-oven text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.kitchen }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Cuisine (s)
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.bathrooms }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Salle(s) d'eau
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-cabinet-filing text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.storageroom }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Débarras
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-garage-open text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.garage }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Garage
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-flower-tulip text-sm" /><i class="far fa-flower-daffodil text-sm" /><i class="far fa-flower text-sm" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.garden }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Jardin
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-list-ol text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.floor }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Niveau
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-users text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.householdsTotal }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Voisins
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-2 lg:mr-4">
                    <i class="far fa-air-conditioner text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.ac === true ? 'Oui' : 'Non' }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Climatiseur
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-2 lg:mr-4">
                    <i class="far fa-swimming-pool text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.pool === true ? 'Oui' : 'Non' }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Piscine
                </p>
              </div>
              <div class="w-full pr-4">
                <div class="flex items-center">
                  <span class="icon mr-2 lg:mr-4">
                    <i class="far fa-user-shield text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.keeper === true ? 'Oui' : 'Non' }}</label>
                </div>
                <p class="mb-8 text-gray-400">
                  Gardien
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="rooms w-full">
          <h4 class="text-sky-450 text-xl mt-8 mb-4">
            Conditions
          </h4>
          <div class="grid grid-cols-1 lg:grid-cols-3 my-4">
            <div class="w-full">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ appartment.rent }}</label>
              </div>
              <p class="lg:mt-2 text-gray-400">
                Loyer
              </p>
            </div>
            <div class="w-full mt-2 lg:mt-0">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ 3*appartment.rent }}</label>
              </div>
              <p class="lg:mt-2 text-gray-400">
                {{ appartment.conditions.prepaidRentMonths }} mois d'avance
              </p>
            </div>
            <div class="w-full mt-2 lg:mt-0">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ appartment.conditions.energyCommission }}</label>
              </div>
              <p class="lg:mt-2 text-gray-400">
                Commission Eau / Elec
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-8 pb-16 lg:pb-0">
      <div class="flex flex-col lg:flex-row lg:space-x-8 lg:pr-8">
        <div class="details lg:w-1/2">
          <h4 class="text-sky-450 text-xl mt-8 mb-4">
            Informations sur le propriétaire
          </h4>
          <p class="font-body text-base">
            Maison appartenant à {{ appartment.ownerInfos.name }} vivant au {{ appartment.ownerInfos.address }}
          </p>
          <p class="font-body text-base">
            Contact: {{ appartment.ownerInfos.phone }}
          </p>
          <p class="font-body text-base">
            Email: {{ appartment.ownerInfos.email }}
          </p>
        </div>
        <div class="others bg-sky-50 p-8 mt-4 lg:mt-8 w-full lg:w-1/2 rounded-md">
          <p>
            Les frais de visites s’élève à 2000 f cfa.
            Vous avez la possibilité de 3 visites. Une équipe ets mise à votre disposition pour un service de qualité.
          </p>
        </div>
      </div>
      <div class="space-x-4 mt-12 lg:w-5/12 flex">
        <button class="btn shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-2 text-lg px-10 mr-8 h-12">
          Réserver
        </button>
        <NewVisit :appartment="appartment" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData ({ $api }) {
    const appartments = (await $api.appartmentService.getAll()).data.appartments
    const appartmentTypes = (await $api.appartmentTypeService.getAll()).data.appartmentTypes
    const publications = (await $api.publicationService.getAll()).data.publications
    const reservations = (await $api.reservationService.getAll()).data.reservations
    const visits = (await $api.visitService.getAll()).data.visits
    const accounts = (await $api.accountService.getAll()).data.accounts

    return {
      appartments,
      appartmentTypes,
      publications,
      reservations,
      visits,
      accounts
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      contextMenuIsOpen: false,
      appartmentToEdit: {}
    }
  },
  computed: {
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }
  },
  methods: {
    setToEdition (appartment) {
      this.appartmentToEdit = appartment
    },
    deleteAppartment (appartment) {
      return this.$api.appartmentService.delete({ variables: { appartmentId: appartment.id } })
        .then(() => this.$api.appartmentService.getAll())
        .then(({ data }) => {
          this.appartments = data.appartments
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
