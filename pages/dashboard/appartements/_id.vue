<template>
  <div class="overflow-x-hidden font-body p-8 lg:px-8">
    <EditAppartment :appartment="appartmentToEdit" :load-appartments-func="() => {}" :appartment-types="appartmentTypes" />
    <div class="">
      <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <!-- <li v-if="connectedUser.userType !== 2" class="mr-2"> -->
          <li class="mr-2">
            <a href="#" :class="activeTab === 'infos' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page" @click.prevent="activeTab = 'infos'">
              <span class="icon mr-2"><i class="far fa-info-circle" /></span> <span class="hidden lg:block">Infos</span>
            </a>
          </li>
          <li v-if="connectedUser.userType === 0" class="mr-2">
          <!-- <li v-if="connectedUser.userType === 0 || connectedUser.id === publication.publisher.user.id" class="mr-2"> -->
          <!-- <li v-if="connectedUser.userType === 0 || connectedUser.userType === 1" class="mr-2"> -->
            <a href="#" :class="activeTab === 'visites' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" @click.prevent="activeTab = 'visites'">
              <span class="icon mr-2"><i class="far fa-calendar-day" /></span> <span class="hidden lg:block">Visites</span>
            </a>
          </li>
          <li v-if="connectedUser.userType === 0" class="mr-2">
          <!-- <li v-if="connectedUser.userType === 0 || connectedUser.id === publication.publisher.user.id" class="mr-2"> -->
          <!-- <li v-if="connectedUser.userType === 0 || connectedUser.userType === 1" class="mr-2"> -->
            <a href="#" :class="activeTab === 'reservations' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" @click.prevent="activeTab = 'reservations'">
              <span class="icon mr-2"><i class="far fa-house-user" /></span> <span class="hidden lg:block">Réservations</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="flex mb-8">
        <h4 class="text-2xl font-medium mb-2">
          {{ appartmentType(appartment.appartmentType).label }} <br>
          <span class="text-gray-400 text-sm">{{ appartment.bedrooms }} Chambre<span v-if="appartment.bedrooms > 1">s</span> - {{ appartment.livingrooms }} Salon<span v-if="appartment.livingrooms > 1">s</span></span>  <span class="text-gray-400 text-sm"> à {{ appartment.location }}</span>
        </h4>
        <div class="flex flex-col absolute top-24 right-8 items-end">
          <button class="flex items-center justify-center w-12 h-12 p-4 bg-white text-center text-base border -lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="contextMenuIsOpen = !contextMenuIsOpen">
            <p class="leading-none text-left flex flex-col">
              <span v-if="contextMenuIsOpen" class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
              <span v-else class="text-sm mt-1 text-gray-400"><i class="fas fa-ellipsis-v fa-lg" /></span>
            </p>
          </button>
          <div v-if="contextMenuIsOpen" class="absolute flex flex-col mt-14 lg:mt-20 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
            <a class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false, setToEdition(appartment)">
              <span class="font-medium">Modifier</span>
            </a>
            <NewTimeSlot :in-detail="true" />
            <a class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
              <span class="font-medium">Réserver</span>
            </a>
            <a class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false">
              <span class="font-medium">Visiter</span>
            </a>
            <NuxtLink to="/dashboard/appartements" class="flex flex-col px-8 py-4 hover:bg-gray-200">
              <span class="font-medium">Retour</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'infos'">
        <div class="flex space-x-8 flex-col md:flex-row">
          <img :src="appartment.mainImg !== '' ? appartment.mainImg : ''" alt="" class="w-full md:w-1/2 mb-4 md:mb-0">
          <div class="grid grid-cols-3 md:grid-cols-2 gap-8">
            <img :src="appartment.secondImg !== '' ? appartment.secondImg : ''" alt="" class="">
            <img :src="appartment.thirdImg !== '' ? appartment.thirdImg : ''" alt="" class="">
            <img :src="appartment.fourthImg !== '' ? appartment.fourthImg : ''" alt="" class="">
          </div>
        </div>
        <div class="flex lg:space-x-8 flex-col md:flex-row">
          <div class="flex flex-col items-start w-full lg:w-3/5">
            <div class="content font-body">
              <!-- <h3 class="block text-3xl font-medium mt-4 text-sky-450">
                <span>{{ appartment.rent }} F CFA <sup class="text-sm relative -top-6">TTC</sup></span>
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
                  {{ appartment.details }}
                </p>
              </div>
              <div class="rooms w-full pr-4">
                <h4 class="text-sky-450 text-xl">
                  Caractéristiques
                </h4>
                <div class="grid grid-cols-3 md:grid-cols-4 mt-2">
                  <div v-if="appartment.bedrooms" class="w-full pr-4">
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
                  <div v-if="appartment.livingrooms" class="w-full pr-4">
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
                  <div v-if="appartment.kitchen" class="w-full pr-4">
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
                  <div v-if="appartment.bathrooms" class="w-full pr-4">
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
                  <div v-if="appartment.storageroom" class="w-full pr-4">
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
                  <div v-if="appartment.garage" class="w-full pr-4">
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
                  <div v-if="appartment.garden" class="w-full pr-4">
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
                  <div v-if="appartment.floor" class="w-full pr-4">
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
                  <div v-if="appartment.householdsTotal" class="w-full pr-4">
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
                  <div v-if="appartment.ac" class="w-full pr-4">
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
                  <div v-if="appartment.pool" class="w-full pr-4">
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
                  <div v-if="appartment.keeper" class="w-full pr-4">
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
                      <label for="#" class="text-xl font-semibold">{{ appartment.rent }}</label>
                    </div>
                  </div>
                  <div class=" mt-2 lg:mt-0 mb-4">
                    <p class="text-gray-400">
                      {{ appartment.conditions.prepaidRentMonths }} mois d'avance
                    </p>
                    <div class="flex items-center font">
                      <label for="#" class="text-xl font-semibold">{{ 3*appartment.rent }}</label>
                    </div>
                  </div>
                </div>
                <div class=" mt-2 lg:mt-0 mb-4">
                  <p class="text-gray-400">
                    Commission Eau / Elec
                  </p>
                  <div class="flex items-center font">
                    <label for="#" class="text-xl font-semibold">{{ appartment.conditions.energyCommission }}</label>
                  </div>
                </div>
              </div>
              <button class="btn shadow-btn-shadow border border-transparent w-full font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-2 text-lg px-10 mr-8 h-12">
                Réserver
              </button>
            </div>
            <div class="others bg-sky-50 p-8 mt-4 lg:mt-8 w-full rounded-md">
              <p class="mb-4">
                Les frais de visites s’élève à 2000 f cfa.
                Vous avez la possibilité de 3 visites. Une équipe ets mise à votre disposition pour un service de qualité.
              </p>
              <NewVisit
                :appartments-prop="appartments"
                :appartment-types="appartmentTypes"
                :timeslots="timeslots"
                :appartment-id-prop="appartment.id"
                :load-visits-func="() => {}"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'visites'">
        <div v-if="appartmentVisits.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
          <h1 class="text-3xl font-bold">
            0 visite trouvée
          </h1>
          <br>
          <!-- <p class="text-gray-400">
            Cliquez sur le bouton " + Nv. visite" en haut à gauche pour
            <span class="font-extrabold">programmer une visite</span>.
          </p> -->
        </div>
        <div v-else class="flex flex-col w-full table__container">
          <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
            <div class="flex items-center w-min h-10 px-2">
              <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex items-center w-2 h-10 px-2 text-xs ml-16 mr-2">
              <!-- <span>ID</span> -->
            </div>
            <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
              <span>APPARTEMENT</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>LOCALISATION</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>VISITEUR</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>DATE</span>
            </div>
            <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
              <span>STATUS</span>
            </div>
          </div>
          <div class="overflow-auto custom__scroll py-4">
            <div v-for="(vis, count) in appartmentVisits" :key="vis.id" class="visit flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
              <div class="flex items-center w-min px-2">
                <input v-model="selectedVisits" type="checkbox" :value="vis" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
              </div>
              <div class="flex flex-col mx-2">
                <span class="rounded-full h-12 w-12">
                  <img :src="appartment.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
                </span>
              </div>
              <div class="flex items-center w-2 px-2 mx-1">
                <span> - </span>
              </div>
              <div class="flex flex-col w-56 px-2 mx-2">
                <p><span>{{ appartmentType(appartment.appartmentType).label }}</span> | <span class="text-gray-400">{{ appartment.bedrooms }} Chambre<span v-if="appartment.bedrooms > 1">s</span> - {{ appartment.livingrooms }} Salon<span v-if="appartment.livingrooms > 1">s</span></span></p>
              </div>
              <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
                <span>{{ appartment.location }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
                <span>{{ `${vis.visitorInfos.firstname} ${vis.visitorInfos.lastname }` }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
                <span>{{ vis.date }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-20 px-2 mx-2">
                <span>{{ vis.status }}</span>
              </div>
              <div class="hidden lg:flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setToEdition({ ...vis })">
                <span class="icon">
                  <i class="far fa-edit" />
                </span>
              </div>
              <DeletePrompt :delete-placeholder="() => deleteVisit(vis)" />
            </div>
          </div>
          <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
            <div class="flex items-center w-min h-10 px-2">
              <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex items-center w-2 h-10 px-2 text-xs ml-16 mr-2">
              <!-- <span>ID</span> -->
            </div>
            <div class="flex items-center w-56 h-10 px-2 text-xs mx-2">
              <span>APPARTEMENT</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>LOCALISATION</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>VISITEUR</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>DATE</span>
            </div>
            <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
              <span>STATUS</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'reservations'">
        <div v-if="appartmentReservations.length === 0" class="flex flex-col w-full h-4/5 items-center justify-center">
          <h1 class="text-3xl font-bold">
            0 réservation trouvée
          </h1>
        </div>
        <div v-else class="flex flex-col w-full table__container">
          <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
            <div class="flex items-center w-min h-10 px-2">
              <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex items-center w-56 h-10 px-2 text-xs mx-2 ml-20">
              <span>APPARTEMENT</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>LOCALISATION</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>DATE</span>
            </div>
            <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
              <span>STATUS</span>
            </div>
          </div>
          <div class="overflow-auto custom__scroll py-4">
            <div v-for="(reserv, count) in appartmentReservations" :key="reserv.id" class="reservation flex flex-shrink-0 py-1 text-sm items-center hover:bg-sky-50 relative" :class="count % 2 !== 0 ? 'bg-gray-100' : ''">
              <div class="flex items-center w-min px-2">
                <input v-model="selectedReservations" type="checkbox" :value="reservation" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
              </div>
              <div class="flex flex-col mx-2">
                <span class="rounded-full h-12 w-12">
                  <img :src="appartment.mainImg" alt="" class="rounded-full h-12 w-12 m-0">
                </span>
              </div>
              <div class="flex flex-col w-56 px-2 mx-2">
                <p>
                  <span>{{ appartmentType(appartment.appartmentType).label }}</span> <br> <span class="text-gray-400">{{ appartment.bedrooms }} Chambre<span v-if="appartment.bedrooms > 1">s</span> - {{ appartment.livingrooms }} Salon<span v-if="appartment.livingrooms > 1">s</span></span><br>
                  <span class="block lg:hidden">{{ reserv.date }}</span>
                </p>
              </div>
              <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
                <span>{{ appartment.location }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-40 px-2 mx-2">
                <span>{{ reserv.date }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-24 px-2 mx-2">
                <span>{{ reserv.status }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-36 px-2 mx-2">
                <span />
              </div>
              <div class="hidden lg:flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setToEdition(reserv)">
                <span class="icon">
                  <i class="far fa-edit" />
                </span>
              </div>
              <DeletePrompt :delete-placeholder="() => deleteReservation(reserv)" />
            </div>
          </div>
          <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium bg-gray-100">
            <div class="flex items-center w-min h-10 px-2">
              <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
            </div>
            <div class="flex items-center w-56 h-10 px-2 text-xs mx-2 ml-20">
              <span>APPARTEMENT</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>LOCALISATION</span>
            </div>
            <div class="hidden lg:flex items-center w-40 h-10 px-2 text-xs mx-2">
              <span>DATE</span>
            </div>
            <div class="hidden lg:flex items-center w-36 h-10 px-2 text-xs mx-2">
              <span>STATUS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'dashboard',
  async asyncData ({ $api, store }) {
    if (!store.getters['appartment/appartments'].length) {
      await store.dispatch('appartment/loadAppartments')
    }

    if (!store.getters['appartmentType/appartmentTypes'].length) {
      await store.dispatch('appartmentType/loadAppartmentTypes')
    }

    if (!store.getters['account/accounts'].length) {
      await store.dispatch('account/loadAccounts')
    }

    if (!store.getters['reservation/reservations'].length) {
      await store.dispatch('reservation/loadReservations')
    }

    if (!store.getters['publication/publications'].length) {
      await store.dispatch('publication/loadPublications')
    }

    if (!store.getters['visit/visits'].length) {
      await store.dispatch('visit/loadVisits')
    }

    return {
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      contextMenuIsOpen: false,
      appartmentToEdit: {},
      activeTab: 'infos'
    }
  },
  computed: {
    ...mapGetters({
      appartments: 'appartment/appartments',
      appartmentTypes: 'appartmentType/appartmentTypes',
      publications: 'publication/publications',
      reservations: 'reservation/reservations',
      visits: 'visit/visits',
      accounts: 'account/accounts'
    }),

    connectedUser () {
      return this.$auth.user
    },

    connectedAccount () {
      return this.accounts.find(account => account.user.id === this.connecteduser.id)
    },

    publication () {
      return this.publications.find(publication => publication.appartment.id === this.id)
    },
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    appartmentVisits () {
      return this.visits.filter(visit => visit.appartment === this.id)
    },
    appartmentReservations () {
      return this.reservations.filter(reservation => reservation.appartment === this.id)
    }
  },
  methods: {
    ...mapActions({
      loadAppartments: 'appartment/loadAppartments'
    }),

    setToEdition (appartment) {
      this.appartmentToEdit = appartment
    },
    deleteAppartment (appartment) {
      return this.$api.appartmentService.delete({ variables: { appartmentId: appartment.id } })
        .then(() => this.$api.appartmentService.getAll())
        .then(({ data }) => {
          this.appartments = data.appartments
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error))
    }
  }
}
</script>
