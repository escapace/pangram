import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' as const,
      },
    },
  },
  define: {
    __VUE_OPTIONS_API__: 'false',
  },
  plugins: [vue()],
  server: {
    allowedHosts: true as const,
  },
}))
