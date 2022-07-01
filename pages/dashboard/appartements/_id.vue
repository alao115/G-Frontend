<template>
  <div class="overflow-x-hidden font-body p-8 lg:px-8">
    <EditAppartment :appartment="appartmentToEdit" :load-appartments-func="() => {}" :appartment-types="appartmentTypes" />
    <EditVisit
      :visit="visitToEdit"
      :appartments-prop="appartments"
      :appartment-types="appartmentTypes"
      :load-visits-func="loadVisits"
    />
    <div class="">
      <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="mr-2">
            <a href="#" :class="activeTab === 'infos' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page" @click.prevent="activeTab = 'infos'">
              <span class="icon mr-2"><i class="far fa-info-circle" /></span> <span class="hidden lg:block">Infos</span>
            </a>
          </li>
          <template v-if="connectedUser && connectedUser.user.userType === userRole.ADMIN">
            <li class="mr-2">
              <a href="#" :class="activeTab === 'visites' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" @click.prevent="activeTab = 'visites'">
                <span class="icon mr-2"><i class="far fa-calendar-day" /></span> <span class="hidden lg:block">Visites</span>
              </a>
            </li>
            <li class="mr-2">
              <a href="#" :class="activeTab === 'reservations' ? 'text-blue-600 border-b-2 border-blue-600 ' : ''" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" @click.prevent="activeTab = 'reservations'">
                <span class="icon mr-2"><i class="far fa-house-user" /></span> <span class="hidden lg:block">Réservations</span>
              </a>
            </li>
          </template>
        </ul>
      </div>
      <div class="flex mb-8">
        <!-- {{ appartment.timeSlots }} <br> -->
        <div class="flex flex-col absolute top-24 right-8 items-end">
          <button class="flex items-center justify-center w-12 h-12 p-4 bg-white text-center text-base border -lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="contextMenuIsOpen = !contextMenuIsOpen">
            <p class="leading-none text-left flex flex-col">
              <span v-if="contextMenuIsOpen" class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
              <span v-else class="text-sm mt-1 text-gray-400"><i class="fas fa-ellipsis-v fa-lg" /></span>
            </p>
          </button>
          <div v-if="contextMenuIsOpen" class="absolute flex flex-col mt-14 lg:mt-20 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
            <template v-if="connectedUser.user.userType !== userRole.REGULAR_USER">
              <a class="flex flex-col px-8 py-4 hover:bg-gray-200" href="#" @click.prevent="contextMenuIsOpen = false, setToEdition(appartment)">
                <span class="font-medium">Modifier</span>
              </a>
              <NewTimeSlot :in-detail="true" :appartment="appartment" />
            </template>
            <template v-if="connectedUser.user.userType === userRole.REGULAR_USER">
              <NewReservation
                :load-reservations-func="loadReservations"
                :publications-prop="publications"
                :appartment-types="appartmentTypes"
                :appartments-prop="appartments"
                :from="'appartMenu'"
                :appartment-to-reserv="appartment"
                :appartment-type-for-reserv="appartmentType(appartment.appartmentType)"
              />
              <NewVisit
                :from="'appartMenu'"
                :appartment-id-prop="appartment.id"
                :load-visits-func="() => {}"
              />
            </template>
            <NuxtLink to="/dashboard/appartements" class="flex flex-col px-8 py-4 hover:bg-gray-200">
              <span class="font-medium">Retour</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'infos'">
        <extras-appartment-detail-main-widget v-if="appartments.length && appartmentTypes.length" entry-point="dashboard" :appart-i-d="appartID" :appartments="appartments" :appartment-types="appartmentTypes" />
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
              <div class="hidden lg:flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="setVisitToEdition({ ...vis })">
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
                <input v-model="selectedReservations" type="checkbox" :value="reserv" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400">
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
                <span>{{ formatDate(reserv.createdAt) }}</span>
              </div>
              <div class="hidden lg:flex flex-col w-24 px-2 mx-2">
                <span>{{ displayReservationStatus[Number(reserv.status)] }}</span>
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
import moment from 'moment'

