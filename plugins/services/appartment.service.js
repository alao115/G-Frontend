export default ({ apollo, gql }) => class AppartmentService {
  getAll ({ projections, variables } = { projections: 'id mainImg appartmentType isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite', variables: {} }) {
    return apollo.query({ query: gql`query { appartments { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppart($data: appartmentData) { createAppartment(data: $data) { id } }`, variables })
  }
}
