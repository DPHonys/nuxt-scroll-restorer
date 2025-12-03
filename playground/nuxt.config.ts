export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  scrollRestorer: {
    enabled: true,
    debug: true, // Enable debug logging for testing
  },
})
