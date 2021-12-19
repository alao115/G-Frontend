export default ({ apollo, gql }) => class ReservationService {
  getAll ({ projections, variables } = { projections: 'id appartment user status date', variables: {} }) {
    return apollo.query({ query: gql`query { reservations { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createReservation($data: reservationData) { createReservation(data: $data) { id } }`, variables })
  }
}
