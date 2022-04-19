export const state = () => ({
  favories: []
})

export const getters = {
  favories: state => state.favories
}

export const mutations = {
  setFavories: (state, payload) => { state.favories = payload }
}

export const actions = {
  loadFavories ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.favoryService.getAll()
        .then(({ data }) => {
          commit('setFavories', data.favories)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  },

  createFavory ({ commit, dispatch }, payload) {
    //
  }
}
