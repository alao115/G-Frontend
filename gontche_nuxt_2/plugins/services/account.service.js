
export default ({ apollo, gql }, $axios) => class AccountService {
  getAll ({ projections, variables } = { projections: 'id user { id userType emailVerified } status firstname lastname civility phone email', variables: {} }) {
    return apollo.query({ query: gql`query { accounts { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAccount($data: accountData) { createAccount(data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteAccount($accountId: ID!) { deleteAccount(accountId: $accountId ) { id } }`, variables })
  }

  authUserAccount ({ projections, variables } = { projections: 'id user { id userType emailVerified } status firstname lastname civility phone email', variables: {} }) {
    return apollo.query({ query: gql`query { authUserAccount { ${projections} } }`, variables })
  }

  signup (data) {
    return $axios.post('/auth/signup', data)
  }

  updateUser ({ projections, variables } = { projections: 'id ', variables: {} }) {
    // variables?.data?.conditions && delete variables?.data.conditions?.__typename
    // variables?.data?.ownerInfos && delete variables?.data.ownerInfos?.__typename
    // variables?.data?.__typename && delete variables?.data?.__typename
    // variables?.data?.id && delete variables?.data?.id
    return apollo.mutate({ mutation: gql`mutation updateUser($data: userData, $userId: ID!) { updateUser(userId: $userId, data: $data) { id } }`, variables })
  }
}
