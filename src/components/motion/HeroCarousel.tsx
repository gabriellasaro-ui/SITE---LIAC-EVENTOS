'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'

type Props = {
  photos: Photo[]
  /** Tempo de cada foto, em ms */
  interval?: number
  /** Classes extras para reposicionar os indicadores */
  dotsClassName?: string
}

/**
 * Fundo do topo em carrossel: troca com fade lento e zoom suave (Ken Burns) a cada `interval`.
 * Os indicadores (traços) ficam na base; o ativo "enche" durante o tempo da foto.
 */
export function HeroCarousel({ photos, interval = 6500, dotsClassName }: Props) {
  const [active, setActive] = useState(0)
  // Quantas fotos já estão montadas: a 1ª entra na hora; as próximas são preparadas antes de cada troca
  const [mounted, setMounted] = useState(1)

  useEffect(() => {
    const warm = window.setTimeout(() => setMounted((m) => Math.max(m, 2)), 2500)
    return () => window.clearTimeout(warm)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % photos.length)
      setMounted((m) => Math.min(photos.length, m + 1))
    }, interval)
    return () => window.clearInterval(id)
  }, [active, interval, photos.length])

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={cn(
              'absolute inset-0 transition-opacity duration-[1600ms] ease-in-out',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            {i < mounted && (
              <Image
                key={i === active ? `${photo.src}-${active}` : photo.src}
                src={photo.src}
                alt=""
                fill
                quality={90}
                priority={i === 0}
                sizes="100vw"
                className={cn('object-cover', i === active && 'animate-kenburns')}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className={cn('absolute inset-x-0 bottom-24 z-10 flex justify-center gap-2.5', dotsClassName)}
        role="group"
        aria-label="Fotos do topo"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => {
              setActive(i)
              setMounted((m) => Math.max(m, i + 1))
            }}
            aria-label={`Mostrar foto ${i + 1}: ${photo.caption}`}
            aria-pressed={i === active}
            className="group relative grid h-6 w-12 place-items-center"
          >
            <span className="relative block h-[2px] w-full overflow-hidden bg-white/35 transition group-hover:bg-white/60">
              {i === active && (
                <span
                  key={active}
                  className="bg-primary-300 absolute inset-0 origin-left"
                  style={{ animation: `carousel-fill ${interval}ms linear forwards` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
