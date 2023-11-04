import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), sentryVitePlugin({
    org: "todoapp-gq",
    project: "javascript-vue"
  })],

  build: {
    sourcemap: true
  }
})