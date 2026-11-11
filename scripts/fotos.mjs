/**
 * Fotos do site: otimiza as originais e gera os dados que o next/image usa (tamanho + blur).
 *
 *   node scripts/fotos.mjs
 *     Só regenera src/content/photo-files.ts a partir de public/images/fotos/*.webp.
 *
 *   node scripts/fotos.mjs "C:/originais/IMG_0187.jpg=jardim-cerimonia-montada" ...
 *     Converte cada original (JPG/PNG/HEIC) para public/images/fotos/<nome>.webp
 *     (sRGB, até 2400 px no lado maior, WebP de alta qualidade) e depois regenera o arquivo.
 *
 *   node scripts/fotos.mjs "C:/originais/IMG_0547.jpg=cerimonia-jardim-altar-vertical@2:3"
 *     Igual, mas recorta na proporção pedida (aqui 2:3, centralizado; "@2:3@0.3" puxa o recorte para a esquerda).
 *     Use para molduras altas (cards verticais): foto horizontal em moldura alta é ampliada e perde nitidez.
 *
 * Depois, cadastre a foto em src/content/photos.ts (legenda, alt e categoria).
 * Use sempre um nome novo ao trocar uma foto: o cache das imagens otimizadas dura 31 dias.
 */
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = 'public/images/fotos'
const OUT = 'src/content/photo-files.ts'
/** Lado maior da foto servida. Cobre telas grandes (o next/image gera as versões menores). */
const MAX = 2400

for (const arg of process.argv.slice(2)) {
  const eq = arg.lastIndexOf('=')
  const src = eq > 0 ? arg.slice(0, eq) : ''
  // nome[@largura:altura[@foco]]: o foco (0 a 1, padrão 0.5) posiciona o recorte na horizontal ou na vertical
  const spec = /^([a-z0-9-]+)(?:@(\d+):(\d+)(?:@(0(?:\.\d+)?|1))?)?$/.exec(eq > 0 ? arg.slice(eq + 1) : '')
  if (!src || !spec) {
    throw new Error(`Use "arquivo-original=nome-em-kebab-case[@2:3[@0.5]]" (recebi "${arg}")`)
  }
  const [, name, rw, rh, focus = '0.5'] = spec
  let image = sharp(src).rotate()
  if (rw && rh) {
    const meta = await sharp(src).metadata()
    const [w, h] = (meta.orientation ?? 1) >= 5 ? [meta.height, meta.width] : [meta.width, meta.height]
    const ratio = Number(rw) / Number(rh)
    const f = Number(focus)
    if (w / h > ratio) {
      const width = Math.round(h * ratio)
      image = image.extract({ left: Math.round((w - width) * f), top: 0, width, height: h })
    } else {
      const height = Math.round(w / ratio)
      image = image.extract({ left: 0, top: Math.round((h - height) * f), width: w, height })
    }
  }
  const dest = path.join(DIR, `${name}.webp`)
  const info = await image
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toFile(dest)
  console.log(`${dest}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`)
}

const files = (await readdir(DIR)).filter((f) => f.endsWith('.webp')).sort()
const lines = await Promise.all(
  files.map(async (file) => {
    const image = sharp(path.join(DIR, file))
    const { width, height } = await image.metadata()
    // Miniatura de ~12 px: o navegador mostra borrada enquanto a foto real carrega (poucos bytes por foto)
    const tiny = await image.clone().resize(12, 12, { fit: 'inside' }).webp({ quality: 40 }).toBuffer()
    const blur = `data:image/webp;base64,${tiny.toString('base64')}`
    return [
      `  '${file.slice(0, -5)}': {`,
      `    width: ${width},`,
      `    height: ${height},`,
      `    blur: '${blur}',`,
      '  },',
    ].join('\n')
  }),
)

await writeFile(
  OUT,
  [
    '// Gerado por scripts/fotos.mjs: não edite à mão.',
    '// Tamanho real de cada foto em public/images/fotos e a miniatura usada como blur no carregamento.',
    '',
    'export const photoFiles = {',
    ...lines,
    '} as const satisfies Record<string, { width: number; height: number; blur: string }>',
    '',
    'export type PhotoFile = keyof typeof photoFiles',
    '',
  ].join('\n'),
)
console.log(`${OUT}: ${files.length} fotos`)
