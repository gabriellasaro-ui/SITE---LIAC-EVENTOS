import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Servidor enxuto para a imagem Docker (.next/standalone)
  output: 'standalone',
  // Permite abrir o servidor de desenvolvimento pelo IP da rede/VPN (senão o Next bloqueia o JS em dev)
  allowedDevOrigins: ['26.250.234.10', '*.local'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // TODO: redirecionar URLs do site antigo da Liac que deixarem de existir
  async redirects() {
    return []
  },
}

export default nextConfig
