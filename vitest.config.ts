import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Test-only config: the PWA plugin is intentionally omitted here.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // A concrete origin so jsdom exposes localStorage (it's undefined on about:blank).
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
