/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '#animations': fileURLToPath(
        new URL('./src/animations', import.meta.url),
      ),
      '#app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '#assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '#components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '#core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '#database': fileURLToPath(new URL('./src/database.ts', import.meta.url)),
      '#features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '#hoc': fileURLToPath(new URL('./src/hoc', import.meta.url)),
      '#hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '#lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '#routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '#services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '#store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '#stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '#test': fileURLToPath(new URL('./src/test', import.meta.url)),
      '#types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '#utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '#windows': fileURLToPath(new URL('./src/windows', import.meta.url)),
      '#workers': fileURLToPath(new URL('./src/workers', import.meta.url)),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.ts'],
          exclude: ['**/node_modules/**', '**/e2e/**'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
