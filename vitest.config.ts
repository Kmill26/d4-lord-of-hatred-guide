import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Test-only config: the PWA plugin is intentionally omitted here.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Force the React *development* build under test. Vitest otherwise resolves
    // `react` to its production bundle, which omits `React.act` — sending
    // @testing-library/react down its `react-dom/test-utils` fallback, where
    // `act` was removed in React 19 ("React.act is not a function"). Set here
    // (not just in the npm script) so direct `vitest` runs are covered too.
    env: { NODE_ENV: 'test' },
    // A concrete origin so jsdom exposes localStorage (it's undefined on about:blank).
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
