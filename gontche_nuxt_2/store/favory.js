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
      if (this.$auth.loggedIn) {
        this.$api.favoryService.authUserFavories()
          .then(({ data }) => {
            const appartments = data.authUserFavories.map(d => ({ fID: d.id, ...d.appartment }))
            commit('setFavories', appartments)
            resolve()
          }).catch((error) => {
            reject(error)
          })
      } else {
        commit('setFavories', [])
      }
    })
  },

  createFavory ({ commit, dispatch }, payload) {
    //
  }
}
