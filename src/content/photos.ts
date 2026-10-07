export type PhotoCategory = 'Casamentos' | 'Social' | 'Jardim' | 'Salão' | 'Ambientes'

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  category: PhotoCategory
  caption: string
}

const p = (
  file: string,
  width: number,
  height: number,
  category: PhotoCategory,
  caption: string,
  alt: string,
): Photo => ({ src: `/images/fotos/${file}.webp`, width, height, category, caption, alt })

/**
 * Fotos reais do Liac (site antigo). Tratadas em WebP, até 2400 px.
 * As de WhatsApp passaram por upscale com IA; marcas d'água de fotógrafo foram removidas por recorte/retoque.
 * Os ambientes internos de apoio (spa, pub, kids, banheiros e salão vazio) são as imagens de projeto do espaço.
 */
export const photos = {
  // ---- jardim e cerimônia ----
  jardimPalmeiras: p(
    'jardim-cerimonia-palmeiras',
    2400,
    1600,
    'Jardim',
    'Cerimônia no jardim',
    'Cerimônia de casamento no jardim de palmeiras do Liac Eventos, com convidados e altar ao fundo',
  ),
  jardimNoite: p(
    'jardim-cerimonia-noite',
    2400,
    1375,
    'Jardim',
    'Jardim à noite',
    'Jardim de palmeiras iluminado à noite, com cadeiras montadas para cerimônia',
  ),
  jardimCorredor: p(
    'jardim-cerimonia-corredor',
    2105,
    2400,
    'Jardim',
    'Corredor de palmeiras',
    'Corredor de palmeiras com cadeiras transparentes montadas para cerimônia ao ar livre',
  ),
  jardimConvidados: p(
    'jardim-cerimonia-convidados',
    2105,
    2400,
    'Jardim',
    'Cerimônia ao ar livre',
    'Convidados sentados no corredor de palmeiras durante cerimônia ao ar livre',
  ),
  cerimoniaArco: p(
    'cerimonia-jardim-arco-flores',
    2048,
    1365,
    'Casamentos',
    'Altar no jardim',
    'Noivos no altar com arco de flores no jardim de palmeiras, cercados pelos convidados',
  ),
  cerimoniaDia: p(
    'cerimonia-jardim-dia',
    2048,
    1364,
    'Casamentos',
    'Cerimônia de dia',
    'Cerimônia de casamento durante o dia no jardim, com céu azul e palmeiras',
  ),
  corredorCeu: p(
    'corredor-palmeiras-ceu-azul',
    1364,
    2048,
    'Jardim',
    'Passarela do jardim',
    'Passarela entre palmeiras sob céu azul, decorada com flores brancas',
  ),
  areaExterna: p(
    'area-externa-palmeiras',
    2400,
    1599,
    'Jardim',
    'Área externa',
    'Área externa do Liac Eventos com alameda de palmeiras e o salão envidraçado ao lado',
  ),

  // ---- casamentos e pessoas ----
  noivaCorredor: p(
    'noiva-corredor-palmeiras',
    1600,
    2400,
    'Casamentos',
    'A noiva no jardim',
    'Noiva com véu longo caminhando pelo corredor de palmeiras',
  ),
  noivosEntardecer: p(
    'noivos-jardim-entardecer',
    1366,
    2048,
    'Casamentos',
    'Noivos ao entardecer',
    'Noivos se beijando no jardim de palmeiras ao entardecer',
  ),
  noivosPetalas: p(
    'noivos-saida-petalas',
    2048,
    1365,
    'Casamentos',
    'Saída dos noivos',
    'Saída dos noivos sob chuva de pétalas, cercados pelos convidados no jardim',
  ),

  // ---- salão ----
  salaoFlores: p(
    'salao-casamento-decorado-flores',
    2400,
    1599,
    'Salão',
    'Salão decorado',
    'Salão principal do Liac decorado para casamento, com arranjos florais altos e teto de luzes',
  ),
  salaoDoces: p(
    'salao-casamento-mesa-doces',
    2400,
    1599,
    'Salão',
    'Mesa de doces',
    'Mesa de doces e bolo no salão decorado com flores e luzes pendentes',
  ),
  salaoBar: p(
    'salao-casamento-bar-noite',
    2400,
    1625,
    'Salão',
    'Bar e festa',
    'Salão à noite com bar, plantas suspensas e globos espelhados',
  ),
  salaoVertical: p(
    'salao-decoracao-mesa-vertical',
    1599,
    2400,
    'Salão',
    'Detalhes da decoração',
    'Mesa posta com arranjos de flores e iluminação quente no salão',
  ),
  loungeNoite: p(
    'lounge-entrada-noite',
    2400,
    1599,
    'Salão',
    'Lounge de entrada',
    'Lounge de entrada à noite, com painel de madeira iluminado e jardim vertical',
  ),
  salaoJantar: p(
    'salao-montado-jantar',
    2400,
    1343,
    'Salão',
    'Montagem para jantar',
    'Salão montado com mesas redondas para jantar, jardim vertical e iluminação cênica',
  ),
  salaoImperial: p(
    'salao-montado-mesas-imperiais',
    2400,
    1600,
    'Salão',
    'Mesas imperiais',
    'Salão com mesas imperiais floridas, cadeiras douradas e cortina de folhagens',
  ),
  barLounge: p(
    'bar-lounge-jardim-de-inverno',
    2400,
    1600,
    'Salão',
    'Bar e jardim de inverno',
    'Bar com mesas altas ao lado do jardim de inverno envidraçado, com vista para as palmeiras',
  ),
  salaoNoite: p(
    'salao-decoracao-noite',
    2048,
    1365,
    'Salão',
    'Festa à noite',
    'Salão com decoração escura, mesas pretas e cortina de luzes',
  ),
  decoracaoTropical: p(
    'decoracao-tropical-mesa',
    2048,
    1366,
    'Social',
    'Decoração tropical',
    'Mesa de bolo com decoração tropical, folhagens e flores vermelhas',
  ),
  casamentoRecepcao: p(
    'casamento-salao-recepcao',
    2400,
    1600,
    'Casamentos',
    'Recepção',
    'Recepção de casamento no salão com mesas floridas e arquibancada iluminada',
  ),
  casamentoLounge: p(
    'casamento-salao-lounge',
    2400,
    1600,
    'Casamentos',
    'Lounge da festa',
    'Lounge com sofás e tapete no salão decorado para casamento',
  ),

  // ---- boate ----
  boate15: p(
    'boate-festa-15-anos',
    2400,
    1472,
    'Social',
    'Boate: festa de 15 anos',
    'Debutante na boate do Liac, com pista iluminada e feixes de luz',
  ),
  boateAniversario: p(
    'boate-aniversario-palco',
    2400,
    1343,
    'Social',
    'Boate: aniversário',
    'Palco da boate com telão e luzes azuis em festa de aniversário',
  ),

  // ---- ambientes (imagens do projeto) ----
  salaoLounge: p(
    'salao-jardim-de-inverno-lounge',
    2400,
    1719,
    'Ambientes',
    'Salão e jardim de inverno',
    'Salão principal com parede de vidro para o jardim de palmeiras e lounge de sofás',
  ),
  salaoMontagem: p(
    'salao-principal-montagem',
    2400,
    1789,
    'Ambientes',
    'Salão principal',
    'Salão principal com mesas montadas, jardim vertical e lustres de cristal',
  ),
  salaoPista: p(
    'salao-principal-pista',
    2400,
    1735,
    'Ambientes',
    'Pista e salão',
    'Salão principal com pista ampla, globos espelhados e mesas ao redor',
  ),
  entradaTriunfal: p(
    'salao-entrada-triunfal',
    2400,
    1689,
    'Ambientes',
    'Entrada triunfal',
    'Entrada do salão com painel de madeira e globos espelhados para a chegada dos anfitriões',
  ),
  spaBanheira: p(
    'spa-sala-dos-anfitrioes-banheira',
    2400,
    1350,
    'Ambientes',
    'Spa / sala dos anfitriões',
    'Spa da sala dos anfitriões com banheira, penteadeira e acabamento em madeira',
  ),
  spaLounge: p(
    'spa-sala-dos-anfitrioes-lounge',
    2400,
    1350,
    'Ambientes',
    'Sala dos anfitriões',
    'Sala dos anfitriões com sofá, arara para o vestido e letreiro Liac',
  ),
  pubSinuca: p(
    'pub-anfitrioes-sinuca',
    2400,
    1350,
    'Ambientes',
    'Pub',
    'Pub dos anfitriões com mesa de sinuca, parede de tijolos e adega',
  ),
  pubBar: p(
    'pub-anfitrioes-bar',
    2400,
    1350,
    'Ambientes',
    'Pub: bar',
    'Pub com bancada de bar, cadeiras de barbeiro e quadros',
  ),
  kidsBrinquedoteca: p(
    'area-kids-brinquedoteca',
    2400,
    1350,
    'Ambientes',
    'Área kids',
    'Área kids com estantes em formato de casinha, brinquedos e mesinhas',
  ),
  kidsCasinhas: p(
    'area-kids-casinhas',
    2400,
    1350,
    'Ambientes',
    'Área kids: brinquedos',
    'Área kids com casinhas verdes e rosas, pufes e cavalinho de balanço',
  ),
  banheiros: p(
    'banheiros-sociais',
    2400,
    1350,
    'Ambientes',
    'Banheiros',
    'Banheiros sociais com bancada de madeira, cubas e jardim interno',
  ),
  tourCapa: p(
    'tour-video-capa',
    1920,
    1080,
    'Ambientes',
    'Tour pelo Liac',
    'Lounge do salão com vista para o jardim, em imagem do tour em vídeo',
  ),
} satisfies Record<string, Photo>

