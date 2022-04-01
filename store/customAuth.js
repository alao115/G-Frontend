export const state = () => ({
  successSignup: false
})

export const getters = {
  successSignup: state => state.successSignup
}

export const mutations = {
  setSuccessSignup: (state, payload) => { state.successSignup = payload }
}

export const actions = {

}
