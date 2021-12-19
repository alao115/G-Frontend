export default ({ apollo, gql }) => class AppartmentTypeService {
  getAll ({ projections, variables } = { projections: 'id label description', variables: {} }) {
    return apollo.query({ query: gql`query { appartmentTypes { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id label description', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppartType($data: appartmentTypeData) { createAppartmentType(data: $data) { id } }`, variables })
  }
}
