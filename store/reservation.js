export const state = () => ({
  reservations: []
})

export const getters = {
  reservations: state => state.reservations
}

export const mutations = {
  setReservations: (state, payload) => { state.reservations = payload }
}

export const actions = {
  loadReservations ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$api.reservationService.getAll()
        .then(({ data }) => {
          commit('setReservations', data.reservations)
          resolve()
        }).catch((error) => {
          // const message = error?.response?.data.error.message ? error.response.data.error.message : 'Une erreur s\'est produite. Veillez rééssayer plus tard'
          reject(error)
        })
    })
  }
}
