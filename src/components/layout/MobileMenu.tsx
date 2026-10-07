'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { site, whatsappUrl } from '@/config/site'
import { Icon } from '@/components/ui/Icon'
import { buttonClasses } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export function MobileMenu({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className={cn(
          'relative z-50 grid h-11 w-11 place-items-center border transition',
          onDark || open
            ? 'border-white/70 text-white hover:bg-white/15'
            : 'border-ink-950/70 text-ink-950 hover:bg-primary-50',
        )}
      >
        <Icon name={open ? 'x' : 'menu'} size={22} />
      </button>

      {/* Portal no <body>: o backdrop-filter do header prenderia um painel `fixed` dentro dele */}
      {open &&
        createPortal(
          <div id="menu-mobile" className="bg-ink-900 fixed inset-0 z-40 overflow-y-auto pt-[92px] xl:hidden">
            <div aria-hidden="true" className="bg-pattern absolute inset-x-0 bottom-0 h-40 opacity-15" />
            <nav aria-label="Menu mobile" className="container-site relative py-8">
              <ul className="flex flex-col">
                {[{ label: 'Home', href: '/' }, ...site.nav].map((item, i) => {
                  const active = pathname === item.href
                  return (
                    <li
                      key={item.href}
                      className="animate-rise border-b border-white/15"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'font-display flex items-center justify-between py-4 text-[1.9rem] font-light uppercase',
                          active ? 'text-primary-300' : 'text-white',
                        )}
                      >
                        {item.label}
                        <span className="font-sans text-[0.65rem] tracking-[0.3em] text-white/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link
                  href={site.cta.href}
                  onClick={() => setOpen(false)}
                  className={buttonClasses('primary', 'lg', 'w-full')}
                >
                  {site.cta.label}
                </Link>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('outline-light', 'lg', 'w-full')}
                >
                  <Icon name="whatsapp" size={18} /> {site.contact.whatsapp.display}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
