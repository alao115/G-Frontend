export default ({ apollo, gql }) => class VisitService {
  getAll ({ projections, variables } = { projections: 'id appartment user date status', variables: {} }) {
    return apollo.query({ query: gql`query { visits { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createVisit($data: visitData) { createVisit(data: $data) { id } }`, variables })
  }
}
