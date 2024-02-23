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
    url: process.env.DIRECTUS_URL,
  },

  ssr: false,

  /*googleFonts: {
    families: {
      Outfit: true,
    }
  }*/
})
