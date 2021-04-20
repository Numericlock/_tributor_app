import Sass from 'sass'
import Fiber from 'fibers'

require('dotenv').config()
const environment = process.env.NODE_ENV || 'development';

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [ 'animate.css/animate.min.css' ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/axios',
      '~/plugins/vue-cropperjs',
      '~/plugins/v-scroll-lock',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],
  proxy: {
    '/api': (environment === 'development') ? 'http://localhost:8000' : 'https://api.example.com'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL,
    credentials: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber
        }
      }
    },
    extend (config, ctx) {
    }
  }
}