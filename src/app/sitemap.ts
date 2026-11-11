import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'
import { routes } from '@/config/routes'
import { galleryPhotos, heroSlides, photos, verticals, type Photo } from '@/content/photos'
import { services, spaces } from '@/content/venue'

/** Fotos de cada página, para o sitemap de imagens (Google Imagens). */
const pageImages: Record<string, Photo[]> = {
  '/': [...heroSlides, verticals.jardimArco, verticals.mesaBolo],
  '/nosso-espaco': [photos.areaExterna, verticals.noivaJardimInverno, ...spaces.map((s) => s.photo)],
  '/servicos': [photos.salao15, ...services.map((s) => s.photo)],
  '/clientes': [photos.saidaNoivos, verticals.noivaNoite, verticals.salaoBuffet, verticals.boateLounge],
  '/sobre': [photos.recepcaoJardim, photos.beijoFogosVertical],
  '/galeria': galleryPhotos,
  '/perguntas-frequentes': [photos.cerimoniaNoite],
  '/contato': [photos.jardimArco],
  '/trabalhe-conosco': [photos.festaBanda],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => {
    const images = [...new Set((pageImages[r.path] ?? []).map((p) => absoluteUrl(p.src)))]
    return {
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(images.length ? { images } : {}),
    }
  })
}
