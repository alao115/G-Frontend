export default class AppartmentDetailService {

  constructor(private readonly apiBaseUrl: string) {}

  async query (variables = {}) {
    try {
      const query = gql`
        query {
          appartmentDetails { id }
        }`

      return await useAsyncQuery(query, variables)
    } catch (error) {
      throw error;
    }
  }

  async mutation ({ projections, variables }: { projections: string, variables: any }) {
    try {
      const query = gql`mutation { ${projections} }`

      const { mutate } = useMutation(query, variables)

      return await mutate()
    } catch (error) {
      throw error;
    }
  }
}
