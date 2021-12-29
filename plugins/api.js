import services from './services'

export default ({ $axios, store, app, $apolloHelpers }, inject) => {
  // $axios.onRequest((config) => {
  //   /* if (config.baseURL !== 'http://localhost:8000/api') {
  //     config.baseURL = 'http://localhost:8000/api'
  //   } */

  //   return config
  // }, null)
  const apolloClient = app.apolloProvider.defaultClient

  inject('api', services({ apollo: apolloClient }, $axios))
}
