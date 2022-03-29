export default ({ apollo, gql }) => class AppartmentTypeService {
  getAll ({ projections, variables } = { projections: 'id label description', variables: {} }) {
    return apollo.query({ query: gql`query { appartmentTypes { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id label description', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppartType($data: appartmentTypeData) { createAppartmentType(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    delete variables?.data.__typename
    delete variables?.data.id
    return apollo.mutate({ mutation: gql`mutation updateAppartType($data: appartmentTypeData, $appartmentTypeId: ID!) { updateAppartmentType(appartmentTypeId: $appartmentTypeId, data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteAppartType($appartmentTypeId: ID!) { deleteAppartmentType(appartmentTypeId: $appartmentTypeId ) { id } }`, variables })
  }
}
