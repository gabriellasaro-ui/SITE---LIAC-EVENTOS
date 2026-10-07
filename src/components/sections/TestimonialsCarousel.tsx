'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/content/testimonials'
import { Stars } from '@/components/ui/PublicRating'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const AUTOPLAY_MS = 6500
/** Acima disso o card mostra só o começo e oferece "Ler avaliação completa" */
const LONG_QUOTE = 230

/**
 * Carrossel de avaliações: arrasta no celular (scroll-snap nativo), setas e traços,
 * passa sozinho e pausa quando a pessoa interage (ou prefere menos movimento).
 */
export function TestimonialsCarousel({ items, tone = 'light' }: { items: Testimonial[]; tone?: 'light' | 'dark' }) {
  const track = useRef<HTMLUListElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  const [pages, setPages] = useState(items.length)
  const [paused, setPaused] = useState(false)
  const [reading, setReading] = useState<Testimonial | null>(null)

  // quantos "passos" existem = cards - cards visíveis + 1
  const measure = useCallback(() => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')
    const perView = Math.max(1, Math.round(el.clientWidth / step))
    setPages(Math.max(1, items.length - perView + 1))
    setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / step)))
  }, [items.length])

  const goTo = useCallback((i: number) => {
    const el = track.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const frame = requestAnimationFrame(measure)
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  useEffect(() => {
    if (paused || pages <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') goTo(active + 1 >= pages ? 0 : active + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [active, pages, paused, goTo])

  const dark = tone === 'dark'

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Avaliações de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-2 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {items.map((t, i) => (
          <li
            key={`${t.author}-${i}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${items.length}`}
            className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
          >
            <figure
              className={cn(
                'group relative flex h-full flex-col border p-8 transition duration-500 hover:-translate-y-1.5',
                dark
                  ? 'hover:border-primary-300/60 border-white/15 bg-white/[0.04] text-white'
                  : 'border-ink-950/10 hover:border-primary-300 bg-white hover:shadow-[0_30px_60px_-35px_rgb(31_31_31/0.35)]',
              )}
            >
              <span
                aria-hidden="true"
                className="bg-primary-400 absolute top-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full"
              />
              <div className="flex items-center justify-between gap-3">
                <Stars value={t.rating} />
                <span className="sr-only">Nota {t.rating.toLocaleString('pt-BR')} de 5</span>
                <Icon name="quote" size={30} className={dark ? 'text-primary-300/60' : 'text-primary-200'} />
              </div>
              <p className="font-display mt-6 text-[1.6rem] leading-[1.15] font-light uppercase">{t.highlight}</p>
              <blockquote
                className={cn('mt-4 line-clamp-4 leading-relaxed', dark ? 'text-white/75' : 'text-ink-950/70')}
              >
                <p>{t.quote}</p>
              </blockquote>
              {t.quote.length > LONG_QUOTE && (
                <button
                  type="button"
                  onClick={() => {
                    setReading(t)
                    dialog.current?.showModal()
                  }}
                  className={cn(
                    'mt-4 self-start text-[0.68rem] font-semibold tracking-[0.2em] uppercase underline decoration-1 underline-offset-[6px] hover:no-underline',
                    dark ? 'text-primary-200' : 'text-primary-700',
                  )}
                >
                  Ler avaliação completa<span className="sr-only"> de {t.author}</span>
                </button>
              )}
              <div className="mb-7" />
              <figcaption
                className={cn(
                  'mt-auto flex items-center gap-3 border-t pt-5',
                  dark ? 'border-white/15' : 'border-ink-950/10',
                )}
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{t.author}</span>
                  <span className={cn('text-sm', dark ? 'text-white/60' : 'text-ink-950/60')}>{t.party}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para a avaliação ${i + 1}`}
                aria-current={active === i}
                className="grid h-6 place-items-center"
              >
                <span
                  className={cn(
                    'block h-[2px] transition-all duration-500',
                    active === i ? 'bg-primary-500 w-10' : cn('w-5', dark ? 'bg-white/25' : 'bg-ink-950/20'),
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(
              [
                { label: 'Avaliação anterior', icon: 'arrowLeft', to: Math.max(0, active - 1), off: active === 0 },
                {
                  label: 'Próxima avaliação',
                  icon: 'arrowRight',
                  to: Math.min(pages - 1, active + 1),
                  off: active >= pages - 1,
                },
              ] as const
            ).map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => goTo(b.to)}
                disabled={b.off}
                aria-label={b.label}
                className={cn(
                  'grid h-12 w-12 place-items-center border transition disabled:opacity-30',
                  dark
                    ? 'hover:bg-primary-400 hover:border-primary-400 hover:text-ink-950 border-white/40 text-white'
                    : 'border-ink-950/30 hover:bg-ink-900 hover:border-ink-900 hover:text-white',
                )}
              >
                <Icon name={b.icon} size={18} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Avaliação completa */}
      <dialog
        ref={dialog}
        aria-labelledby="avaliacao-titulo"
        onClose={() => setReading(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="text-ink-950 m-auto w-[min(640px,92vw)] max-w-none bg-white p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {reading && (
          <figure className="max-h-[85vh] overflow-y-auto p-8 md:p-10">
            <div className="flex items-center justify-between gap-3">
              <Stars value={reading.rating} size={20} />
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Fechar"
                className="border-ink-950/20 hover:bg-primary-100 grid h-11 w-11 place-items-center border transition"
              >
                <Icon name="x" size={20} />
              </button>
            </div>
            <p id="avaliacao-titulo" className="font-display mt-5 text-3xl leading-tight font-light uppercase">
              {reading.highlight}
            </p>
            <blockquote className="text-ink-950/80 mt-4 text-lg leading-relaxed">
              <p>{reading.quote}</p>
            </blockquote>
            <figcaption className="border-ink-950/10 mt-6 border-t pt-5">
              <span className="block font-semibold">{reading.author}</span>
              <span className="text-ink-950/60 text-sm">{reading.party}</span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </div>
  )
}
