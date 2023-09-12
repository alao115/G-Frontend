<template>
  <div class="w-screen overflow-x-hidden font-body">
    <WebsiteTheNavbar />
    <div class="pt-8 px-8 lg:pt-48 xl:px-36 w-full">
      <div class="flex justify-between mb-8">
        <h4 class="text-2xl font-medium mb-2">
          {{ appartment && appartmentType(appartment.appartmentType) && appartmentType(appartment.appartmentType).label }} <br>
          <span class="text-gray-400 text-sm">{{ appartment && appartment.bedrooms ? appartment.bedrooms : '' }} Chambre<span v-if="appartment && appartment.bedrooms > 1">s</span> - {{ appartment && appartment.livingrooms }} Salon<span v-if="appartment && appartment.livingrooms > 1">s</span></span>  <span class="text-gray-400 text-sm"> à {{ appartment && appartment.location }}</span>
        </h4>
        <button class="flex items-center justify-center w-12 h-12 p-4 bg-white  text-center text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="goBack()">
          <p class="leading-none text-left flex flex-col">
            <span class="text-sm mt-1 text-gray-400"><i class="far fa-times fa-lg" /></span>
          </p>
        </button>
      </div>
      <extras-appartment-detail-main-widget v-if="appartments.length && appartmentTypes.length" :appart-i-d="appartID" :appartments="appartments" :appartment-types="appartmentTypes" />
    </div>
    <WebsitePublications :in-details="true" :appartments="appartments" :appartment-types="appartmentTypes" />
    <WebsiteTheFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { reservationStatus, userRole, visitStatus } from '~/helpers/constants'

export default defineComponent({
  async asyncData ({ $api, $auth, store }) {
    if ($auth.loggedIn) {
      await store.dispatch('account/getAuthUserAccount')

      if (!store.getters['reservation/reservations'].length) {
        await store.dispatch('reservation/loadReservations')
      }
    }
    const appartments = (await $api.appartmentService.getAllAppartmentFromREST()).data.appartments
    const appartmentTypes = (await $api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes

    return {
      appartments,
      appartmentTypes
    }
  },

  data () {
    return {
      appartID: this.$route.params.id,
      contextMenuIsOpen: false,
      appartments: [],
      appartmentTypes: []
    }
  },

  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount',
      reservations: 'reservation/reservations',
      visits: 'visit/visits'
    }),
    reservationStatus: () => reservationStatus,
    userRole: () => userRole,
    visitStatus: () => visitStatus,
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.appartID)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }
  },
  updated () {
  },
  methods: {
    ...mapActions({
      loadReservations: 'reservation/loadReservations',
      loadVisits: 'visit/loadVisits'
    }),

    goBack () {
      this.$router.go(-1)
    },
    bookReservation () {
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
})
</script>
