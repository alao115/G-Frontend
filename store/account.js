export const state = () => ({
  accounts: []
})

export const getters = {
  accounts: state => state.accounts
}

export const mutations = {
  setAccounts: (state, payload) => { state.accounts = payload }
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
  }
}
