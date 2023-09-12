export const state = () => ({
  appartmentTypes: []
})

export const getters = {
  appartmentTypes: state => state.appartmentTypes
}

export const mutations = {
  setAppartmentTypes: (state, payload) => { state.appartmentTypes = payload }
}

export const actions = {
  loadAppartmentTypes ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.appartmentTypeService.getAll()
        .then(({ data }) => {
          commit('setAppartmentTypes', data.appartmentTypes)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  }
}
