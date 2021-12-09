import services from './services'

export default ({ $axios, store }, inject) => {
  $axios.onRequest((config) => {
    /* if (config.baseURL !== 'http://localhost:8000/api') {
      config.baseURL = 'http://localhost:8000/api'
    } */

    return config
  }, null)

  inject('api', services({ http: $axios }))
}
