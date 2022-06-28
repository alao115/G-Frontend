export default ({ apollo, gql }) => class ReservationService {
  getAll ({ projections, variables } = { projections: 'id appartment createdAt archive user status startDate startTime endDate endTime', variables: {} }) {
    return apollo.query({ query: gql`query { reservations { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createReservation($data: reservationData) { createReservation(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    // console.log(variables)
    delete variables?.data.__typename
    variables?.data?.appartment && delete variables.data.appartment?.__typename
    variables?.data?.user && delete variables.data.user?.__typename
    delete variables?.data?.id
    return apollo.mutate({ mutation: gql`mutation updateReservation($data: reservationData, $reservationId: ID!) { updateReservation(reservationId: $reservationId, data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteReservation($reservationId: ID!) { deleteReservation(reservationId: $reservationId ) { id } }`, variables })
  }
}
