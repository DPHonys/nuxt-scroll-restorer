export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  scrollRestorer: {
    enabled: true,
    debug: true,
  },
  // Fix for e2e tests - ensure dependencies are properly resolved
  nitro: {
    alias: {
      // Fix vue resolution for Nitro build
      'vue/server-renderer': 'vue/server-renderer',
      vue: 'vue',
    },
    externals: {
      inline: [
        // Don't inline vue - keep it external
        (id) => !id.includes('vue'),
      ],
    },
  },
  // Suppress sourcemap warnings in tests
  vite: {
    build: {
      sourcemap: false, // Disable sourcemaps in test builds
    },
  },
})
