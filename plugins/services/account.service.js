
export default ({ apollo, gql }, $axios) => class AccountService {
  getAll ({ projections, variables } = { projections: 'id user { userType emailVerified } status firstname lastname civility phone email', variables: {} }) {
    return apollo.query({ query: gql`query { accounts { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAccount($data: accountData) { createAccount(data: $data) { id } }`, variables })
  }

  delete ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation deleteAccount($accountId: ID!) { deleteAccount(accountId: $accountId ) { id } }`, variables })
  }

  signup (data) {
    return $axios.post('/auth/signup', data)
  }
}
