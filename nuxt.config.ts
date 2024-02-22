// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'dayjs-nuxt',
    'nuxt-directus',
    /*'@nuxtjs/google-fonts'*/
  ],

  colorMode: {
    preference: 'light'
  },

  directus: {
    autoFetch: true,
    url: 'http://0.0.0.0:8055/'
  }

  /*googleFonts: {
    families: {
      Outfit: true,
    }
  }*/
})
