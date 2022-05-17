export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gontche',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: '/assets/css/main.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/assets/js/all.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    /* '~/static/assets/css/main.css', */
    '~/static/assets/css/line-awesome.min.css',
    '~/static/assets/css/all.min.css'
  ],

  loading: {
    height: '5px',
    color: '#0A3DAB'
  },

  loadingIndicator: {
    name: 'circle',
    height: '5px',
    color: '#0A3DAB',
    background: 'white'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js',
    '~/plugins/apollo-overrides.js',
    { src: '~/plugins/kkiapay', ssr: false }
    // '~/plugins/test_plugins.js',
    // '~/plugins/apollo.config.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/apollo',
    'nuxt-logrocket'
  ],

  logRocket: {
    // configure LogRocket
    logRocketId: 'yqrw52/first-one',
    devModeAllowed: false,
    config: {
      //
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || 'http://localhost:7500/graphql'
      }
    },
    authenticationType: 'Bearer',
    tokenName: 'auth.gontche.customStrategy'
  },

  auth: {
    localStorage: {
      prefix: 'gontche.'
    },
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: '/auth/signin',
      home: '/'
    },
    strategies: {
      customStrategy: {
        scheme: '~/authSchemes/customScheme',
        token: {
          property: 'accessToken',
          prefix: 'gontche.'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post'
          },
          logout: false,
          user: { url: '/users/me', method: 'get' }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:7500/api'
    // credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },

  buildDir: 'nuxt-dist',

  server: {
    port: process.env.PORT || 3000
  },
  generate: {
    dir: '/home/app/backend/dist/public'
  },
  target: 'static',
  ssr: false
}
