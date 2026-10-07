import type { Metadata } from 'next'
import { allFaqs, faqGroups } from '@/content/faq'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { FaqList } from '@/components/sections/FaqList'
import { ButtonLink } from '@/components/ui/Button'
import { site, whatsappUrl } from '@/config/site'

const title = 'Perguntas frequentes sobre o Liac Eventos'
const description =
  'Capacidade, estacionamento, acessibilidade, fornecedores, reserva da data e visitas: respostas rápidas sobre o Liac Eventos, na Pampulha, em BH.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/perguntas-frequentes' })

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ path: '/perguntas-frequentes', name: title, description }), faqSchema(allFaqs)]} />
      <PageHero
        crumb={{ label: 'Perguntas frequentes', href: '/perguntas-frequentes' }}
        image={photos.jardimNoite}
        title="Perguntas frequentes sobre o Liac Eventos."
        highlight={{ Liac: 'text-highlight' }}
        description="Reunimos as dúvidas mais comuns de quem procura um espaço para eventos em Belo Horizonte e quer entender melhor a estrutura, a reserva e as possibilidades do Liac."
      />
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Categorias</Eyebrow>
            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">
              Estrutura, reserva, fornecedores e visita.
            </h2>
            <p className="text-ink-950/70 mt-6 leading-relaxed">
              Encontre respostas rápidas antes de solicitar sua proposta ou agendar uma visita.
            </p>
            <nav aria-label="Categorias de perguntas" className="mt-8">
              <ul className="grid gap-2">
                {faqGroups.map((g) => (
                  <li key={g.title}>
                    <a
                      href={`#${slug(g.title)}`}
                      className="group text-ink-950/80 hover:text-primary-700 flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] uppercase"
                    >
                      <span className="bg-primary-400 h-px w-6 transition-all group-hover:w-10" />
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
          <div className="grid gap-16">
            {faqGroups.map((g) => (
              <section
                key={g.title}
                id={slug(g.title)}
                className="scroll-mt-28"
                aria-labelledby={`${slug(g.title)}-titulo`}
              >
                <h2 id={`${slug(g.title)}-titulo`} className="mb-4 text-3xl md:text-4xl">
                  {g.title}
                </h2>
                <FaqList items={g.items} />
              </section>
            ))}
            {/* FAQ é a última seção antes do rodapé: o convite para falar com a equipe fica aqui dentro */}
            <Reveal className="bg-ink-900 p-8 text-white md:p-10">
              <h2 className="text-3xl md:text-4xl">Ainda ficou alguma dúvida?</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-white/75">
                Fale com a equipe pelo WhatsApp ou agende uma visita. Teremos o maior prazer em apresentar o Liac e
                responder tudo pessoalmente.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contato" variant="primary" icon="arrowRight">
                  Solicitar proposta
                </ButtonLink>
                <ButtonLink href={whatsappUrl()} variant="outline-light" iconLeft="whatsapp">
                  {site.contact.whatsapp.display}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
