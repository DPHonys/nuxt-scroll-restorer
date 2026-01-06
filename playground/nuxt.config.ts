export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  compatibilityDate: '2026-01-06',
  css: ['~/assets/css/main.css'],
  scrollRestorer: {
    enabled: true,
    debug: true,
  },
})
