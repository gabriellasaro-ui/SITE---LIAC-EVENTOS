import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Photo } from '@/content/photos'
import { HighlightsMarquee } from '@/components/ui/HighlightsMarquee'
import { JsonLd } from '@/components/seo/JsonLd'
import { HeroCarousel } from '@/components/motion/HeroCarousel'
import { Rise, SplitWords } from '@/components/motion/SplitWords'
import { breadcrumbSchema } from '@/lib/schema'
import { cn } from '@/lib/cn'

type Props = {
  /** Rótulo acima do título (usado só na home) */
  eyebrow?: string
  /** Texto simples ganha animação palavra por palavra */
  title: string
  /** Palavras do título em rosé, ex.: { altura: 'text-highlight' } */
  highlight?: Record<string, string>
  description: ReactNode
  /** Caminho atual + rótulo, usado no BreadcrumbList (JSON-LD) */
  crumb: { label: string; href: string }
  /** Foto de fundo */
  image?: Photo
  /** Várias fotos: o fundo vira carrossel */
  images?: Photo[]
  /** Altura: tela cheia (padrão) ou mais baixa para páginas de texto */
  size?: 'full' | 'short'
  /**
   * Layout de ponta a ponta no PC (sem margem lateral, título gigante, textos nos cantos).
   * No celular continua centralizado.
   */
  edge?: boolean
  /** Linha curta no canto inferior direito (só com `edge`, no PC) */
  meta?: string
  children?: ReactNode
}

/** Tamanho do título no layout de ponta a ponta: quanto mais longo, menor (cabe na tela sem estourar). */
function edgeTitleSize(title: string) {
  if (title.length <= 42) return 'lg:text-[8.4vw]'
  if (title.length <= 60) return 'lg:text-[6.8vw]'
  return 'lg:text-[5.6vw]'
}

/** Topo das páginas: foto em tela cheia com camada escura, título animado e faixa de destaques logo abaixo. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  image,
  images,
  highlight,
  size = 'full',
  edge = false,
  meta,
  children,
}: Props) {
  return (
    <>
      <section
        data-hero
        className={cn(
          'bg-ink-900 relative isolate flex flex-col overflow-hidden pt-[92px] text-white',
          size === 'full' ? 'h-svh min-h-[600px]' : 'min-h-[68svh]',
          edge &&
            'lg:grid lg:h-auto lg:min-h-svh lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr_auto] lg:gap-x-12 lg:px-[3.2vw] lg:pt-[calc(92px+2.4vw)] lg:pb-[3.2vw]',
        )}
      >
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: crumb.label, path: crumb.href },
          ])}
        />

        {images?.length ? (
          <HeroCarousel
            photos={images}
            dotsClassName={edge ? 'lg:inset-x-auto lg:right-[3.2vw] lg:bottom-[3.2vw] lg:justify-end' : undefined}
          />
        ) : image ? (
          <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
          </div>
        ) : (
          <div aria-hidden="true" className="bg-pattern absolute inset-0 -z-20 opacity-[0.07]" />
        )}
        {/* camada escura para leitura */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(20_20_20/0.72)_0%,rgb(20_20_20/0.6)_55%,rgb(20_20_20/0.48)_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/55" />

        <div
          className={cn(
            'container-site relative flex flex-1 flex-col items-center justify-center pb-24 text-center',
            edge && 'lg:contents',
          )}
        >
          {eyebrow && (
            <Rise className={cn(edge && 'lg:col-start-1 lg:row-start-1 lg:self-start')}>
              <p
                className={cn(
                  'eyebrow text-primary-200 mb-6 flex items-center justify-center gap-4',
                  edge && 'lg:mb-0 lg:justify-start',
                )}
              >
                <span aria-hidden="true" className="bg-primary-300 h-px w-10" />
                {eyebrow}
                <span aria-hidden="true" className={cn('bg-primary-300 h-px w-10', edge && 'lg:hidden')} />
              </p>
            </Rise>
          )}
          <h1
            className={cn(
              'mx-auto max-w-5xl text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.98] font-light',
              edge &&
                'lg:col-span-2 lg:row-start-2 lg:mx-0 lg:max-w-none lg:self-center lg:border-y lg:border-white/25 lg:py-[2vw] lg:text-left lg:leading-[0.88] lg:[text-shadow:0_6px_40px_rgb(0_0_0/0.45)]',
              edge && edgeTitleSize(title),
            )}
          >
            <SplitWords text={title} delay={0.1} highlight={highlight} />
          </h1>
          <Rise delay={0.45} visible className={cn(edge && 'lg:col-start-2 lg:row-start-1 lg:self-start')}>
            <p
              className={cn(
                'mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgb(0_0_0/0.6)] md:text-lg',
                edge && 'lg:mt-0 lg:max-w-md lg:text-right lg:text-base',
              )}
            >
              {description}
            </p>
          </Rise>
          {children && (
            <Rise
              delay={0.6}
              className={cn(
                'mt-10 flex flex-wrap justify-center gap-4',
                edge && 'lg:col-start-1 lg:row-start-3 lg:mt-0 lg:justify-start lg:self-end',
              )}
            >
              {children}
            </Rise>
          )}
          {edge && meta && (
            <Rise
              delay={0.7}
              className="eyebrow hidden pb-12 text-right text-white/75 lg:col-start-2 lg:row-start-3 lg:block lg:self-end"
            >
              {meta}
            </Rise>
          )}
        </div>
      </section>
      <HighlightsMarquee />
    </>
  )
}
