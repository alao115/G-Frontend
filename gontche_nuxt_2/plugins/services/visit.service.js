export default ({ apollo, gql }) => class VisitService {
  getAll ({ projections, variables } = { projections: 'id appartment { id mainImg appartmentType isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite } visitor { id user { id userType } status firstname lastname civility phone email } date status archive', variables: {} }) {
    return apollo.query({ query: gql`query { visits { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createVisit($data: visitData) { createVisit(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    // console.log('variables: ', variables)
    delete variables?.data.__typename
    delete variables?.data.id
    delete variables?.data?.visitorInfos?.__typename
    return apollo.mutate({ mutation: gql`mutation updateVisit($data: visitData, $visitId: ID!) { updateVisit(visitId: $visitId, data: $data) { status } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteVisit($visitId: ID!) { deleteVisit(visitId: $visitId ) { id } }`, variables })
  }
}
