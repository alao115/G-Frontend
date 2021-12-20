export default ({ apollo, gql }) => class PublicationService {
  getAll ({ projections, variables } = { projections: 'id appartment publisher date status isNew views', variables: {} }) {
    return apollo.query({ query: gql`query { publications { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAppartType($data: publicationData) { createPublication(data: $data) { id } }`, variables })
  }
}
