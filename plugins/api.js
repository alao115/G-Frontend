// import https from 'https'
import services from './services'

export default ({ $axios, store, app, $apolloHelpers }, inject) => {
  $axios.onRequest((config) => {
    // config.httpsAgent = new https.Agent({
    //   rejectUnauthorized: false
    // })

    return config
  }, null)
  const apolloClient = app.apolloProvider.defaultClient

  inject('api', services({ apollo: apolloClient }, $axios))
}
