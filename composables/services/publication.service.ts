export default class PublicationService {

  constructor(private readonly apiBaseUrl: string) {}

  async getAll ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        query {
          publications {
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
              likes favorite
            }
            publisher {
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
            isNew
            views
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
        mutation createPublication ($data: publicationData) {
          createPublication (data: $data) {
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
      // delete variables?.data.id

      const query = gql`
        mutation updatePublication ($data: publicationData, $publicationId: ID!) {
          updatePublication (publicationId: $publicationId, data: $data) {
            id
          }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error;
    }
  }

  async delete ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        mutation deletePublication ($publicationId: ID!) {
          deletePublication (publicationId: $publicationId ) {
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
