import type { SiteConfig } from './types'

/*
 * LIAC EVENTOS. Fontes: wireframe aprovado (referência/), site antigo (liaceventos.com.br)
 * e perfil público no Casamentos.com.br (conferidos em 05/10/2026).
 * Não reaproveitar fatos da Let's Go (endereço, CEP, telefones e avaliações são de outra empresa).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://liaceventos.com.br').replace(/\/$/, '')

const addressQuery = encodeURIComponent(
  'Liac Eventos, Av. Otacílio Negrão de Lima, 7170 - Bandeirantes, Belo Horizonte - MG',
)

/** Perfil público no Casamentos.com.br (avaliações de casais) */
export const casamentosUrl = 'https://www.casamentos.com.br/salao-casamento/liac-eventos--e331380'

export const site: SiteConfig = {
  name: 'Liac Eventos',
  tagline: 'Espaço para eventos e casamentos na Pampulha, em BH',
  description:
    'Liac Eventos: espaço para eventos em Belo Horizonte, na Pampulha. Casamentos, eventos sociais e corporativos de 50 a 300 convidados, com estrutura de alto padrão, climatização, acessibilidade e estacionamento.',
  url: siteUrl,
  locale: 'pt_BR',
  schemaType: ['EventVenue', 'LocalBusiness'],
  category: 'Espaço para eventos e casamentos',
  logo: {
    src: '/images/marca/logo-liac-eventos-rose.png',
    width: 480,
    height: 180,
    alt: 'Logo Liac Eventos',
  },
  logoOnDark: {
    src: '/images/marca/logo-liac-eventos-branco.png',
    width: 480,
    height: 180,
    alt: 'Logo Liac Eventos',
  },
  ogImage: '/images/og/og-home.jpg',
  contact: {
    phones: [{ label: 'WhatsApp', display: '(31) 9 9447-0109', e164: '+5531994470109' }],
    whatsapp: {
      label: 'WhatsApp',
      display: '(31) 9 9447-0109',
      e164: '+5531994470109',
      defaultMessage: 'Olá! Vim pelo site do Liac Eventos e gostaria de saber mais sobre o espaço.',
    },
    email: 'contato@liaceventos.com.br',
  },
  address: {
    street: 'Av. Otacílio Negrão de Lima, 7170',
    neighborhood: 'Bandeirantes',
    region: 'Pampulha',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    stateCode: 'MG',
    postalCode: '31365-450',
    country: 'BR',
    // TODO: coordenadas do pin no Perfil da Empresa no Google
    geo: undefined,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
    mapsEmbedUrl: `https://www.google.com/maps?q=${addressQuery}&output=embed`,
    landmark: 'na orla da Lagoa da Pampulha',
  },
  // Horário publicado no site antigo (atendimento comercial)
  openingHours: [
    { days: 'Segunda a sexta', opens: '09:00', closes: '17:00', schema: 'Monday,Tuesday,Wednesday,Thursday,Friday' },
    { days: 'Sábado', opens: '10:00', closes: '16:00', schema: 'Saturday' },
  ],
  // Perfil público no Casamentos.com.br (exibido no site; NÃO vai para o schema)
  rating: { value: 4.8, count: 10, platform: 'Casamentos.com.br', url: `${casamentosUrl}/opinioes` },
  // TODO: razão social e CNPJ
  legal: {
    companyName: undefined,
    cnpj: undefined,
    privacyEmail: 'contato@liaceventos.com.br',
    policyUpdatedAt: '2026-10-05',
  },
  areaServed: ['Belo Horizonte', 'Pampulha', 'Região Metropolitana de Belo Horizonte'],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/liaceventos/' },
    { label: 'Casamentos.com.br', href: casamentosUrl },
  ],
  // Menu do wireframe aprovado
  nav: [
    { label: 'Nosso espaço', href: '/nosso-espaco' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Sobre nós', href: '/sobre' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'FAQ', href: '/perguntas-frequentes' },
    { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    { label: 'Fale conosco', href: '/contato' },
  ],
  cta: { label: 'Solicite um orçamento', href: '/contato' },
  keywords: [
    'espaço para eventos em Belo Horizonte',
    'espaço para casamento em Belo Horizonte',
    'salão de festas em Belo Horizonte',
    'espaço de eventos na Pampulha',
    'eventos corporativos em Belo Horizonte',
    'casamento na Pampulha',
    'Liac Eventos',
  ],
}

/** Fatos de destaque usados em várias seções (todos confirmados) */
export const facts = {
  capacity: { min: 50, max: 300 },
  couples: 105,
  eventsPerDay: 1,
}

export const fullAddress = `${site.address.street} – ${site.address.neighborhood} (${site.address.region}), ${site.address.city} – ${site.address.stateCode}, ${site.address.postalCode}`

/** Abre o Google Maps já com a rota até o endereço. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`

export function whatsappUrl(message: string = site.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${site.contact.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
