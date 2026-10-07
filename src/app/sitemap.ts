import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'
import { routes } from '@/config/routes'
import { galleryPhotos, heroSlides, photos, type Photo } from '@/content/photos'
import { spaces } from '@/content/venue'

/** Fotos de cada página, para o sitemap de imagens (Google Imagens). */
const pageImages: Record<string, Photo[]> = {
  '/': heroSlides,
  '/nosso-espaco': [photos.areaExterna, ...spaces.map((s) => s.photo)],
  '/servicos': [photos.salaoDoces],
  '/clientes': [photos.casamentoRecepcao, photos.noivosPetalas],
  '/sobre': [photos.loungeNoite, photos.salaoBar],
  '/galeria': galleryPhotos,
  '/perguntas-frequentes': [photos.jardimNoite],
  '/contato': [photos.jardimPalmeiras],
  '/trabalhe-conosco': [photos.salaoImperial],
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
