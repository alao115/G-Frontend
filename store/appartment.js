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
            const appartments = data.authUserFavories.map(d => ({ fID: d.id, ...d.appartment }))
            commit('setAppartments', appartments)
            commit('favory/setFavories', appartments, { root: true })
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
