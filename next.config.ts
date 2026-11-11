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
    // 75 = padrão (cards e galeria); 80 = topo das páginas e foto ampliada
    qualities: [75, 80],
    // Larguras geradas: inclui 1600 (notebooks) e para em 2400, o tamanho máximo das fotos em public/images/fotos
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2400],
    // 480 cobre os cards de ~300 a 400 px sem pular direto para 640
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
    // As fotos têm nome único (troca de foto = arquivo novo), então a versão otimizada pode ficar 31 dias em cache
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Arquivos estáticos de mídia: o navegador reaproveita por 7 dias em vez de revalidar a cada visita
      {
        source: '/:dir(images|videos)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ]
  },
  // TODO: redirecionar URLs do site antigo da Liac que deixarem de existir
  async redirects() {
    return []
  },
}

export default nextConfig
