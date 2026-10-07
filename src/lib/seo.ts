import type { Metadata } from 'next'
import { site } from '@/config/site'

/** Páginas com imagem de compartilhamento própria (public/images/og/og-<slug>.jpg, 1200x630). */
const ogPages = [
  'nosso-espaco',
  'servicos',
  'clientes',
  'sobre',
  'galeria',
  'perguntas-frequentes',
  'contato',
  'trabalhe-conosco',
]

/** Imagem OG da página (cai na imagem padrão da marca quando não há uma específica). */
export function ogImageFor(path: string) {
  const slug = path.replace(/^\//, '').split('/')[0]
  return ogPages.includes(slug) ? `/images/og/og-${slug}.jpg` : site.ogImage
}

type PageSeo = {
  title: string
  description: string
  path: string
  /** Imagem OG específica da página (caminho em /public). Padrão: OG da marca. */
  image?: string
  /** Usa o título exato, sem o sufixo "| Marca" */
  absoluteTitle?: boolean
  noindex?: boolean
}

/** Metadata padronizada por página: title, description, canonical, Open Graph e Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image = ogImageFor(path),
  absoluteTitle,
  noindex,
}: PageSeo): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
