'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/** Links do menu: caixa alta espaçada, com um traço rosé que cresce no hover e marca a página atual. */
export function NavLinks({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname()
  return (
    <ul className="flex items-center">
      {site.nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative block px-2.5 py-2 text-[0.66rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300 min-[1440px]:px-3 min-[1440px]:tracking-[0.16em] min-[1700px]:px-4 min-[1700px]:tracking-[0.2em]',
                onDark
                  ? 'text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.4)]'
                  : active
                    ? 'text-primary-700'
                    : 'text-ink-950 hover:text-primary-700',
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-2.5 -bottom-0.5 h-px origin-left transition-transform duration-500 min-[1440px]:inset-x-3 min-[1700px]:inset-x-4',
                  onDark ? 'bg-primary-200' : 'bg-primary-500',
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
