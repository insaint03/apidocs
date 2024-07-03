import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        embed: './embed/index.html',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      }
    }
  },
  preview: {
    // use 8081 port
    port: 8081,
  },
  plugins: [
    vue(),
    ViteYaml(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
