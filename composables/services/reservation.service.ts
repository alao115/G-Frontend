export default class ReservationService {

  async getAll ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        query {
          reservations {
            id appartment createdAt archive user status startDate startTime endDate endTime
          }
        }`
      return await useAsyncQuery(query, variables)
    } catch (error) {
      throw error;
    }
  }

  async create ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        mutation createReservation ($data: reservationData) {
          createReservation (data: $data) {
            id
          }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error;
    }
  }

  async update ({ variables } = { variables: {} }) {
    try {

      // delete variables?.data.__typename
      // variables?.data?.appartment && delete variables.data.appartment?.__typename
      // variables?.data?.user && delete variables.data.user?.__typename
      // delete variables?.data?.id

      const query = gql`
        mutation updateReservation ($data: reservationData, $reservationId: ID!) {
          updateReservation (reservationId: $reservationId, data: $data) {
            id
          }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error;
    }
    // console.log(variables)
  }

  async delete ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        mutation deleteReservation ($reservationId: ID!) {
          deleteReservation (reservationId: $reservationId ) {
            id
          }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error;
    }
  }
}
