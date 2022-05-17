export default ({ $axios }) => class AuthService {
  verifyEmail (data) {
    return $axios.post('/auth/email-token-verification', data)
  }

  sendVerificationEmail (data) {
    return $axios.post('auth/send-verification-email', data)
  }

  sendPasswordResetEmail (data) {
    return $axios.post('auth/send-password-recovery-email', data)
  }

  passwordResetTokenVerification (data) {
    return $axios.post('auth/password-recovery-token-verification', data)
  }

  resetPassword (data) {
    return $axios.post('auth/password-reset', data)
  }
}