import { reservationStatus, userRole, visitStatus } from '~/helpers/constants'

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
      appartID: this.$route.params.id,
      contextMenuIsOpen: false,
      advanceDetailsPromptIsOpen: false,
      appartmentToEdit: {},
      visitToEdit: {},
      activeTab: 'infos',
      selectedVisits: [],
      VISIT_FEES: 1500,
      selectedReservations: []
    }
  },
  computed: {
    ...mapGetters({
      appartments: 'appartment/appartments',
      appartmentTypes: 'appartmentType/appartmentTypes',
      publications: 'publication/publications',
      connectedUser: 'account/authUserAccount',
      reservations: 'reservation/reservations',
      visits: 'visit/visits',
      accounts: 'account/accounts'
    }),

    totalCautionToPay () {
      let caution = this.appartment.conditions.energyCommission + 300
      if (this.appartment.forShortStay !== true) {
        caution = caution + 4 * this.appartment.rent
      }
      return caution
    },

    displayReservationStatus () {
      return {
        0: 'Non reservé',
        1: 'En attente de traitement',
        2: 'En attente de paiement',
        3: 'Reservé',
        4: 'Rejecté'
      }
    },

    userRole: () => userRole,

    reservationStatus: () => reservationStatus,

    visitStatus: () => visitStatus,

    connectedAccount () {
      return this.connectedUser ? this.accounts.find(account => account.user.id === this.connectedUser.user.id) : {}
    },

    publication () {
      return this.publications.find(publication => publication.appartment === this.appartID)
    },
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.appartID)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    appartmentReservations () {
      return this.reservations.filter(reserv => reserv.appartment === this.appartID) // && reserv.status !== reservationStatus.REJECTED)
    },
    appartmentVisits () {
      return this.visits.filter(visit => visit.appartment === this.appartID) // && reserv.status !== reservationStatus.REJECTED)
    },
    myReservations () {
      return this.connectedUser ? this.reservations.filter(reserv => (reserv.user === this.connectedUser.user.id && reserv.appartment === this.appartID) && (reserv.status !== reservationStatus.REJECTED && !reserv.archive)) : []
    },
    appartmentRequestByMeIsRejected () {
      return this.connectedUser ? this.reservations.find(reserv => reserv.appartment === this.appartID && reserv.status === reservationStatus.REJECTED && reserv.user === this.connectedUser.user.id && !reserv.archive) : null
    },
    appartmentIsRequestedByMe () {
      return this.myReservations.find(reserv => reserv.status === reservationStatus.PENDING || reserv.status === reservationStatus.WAITING_FOR_PAYMENT)
    },
    appartmentIsReservedByMe () {
      return this.myReservations.find(reserv => reserv.status === reservationStatus.RESERVED && !reserv.archive)
    },
    appartmentIsRequestedByOthers () {
      return this.connectedUser ? this.reservations.filter(reserv => reserv.appartment === this.appartID && reserv.user !== this.connectedUser.user.id && (reserv.status === reservationStatus.PENDING || reserv.status === reservationStatus.WAITING_FOR_PAYMENT) && !reserv.archive) : []
    },
    appartmentIsReservedByOther () {
      return this.connectedUser ? this.reservations.find(reserv => reserv.appartment === this.appartID && reserv.user !== this.connectedUser.user.id && reserv.status === reservationStatus.RESERVED && !reserv.archive) : null
    },
    myVisits () {
      return this.connectedUser ? this.visits.filter(visit => (visit.visitor.user.id === this.connectedUser.user.id && visit.appartment.id === this.appartID) && !visit.archive) : []
    },
    appartmentVisitIsRequestedByMe () {
      return this.connectedUser ? this.myVisits.find(visit => visit.status === this.visitStatus.WAITING_FOR_PAYMENT) : null
    },
    appartmentVisitIsBookedByMe () {
      return this.connectedUser ? this.myVisits.find(visit => visit.status === this.visitStatus.RESERVED) : null
    },
    // consoleProp () {
    //   console.log('RequestByMe:  ', this.appartmentIsRequestedByMe)
    //   console.log('ReservedByMe', this.appartmentIsReservedByMe)
    //   console.log('Reserved by others: ', this.appartmentIsReservedByOther)
    //   console.log('ReservedByOther', this.appartmentIsReservedByOther)
    //   console.log('Requested by Others', this.appartmentIsRequestedByOthers)
    //   console.log('RejectedRequest: ', this.appartmentRequestByMeIsRejected)
    //   console.log('Reservations: ', this.reservations)
    //   console.log('My Reservations: ', this.myReservations)
    //   console.log('Connected User', this.connectedUser)
    //   return 1 // console.log('Inside consoleProp')
    // },
    toPay () {
      let reservationFee = this.appartment.rent + this.appartment.conditions.energyCommission + 300
      if (this.appartment.forShortStay) {
        reservationFee += 3 * this.appartment.rent
      }
      return reservationFee
    }
  },
  methods: {
    ...mapActions({
      loadAppartments: 'appartment/loadAppartments',
      loadAppartmentTypes: 'appartmentType/loadAppartmentTypes',
      loadAccounts: 'account/loadAccounts',
      loadPublications: 'publication/loadPublications',
      loadReservations: 'reservation/loadReservations',
      loadVisits: 'visit/loadVisits'
    }),

    setToEdition (appartment) {
      this.appartmentToEdit = appartment
    },

    setVisitToEdition (visit) {
      this.visitToEdit = visit
    },
    deleteAppartment (appartment) {
      return this.$api.appartmentService.delete({ variables: { appartmentId: appartment.id } })
        .then(() => this.$api.appartmentService.getAll())
        .then(({ data }) => {
          this.appartments = data.appartments
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error))
    },
    formatDate (date) {
      return moment.unix(date).format('DD-MM-YYYY')
    },
    bookReservation () {
      // console.log('Successful')
      this.$api.reservationService.update({ variables: { reservationId: this.appartmentIsRequestedByMe.id, data: { ...this.appartmentIsRequestedByMe, status: this.reservationStatus.RESERVED } } })
        .then(() => this.loadReservations())
        .catch((error) => {
          this.errorToshow = error
        })
    },
    bookVisit () {
      this.$api.visitService.update({ variables: { visitId: this.appartmentVisitIsRequestedByMe.id, data: { appartment: this.appartmentVisitIsRequestedByMe.appartment.id, visitor: this.appartmentVisitIsRequestedByMe.visitor.user.id, date: this.appartmentVisitIsRequestedByMe.date, status: this.visitStatus.RESERVED } } })
        .then(() => this.loadVisits())
        .catch((error) => {
          this.errorToshow = error
        })
    }
  }
}
</script>
