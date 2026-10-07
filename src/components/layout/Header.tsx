'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'

const SCROLL_THRESHOLD = 40

/** Transparente só com a página no topo, sobre um hero; ao rolar vira branca. */
function isOverHero(y: number) {
  return Boolean(document.querySelector('[data-hero]')) && y < SCROLL_THRESHOLD
}

/**
 * Fixa no topo. Sobre a foto do topo (`data-hero`): transparente, logo branco e textos brancos.
 * Ao rolar: fundo branco, logo rosé, mais compacta e com uma linha rosé na base.
 */
export function Header() {
  const { scrollY } = useScroll()
  const [overHero, setOverHero] = useState(true)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (y) => setOverHero(isOverHero(y)))

  // Recalcula ao carregar/trocar de página (ex.: refresh já no meio da página)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOverHero(isOverHero(window.scrollY)))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  const scrolled = !overHero
  const logo = !scrolled && site.logoOnDark ? site.logoOnDark : site.logo

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500',
        scrolled
          ? 'bg-white/95 shadow-[0_1px_0_var(--color-primary-200),0_18px_40px_-24px_rgb(31_31_31/0.35)] backdrop-blur-md'
          : 'bg-gradient-to-b from-black/45 to-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="focus:text-ink-950 sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <div
        className={cn(
          'mx-auto flex w-[min(1600px,100%-2rem)] items-center justify-between gap-6 transition-[height] duration-500 min-[1600px]:w-[min(1600px,100%-6rem)] md:w-[min(1600px,100%-3rem)] xl:gap-10',
          scrolled ? 'h-[72px]' : 'h-[92px]',
        )}
      >
        <Link href="/" aria-label={`${site.name}: página inicial`} className="shrink-0 transition hover:opacity-80">
          <Image
            src={logo.src}
            unoptimized
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className={cn('w-auto transition-[height] duration-500', scrolled ? 'h-9' : 'h-11')}
          />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <NavLinks onDark={overHero} />
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={site.cta.href}
            variant={overHero ? 'outline-light' : 'primary'}
            icon="arrowRight"
            className="h-11 px-4 tracking-[0.14em] max-sm:hidden"
          >
            {/* em telas médias o texto encurta para o menu respirar */}
            <span className="hidden min-[1440px]:inline">{site.cta.label}</span>
            <span className="min-[1440px]:hidden">Orçamento</span>
          </ButtonLink>
          <MobileMenu onDark={overHero} />
        </div>
      </div>
    </header>
  )
}