/** Fotos do topo da home (carrossel). */
export const heroSlides: Photo[] = [
  photos.salaoFlores,
  photos.jardimPalmeiras,
  photos.loungeNoite,
  photos.casamentoLounge,
]

/** Galeria completa (ordem pensada para alternar ambientes e momentos). */
export const galleryPhotos: Photo[] = [
  photos.salaoFlores,
  photos.jardimPalmeiras,
  photos.noivaCorredor,
  photos.salaoDoces,
  photos.cerimoniaArco,
  photos.boate15,
  photos.loungeNoite,
  photos.jardimNoite,
  photos.noivosEntardecer,
  photos.salaoImperial,
  photos.noivosPetalas,
  photos.decoracaoTropical,
  photos.barLounge,
  photos.cerimoniaDia,
  photos.salaoVertical,
  photos.salaoBar,
  photos.jardimCorredor,
  photos.casamentoRecepcao,
  photos.boateAniversario,
  photos.salaoJantar,
  photos.corredorCeu,
  photos.casamentoLounge,
  photos.salaoNoite,
  photos.jardimConvidados,
  photos.areaExterna,
  photos.spaBanheira,
  photos.pubSinuca,
  photos.kidsCasinhas,
  photos.spaLounge,
  photos.pubBar,
  photos.kidsBrinquedoteca,
  photos.banheiros,
]
