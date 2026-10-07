import type { ReactNode } from 'react'
import type { FaqItem } from '@/content/faq'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { FaqList } from './FaqList'

/** Perguntas frequentes: título fixo à esquerda (desktop) e acordeão à direita. */
export function FaqSection({
  items,
  eyebrow = 'Perguntas frequentes',
  title = 'Tudo o que você precisa saber antes de escolher o Liac.',
  description = 'Tire suas principais dúvidas sobre capacidade, estacionamento, acessibilidade, fornecedores e visitas ao espaço.',
  showLink = true,
  className,
}: {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  description?: ReactNode
  showLink?: boolean
  className?: string
}) {
  return (
    <section className={className ?? 'bg-paper py-24 md:py-32'}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02]">{title}</h2>
          <p className="text-ink-950/70 mt-6 leading-relaxed">{description}</p>
          {showLink && (
            <div className="mt-8">
              <ButtonLink href="/perguntas-frequentes" variant="outline-dark" icon="arrowRight">
                Todas as perguntas
              </ButtonLink>
            </div>
          )}
        </Reveal>
        <FaqList items={items} openFirst />
      </div>
    </section>
  )
}
