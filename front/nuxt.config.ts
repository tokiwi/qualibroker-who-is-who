// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@nuxt/ui',
    'dayjs-nuxt',
    /*'nuxt-directus-next',*/
    'nuxt-directus',
    /*'@nuxtjs/google-fonts'*/
  ],

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

  ssr: true,

  /*googleFonts: {
    families: {
      Outfit: true,
    }
  }*/
})
