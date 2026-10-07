import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

/**
 * Formas do padrão geométrico da marca (manual: "Elementos"): arco, triângulo, anel,
 * meio-disco, listras e círculo. Usadas como acentos decorativos (sempre aria-hidden).
 */
export type GeoShapeName = 'arc' | 'triangle' | 'ring' | 'half' | 'stripes' | 'dot' | 'corner'

const paths: Record<GeoShapeName, (stroke?: boolean) => React.ReactNode> = {
  arc: () => <path d="M10 90a80 80 0 0 1 80-80v26a54 54 0 0 0-54 54Z" />,
  triangle: (stroke) =>
    stroke ? (
      <path d="M50 12 90 88H10Z" fill="none" stroke="currentColor" strokeWidth="3" />
    ) : (
      <path d="M50 12 90 88H10Z" />
    ),
  ring: () => (
    <path fillRule="evenodd" d="M50 8a42 42 0 1 1 0 84 42 42 0 0 1 0-84Zm0 22a20 20 0 1 0 0 40 20 20 0 0 0 0-40Z" />
  ),
  half: () => <path d="M8 60a42 42 0 0 1 84 0Z" />,
  stripes: () => (
    <>
      <path d="M8 18h70l-10 12H8Z" />
      <path d="M8 44h84l-10 12H8Z" />
      <path d="M8 70h62l-10 12H8Z" />
    </>
  ),
  dot: () => <circle cx="50" cy="50" r="40" />,
  corner: (stroke) =>
    stroke ? (
      <path d="M12 12h76v76" fill="none" stroke="currentColor" strokeWidth="3" />
    ) : (
      <path d="M12 12h76v76H62V38H12Z" />
    ),
}

export function GeoShape({
  shape,
  className,
  outline,
  style,
}: {
  shape: GeoShapeName
  className?: string
  /** Versão só contorno (triângulo e canto) */
  outline?: boolean
  style?: CSSProperties
}) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className={cn('block', className)} style={style}>
      {paths[shape](outline)}
    </svg>
  )
}

/**
 * Conjunto de formas flutuando devagar (CSS puro). `variant` muda a composição.
 * Posicione o container com `absolute` e um tamanho.
 */
export function GeoCluster({ variant = 'a', className }: { variant?: 'a' | 'b'; className?: string }) {
  const float = (delay: number, r = 0): CSSProperties => ({ animationDelay: `${delay}s`, ['--r' as string]: `${r}deg` })
  return (
    <div aria-hidden="true" className={cn('pointer-events-none', className)}>
      {variant === 'a' ? (
        <div className="relative h-full w-full">
          <GeoShape
            shape="arc"
            className="text-primary-400 animate-float absolute top-0 left-0 w-[46%]"
            style={float(0)}
          />
          <GeoShape
            shape="triangle"
            outline
            className="text-ink-600 animate-float absolute top-[8%] right-0 w-[30%]"
            style={float(1.2, 12)}
          />
          <GeoShape
            shape="ring"
            className="text-accent-400 animate-float absolute bottom-0 left-[18%] w-[34%]"
            style={float(2.1)}
          />
          <GeoShape
            shape="stripes"
            className="text-primary-200 animate-float absolute right-[6%] bottom-[10%] w-[30%]"
            style={float(0.6)}
          />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <GeoShape
            shape="half"
            className="text-accent-400 animate-float absolute top-0 right-[10%] w-[40%]"
            style={float(0.4)}
          />
          <GeoShape
            shape="dot"
            className="text-primary-300 animate-float absolute bottom-[6%] left-0 w-[24%]"
            style={float(1.6)}
          />
          <GeoShape
            shape="corner"
            outline
            className="text-ink-600 animate-float absolute right-0 bottom-0 w-[34%]"
            style={float(2.4)}
          />
          <GeoShape
            shape="triangle"
            className="text-primary-400 animate-float absolute top-[30%] left-[22%] w-[26%]"
            style={float(0.9, -8)}
          />
        </div>
      )}
    </div>
  )
}
