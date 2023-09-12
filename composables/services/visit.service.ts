export default class VisitService {
  async getAll ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        query {
          visits {
            id
            appartment {
              id
              mainImg
              appartmentType
              isFurnished
              location
              rent
              details
              rooms
              bathrooms
              bedrooms
              livingrooms
              storageroom
              kitchen
              garage
              keeper
              terrace
              garden
              ac
              pool
              householdsTotal
              groundLevel
              conditions { advancePayment energyCommission prepaidRentMonths }
              ownerInfos { civility firstname lastname address isAlive phone email }
              likes
              favorite
            }
            visitor {
              id
              user { id userType }
              status
              firstname
              lastname
              civility
              phone
              email
            }
            date
            status
            archive
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
        mutation createVisit ($data: visitData) {
          createVisit (data: $data) { id }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate()
    } catch (error) {
      throw error;
    }
  }

  async update ({ variables } = { variables: {} }) {
    try {
      // console.log('variables: ', variables)
      // delete variables?.data.__typename
      // delete variables?.data.id
      // delete variables?.data?.visitorInfos?.__typename
      const query = gql`mutation updateVisit($data: visitData, $visitId: ID!) { updateVisit(visitId: $visitId, data: $data) { status } }`
      const { mutate } = useMutation(query, variables)
      return await mutate()
    } catch (error) {
      throw error;
    }
  }

  async delete ({ variables } = { variables: {} }) {
    try {
      const query = gql`mutation deleteVisit($visitId: ID!) { deleteVisit(visitId: $visitId ) { id } }`
      const { mutate } = useMutation(query, variables)
      return await mutate()
    } catch (error) {
      throw error;
    }
  }
}
