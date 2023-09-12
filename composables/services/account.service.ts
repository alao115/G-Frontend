export default class AccountService {
  constructor(private readonly apiBaseUrl: string) {}

  async getAll({ variables } = { variables: {} }) {
    try {
      const query = gql`
          query {
            accounts {
              id
              user {
                id
                userType
                emailVerified
              }
              status
              firstname
              lastname
              civility
              phone
              email
            }
          }
        `
      return await useAsyncQuery(query, variables)
    } catch (error) {
      throw error;
    }
  }

  async create({ variables } = { variables: {} }) {
    try {
      const query = gql`
          mutation createAccount ($data: accountData) {
            createAccount (data: $data) {
              id
            }
          }
        `
      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error
    }
  }

  async delete({ variables } = { variables: {} }) {
    try {
      const query = gql`
          mutation deleteAccount ($accountId: ID!) {
            deleteAccount (accountId: $accountId ) {
              id
            }
          }`
      const { mutate } = useMutation(query, variables)
      return await mutate(variables)
    } catch (error) {
      throw error;
    }
  }

  async authUserAccount({ variables } = { variables: {} }) {
    try {
      const query = gql`
          query {
            authUserAccount {
              id
              user { id userType emailVerified }
              status
              firstname
              lastname
              civility
              phone
              email
            }
          }`
      return await useAsyncQuery(query, variables)
    } catch (error) {
      throw error
    }
  }

  signup(data: any) {
    return useFetch(`${this.apiBaseUrl}/auth/signup`, data)
  }
  async updateUser({ variables } = { variables: {} }) {
    // variables?.data?.conditions && delete variables?.data.conditions?.__typename
    // variables?.data?.ownerInfos && delete variables?.data.ownerInfos?.__typename
    // variables?.data?.__typename && delete variables?.data?.__typename
    // variables?.data?.id && delete variables?.data?.id
    try {
      const query = gql`mutation updateUser($data: userData, $userId: ID!) { updateUser(userId: $userId, data: $data) { id } }`
      const { mutate, loading, error, called } = useMutation(query, variables);
      return await mutate(variables)
    } catch (error) {
      throw error
    }
  }
}
