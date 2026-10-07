import { absoluteUrl, directionsUrl, facts, site } from '@/config/site'
import type { FaqItem } from '@/content/faq'
import { differentials, services, spaces } from '@/content/venue'
import { ogImageFor } from '@/lib/seo'

/**
 * Builders de dados estruturados (schema.org / JSON-LD).
 * Base do SEO técnico e do GEO: dão às buscas e às IAs fatos inequívocos
 * sobre a entidade (quem é, onde fica, o que oferece, como contatar).
 * A avaliação do Casamentos.com.br NÃO entra aqui (política do Google para avaliações de terceiros).
 */

const ORG_ID = `${site.url}/#organizacao`
const WEBSITE_ID = `${site.url}/#website`

export function businessSchema() {
  const { address, contact } = site
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    '@id': ORG_ID,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo.src), width: site.logo.width, height: site.logo.height },
    image: [
      absoluteUrl(site.ogImage),
      absoluteUrl('/images/fotos/jardim-cerimonia-palmeiras.webp'),
      absoluteUrl('/images/fotos/salao-casamento-decorado-flores.webp'),
    ],
    telephone: contact.phones[0]?.e164,
    email: contact.email,
    currenciesAccepted: 'BRL',
    maximumAttendeeCapacity: facts.capacity.max,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.stateCode,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(address.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng } }
      : {}),
    hasMap: address.mapsUrl,
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    containedInPlace: { '@type': 'Place', name: `${address.region}, ${address.city}` },
    sameAs: site.social.map((s) => s.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: contact.whatsapp.e164,
        email: contact.email,
        availableLanguage: 'Portuguese',
        areaServed: 'BR',
      },
    ],
    amenityFeature: [
      ...['Salão 100% climatizado', 'Acessibilidade', 'Estacionamento', 'Gerador de energia', 'Um evento por dia'].map(
        (name) => ({ '@type': 'LocationFeatureSpecification', name, value: true }),
      ),
      ...spaces.map((s) => ({ '@type': 'LocationFeatureSpecification', name: s.title, value: true })),
    ],
    isAccessibleForFree: false,
    publicAccess: false,
    ...(site.openingHours
      ? {
          openingHoursSpecification: site.openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.schema.split(',').map((d) => `https://schema.org/${d.trim()}`),
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    potentialAction: [
      {
        '@type': 'CommunicateAction',
        name: 'Solicitar proposta pelo WhatsApp',
        target: `https://wa.me/${contact.whatsapp.e164.replace('+', '')}`,
      },
      { '@type': 'ViewAction', name: 'Como chegar', target: directionsUrl },
    ],
    parentOrganization: { '@type': 'Organization', name: 'Grupo Let’s Go Festas', url: 'https://letsgofestas.com.br' },
    knowsAbout: ['Casamentos', 'Eventos corporativos', 'Eventos sociais', 'Formaturas', 'Festas de 15 anos'],
    keywords: differentials.map((d) => d.title).join(', '),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Serviços do ${site.name}`,
    itemListElement: services
      .filter((s) => s.tag !== 'Visita')
      .map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.title,
          serviceType: s.tag,
          description: s.text,
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'City', name: site.address.city },
          url: absoluteUrl('/servicos'),
        },
      })),
  }
}

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#pagina`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(ogImageFor(path)), width: 1200, height: 630 },
  }
}
