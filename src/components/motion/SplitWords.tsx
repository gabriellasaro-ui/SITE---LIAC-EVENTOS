import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Título que entra palavra por palavra, cada uma subindo de dentro de uma máscara.
 * 100% CSS: anima no primeiro paint, sem esperar o JavaScript.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  highlight = {},
}: {
  text: string
  className?: string
  delay?: number
  /** Palavra → classe extra (ex.: gradiente metálico) */
  highlight?: Record<string, string>
}) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={i}
            className="-mx-[0.08em] -mb-[0.1em] inline-block overflow-hidden px-[0.08em] pt-[0.04em] pb-[0.22em] align-bottom"
          >
            <span className="animate-word inline-block" style={{ animationDelay: `${delay + i * 0.07}s` }}>
              <span className={highlight[w.replace(/[.,!?]/g, '')]}>{w}</span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </span>
  )
}

/** Entrada simples (sobe + desfoca → foca) em CSS puro, para o conteúdo do topo da página. */
export function Rise({
  children,
  delay = 0,
  className,
  style,
  as: Tag = 'div',
  visible,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'span'
  /** Já aparece no 1º paint (só desfocado/deslocado). Use no texto principal do hero para não atrasar o LCP. */
  visible?: boolean
}) {
  return (
    <Tag
      className={cn(visible ? 'animate-rise-in' : 'animate-rise', Tag === 'span' && 'block', className)}
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
