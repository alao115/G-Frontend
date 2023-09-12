export default class AppartmentService {

  constructor(private readonly apiBaseUrl: string) {}

  async getAll ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        query {
          appartments {
            id
            createdBy {
              id
              user { id userType emailVerified }
              status
              firstname
              lastname
              civility
              phone
              email
            }
            timeSlots { day selectedTimes }
            mainImg
            firstImg
            secondImg
            thirdImg
            fourthImg
            appartmentType
            forShortStay
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
            conditions { advancePayment energyCommission prepaidRentMonths paymentFrequency }
            ownerInfos { civility firstname lastname address isAlive phone email }
            likes
            favorite
          }
        }
      `
      return await useAsyncQuery(query, variables )
    } catch (error) {
      throw error;
    }
  }

  async create ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        mutation createAppart ($data: appartmentData) {
          createAppartment (data: $data) {
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
        // variables?.data?.timeSlots && variables?.data.timeSlots.forEach((time) => {
        //   delete time.__typename
        // })
        // variables?.data?.conditions && delete variables?.data.conditions?.__typename
        // variables?.data?.ownerInfos && delete variables?.data.ownerInfos?.__typename
        // variables?.data?.__typename && delete variables?.data?.__typename
        // variables?.data?.id && delete variables?.data?.id

        const query = gql`
          mutation updateAppart ($data: appartmentData, $appartmentId: ID!) {
            updateAppartment (appartmentId: $appartmentId, data: $data) {
              id
            }
          }`
        const { mutate } = useMutation(query, variables)
        return await mutate()
    } catch (error) {
      throw error;
    }

  }

  async delete ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        mutation deleteAppart ($appartmentId: ID!)
          {
            deleteAppartment (appartmentId: $appartmentId ) {
              id
            }
          }`
      const { mutate } = useMutation(query , variables)
      return await mutate()
    } catch (error) {
      throw error;
    }
  }

  async getAllAppartmentFromREST () {
    return await useFetch(`${this.apiBaseUrl}/appartments/`, { method: 'get' })
  }

  async getAllAppartmentTypeFromREST () {
    return await useFetch(`${this.apiBaseUrl}/appartments/appartmenttypes`, { method: 'get' })
  }

  async searchAppartmentFromREST (searchOpts: any) {
    return await useFetch(`${this.apiBaseUrl}/appartments/search`, { method: 'post', body: searchOpts })
  }
}
