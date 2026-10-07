import { highlights } from '@/content/venue'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/**
 * Faixa de destaques logo abaixo do topo (mesmo padrão do site da Let's Go):
 * reta, ícone + texto em caixa alta rolando sem parar (CSS puro), separados por losangos.
 */
export function HighlightsMarquee({ tone = 'dark', className }: { tone?: 'dark' | 'blush'; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {highlights.map((h) => (
        <li
          key={h.label}
          className="flex min-h-16 items-center gap-3 px-7 text-[0.72rem] font-semibold tracking-[0.28em] whitespace-nowrap uppercase"
        >
          <Icon
            name={h.icon}
            size={18}
            className={cn('shrink-0', tone === 'dark' ? 'text-primary-300' : 'text-primary-700')}
          />
          {h.label}
          <span aria-hidden="true" className="ml-7 h-1.5 w-1.5 rotate-45 bg-current opacity-40" />
        </li>
      ))}
    </ul>
  )
  return (
    <div
      aria-label="Destaques do Liac Eventos"
      className={cn(
        'group/marquee relative z-10 overflow-hidden',
        tone === 'dark' ? 'bg-ink-900 text-white' : 'bg-primary-100 text-ink-950',
        className,
      )}
    >
      <div className="animate-marquee flex w-max group-hover/marquee:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
