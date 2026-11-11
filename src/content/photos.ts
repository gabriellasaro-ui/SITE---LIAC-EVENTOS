import { photoFiles, type PhotoFile } from './photo-files'

export type PhotoCategory = 'Casamentos' | 'Social' | 'Jardim' | 'Salão' | 'Ambientes'

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  /** Miniatura borrada mostrada enquanto a foto carrega (gerada por scripts/fotos.mjs) */
  blurDataURL: string
  category: PhotoCategory
  caption: string
}

/** Tamanho e blur vêm de photo-files.ts (gerado): o nome do arquivo é conferido pelo TypeScript. */
const p = (file: PhotoFile, category: PhotoCategory, caption: string, alt: string): Photo => {
  const { width, height, blur } = photoFiles[file]
  return { src: `/images/fotos/${file}.webp`, width, height, blurDataURL: blur, category, caption, alt }
}

/**
 * Fotos reais de eventos no Liac (pasta "FOTOS SITE" enviada pelo cliente em 11/2026) e algumas do site antigo.
 * Exceção: a área kids ainda é a imagem de projeto do espaço (não há foto real).
 * Para adicionar ou trocar fotos, veja scripts/fotos.mjs.
 */
export const photos = {
  // ---- jardim e cerimônia ----
  jardimMontado: p(
    'jardim-cerimonia-montada',
    'Jardim',
    'Jardim montado para cerimônia',
    'Jardim de palmeiras montado para cerimônia, com passarela branca, canteiros de flores brancas e cadeiras de palha',
  ),
  jardimArco: p(
    'jardim-palmeiras-arco-flores',
    'Jardim',
    'Cerimônia entre palmeiras',
    'Jardim de palmeiras com cadeiras transparentes, arranjos floridos e arco de flores ao fundo',
  ),
  altarFlores: p(
    'altar-jardim-flores-brancas',
    'Jardim',
    'Altar no jardim',
    'Altar do jardim decorado com grandes arranjos de flores brancas, cercado de palmeiras',
  ),
  cerimoniaNoite: p(
    'cerimonia-jardim-noite',
    'Jardim',
    'Cerimônia à noite',
    'Jardim iluminado à noite para cerimônia, com passarela branca, canteiros de flores e colunas floridas no altar',
  ),
  jardimNoite: p(
    'jardim-cerimonia-noite',
    'Jardim',
    'Jardim à noite',
    'Jardim de palmeiras iluminado à noite, com cadeiras montadas para cerimônia',
  ),
  recepcaoJardim: p(
    'recepcao-jardim-lounge',
    'Jardim',
    'Recepção ao ar livre',
    'Recepção no jardim com mesas redondas, cadeiras transparentes e lounge de sofás verdes sob as palmeiras',
  ),
  areaExterna: p(
    'area-externa-jardim',
    'Jardim',
    'Área externa',
    'Gramado e palmeiras da área externa do Liac Eventos, com cadeiras montadas e o salão ao fundo',
  ),

  // ---- casamentos ----
  cerimoniaAltar: p(
    'cerimonia-jardim-altar',
    'Casamentos',
    'Cerimônia no jardim',
    'Noivos no altar com arco de flores brancas, entre palmeiras, durante cerimônia com convidados',
  ),
  entradaNoivos: p(
    'cerimonia-entrada-noivos',
    'Casamentos',
    'Entrada dos noivos',
    'Noivos de terno azul entrando de mãos dadas pela passarela espelhada, entre convidados e flores brancas',
  ),
  noivaCaminho: p(
    'noiva-caminho-jardim',
    'Casamentos',
    'A caminho do altar',
    'Noiva caminhando pelo jardim de palmeiras, entre cadeiras transparentes e canteiros de flores brancas',
  ),
  noivaPiano: p(
    'noiva-piano-jardim',
    'Casamentos',
    'Piano no jardim',
    'Noiva ao lado de um piano de cauda branco no jardim, cercada de palmeiras',
  ),
  noivaNoite: p(
    'noiva-jardim-noite',
    'Casamentos',
    'A noiva à noite',
    'Noiva com vestido de cauda longa no jardim à noite, diante do arco de flores brancas e do espelho d’água iluminado',
  ),
  noivaJardimInverno: p(
    'noiva-jardim-de-inverno',
    'Casamentos',
    'Noiva no jardim de inverno',
    'Noiva no jardim de inverno envidraçado, ao lado da mesa do bolo e de arranjos de flores suspensos',
  ),
  noivaSalao: p(
    'noiva-salao-mesas-imperiais',
    'Casamentos',
    'Noiva no salão',
    'Noiva entre as mesas imperiais montadas no salão, com telão ao fundo',
  ),
  beijoFogos: p(
    'noivos-beijo-fogos',
    'Casamentos',
    'Beijo sob os fogos',
    'Noivos se beijando na passarela do jardim à noite, com fogos de artifício e convidados ao redor',
  ),
  beijoFogosVertical: p(
    'noivos-beijo-fogos-vertical',
    'Casamentos',
    'Beijo sob os fogos',
    'Noiva com o buquê erguido beijando o noivo na passarela do jardim, com fogos de artifício ao fundo',
  ),
  saidaNoivos: p(
    'saida-noivos-baloes',
    'Casamentos',
    'Saída dos noivos',
    'Saída dos noivos pela passarela do jardim, com convidados soltando balões coloridos',
  ),
  buque: p(
    'pista-buque',
    'Casamentos',
    'Hora do buquê',
    'Noiva jogando o buquê na pista, com as convidadas comemorando',
  ),
  festaBanda: p(
    'festa-banda-ao-vivo',
    'Casamentos',
    'Festa com banda',
    'Salão cheio na festa de casamento, com banda ao vivo no palco e telões iluminados',
  ),

  // ---- salão ----
  mesaDoces: p(
    'mesa-doces-lustres',
    'Salão',
    'Mesa de doces',
    'Mesa de doces com bolo branco, arranjos de flores e lustres de cristal, com o jardim ao fundo',
  ),
  mesaBolo: p(
    'mesa-bolo-jardim-de-inverno',
    'Salão',
    'Mesa do bolo',
    'Mesa do bolo no jardim de inverno, com flores brancas suspensas e vista para as palmeiras',
  ),
  salaoMesas: p(
    'salao-mesas-flores',
    'Salão',
    'Salão montado',
    'Salão principal com mesas de madeira, arranjos de flores coloridas, jardim vertical e escadaria iluminada',
  ),
  salaoBuffet: p(
    'salao-buffet-decorado',
    'Salão',
    'Buffet e decoração',
    'Ilha de buffet no salão, com tecidos e luzes no teto e jardim vertical ao lado',
  ),
  salaoPista: p(
    'salao-pista-led',
    'Salão',
    'Pista e palco',
    'Pista de LED com palco, lustres de cristal e cenografia floral no salão',
  ),
  salaoJantar: p(
    'salao-montado-jantar',
    'Salão',
    'Montagem para jantar',
    'Salão montado com mesas redondas para jantar, jardim vertical e iluminação cênica',
  ),
  salaoImperial: p(
    'salao-montado-mesas-imperiais',
    'Salão',
    'Mesas imperiais',
    'Salão com mesas imperiais floridas, cadeiras douradas e cortina de folhagens',
  ),
  loungeNoite: p(
    'lounge-entrada-noite',
    'Salão',
    'Lounge de entrada',
    'Lounge de entrada à noite, com painel de madeira iluminado e jardim vertical',
  ),
  barLounge: p(
    'bar-lounge-jardim-de-inverno',
    'Salão',
    'Bar e jardim de inverno',
    'Bar com mesas altas ao lado do jardim de inverno envidraçado, com vista para as palmeiras',
  ),

  // ---- 15 anos e boate ----
  salao15: p(
    'salao-15-anos-lustres',
    'Social',
    'Festa de 15 anos',
    'Salão montado para festa de 15 anos, com lustres de cristal, mesas imperiais floridas e palco iluminado',
  ),
  mesa15: p(
    'mesa-bolo-15-anos',
    'Social',
    'Mesa do bolo de 15 anos',
    'Mesa do bolo de 15 anos com flores vermelhas, colunas de cristal e neon rosa',
  ),
  passarela15: p(
    'passarela-15-anos-noite',
    'Social',
    'Entrada da debutante',
    'Passarela iluminada em rosa no jardim à noite, com o letreiro XV ao fundo',
  ),
  boateLounge: p('boate-lounge', 'Social', 'Boate', 'Boate com lounge vermelho, luminárias pendentes e piso iluminado'),
  boatePista: p(
    'boate-pista-led',
    'Social',
    'Boate: pista de LED',
    'Pista de LED da boate com painel iluminado para festa de 15 anos',
  ),

  // ---- ambientes de apoio ----
  pubSinuca: p('pub-sinuca', 'Ambientes', 'Pub', 'Pub dos anfitriões com mesa de sinuca, TV e luminárias pendentes'),
  pubNoivos: p(
    'pub-sinuca-noivos',
    'Ambientes',
    'Pub: sinuca',
    'Noivo e amigos jogando sinuca no pub, ao lado da adega e da cadeira de barbeiro',
  ),
  pubLetreiro: p(
    'pub-liac-barber',
    'Ambientes',
    'Liac Barber Pub',
    'Noivo sorrindo ao lado do letreiro iluminado do Liac Barber Pub',
  ),
  spaSala: p(
    'spa-sala-dos-anfitrioes',
    'Ambientes',
    'Spa / sala dos anfitriões',
    'Noiva na sala dos anfitriões, com sofá verde, letreiro Liac, lustre e banheira ao fundo',
  ),
  spaBanheira: p(
    'spa-banheira',
    'Ambientes',
    'Spa: banheira',
    'Noiva sentada na borda da banheira do spa, entre o jardim vertical e o painel de madeira',
  ),
  spaSofa: p(
    'spa-sofa-letreiro',
    'Ambientes',
    'Sala dos anfitriões',
    'Noiva no sofá verde da sala dos anfitriões, sob o lustre de cristal e o letreiro Liac',
  ),
  spaCamarim: p(
    'spa-camarim',
    'Ambientes',
    'Camarim',
    'Noiva sorrindo no camarim do spa, diante dos espelhos iluminados e da bancada de maquiagem',
  ),
  kidsCasinhas: p(
    'area-kids-casinhas',
    'Ambientes',
    'Área kids',
    'Área kids com casinhas verdes e rosas, pufes e cavalinho de balanço',
  ),
  tourCapa: p(
    'tour-video-capa',
    'Ambientes',
    'Tour pelo Liac',
    'Lounge do salão com vista para o jardim, em imagem do tour em vídeo',
  ),
} satisfies Record<string, Photo>

