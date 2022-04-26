export default ({ apollo, gql, $axios }) => class FavoryService {
  getAll ({ projections, variables } = { projections: 'user { status firstname lastname civility phone email } appartment { mainImg firstImg secondImg thirdImg fourthImg appartmentType isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths paymentFrequency } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite }', variables: {} }) {
    return apollo.query({ query: gql`query { favories { ${projections} } }`, variables })
  }

  authUserFavories ({ projections, variables } = { projections: 'user { status firstname lastname civility phone email } appartment { mainImg firstImg secondImg thirdImg fourthImg appartmentType isFurnished location rent details rooms bathrooms bedrooms livingrooms storageroom kitchen garage keeper terrace garden ac pool householdsTotal groundLevel conditions { advancePayment energyCommission prepaidRentMonths paymentFrequency } ownerInfos { civility firstname lastname address isAlive phone email } likes favorite }', variables: {} }) {
    return apollo.query({ query: gql`query { authUserFavories { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createFavory($data: favoryData) { createFavory(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    variables?.data?.__typename && delete variables?.data?.__typename
    variables?.data?.id && delete variables?.data?.id
    return apollo.mutate({ mutation: gql`mutation updateFavory($data: favoryData, $favoryId: ID!) { updateFavory(favoryId: $favoryId, data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteFavory($favoryId: ID!) { deleteFavory(favoryId: $favoryId ) { id } }`, variables })
  }
}
