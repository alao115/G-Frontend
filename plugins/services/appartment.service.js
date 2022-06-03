export default ({ apollo, gql, $axios }) => class AppartmentService {
  getAll ({ projections, variables } = { projections: 'id createdBy { id user { id userType emailVerified } status firstname lastname civility phone email } timeSlots { day selectedTimes } mainImg firstImg secondImg thirdImg fourthImg appartmentType forShortStay isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths paymentFrequency } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite', variables: {} }) {
    return apollo.query({ query: gql`query { appartments { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppart($data: appartmentData) { createAppartment(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    variables?.data?.conditions && delete variables?.data.conditions?.__typename
    variables?.data?.ownerInfos && delete variables?.data.ownerInfos?.__typename
    variables?.data?.__typename && delete variables?.data?.__typename
    variables?.data?.id && delete variables?.data?.id
    return apollo.mutate({ mutation: gql`mutation updateAppart($data: appartmentData, $appartmentId: ID!) { updateAppartment(appartmentId: $appartmentId, data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteAppart($appartmentId: ID!) { deleteAppartment(appartmentId: $appartmentId ) { id } }`, variables })
  }

  async getAllAppartmentFromREST () {
    return await $axios.$get('/appartments/')
  }

  async getAllAppartmentTypeFromREST () {
    return await $axios.$get('/appartments/appartmenttypes')
  }

  async searchAppartmentFromREST (searchOpts) {
    return await $axios.$post('/appartments/search', searchOpts)
  }
}
