export default class AuthService {

  constructor(private readonly apiBaseUrl: string) {}

  async verifyEmail (data: any) {
    return await useFetch(`${this.apiBaseUrl}/auth/email-token-verification`, { method: 'post', body: data })
  }

  async sendVerificationEmail (data: any) {
    return await useFetch(`${this.apiBaseUrl}auth/send-verification-email`, { method: 'post', body: data })
  }

  async sendPasswordResetEmail (data: any) {
    return await useFetch(`${this.apiBaseUrl}auth/send-password-recovery-email`, { method: 'post', body: data })
  }

  async passwordResetTokenVerification (data: any) {
    return await useFetch(`${this.apiBaseUrl}auth/password-recovery-token-verification`, { method: 'post', body: data })
  }

  async resetPassword (data: any) {
    return await useFetch(`${this.apiBaseUrl}auth/password-reset`, { method: 'post',  body: data })
  }
}
