import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/skate-log/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Evan's Skate Practice",
        short_name: 'Skate Practice',
        description: 'A fun figure-skating practice checklist',
        theme_color: '#ff8cc4',
        background_color: '#fff1f8',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/skate-log/',
        start_url: '/skate-log/',
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ico}',
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: 'index.html',
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
})