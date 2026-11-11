export type Testimonial = {
  quote: string
  /** Trecho curto para o destaque do card */
  highlight: string
  author: string
  /** Origem e data (ex.: "Google · 2025", "Casamentos.com.br · set/2023") */
  party: string
  rating: number
}

type Source = 'Google' | 'Casamentos.com.br'

const from =
  (source: Source) =>
  (author: string, date: string, rating: number, highlight: string, quote: string): Testimonial => ({
    author,
    party: `${source} · ${date}`,
    rating,
    highlight,
    quote,
  })

/** Perfil do Liac no Google (conferido em 11/11/2026). O Google mostra só a data relativa, então vai o ano. */
const google = from('Google')
/** Perfil do Liac no Casamentos.com.br (conferido em 05/10/2026). */
const casamentos = from('Casamentos.com.br')

/**
 * Avaliações públicas reais, intercaladas entre Google e Casamentos.com.br.
 * Texto original, só com correções mínimas de digitação. No Google, primeiro nome + inicial do sobrenome;
 * no Casamentos.com.br, o primeiro nome como aparece no perfil.
 */
export const testimonials: Testimonial[] = [
  google(
    'Raphaella R.',
    '2025',
    5,
    'Se fôssemos casar novamente, escolheríamos o mesmo lugar 1000x.',
    'Nossa experiência com o Liac foi maravilhosa. Desde o primeiro contato que tivemos com a Chay, tudo fluiu de forma muito leve e gostosa. Participamos de todos os eventos para noivos proporcionados pelo espaço, conhecendo fornecedores incríveis que harmonizaram com o local. Foi um privilégio poder contar com a Chay do início ao fim do processo de organização do nosso grande dia. A cada contrato fechado, ela estava ali, disposta a nos orientar e ajudar para o melhor se concretizar. Nos sentimos muito acolhidos! Ficamos impactados com o mobiliário novo e moderno que tivemos o privilégio de ter no nosso casamento. O jardim está ficando ainda mais verde e lindo, com todo o investimento que o espaço segue realizando para abrilhantar ainda mais o nosso sonho. A cada visita, víamos mais coqueiros. No dia da noiva, me senti em casa e fui muito bem assessorada por todos os funcionários do espaço. Se fôssemos casar novamente, escolheríamos o mesmo lugar 1000x. Amamos termos sido clientes Liac! Nossa eterna gratidão a toda equipe!',
  ),
  casamentos(
    'Letícia',
    'nov/2024',
    5,
    'Na primeira visita, já sabia que era ali que eu queria me casar!',
    'Em nossa primeira visita ao Liac, já sabia que era ali que eu queria me casar! Um espaço magnífico, muito bem planejado e lindo por si só! O espaço da noiva e do noivo são muito bem equipados e atendem muito bem, a área da cerimônia é magnífica, linda demais, e o salão de festas é um luxo, e a entrada triunfal para os noivos na hora da festa é um diferencial impressionante! Amamos cada detalhe do espaço e indico de olhos fechados!',
  ),
  google(
    'Paula B.',
    '2025',
    5,
    'Fica lindo estar lá dentro e ver a área verde iluminada.',
    'O local é lindíssimo! A área externa tem uma área verde linda, com grama, árvores, muro verde! Muito linda mesmo! Fiquei encantada com como ficou bonito quando decorado! A área do salão de festas é bem ampla, com paredes de vidro que são vista para a área externa, então fica lindo estar lá dentro e ver a área verde iluminada. O banheiro é bem cuidado, várias cabines, bem decorado, climatizado e cheiroso. A área da noiva é linda, com banheira, uma área grande com sofá e cadeiras para maquiagem. O banheiro também é bem amplo e limpinho.',
  ),
  google(
    'Adriano A.',
    '2026',
    5,
    'Todos elogiaram a beleza e o conforto do espaço.',
    'Experiência excelente no Liac Eventos! O local é super espaçoso, funcional, limpo e muito elegante. Todos elogiaram a beleza e o conforto do espaço. Parabéns a toda a equipe!',
  ),
  casamentos(
    'Lucas',
    'fev/2024',
    5,
    'Foi amor à primeira vista.',
    'O Liac foi o primeiro local que visitamos e foi amor à primeira vista. Nos emocionamos só de imaginar como tudo ficaria. É um local moderno, chique e cheio de aconchego. Tudo é incrível, desde a sala da noiva e do noivo aos banheiros do salão. Tudo incrivelmente lindo e imponente!',
  ),
  google(
    'Ana Flavia M.',
    '2024',
    5,
    'O lugar parece uma pintura de tão lindo.',
    'Que sonho de lugar! Fiz uma visita técnica e foi tudo perfeito, o lugar parece uma pintura de tão lindo. Fui atendida pela Ruth, sério… Que recepção maravilhosa, que carinho, educação, tudo foi perfeito. Ruth é uma profissional que trabalha por amor e, se querem o melhor atendimento, procurem ela, ela é ótima. Faria todos os meus eventos lá!',
  ),
  casamentos(
    'Yasmin',
    'set/2023',
    5,
    'O jardim e as palmeiras muito bem cuidados.',
    'Foi amor à primeira vista… Não visitamos muitos locais e, após conhecer o LIAC, não conseguimos mais tirá-lo da cabeça. É realmente lindo, o jardim e as palmeiras muito bem cuidados, o quarto da noiva é perfeito, mais ainda o quarto do noivo, até sauna tem no lugar! É um luxo à noite, vale muito a pena investir em uma estrutura como a do Liac.',
  ),
  google(
    'Rachel X.',
    '2025',
    5,
    'Fiz meu casamento no Liac e amei a experiência!',
    'Fiz meu casamento no Liac e amei a experiência! O lugar é lindo, tive um ótimo atendimento e meus convidados amaram. Indico!!',
  ),
  casamentos(
    'Glecia',
    'set/2023',
    5,
    'Pensaram em cada detalhe para facilitar a organização.',
    'Amamos celebrar nosso casamento nesse espaço lindo, maravilhoso… Parabéns, vocês pensaram em cada detalhe para facilitar a organização, além de ser bem estruturado é muito lindo e com um carisma sem limites para conosco! Obrigada!',
  ),
  google(
    'Tiago T.',
    '2022',
    5,
    'Casamento ao ar livre igual aos de novela.',
    'Lugar lindo e ótimo para festas. Fui a um casamento no local e foi tudo muito bonito, organizado e maravilhoso. O local externo onde foi o casamento é perfeito, casamento ao ar livre igual aos de novela. Local da festa muito amplo, bem decorado, grande e com ar-condicionado, o que deixa tudo mais agradável. Tem local para as crianças se divertirem com monitores que são muito educados e atenciosos, isso permite uma diversão para todos da família (fantástico). Estacionamento no local com manobrista, que facilita a chegada na festa e dá tranquilidade na hora de você se divertir.',
  ),
  casamentos(
    'Mariana',
    'out/2021',
    5,
    'Sem palavras para descrever a beleza desse lugar.',
    'Sem palavras pra descrever a beleza desse lugar. Tudo lindo, novinho, impecável. A equipe maravilhosa, depois que fechei o contrato não tive nenhum problema de comunicação e sempre foi muito fácil resolver qualquer problema. Sempre dispostas a fazer o melhor, super atenciosas e sempre deram o jeitinho de me entregar mais do que o combinado. Eu super indico, o espaço é simplesmente maravilhoso, um sonho. E a equipe sem defeitos!',
  ),
  google(
    'Le Raigon, cerimonialista',
    '2024',
    5,
    'Lugar que combina elegância, charme, versatilidade e modernidade.',
    'Lugar que combina elegância, charme, versatilidade e modernidade. Sua área externa oferece infinitas possibilidades de projetos. Equipe solícita e dedicada, proporcionando serviços impecáveis e uma experiência verdadeiramente memorável. Sua área interna possui uma estrutura completa que contempla a versatilidade, proporcionando desde cenários românticos a estruturas de alta energia.',
  ),
  casamentos(
    'André',
    'out/2021',
    5,
    'Atenção, dedicação e seriedade em tudo.',
    'Desde o primeiro dia que visitei o espaço, nenhum outro se aproximou, não somente pela beleza do espaço, mas pela segurança dos administradores e o cuidado em cada detalhe pra fazer do nosso dia o mais perfeito. Concretizei o negócio, logo em seguida veio a pandemia, adiei as duas vezes e todas as vezes que precisava de algo, parecia que era a primeira vez quando fui fechar negócio: atenção, dedicação e seriedade em tudo. Dedicação total ao cliente e aos detalhes que tornaram aquilo tudo que idealizei em realidade.',
  ),
  google(
    'Lucas I.',
    '2021',
    5,
    'Estrutura de primeira, com sala da noiva e pub do noivo.',
    'Um lugar muito bonito para sua cerimônia! Localizado na região da Pampulha e com uma proposta moderna, tem tudo que precisa para realizar seu sonho. Estrutura de primeira, com sala da noiva e pub do noivo, gramado amplo, brinquedoteca e monitores para crianças, camarote, ampla pista de dança e um pé-direito altíssimo, onde consegue decorar da forma que quiser. Lindo.',
  ),
  casamentos(
    'Barbara',
    'fev/2022',
    5,
    'A parede de vidro deu um efeito maravilhoso nas fotos.',
    'Espaço lindo, todo novo e bem cuidado, a equipe sempre muito disponível e educada. Não tive meu casamento na área externa devido à chuva (o temido plano B), mas a parede de vidro deu um efeito maravilhoso nas fotos do casamento (que foi realizado na área interna) e não perdeu em nada o encanto do local.',
  ),
  google(
    'Debora C.',
    '2023',
    5,
    'Vidros e madeiras que dão um toque especial.',
    'Espaço de eventos belíssimo. Para futuras noivas que buscam um lugar com uma bela decoração, área externa e ambiente mais requintado, vale a pena visitar. O salão tem um lustre lindo, vidros e madeiras que dão um toque especial.',
  ),
  casamentos(
    'Carol',
    'nov/2022',
    5,
    'Recebi vários elogios dos meus convidados.',
    'Recebi vários elogios dos meus convidados, todos eles com elogios ao Liac! Equipe sensacional e espaço maravilhoso.',
  ),
  casamentos(
    'Kessya',
    'out/2023',
    4.6,
    'Projetado especialmente para eventos!',
    'Lugar maravilhoso, bem limpo e bem cuidado!! Projetado especialmente para eventos! Estrutura fantástica!',
  ),
]
