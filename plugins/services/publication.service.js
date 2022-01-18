export default ({ apollo, gql }) => class PublicationService {
  getAll ({ projections, variables } = { projections: 'id appartment { id mainImg appartmentType isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite } publisher { id user userType status firstname lastname civility phone email } date status isNew views', variables: {} }) {
    return apollo.query({ query: gql`query { publications { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppartType($data: publicationData) { createPublication(data: $data) { id } }`, variables })
  }
}
