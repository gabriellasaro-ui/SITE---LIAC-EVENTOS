import type { IconName } from '@/components/ui/Icon'
import { photos, type Photo } from './photos'

/** Faixa de destaques logo abaixo do topo das páginas. */
export const highlights: { label: string; icon: IconName }[] = [
  { label: '50 a 300 convidados', icon: 'users' },
  { label: '100% climatizado', icon: 'snowflake' },
  { label: 'Acessibilidade', icon: 'accessibility' },
  { label: 'Estacionamento', icon: 'parking' },
  { label: 'Gerador de energia', icon: 'zap' },
  { label: '1 evento por dia', icon: 'calendar' },
  { label: 'Na orla da Pampulha', icon: 'mapPin' },
  { label: 'Jardim de palmeiras', icon: 'palm' },
]

/** Selos rápidos da seção "Nosso espaço" (home). */
export const quickFacts = ['50 a 300 convidados', '100% climatizado', 'Acessibilidade', 'Estacionamento']

/** "Por que o Liac" (home). Texto do wireframe aprovado. */
export const differentials: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Localização na Pampulha',
    text: 'Na orla da Lagoa da Pampulha, em uma das regiões mais conhecidas e valorizadas de Belo Horizonte.',
    icon: 'mapPin',
  },
  {
    title: 'Ambientes que acompanham cada momento',
    text: 'Jardim, salão principal e ambientes de apoio que permitem criar diferentes experiências dentro do mesmo evento.',
    icon: 'sparkles',
  },
  {
    title: 'Conforto, segurança e acessibilidade',
    text: 'Salão 100% climatizado, acessibilidade, estacionamento e gerador de energia para receber seus convidados com mais tranquilidade.',
    icon: 'shield',
  },
  {
    title: 'Pub para os anfitriões',
    text: 'Um ambiente reservado para preparação, encontros e registros especiais antes da celebração começar.',
    icon: 'martini',
  },
  {
    title: 'Spa / sala dos anfitriões',
    text: 'Um espaço pensado para a preparação do grande momento com conforto, privacidade e uma experiência mais completa.',
    icon: 'bath',
  },
  {
    title: 'Boate e área kids',
    text: 'Ambientes que ampliam as possibilidades da festa e ajudam a criar uma experiência mais completa para diferentes perfis de convidados.',
    icon: 'music',
  },
]

export type Space = { title: string; text: string; photo: Photo; icon: IconName; slug: string }

/** Ambientes (página Nosso espaço e tour da home). */
export const spaces: Space[] = [
  {
    slug: 'jardim',
    title: 'Jardim / Cerimônia',
    text: 'Um cenário para cerimônias, recepções e momentos ao ar livre, integrado à atmosfera da Pampulha.',
    photo: photos.jardimPalmeiras,
    icon: 'palm',
  },
  {
    slug: 'salao',
    title: 'Salão principal',
    text: 'O coração da celebração: um salão de alto padrão, 100% climatizado e preparado para diferentes layouts de festa e evento.',
    photo: photos.salaoFlores,
    icon: 'sparkles',
  },
  {
    slug: 'pub',
    title: 'Pub',
    text: 'Um ambiente reservado para os anfitriões se prepararem, receberem pessoas especiais e criarem registros antes da celebração.',
    photo: photos.pubSinuca,
    icon: 'martini',
  },
  {
    slug: 'spa',
    title: 'Spa / sala dos anfitriões',
    text: 'Conforto e privacidade para os momentos de preparação, com um ambiente dedicado antes do início do evento.',
    photo: photos.spaBanheira,
    icon: 'bath',
  },
  {
    slug: 'kids',
    title: 'Área Kids',
    text: 'Uma estrutura de apoio que amplia o conforto de famílias e convidados em celebrações com crianças.',
    photo: photos.kidsCasinhas,
    icon: 'baby',
  },
  {
    slug: 'boate',
    title: 'Boate',
    text: 'Um ambiente pensado para prolongar a energia da festa e criar uma experiência de pista mais envolvente.',
    photo: photos.boate15,
    icon: 'music',
  },
]

/** Configurações de evento (página Nosso espaço). */
export const layouts: { name: string; text: string; icon: IconName }[] = [
  { name: 'Casamento', text: 'Cerimônia, recepção, jantar e pista em uma experiência integrada.', icon: 'heart' },
  { name: 'Corporativo', text: 'Plenária, palco, apresentação, networking e confraternização.', icon: 'briefcase' },
  { name: 'Coquetel', text: 'Circulação fluida, ilhas gastronômicas, lounges e encontros.', icon: 'wine' },
  { name: 'Social', text: 'Mesas, pista, ambientação e experiências personalizadas.', icon: 'party' },
]

export type Service = { tag: string; title: string; text: string; photo: Photo; icon: IconName }

/** Ocasiões em destaque na home. */
export const homeServices: { title: string; text: string; photo: Photo }[] = [
  {
    title: 'Casamentos',
    text: 'Um espaço para casamento em Belo Horizonte que reúne cerimônia, recepção e festa em uma experiência integrada e sofisticada.',
    photo: photos.cerimoniaArco,
  },
  {
    title: 'Eventos corporativos',
    text: 'Confraternizações, lançamentos, premiações, encontros empresariais e experiências de marca em um espaço de eventos na Pampulha.',
    photo: photos.salaoMontagem,
  },
  {
    title: 'Eventos sociais',
    text: 'Aniversários, formaturas e celebrações especiais com estrutura versátil para transformar cada ocasião em uma experiência única.',
    photo: photos.boate15,
  },
  {
    title: 'Eventos personalizados',
    text: 'Projetos autorais e celebrações sob medida, combinando os ambientes do Liac de acordo com a proposta do seu evento.',
    photo: photos.decoracaoTropical,
  },
]

/** Página Serviços. */
export const services: Service[] = [
  {
    tag: 'Casamentos',
    title: 'Casamentos na Pampulha',
    text: 'Cerimônia, recepção e festa no mesmo endereço, com ambientes que acompanham cada etapa do casamento e valorizam a experiência dos convidados.',
    photo: photos.cerimoniaArco,
    icon: 'heart',
  },
  {
    tag: 'Corporativo',
    title: 'Eventos corporativos em BH',
    text: 'Um espaço para eventos corporativos em Belo Horizonte ideal para confraternizações, lançamentos, premiações, encontros empresariais e experiências de marca.',
    photo: photos.salaoMontagem,
    icon: 'briefcase',
  },
  {
    tag: 'Social',
    title: 'Festas e eventos sociais em BH',
    text: 'Aniversários e celebrações especiais com uma estrutura elegante, confortável e flexível para diferentes estilos de evento.',
    photo: photos.boateAniversario,
    icon: 'party',
  },
  {
    tag: 'Formaturas',
    title: 'Formaturas e grandes celebrações',
    text: 'Uma estrutura preparada para celebrar grandes conquistas com salão, pista, ambientes de apoio e diferentes possibilidades de montagem.',
    photo: photos.salaoPista,
    icon: 'graduation',
  },
  {
    tag: 'Experiências',
    title: 'Eventos personalizados',
    text: 'Para propostas criativas, ativações e celebrações que pedem uma configuração exclusiva, o Liac pode ser adaptado à experiência que você deseja criar.',
    photo: photos.decoracaoTropical,
    icon: 'gem',
  },
  {
    tag: 'Visita',
    title: 'Visita ao espaço',
    text: 'Conheça os ambientes presencialmente, compartilhe seu briefing com a equipe e visualize as possibilidades para o seu evento.',
    photo: photos.areaExterna,
    icon: 'calendar',
  },
]
