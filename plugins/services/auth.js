export default (http) =>
  class AuthService {
    static signup(payload) {
      return http.post('/auth/register', payload)
    }

    static getUser() {
      return http.$get('/users/me')
    }
  }
