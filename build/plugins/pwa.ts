import { VitePWA } from 'vite-plugin-pwa'

export function setupPwaPlugin() {
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
    workbox: {
      maximumFileSizeToCacheInBytes: 3000000,
    },
    manifest: {
      name: 'Vue Naive Admin',
      short_name: 'Vue Naive Admin',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  })
}
