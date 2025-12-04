import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    exclude: ['test/e2e/**'],
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'ssr',
          include: ['test/basic.test.ts'],
          environment: 'node',
          root: fileURLToPath(new URL('./', import.meta.url)),
        },
      },
    ],
  },
})
