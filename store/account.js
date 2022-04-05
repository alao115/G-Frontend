export const state = () => ({
  accounts: [],
  authUserAccount: null
})

export const getters = {
  accounts: state => state.accounts,
  authUserAccount: state => state.authUserAccount
}

export const mutations = {
  setAccounts: (state, payload) => { state.accounts = payload },
  setAuthUserAccount: (state, payload) => { state.authUserAccount = payload }
}

export const actions = {
  loadAccounts ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.accountService.getAll()
        .then(({ data }) => {
          commit('setAccounts', data.accounts)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  },

  getAuthUserAccount ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.accountService.authUserAccount()
        .then(({ data }) => {
          // console.log('Response: ', data.authUserAccount)
          commit('setAuthUserAccount', data.authUserAccount)
          resolve()
        }).catch(error => reject(error))
    })
  }
}
