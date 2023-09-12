// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
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
        { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_KEY}&libraries=places` },
        { src: '/assets/js/all.min.js' }
      ]
    },
  },

  typescript: { strict: true },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth"
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql',
        defaultOptions: {
          query: {
            fetchPolicy: 'no-cache'
          }
        }
      }
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  auth: {
		isEnabled: true,
		// origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
		// enableGlobalAppMiddleware: true,
	},

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:7500'
    }
  }
})
