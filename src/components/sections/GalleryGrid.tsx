'use client'

import { AnimatePresence, LayoutGroup, LazyMotion, m } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Photo, PhotoCategory } from '@/content/photos'
import { Icon } from '@/components/ui/Icon'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { cn } from '@/lib/cn'

// Animação de layout (filtro) só aqui: o resto do site usa o pacote leve do Motion
const loadLayoutFeatures = () => import('@/components/motion/features-layout').then((mod) => mod.default)

type Filter = 'Todos' | PhotoCategory

/** Galeria com filtro por categoria (animação de layout) e visualização ampliada com setas/teclado. */
/**
 * `lite`: sem animação de layout (prévia da home). A animação de layout mede todos os elementos
 * da página quando o Motion carrega, o que pesa no carregamento; na página Galeria ela vale a pena.
 */
export function GalleryGrid({ items, limit, lite }: { items: Photo[]; limit?: number; lite?: boolean }) {
  const [filter, setFilter] = useState<Filter>('Todos')
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const categories: Filter[] = ['Todos', ...Array.from(new Set(items.map((p) => p.category)))]
  const filtered = filter === 'Todos' ? items : items.filter((p) => p.category === filter)
  const visible = limit ? filtered.slice(0, limit) : filtered
  const current = visible[index]

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => (i + dir + visible.length) % visible.length)
  }

  const content = (
    <>
      <LayoutGroup>
        <div role="group" aria-label="Filtrar fotos" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c)
                setIndex(0)
              }}
              className={cn(
                'relative border px-5 py-2.5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase transition-colors',
                filter === c
                  ? 'border-ink-900 text-white'
                  : 'border-ink-950/20 text-ink-950/75 hover:border-ink-950 hover:text-ink-950',
              )}
            >
              {filter === c && (
                <m.span
                  layoutId={lite ? undefined : 'filtro-ativo'}
                  className="bg-ink-900 absolute inset-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <m.ul layout={!lite} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode={lite ? 'sync' : 'popLayout'}>
            {visible.map((photo, i) => (
              <m.li
                data-reveal=""
                key={photo.src}
                layout={!lite}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={lite ? undefined : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.55, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`${photo.category}: ${photo.caption}. Ampliar foto`}
                  className="block w-full cursor-zoom-in"
                >
                  <PhotoTile photo={photo} zoomable sizes="(min-width: 1024px) 820px, (min-width: 640px) 50vw, 100vw" />
                </button>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </LayoutGroup>

      <dialog
        ref={dialogRef}
        aria-label="Visualização da foto"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto w-[min(1200px,94vw)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-md"
      >
        {current && (
          <figure>
            <div className="relative aspect-[3/2] max-h-[78vh] w-full overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <m.div
                  key={current.src}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="94vw"
                    quality={90}
                    className="object-contain"
                  />
                </m.div>
              </AnimatePresence>
            </div>
            <figcaption className="mt-5 text-center text-white">
              <span className="font-display text-2xl font-light uppercase">{current.caption}</span>
              <span className="eyebrow mt-1 block text-white/60">
                {index + 1} / {visible.length}
              </span>
            </figcaption>
            <div className="mt-5 flex justify-center gap-3">
              {(
                [
                  { label: 'Foto anterior', icon: 'arrowLeft', dir: -1 },
                  { label: 'Fechar', icon: 'x', dir: 0 },
                  { label: 'Próxima foto', icon: 'arrowRight', dir: 1 },
                ] as const
              ).map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => (b.dir === 0 ? dialogRef.current?.close() : step(b.dir))}
                  aria-label={b.label}
                  className="hover:bg-primary-400 hover:border-primary-400 hover:text-ink-950 grid h-12 w-12 place-items-center border border-white/50 text-white transition"
                >
                  <Icon name={b.icon} />
                </button>
              ))}
            </div>
          </figure>
        )}
      </dialog>
    </>
  )
  return lite ? content : <LazyMotion features={loadLayoutFeatures}>{content}</LazyMotion>
}
