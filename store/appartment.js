export const state = () => ({
  appartments: []
})

export const getters = {
  appartments: state => state.appartments
}

export const mutations = {
  setAppartments: (state, payload) => { state.appartments = payload }
}

export const actions = {
  loadAppartments ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      // console.log(this.$auth.user)
      if (this.$auth.user.userType !== 2) {
        this.$api.appartmentService.getAll()
          .then(({ data }) => {
            commit('setAppartments', data.appartments)
            resolve()
          }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
            reject(error)
          })
      } else {
        this.$api.favoryService.authUserFavories()
          .then(({ data }) => {
            commit('setAppartments', data.authUserFavories.map(d => d.appartment))
            resolve()
          }).catch((error) => {
            reject(error)
          })
      }
    })
  },

  createAppartment ({ commit, dispatch }, payload) {
    //
  }
}
