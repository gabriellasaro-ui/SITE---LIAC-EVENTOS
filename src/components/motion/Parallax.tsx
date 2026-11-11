'use client'

import { m, useScroll, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'
import { blurProps } from '@/lib/image'

/** Move o conteúdo verticalmente em velocidade diferente da rolagem. `speed` positivo = sobe mais rápido. */
export function Parallax({
  children,
  speed = 60,
  rotate = 0,
  className,
}: {
  children: ReactNode
  speed?: number
  rotate?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  return (
    <m.div ref={ref} style={{ y, rotate: r }} className={className}>
      {children}
    </m.div>
  )
}

type ParallaxImageProps = {
  photo: Photo
  sizes: string
  className?: string
  imgClassName?: string
  /** Intensidade do movimento da foto dentro da moldura (%). Máx. ~6 (a foto tem só 8% de sobra em cima/embaixo). */
  strength?: number
  children?: ReactNode
}

/** Foto que "desliza" dentro da moldura ao rolar: o efeito parallax clássico. */
export function ParallaxImage({ photo, sizes, className, imgClassName, strength = 6, children }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <m.div style={{ y }} className="absolute inset-x-0 -inset-y-[8%]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          {...blurProps(photo)}
          className={cn('object-cover', imgClassName)}
        />
      </m.div>
      {children}
    </div>
  )
}
