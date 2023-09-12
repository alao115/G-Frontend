import AccountService from './services/account.service';



export default () => {

  const { public: publicConfig } = useRuntimeConfig()

  return {
    accountService: new AccountService(publicConfig.apiBaseUrl)
  }
}
