export default ({ apollo, gql }) => class AppartmentDetailService {
  query (projections = 'appartmentDetails { id }', variables = {}) {
    return apollo.query({ query: gql`query { ${projections} }`, variables })
  }

  mutation ({ projections, variables }) {
    return apollo.mutation({ mutation: gql`mutation { projections }`, variables })
  }
}
