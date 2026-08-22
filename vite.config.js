import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/cleveland-pta-calendar/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        upcoming: resolve(__dirname, 'upcoming.html')
      }
    }
  }
})