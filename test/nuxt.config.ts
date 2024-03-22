// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@pinia/nuxt',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      directusUrl: 'https://admin.meet.qualibroker-swissriskcare.com'
      //directusUrl: 'http://localhost:8055'
    }
  },
})
