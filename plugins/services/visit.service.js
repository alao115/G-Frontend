export default ({ apollo, gql }) => class VisitService {
  getAll ({ projections, variables } = { projections: 'id appartment visitorInfos { firstname lastname phone email } date status', variables: {} }) {
    return apollo.query({ query: gql`query { visits { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createVisit($data: visitData) { createVisit(data: $data) { id } }`, variables })
  }

  update ({ projections, variables } = { projections: 'id ', variables: {} }) {
    // console.log('variables: ', variables)
    delete variables?.data.__typename
    delete variables?.data.id
    delete variables?.data?.user?.__typename
    return apollo.mutate({ mutation: gql`mutation updateVisit($data: visitData, $visitId: ID!) { updateVisit(visitId: $visitId, data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteVisit($visitId: ID!) { deleteVisit(visitId: $visitId ) { id } }`, variables })
  }
}
