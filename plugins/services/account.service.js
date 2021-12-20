export default ({ apollo, gql }) => class AccountService {
  getAll ({ projections, variables } = { projections: 'id user userType status firstname lastname civility phone email', variables: {} }) {
    return apollo.query({ query: gql`query { accounts { ${projections} } }`, variables })
  }

  create ({ projections, variables } = { projections: 'id ', variables: {} }) {
    return apollo.mutate({ mutation: gql`mutation createAccount($data: accountData) { createAccount(data: $data) { id } }`, variables })
  }
}
