/**
 * Páginas públicas indexáveis: alimenta sitemap.xml (e o llms.txt, quando for criado).
 * Mapa de páginas do wireframe aprovado. Cada rota ganha sua pasta em src/app/<rota>/page.tsx.
 */
export const routes: {
  path: string
  title: string
  summary: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}[] = [
  {
    path: '/',
    title: 'Início',
    summary: 'Visão geral do espaço, diferenciais, números, depoimentos e localização.',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    path: '/nosso-espaco',
    title: 'Nosso espaço',
    summary: 'Ambientes, áreas verdes, capacidade, climatização e acessibilidade.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/servicos',
    title: 'Serviços',
    summary: 'Casamentos, eventos sociais e corporativos.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/contato',
    title: 'Contato',
    summary: 'WhatsApp, e-mail, endereço, mapa e formulário de orçamento.',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/perguntas-frequentes',
    title: 'Perguntas frequentes',
    summary: 'Capacidade, estacionamento, acessibilidade, fornecedores e visitas.',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/galeria',
    title: 'Galeria',
    summary: 'Fotos do espaço e de eventos realizados.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/clientes',
    title: 'Clientes',
    summary: 'Avaliações públicas e depoimentos de clientes.',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    path: '/trabalhe-conosco',
    title: 'Trabalhe conosco',
    summary: 'Banco de talentos para quem quer trabalhar com eventos no Liac.',
    priority: 0.5,
    changeFrequency: 'monthly',
  },
  { path: '/sobre', title: 'Sobre nós', summary: 'História e valores.', priority: 0.6, changeFrequency: 'yearly' },
  {
    path: '/politica-de-privacidade',
    title: 'Política de privacidade',
    summary: 'Tratamento de dados pessoais (LGPD).',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
]
