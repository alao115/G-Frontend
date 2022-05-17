export const state = () => ({
  publications: []
})

export const getters = {
  publications: state => state.publications
}

export const mutations = {
  setPublications: (state, payload) => { state.publications = payload }
}

export const actions = {
  loadPublications ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.publicationService.getAll()
        .then(({ data }) => {
          commit('setPublications', data.publications)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  }
}
