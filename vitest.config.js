import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./tests', import.meta.url)),
      server: {
        deps: {
          inline: ['vuetify'],
        }
      },
      coverage: {
        reporter: ['text-summary','html','json-summary'],
        reportOnFailure: true,
      },
      inspector: {
        enabled: false,
      },
    },
    resolve: {
      alias: {
        '%': fileURLToPath(new URL('./tests', import.meta.url)),
      }
    }
  })
)