/** Recorte de uma foto da lista acima (mesma legenda e alt), gerado com `nome@2:3` em scripts/fotos.mjs. */
const crop = (file: PhotoFile, base: Photo): Photo => {
  const { width, height, blur } = photoFiles[file]
  return { ...base, src: `/images/fotos/${file}.webp`, width, height, blurDataURL: blur }
}

/**
 * Recortes verticais (2:3) para molduras altas: cards de ocasiões, fotos da introdução e "Visão geral".
 * Foto horizontal numa moldura alta é ampliada para cobrir a altura e perde nitidez; o recorte encaixa sem ampliar.
 */
export const verticals = {
  cerimoniaAltar: crop('cerimonia-jardim-altar-vertical', photos.cerimoniaAltar),
  salaoBuffet: crop('salao-buffet-decorado-vertical', photos.salaoBuffet),
  salao15: crop('salao-15-anos-lustres-vertical', photos.salao15),
  mesa15: crop('mesa-bolo-15-anos-vertical', photos.mesa15),
  jardimArco: crop('jardim-palmeiras-arco-flores-vertical', photos.jardimArco),
  mesaBolo: crop('mesa-bolo-jardim-de-inverno-vertical', photos.mesaBolo),
  noivaJardimInverno: crop('noiva-jardim-de-inverno-vertical', photos.noivaJardimInverno),
  noivaNoite: crop('noiva-jardim-noite-vertical', photos.noivaNoite),
  boateLounge: crop('boate-lounge-vertical', photos.boateLounge),
} satisfies Record<string, Photo>

