export default ({ $axios }) => class AuthService {
  verifyEmail (data) {
    return $axios.post('/auth/email-token-verification', data)
  }

  sendVerificationEmail (data) {
    return $axios.post('auth/send-verification-email', data)
  }
}
