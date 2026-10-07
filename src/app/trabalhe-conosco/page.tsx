import type { Metadata } from 'next'
import { site } from '@/config/site'
import { careerAreas } from '@/content/form'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { CareerForm } from '@/components/forms/CareerForm'

const title = 'Trabalhe conosco: vagas em eventos em BH'
const description =
  'Quer trabalhar com eventos em Belo Horizonte? Cadastre seu currículo no Liac Eventos: garçons, cozinha, bar, recepção, limpeza, segurança, produção e atendimento.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/trabalhe-conosco' })

const perks: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Eventos de alto padrão',
    text: 'Casamentos, festas e eventos corporativos em um espaço completo na orla da Pampulha.',
    icon: 'sparkles',
  },
  {
    title: 'Equipe parceira',
    text: 'Gente que se ajuda para cada evento sair impecável, do salão à cozinha e ao bar.',
    icon: 'users',
  },
  {
    title: 'Grupo Let’s Go Festas',
    text: 'Faça parte de um grupo com história em eventos em Belo Horizonte, onde dá para aprender e crescer.',
    icon: 'handshake',
  },
]

const steps = [
  { title: 'Preencha o formulário', text: 'Conte quem você é, a área de interesse e sua disponibilidade.' },
  { title: 'Banco de talentos', text: 'Seu cadastro fica guardado e é consultado sempre que abre uma vaga.' },
  { title: 'A gente te chama', text: 'Se o seu perfil combinar com a vaga, a equipe entra em contato.' },
]

export default function TrabalheConoscoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/trabalhe-conosco', name: title, description })} />
      <PageHero
        crumb={{ label: 'Trabalhe conosco', href: '/trabalhe-conosco' }}
        image={photos.salaoImperial}
        title="Venha fazer parte da equipe que faz cada evento acontecer."
        highlight={{ acontecer: 'text-highlight' }}
        description={`No ${site.name}, cada celebração é feita por muita gente boa. Se você gosta de receber pessoas e de trabalhar com excelência, cadastre seu currículo.`}
      >
        <ButtonLink href="#candidatura" variant="primary" size="lg" icon="arrowRight">
          Quero me candidatar
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Por que o Liac"
            title="Um lugar para trabalhar com excelência."
            description="Por trás de cada evento tem garçons, cozinha, bar, recepção, limpeza, segurança e produção trabalhando juntos."
          />
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3" stagger={0.1}>
            {perks.map((p) => (
              <StaggerItem
                as="li"
                key={p.title}
                className="bg-primary-100 h-full p-10 transition duration-500 hover:-translate-y-2"
              >
                <Icon name={p.icon} size={30} className="text-primary-700" />
                <h3 className="mt-8 text-3xl font-light">{p.title}</h3>
                <p className="text-ink-950/70 mt-4 leading-relaxed">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16 text-center">
            <h3 className="text-3xl font-light">Áreas do banco de talentos</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {careerAreas
                .filter((a) => a !== 'Outra área')
                .map((a) => (
                  <li key={a} className="border-ink-950/20 text-ink-950 border px-5 py-2.5 text-sm">
                    {a}
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="candidatura" className="bg-mist scroll-mt-20 py-24 md:py-32">
        <div className="container-site grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="bg-ink-900 p-9 text-white md:p-12">
            <Eyebrow tone="dark">Como funciona</Eyebrow>
            <h2 className="text-5xl font-light">Três passos simples</h2>
            <ol className="mt-10 grid gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="font-display text-primary-300 text-4xl leading-none font-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-1 block leading-relaxed text-white/75">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-white/15 pt-7 leading-relaxed text-white/80">
              Primeira experiência em eventos? Pode se candidatar também. Vontade de aprender conta muito por aqui.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CareerForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
