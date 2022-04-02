export const state = () => ({
  successSignup: false,
  onSignin: false,
  passwordEmailSent: false,
  passwordEmailVerificationResponse: null,
  signinError: ''
})

export const getters = {
  successSignup: state => state.successSignup,
  onSignin: state => state.onSignin,
  passwordEmailSent: state => state.passwordEmailSent,
  passwordEmailVerificationResponse: state => state.passwordEmailVerificationResponse,
  signinError: state => state.signinError
}

export const mutations = {
  setSuccessSignup: (state, payload) => { state.successSignup = payload },
  setOnSignin: (state, payload) => { state.onSignin = payload },
  setPasswordEmailSent: (state, payload) => { state.passwordEmailSent = payload },
  setPasswordEmailVerificationResponse: (state, payload) => { state.passwordEmailVerificationResponse = payload },
  setSigninError: (state, payload) => { state.signinError = payload }
}

export const actions = {

}
