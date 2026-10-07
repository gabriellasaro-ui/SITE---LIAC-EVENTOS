import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'dark' | 'light' | 'accent' | 'outline-light' | 'outline-dark'
type Size = 'md' | 'lg'

/**
 * --btn-fill = cor que atravessa o botão no hover; --btn-fill-text = cor do texto por cima dela.
 * primary = rosé (principal), dark = grafite, accent = sálvia, light = branco.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-primary-400 text-ink-950 [--btn-fill:var(--color-ink-950)]',
  dark: 'bg-ink-950 text-white [--btn-fill:var(--color-primary-400)] [--btn-fill-text:var(--color-ink-950)]',
  light: 'bg-white text-ink-950 [--btn-fill:var(--color-primary-400)] [--btn-fill-text:var(--color-ink-950)]',
  accent: 'bg-accent-600 text-white [--btn-fill:var(--color-ink-950)]',
  'outline-light':
    'border border-white/70 bg-black/15 text-white [clip-path:none]! [--btn-fill:#fff] [--btn-fill-text:var(--color-ink-950)]',
  'outline-dark': 'border border-ink-950/80 text-ink-950 [clip-path:none]! [--btn-fill:var(--color-ink-950)]',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[0.72rem]',
  lg: 'h-14 px-8 text-[0.78rem]',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'btn-liac group inline-flex items-center justify-center gap-3 text-center font-semibold tracking-[0.2em] whitespace-nowrap uppercase disabled:pointer-events-none disabled:opacity-60 max-[420px]:h-auto max-[420px]:min-h-12 max-[420px]:py-3.5 max-[420px]:whitespace-normal',
    variants[variant],
    sizes[size],
    className,
  )
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  icon?: IconName
  iconLeft?: IconName
  className?: string
  children: ReactNode
}

export function ButtonLink({ variant, size, icon, iconLeft, className, children, href, ...props }: ButtonLinkProps) {
  const isNewTab = typeof href === 'string' && href.startsWith('http')
  return (
    <Link
      href={href}
      {...props}
      {...(isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={buttonClasses(variant, size, className)}
    >
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}
