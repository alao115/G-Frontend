<template>
  <div class="flex flex-col">
    <div class="flex space-x-0 md:space-x-8 flex-col md:flex-row h-125">
      <img :src="appartment && appartment.mainImg ? appartment.mainImg : 'https://image-placeholder.com/images/actual-size/1024x768.png'" alt="" class="object-cover h-full w-full md:w-1/2 mb-4 md:mb-0">
      <div class="w-full md:w-1/2 grid grid-cols-4 md:grid-cols-2 md:grid-rows-2 gap-8 justify-items-stretch place-content-stretch">
        <img :src="appartment && appartment.firstImg ? appartment.firstImg : 'https://image-placeholder.com/images/actual-size/960x640.png'" alt="" class="object-cover w-full h-full">
        <img :src="appartment && appartment.secondImg ? appartment.secondImg : 'https://image-placeholder.com/images/actual-size/960x640.png'" alt="" class="object-cover h-full w-full">
        <img :src="appartment && appartment.thirdImg ? appartment.thirdImg : 'https://image-placeholder.com/images/actual-size/960x640.png'" alt="" class="object-cover h-full w-full">
        <img :src="appartment && appartment.fourthImg ? appartment.fourthImg : 'https://image-placeholder.com/images/actual-size/960x640.png'" alt="" class="object-cover h-full w-full">
      </div>
    </div>
    <div class="flex lg:space-x-8 flex-col md:flex-row">
      <div class="flex flex-col items-start w-full lg:w-3/5">
        <div class="content font-body">
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
            <p class="font-body text-base mb-8 font-bold">
              {{ appartment && appartment.forShortStay ? '(Possiblité de faire une réservation à court séjour)' : '' }}
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
                  <label for="#" class="text-xl">{{ appartment && appartment.ac ? 'Oui' : 'Non' }}</label>
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
                  <label for="#" class="text-xl">{{ appartment && appartment.pool ? 'Oui' : 'Non' }}</label>
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
                  <label for="#" class="text-xl">{{ appartment && appartment.keeper ? 'Oui' : 'Non' }}</label>
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
          <div class="relative">
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
              <div v-if="appartment && appartment.forShortStay === false" class=" mt-2 lg:mt-0 mb-4">
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

          <template
            v-if="!appartmentIsRequestedByMe && !appartmentIsReservedByMe && !appartmentIsReservedByOther && !appartmentRequestByMeIsRejected"
          >
            <p v-if="connectedUser && connectedUser.user.userType !== userRole.REGULAR_USER" class="my-4">
              <b class="text-sky-550">Vous etes {{ connectedUser.user.userType === userRole.ADMIN ? "l'administrateur" : "le publicateur" }}</b> <br>
              Vous n'avez pas le droit de faire des réservations
            </p>
            <NewReservation
              v-else
              :appartment-types="appartmentTypes"
              :appartments-prop="appartments"
              :load-reservations-func="() => loadReservations()"
              :appartment-to-reserv="appartment"
            />
          </template>

          <p v-else-if="appartmentIsRequestedByMe && appartmentIsRequestedByMe.status === reservationStatus.PENDING && !appartmentIsReservedByOther" class="my-4">
            <b class="text-sky-550">Traitement en cours</b> <br> Nous vérifions la disponibilité de l'appartement. Nous vous notifierons d'ici 24h de la disponibilité de cet appartement. Pour réserver, vous devrez payer <b>la commission eau + electricité</b>, <b>la caution</b>, <b>le loyer</b>  et les <b>frais de services (300 FCFA)</b>
          </p>
          <template v-else-if="appartmentIsRequestedByMe && appartmentIsRequestedByMe.status === reservationStatus.WAITING_FOR_PAYMENT && !appartmentIsReservedByOther">
            <p class="my-4">
              <b class="text-sky-550">Demande acceptée</b> <br> Votre demande a été étudiée et l'appartement est disponible. Vous avez 3 jours pour finaliser la réservation en payant la <b>commission eau + electricité</b>, <b>la caution</b>, <b>le loyer</b>  et les <b>frais de services (300 FCFA)</b>
            </p>
            <div class="flex relative">
              <div class="contents">
                <button type="button" class="btn shadow-btn-shadow border border-blue-990 w-12 font-medium rounded-md text-blue-990 hover:bg-blue-920 hover:text-white nuxt-link-active py-2 mr-8 text-lg px-4 h-12" @click.prevent="advanceDetailsPromptIsOpen = !advanceDetailsPromptIsOpen">
                  <span class="icon"><i class="far fa-file-invoice" /></span>
                </button>
                <!-- <div v-if="advanceDetailsPromptIsOpen" class="fixed top-0 left-0 bg-white opacity-0 h-screen w-screen z-50" @click.prevent="advanceDetailsPromptIsOpen = !advanceDetailsPromptIsOpen" /> -->
                <div :class="{ 'hidden': !advanceDetailsPromptIsOpen, 'right-0': entryPoint === 'site', '-right-4': entryPoint === 'dashboard' }" class="absolute bg-white p-4 w-80 -top-56 shadow-btn-shadow rounded-lg">
                  <h4 class="text-sky-450 text-xl mb-4">
                    Détails
                  </h4>
                  <div class="flex justify-between mb-2">
                    <p>Caution eau + electricité</p>
                    <p class="text-gray-400">
                      {{ appartment.conditions.energyCommission }}
                    </p>
                  </div>
                  <template v-if="appartment && !appartment.forShortStay">
                    <div class="flex justify-between mb-2">
                      <p>Caution sur le loyer (3 mois)</p>
                      <p class="text-gray-400">
                        {{ 3 * appartment.rent }}
                      </p>
                    </div>
                    <div class="flex justify-between mb-2">
                      <p>Démarcheur</p>
                      <p class="text-gray-400">
                        {{ appartment.rent }}
                      </p>
                    </div>
                  </template>
                  <div class="flex justify-between mb-2">
                    <p>Frais Gontché</p>
                    <p class="text-gray-400">
                      300
                    </p>
                  </div>
                  <div class="flex justify-between border-t border-gray-100 pt-2">
                    <p>TOTAL</p>
                    <p class="text-blue-990">
                      {{ totalCautionToPay }}
                    </p>
                  </div>
                </div>
              </div>

              <extras-payment-btn
                :amount="totalCautionToPay"
                :on-success-handler-prop="() => bookReservation()"
              />
            </div>
          </template>
          <p v-else-if="appartmentIsReservedByMe" class="my-4">
            <b class="text-sky-550">Cet appartement est reservé en votre nom</b> <br>
            <span v-if="appartmentIsReservedByMe && appartmentIsReservedByMe.endDate">
              Jusqu'au :<b> {{ appartmentIsReservedByMe.endDate }} </b>
            </span>
          </p>
          <p v-else-if="appartmentIsReservedByOther" class="my-4">
            <b class="text-sky-550">Appartement déjà réservé.</b><br>
            <span v-if="appartmentIsReservedByOther && appartmentIsReservedByOther.endDate">
              Mais sera disponible pour une nouvelle réservation à partir du :<b> {{ appartmentIsReservedByOther.endDate }} </b>
            </span>
          </p>
          <p v-else-if="appartmentRequestByMeIsRejected && (appartmentIsRequestedByOthers.length || appartmentIsReservedByOther)" class="my-4">
            <b class="text-red-500">Votre demande de réservation a été rejeté</b> <br>
            <span>
              Veuillez rééssayer ultérieurement
            </span>
          </p>
        </div>
        <div class="others bg-sky-50 p-8 mt-4 lg:mt-8 w-full rounded-md">
          <p class="mb-4">
            Les frais de visites s’élève à 1500 f cfa par visite. Une équipe est mise à votre disposition pour un service de qualité.
          </p>
          <p v-if="appartmentIsReservedByOther || appartmentIsReservedByMe" class="my-4">
            <b class="text-sky-550">Appartement déjà réservé.</b><br>
            <span>
              <b>Vous ne pouvez pas visiter un appartement déjà loué</b>.
            </span>
          </p>
          <template v-else-if="appartmentVisitIsRequestedByMe">
            <p class="my-4">
              <b class="text-sky-550">Traitement en cours.</b><br>
              <span>
                <b>Votre demande de visite pour cet appartement est en cours de traitement mais ne sera validée qu'après paiement.</b>
              </span>
            </p>

            <extras-payment-btn
              :amount="VISIT_FEES"
              :on-success-handler-prop="() => bookVisit()"
            />
          </template>
          <p v-else-if="appartmentVisitIsBookedByMe" class="my-4">
            <b class="text-sky-550">Votre demande de visite pour cet appartement est validée.</b><br>
            <span>
              <b>Nos agents vous contacterons pour la suite de la procedure.</b>.
            </span><br>
            <b class="text-sky-550">Merci de nous faire confaince.</b>
          </p>
          <template v-else>
            <p v-if="connectedUser && connectedUser.user.userType !== userRole.REGULAR_USER" class="my-4">
              <b class="text-sky-550">Vous etes {{ connectedUser.user.userType === userRole.ADMIN ? "l'administrateur" : "le publicateur" }}</b> <br>
              Vous n'avez pas le droit de réserver des visite
            </p>
            <NewVisit
              v-else
              :appartments-prop="appartments"
              :appartment-id-prop="appartID"
              :load-visits-func="loadVisits"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { reservationStatus, userRole, visitStatus } from '~/helpers/constants'

