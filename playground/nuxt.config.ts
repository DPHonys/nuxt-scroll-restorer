export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2024-06-17',
  css: ['~/assets/css/main.css'],
  scrollRestorer: {
    enabled: true,
    debug: true,
  },
})
