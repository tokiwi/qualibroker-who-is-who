// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  app: {
    head: {
      title: 'Qualibroker - Who is who',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png"},
        {rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png"},
        {rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png"},
        {rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png"},
        {rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png"},
        {rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png"},
        {rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png"},
        {rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png"},
        {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png"},
        {rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png"},
        {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
        {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png"},
        {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
      ],
      meta: [
        {name: "msapplication-TileColor", content: "#ffffff"},
        {name: "msapplication-TileImage", content: "/ms-icon-144x144.png"},
        {name: "theme-color", content: "#ffffff"},
      ]
    },
  },

  modules: [
    '@nuxt/ui',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],

  dayjs: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },

  colorMode: {
    preference: 'light'
  },

  directus: {
    //autoFetch: true,
    autoRefresh: true,
    url: process.env.DIRECTUS_URL,
  },

  runtimeConfig: {
    public: {
      directus: {
        url: process.env.DIRECTUS_URL,
      }
    }
  },

  ssr: false,

  nitro: {
    preset: 'node-server'
  }

  /*googleFonts: {
    families: {
      Outfit: true,
    }
  }*/
})