export default defineComponent({
  props: {
    appartID: {
      type: String,
      required: true,
      default: ''
    },
    appartments: {
      type: Array,
      required: true
    },
    appartmentTypes: {
      type: Array,
      required: true
    },
    entryPoint: {
      type: String,
      default: 'site'
    }
  },

  data: () => ({
    VISIT_FEES: 1500,
    advanceDetailsPromptIsOpen: false
  }),

  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount',
      reservations: 'reservation/reservations',
      visits: 'visit/visits'
    }),
    totalCautionToPay () {
      let caution = this.appartment.conditions.energyCommission + 300
      if (this.appartment?.forShortStay !== true) {
        caution = caution + 4 * this.appartment.rent
      }
      return caution
    },
    reservationStatus: () => reservationStatus,
    userRole: () => userRole,
    visitStatus: () => visitStatus,
    appartment () {
      return this.appartments?.find(appartment => appartment.id === this.appartID)
    },
    appartmentType () {
      return id => this.appartmentTypes?.find(appartmentType => appartmentType.id === id)
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
    }
  },

  mounted () {
    // this.appartments = [...this.appartmentsProp]
    // this.appartmentTypes = [...this.appartmentTypesProp]
  },

  methods: {
    ...mapActions({
      loadReservations: 'reservation/loadReservations',
      loadVisits: 'visit/loadVisits'
    }),

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

<style>

</style>
