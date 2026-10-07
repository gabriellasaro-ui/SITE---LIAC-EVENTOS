'use client'

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Número que conta de 0 até o valor quando aparece na tela.
 * O HTML do servidor já sai com o valor final (buscadores e IAs leem o número certo).
 */
export function CountUp({ to, duration = 1.8, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const value = useMotionValue(to)
  const rounded = useTransform(value, (v) => Math.round(v))

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(value, to, { from: 0, duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, to, duration, reduce, value])

  return (
    <m.span ref={ref} className={className}>
      {rounded}
    </m.span>
  )
}

/** Card com inclinação 3D que segue o ponteiro (só mouse; no toque fica parado). */
export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.22), transparent 55%)`,
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('group/tilt relative will-change-transform', className)}
    >
      {children}
      <m.div
        aria-hidden="true"
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </m.div>
  )
}

/** Barra fina no topo mostrando o progresso de leitura da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-primary-400 fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  )
}

/** Flutua suavemente para cima e para baixo (balões, selos, stickers). */
export function Float({
  children,
  className,
  amplitude = 12,
  duration = 6,
  delay = 0,
  rotate = 0,
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
  rotate?: number
}) {
  return (
    <m.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </m.div>
  )
}
