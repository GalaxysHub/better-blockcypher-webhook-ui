import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'app': path.resolve(__dirname, './src/app'),
      'styles': path.resolve(__dirname, './src/styles'),
      'utils': path.resolve(__dirname, './src/utils'),
      'APIs': path.resolve(__dirname, './src/APIs'),
      '_config': path.resolve(__dirname, './src/_config'),
      'store': path.resolve(__dirname, './src/store'),
      '__mock__': path.resolve(__dirname, './src/__mock__'),
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
  },
})