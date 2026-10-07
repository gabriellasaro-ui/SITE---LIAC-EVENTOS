import type { Metadata } from 'next'
import Image from 'next/image'
import { facts, site } from '@/config/site'
import { photos, type Photo } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FinalCta } from '@/components/sections/FinalCta'

const nota = site.rating?.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })

const title = `Clientes e avaliações: nota ${nota} no Casamentos.com.br`
const description = `Casais, famílias e empresas já escolheram o Liac, na Pampulha: nota ${nota} no Casamentos.com.br e mais de ${facts.couples} casais. Veja avaliações e histórias.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/clientes' })

const cases: { tag: string; title: string; text: string; photo: Photo }[] = [
  {
    tag: 'Case 01',
    title: 'Casamento',
    text: 'Conheça a proposta do casal, os ambientes escolhidos, a montagem e os detalhes que transformaram o casamento em uma experiência única.',
    photo: photos.noivaCorredor,
  },
  {
    tag: 'Case 02',
    title: 'Evento corporativo',
    text: 'Veja como o espaço foi configurado para atender ao objetivo da empresa, receber os convidados e criar uma experiência de marca memorável.',
    photo: photos.salaoJantar,
  },
  {
    tag: 'Case 03',
    title: 'Evento social',
    text: 'Da ideia à celebração: ambientação, circulação e escolhas que fizeram o evento ganhar identidade própria.',
    photo: photos.boate15,
  },
]

export default function ClientesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/clientes', name: title, description })} />
      <PageHero
        crumb={{ label: 'Clientes', href: '/clientes' }}
        image={photos.casamentoRecepcao}
        title="Eventos marcantes começam com escolhas que inspiram confiança."
        highlight={{ confiança: 'text-highlight' }}
        description="Casais, famílias e empresas já escolheram o Liac para celebrar momentos importantes em Belo Horizonte. Aqui, a prova está nas experiências, nos registros e em quem viveu cada evento."
      >
        <ButtonLink href={site.rating?.url ?? '/contato'} variant="primary" size="lg" icon="arrowUpRight">
          Ver avaliações
        </ButtonLink>
      </PageHero>

      <TestimonialsSection full />

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Mini-cases"
            title="Mais do que nomes: histórias, soluções e experiências."
            description="Casais, empresas e parceiros fazem parte da história do Liac. Cada celebração ajuda a mostrar a versatilidade do espaço."
          />
          <Stagger as="ul" className="grid gap-5 md:grid-cols-3" stagger={0.1}>
            {cases.map((c) => (
              <StaggerItem as="li" key={c.tag} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={c.photo.src}
                    alt={c.photo.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-7 bottom-7 text-white">
                    <p className="eyebrow text-primary-200">{c.tag}</p>
                    <h3 className="mt-2 text-4xl font-light">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{c.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCta title="A próxima história pode ser a sua." />
    </>
  )
}
