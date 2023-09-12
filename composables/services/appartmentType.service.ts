export default class AppartmentTypeService {

  async getAll ({ variables } = { variables: {} }) {
    try {
      const query = gql`
        query {
          appartmentTypes {
            id
            label
            description
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
        mutation createAppartType ($data: appartmentTypeData) {
          createAppartmentType (data: $data) { id }
        }`

      const { mutate } = useMutation(query, variables)
      return await mutate()
    } catch (error) {
      throw error;
    }
  }

  async update ({ variables } = { variables: {} }) {
    try {
      // delete variables?.data.__typename
      // delete variables?.data.id

      const query = gql`
        mutation updateAppartType ($data: appartmentTypeData, $appartmentTypeId: ID!) {
          updateAppartmentType (appartmentTypeId: $appartmentTypeId, data: $data) {
            id
          }
        }`
      const { mutate } = useMutation(query, variables)
      return await mutate()

    } catch (error) {
     throw error;
    }
  }

  async delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    try {
      const query = gql`
        mutation deleteAppartType ($appartmentTypeId: ID!) {
          deleteAppartmentType (appartmentTypeId: $appartmentTypeId ) {
            id
          }
        }`
      const { mutate } = useMutation(query, variables)
      return await mutate()

    } catch (error) {
      throw error;
    }
  }
}
