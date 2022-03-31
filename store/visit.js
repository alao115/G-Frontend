export const state = () => ({
  visits: []
})

export const getters = {
  visits: state => state.visits
}

export const mutations = {
  setVisits: (state, payload) => { state.visits = payload }
}

export const actions = {
  createVisit ({ dispatch }, { data }) {
    return new Promise((resolve, reject) => {
      this.$api.visitService.create({ variables: { data } })
        .then(async ({ data }) => {
          await dispatch('loadVisits')
          return data
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },

  loadVisits ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.visitService.getAll()
        .then(({ data }) => {
          commit('setVisits', data.visits)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  },

  deleteVisit ({ commit, dispatch }, { visitId }) {
    return new Promise((resolve, reject) => {
      this.$api.visitService.delete({ variables: { visitId } })
        .then(({ data }) => {
          // console.log(data)
          return dispatch('loadVisits')
        })
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }
}