/** Fotos do topo da home (carrossel). A primeira é a que carrega com prioridade. */
export const heroSlides: Photo[] = [
  photos.jardimMontado,
  photos.mesaDoces,
  photos.cerimoniaAltar,
  photos.cerimoniaNoite,
]

/** Galeria completa (ordem pensada para alternar ambientes e momentos; as 6 primeiras aparecem na home). */
export const galleryPhotos: Photo[] = [
  photos.jardimMontado,
  photos.mesaDoces,
  photos.cerimoniaAltar,
  photos.boateLounge,
  photos.noivaNoite,
  photos.salaoMesas,
  photos.cerimoniaNoite,
  photos.spaSala,
  photos.saidaNoivos,
  photos.salao15,
  photos.jardimArco,
  photos.mesaBolo,
  photos.entradaNoivos,
  photos.pubSinuca,
  photos.beijoFogos,
  photos.mesa15,
  photos.recepcaoJardim,
  photos.noivaJardimInverno,
  photos.salaoPista,
  photos.noivaPiano,
  photos.passarela15,
  photos.altarFlores,
  photos.salaoBuffet,
  photos.buque,
  photos.spaCamarim,
  photos.jardimNoite,
  photos.festaBanda,
  photos.boatePista,
  photos.noivaCaminho,
  photos.salaoImperial,
  photos.pubLetreiro,
  photos.noivaSalao,
  photos.areaExterna,
  photos.salaoJantar,
  photos.spaBanheira,
  photos.loungeNoite,
  photos.pubNoivos,
  photos.barLounge,
  photos.spaSofa,
  photos.kidsCasinhas,
]
