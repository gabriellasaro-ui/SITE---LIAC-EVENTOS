import type { Metadata } from 'next'
import Image from 'next/image'
import { photos } from '@/content/photos'
import { layouts, spaces } from '@/content/venue'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { GeoShape } from '@/components/ui/GeoShape'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { TourSection } from '@/components/sections/TourSection'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Nosso espaço: ambientes do Liac na Pampulha'
const description =
  'Jardim para cerimônia, salão 100% climatizado, pub, spa, área kids e boate: conheça os ambientes do Liac Eventos, de 50 a 300 convidados, na Pampulha, em BH.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/nosso-espaco' })

export default function NossoEspacoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/nosso-espaco', name: title, description })} />
      <PageHero
        crumb={{ label: 'Nosso espaço', href: '/nosso-espaco' }}
        image={photos.areaExterna}
        title="Conheça um espaço para eventos em Belo Horizonte criado para surpreender."
        highlight={{ surpreender: 'text-highlight' }}
        description="Na Pampulha, o Liac Eventos reúne ambientes internos e externos, estrutura de alto padrão e espaços de apoio para casamentos, festas e eventos corporativos de diferentes formatos."
      >
        <ButtonLink href="#ambientes" variant="primary" size="lg" icon="arrowRight">
          Ver os ambientes
        </ButtonLink>
      </PageHero>

      {/* visão geral */}
      <section className="bg-paper relative overflow-hidden py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal scale={0.95} className="relative">
            <ParallaxImage
              src={photos.salaoLounge.src}
              alt={photos.salaoLounge.alt}
              sizes="(min-width: 1024px) 620px, 100vw"
              className="photo-frame aspect-[4/5] w-full"
            />
            <GeoShape shape="ring" className="text-primary-300 animate-float absolute -top-8 -right-6 w-24" />
          </Reveal>
          <Reveal>
            <Eyebrow>Visão geral</Eyebrow>
            <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
              Estrutura versátil. <span className="text-highlight-dark">Experiência marcante.</span>
            </h2>
            <p className="text-ink-950/70 mt-7 text-lg leading-relaxed">
              Cada ambiente do Liac foi pensado para cumprir um papel na experiência do evento. Jardim, salão principal,
              pub, spa, área kids e boate se conectam para criar uma jornada confortável, elegante e fluida para
              anfitriões e convidados.
            </p>
            <p className="text-ink-950/70 mt-5 text-lg leading-relaxed">
              Com capacidade para eventos de 50 a 300 pessoas, o espaço pode receber diferentes propostas de montagem e
              circulação, sempre respeitando o formato e as necessidades de cada celebração.
            </p>
            <div className="mt-9">
              <ButtonLink href="/contato" variant="dark" size="lg" icon="arrowRight">
                Agendar visita
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ambientes */}
      <section id="ambientes" className="bg-mist scroll-mt-20 py-24 md:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="Ambientes" title="Ambientes que transformam cada etapa do evento." />
          <Stagger as="ul" className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {spaces.map((s, i) => (
              <StaggerItem as="li" key={s.slug} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 800px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <span className="bg-paper text-ink-950 font-display absolute top-0 left-0 grid h-14 w-14 place-items-center text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-start gap-4 pt-6">
                  <Icon name={s.icon} size={24} className="text-primary-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-2xl leading-tight font-normal">{s.title}</h3>
                    <p className="text-ink-950/70 mt-2 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* configurações */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="Configurações" title="Um espaço premium, diferentes formas de viver o evento." />
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {layouts.map((l) => (
              <StaggerItem
                as="li"
                key={l.name}
                className="group bg-primary-100 hover:bg-ink-900 h-full p-8 transition-colors duration-500 hover:text-white"
              >
                <Icon
                  name={l.icon}
                  size={26}
                  className="text-primary-700 group-hover:text-primary-300 transition-colors"
                />
                <p className="eyebrow text-ink-950/55 mt-8 transition-colors group-hover:text-white/60">Formato</p>
                <h3 className="mt-2 text-4xl font-light">{l.name}</h3>
                <p className="text-ink-950/70 mt-3 leading-relaxed transition-colors group-hover:text-white/75">
                  {l.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TourSection />
      <FinalCta />
    </>
  )
}
