import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

/** Tom do bloco onde o título está: claro (papel/blush) ou escuro (grafite/sálvia). */
export type BlockTone = 'light' | 'dark'

/** Rótulo com traço rosé antes do texto (eco das linhas do logo). */
export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: BlockTone
  className?: string
}) {
  return (
    <p
      className={cn(
        'eyebrow mb-5 flex items-center gap-4',
        tone === 'dark' ? 'text-primary-300' : 'text-primary-700',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-px w-10', tone === 'dark' ? 'bg-primary-300' : 'bg-primary-500')} />
      {children}
    </p>
  )
}

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: BlockTone
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  action,
  className,
}: Props) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-8 md:mb-16',
        align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <Eyebrow tone={tone} className={align === 'center' ? 'justify-center' : undefined}>
          {eyebrow}
        </Eyebrow>
        <Tag className={cn('text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]', dark ? 'text-white' : 'text-ink-950')}>
          {title}
        </Tag>
      </Reveal>
      {(description || action) && (
        <Reveal delay={0.15} className={cn('max-w-md shrink-0', align === 'center' && 'mx-auto')}>
          {description && (
            <p className={cn('leading-relaxed', dark ? 'text-white/75' : 'text-ink-950/70')}>{description}</p>
          )}
          {action && <div className={description ? 'mt-6' : undefined}>{action}</div>}
        </Reveal>
      )}
    </div>
  )
}
