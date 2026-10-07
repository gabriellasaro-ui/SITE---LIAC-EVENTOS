export type Testimonial = {
  quote: string
  /** Trecho curto para o destaque do card */
  highlight: string
  author: string
  /** Origem e data (ex.: "Casamentos.com.br · set/2023") */
  party: string
  rating: number
}

const review = (author: string, date: string, rating: number, highlight: string, quote: string): Testimonial => ({
  author,
  party: `Casamentos.com.br · ${date}`,
  rating,
  highlight,
  quote,
})

/**
 * Avaliações públicas do Liac no Casamentos.com.br (conferidas em 05/10/2026).
 * Texto original, só com correções mínimas de digitação; nome como aparece no perfil (primeiro nome).
 */
export const testimonials: Testimonial[] = [
  review(
    'Letícia',
    'nov/2024',
    5,
    'Na primeira visita, já sabia que era ali que eu queria me casar!',
    'Em nossa primeira visita ao Liac, já sabia que era ali que eu queria me casar! Um espaço magnífico, muito bem planejado e lindo por si só! O espaço da noiva e do noivo são muito bem equipados e atendem muito bem, a área da cerimônia é magnífica, linda demais, e o salão de festas é um luxo, e a entrada triunfal para os noivos na hora da festa é um diferencial impressionante! Amamos cada detalhe do espaço e indico de olhos fechados!',
  ),
  review(
    'Lucas',
    'fev/2024',
    5,
    'Foi amor à primeira vista.',
    'O Liac foi o primeiro local que visitamos e foi amor à primeira vista. Nos emocionamos só de imaginar como tudo ficaria. É um local moderno, chique e cheio de aconchego. Tudo é incrível, desde a sala da noiva e do noivo aos banheiros do salão. Tudo incrivelmente lindo e imponente!',
  ),
  review(
    'Yasmin',
    'set/2023',
    5,
    'O jardim e as palmeiras muito bem cuidados.',
    'Foi amor à primeira vista… Não visitamos muitos locais e, após conhecer o LIAC, não conseguimos mais tirá-lo da cabeça. É realmente lindo, o jardim e as palmeiras muito bem cuidados, o quarto da noiva é perfeito, mais ainda o quarto do noivo, até sauna tem no lugar! É um luxo à noite, vale muito a pena investir em uma estrutura como a do Liac.',
  ),
  review(
    'Glecia',
    'set/2023',
    5,
    'Pensaram em cada detalhe para facilitar a organização.',
    'Amamos celebrar nosso casamento nesse espaço lindo, maravilhoso… Parabéns, vocês pensaram em cada detalhe para facilitar a organização, além de ser bem estruturado é muito lindo e com um carisma sem limites para conosco! Obrigada!',
  ),
  review(
    'Mariana',
    'out/2021',
    5,
    'Sem palavras para descrever a beleza desse lugar.',
    'Sem palavras pra descrever a beleza desse lugar. Tudo lindo, novinho, impecável. A equipe maravilhosa, depois que fechei o contrato não tive nenhum problema de comunicação e sempre foi muito fácil resolver qualquer problema. Sempre dispostas a fazer o melhor, super atenciosas e sempre deram o jeitinho de me entregar mais do que o combinado. Eu super indico, o espaço é simplesmente maravilhoso, um sonho. E a equipe sem defeitos!',
  ),
  review(
    'André',
    'out/2021',
    5,
    'Atenção, dedicação e seriedade em tudo.',
    'Desde o primeiro dia que visitei o espaço, nenhum outro se aproximou, não somente pela beleza do espaço, mas pela segurança dos administradores e o cuidado em cada detalhe pra fazer do nosso dia o mais perfeito. Concretizei o negócio, logo em seguida veio a pandemia, adiei as duas vezes e todas as vezes que precisava de algo, parecia que era a primeira vez quando fui fechar negócio: atenção, dedicação e seriedade em tudo. Dedicação total ao cliente e aos detalhes que tornaram aquilo tudo que idealizei em realidade.',
  ),
  review(
    'Barbara',
    'fev/2022',
    5,
    'A parede de vidro deu um efeito maravilhoso nas fotos.',
    'Espaço lindo, todo novo e bem cuidado, a equipe sempre muito disponível e educada. Não tive meu casamento na área externa devido à chuva (o temido plano B), mas a parede de vidro deu um efeito maravilhoso nas fotos do casamento (que foi realizado na área interna) e não perdeu em nada o encanto do local.',
  ),
  review(
    'Carol',
    'nov/2022',
    5,
    'Recebi vários elogios dos meus convidados.',
    'Recebi vários elogios dos meus convidados, todos eles com elogios ao Liac! Equipe sensacional e espaço maravilhoso.',
  ),
  review(
    'Kessya',
    'out/2023',
    4.6,
    'Projetado especialmente para eventos!',
    'Lugar maravilhoso, bem limpo e bem cuidado!! Projetado especialmente para eventos! Estrutura fantástica!',
  ),
]
