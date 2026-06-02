import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Relative base keeps the built site portable: it works from a domain root,
// a GitHub Pages project sub-path, or opened directly from disk.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
})
