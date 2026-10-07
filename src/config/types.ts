/**
 * Contrato de uma marca. Todo site do grupo segue este formato:
 * para criar o site de outra empresa, basta preencher um novo `site.ts`
 * (e trocar o conteúdo em `src/content` + os tokens de cor em `globals.css`).
 */
export type NavItem = {
  label: string
  href: string
}

export type Phone = {
  label: string
  /** Formato exibido, ex.: (31) 2523-0101 */
  display: string
  /** Formato E.164, ex.: +553125230101 */
  e164: string
}

export type Unit = {
  name: string
  street: string
  neighborhood: string
  region?: string
  postalCode: string
  phones?: Phone[]
  mapsUrl: string
  mapsEmbedUrl: string
  confirmed: boolean
  /** Observação interna (não aparece no site) */
  note?: string
}

export type SiteConfig = {
  name: string
  legalName?: string
  /** Frase curta usada no <title> da home e em cards */
  tagline: string
  /** Descrição padrão (meta description) */
  description: string
  url: string
  locale: string
  /** Tipo principal no schema.org */
  schemaType: string[]
  /** Categoria do negócio em linguagem natural (usado em GEO / llms.txt) */
  category: string
  yearsOfHistory?: number
  foundingYear?: number
  logo: { src: string; width: number; height: number; alt: string }
  /** Versão do logo para fundos escuros/fotos (header transparente, rodapé) */
  logoOnDark?: { src: string; width: number; height: number; alt: string }
  seal?: { src: string; width: number; height: number; alt: string }
  ogImage: string
  contact: {
    phones: Phone[]
    whatsapp: Phone & { defaultMessage: string }
    email: string
  }
  address: {
    street: string
    neighborhood: string
    region: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    country: string
    /** Coordenadas exatas (pegar do Google Business Profile). Opcional. */
    geo?: { lat: number; lng: number }
    mapsUrl: string
    mapsEmbedUrl: string
    /** Ponto de referência que ajuda humanos e IAs a localizar o lugar */
    landmark: string
  }
  /** Horário de atendimento comercial. Deixe vazio se não confirmado. */
  openingHours?: { days: string; opens: string; closes: string; schema: string }[]
  /**
   * Outras unidades além do endereço principal. Só são exibidas (site, schema, llms.txt)
   * quando `confirmed: true`, para não divulgar endereço desatualizado.
   */
  extraUnits?: Unit[]
  /** Avaliação pública (ex.: Google Business Profile). Exibida no site; NÃO vai para o schema (política do Google). */
  rating?: { value: number; count: number; platform: string; url: string }
  /** Dados do controlador para a política de privacidade (LGPD). */
  legal: {
    /** Razão social (se vazio, a política usa o nome fantasia) */
    companyName?: string
    cnpj?: string
    /** Canal do encarregado de dados (DPO) */
    privacyEmail: string
    /** Data da última revisão da política (AAAA-MM-DD) */
    policyUpdatedAt: string
  }
  areaServed: string[]
  social: { label: string; href: string }[]
  nav: NavItem[]
  cta: { label: string; href: string }
  keywords: string[]
}
