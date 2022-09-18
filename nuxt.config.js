export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sevim Fahrschule',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt  Dashboard  comes with an API-powered backend',
      },
      {
        name: 'keywords',
        content: 'html dashboard, nuxt, laravel, vue, vuejs',
      },
      {
        itemprop: 'name',
        content: 'Nuxt Dashboard',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
      // },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
        integrity:
          'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['assets/scss/argon.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/dashboard-plugin',
    '~/plugins/globalComponents',
    '~/plugins/globalDirectives',
  ],

  /*
   ** Nuxt.js modules
   */
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    defaultLocale: 'de',
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        iso: 'de-DE',
        file: 'de.js',
      },
    ],
    lazy: true,
    vueI18n: {
      fallbackLocale: 'de',
    },
    langDir: 'lang',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

   axios: {
     proxy: true,
   },

   proxy: {
     '/api': {
       target: 'http://127.0.0.1:8000',
       pathRewrite: { '^/api': '' },
       changeOrigin: true,
     },
   },

   auth: {
     strategies: {
       local: {
         token: {
           property: 'access_token',
           global: true,
           required: true,
           type: 'Bearer',
         },
         user: {
           property: 'user',
           autoFetch: true,
         },
         endpoints: {
           login: {
             url: '/api/login',
             method: 'post',
           },
           logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
           user: {
             url: '/api/me',
             method: 'get',
           },
         },
       },
     },
   },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
