import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Liac Eventos',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: 'var(--color-ink-950)',
    theme_color: 'var(--color-ink-950)',
    lang: 'pt-BR',
    icons: [
      { src: '/images/marca/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/marca/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
