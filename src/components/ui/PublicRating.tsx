import { facts, site } from '@/config/site'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/** Estrelas com preenchimento proporcional à nota (ex.: 4,8 → 4 cheias + 80% da última). */
export function Stars({ value, size = 18, className }: { value: number; size?: number; className?: string }) {
  return (
    <span className={cn('relative inline-flex', className)} aria-hidden="true">
      <span className="text-ink-950/15 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={size} className="fill-current" strokeWidth={0} />
        ))}
      </span>
      <span
        className="text-primary-500 absolute inset-0 flex gap-0.5 overflow-hidden"
        style={{ width: `${(value / 5) * 100}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={size} className="shrink-0 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  )
}

/**
 * Avaliação pública (site.rating, Casamentos.com.br). Exibida no site; não vai para o schema.
 * `variant="card"` = bloco de destaque; `variant="badge"` = selo compacto.
 */
export function PublicRating({ variant = 'card', className }: { variant?: 'card' | 'badge'; className?: string }) {
  const r = site.rating
  if (!r) return null
  const nota = r.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })

  if (variant === 'badge') {
    return (
      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'border-ink-950/15 hover:border-primary-400 inline-flex flex-wrap items-center gap-x-4 gap-y-1 border bg-white px-5 py-3 transition',
          className,
        )}
      >
        <span className="font-display text-3xl leading-none font-light">
          <span className="sr-only">Nota </span>
          {nota}
          <span className="sr-only"> de 5 no {r.platform}, com</span>
        </span>
        <Stars value={r.value} />
        <span className="text-ink-950/70 text-sm">
          {r.count} avaliações no {r.platform}
          <span className="sr-only">. Ver avaliações</span>
        </span>
      </a>
    )
  }

  return (
    <div
      className={cn(
        'border-ink-950/10 grid gap-8 border bg-white p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-10',
        className,
      )}
    >
      <p className="font-display text-ink-950 text-8xl leading-none font-light">
        {nota}
        <span className="text-ink-950/40 text-3xl">/5</span>
      </p>
      <div>
        <Stars value={r.value} size={24} />
        <p className="font-display mt-3 text-2xl uppercase">
          {r.count} avaliações · mais de {facts.couples} casais
        </p>
        <p className="text-ink-950/65 mt-1">Perfil público do Liac no {r.platform}.</p>
      </div>
      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-liac bg-primary-400 text-ink-950 inline-flex h-12 items-center gap-3 justify-self-start px-6 text-[0.72rem] font-semibold tracking-[0.2em] uppercase [--btn-fill:var(--color-ink-950)]"
      >
        Ver avaliações <Icon name="arrowUpRight" size={16} />
      </a>
    </div>
  )
}
