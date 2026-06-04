import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// Relative base keeps the built site portable: it works from a domain root,
// a GitHub Pages project sub-path, or opened directly from disk.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Register manually (main.tsx) so we can skip the file:// Electron fallback,
      // where service workers are unsupported and would fail noisily.
      injectRegister: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Cache the Google Fonts + class portraits so the guide works offline.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === 'https://sunderarmor.com' || url.origin === 'https://bnetcmsus-a.akamaihd.net',
            handler: 'CacheFirst',
            options: {
              cacheName: 'guide-art',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'Lord of Hatred — Leveling Strategium',
        short_name: 'LoH Guide',
        description:
          'Interactive Diablo IV: Lord of Hatred (Season 13) leveling companion — class builds, point-by-point paths to 70, tier list, route, glossary and respec advice.',
        theme_color: '#090807',
        background_color: '#090807',
        display: 'standalone',
        orientation: 'any',
        categories: ['games', 'reference'],
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
})
