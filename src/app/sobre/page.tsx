import type { Metadata } from 'next'
import { fullAddress, site } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { GeoShape } from '@/components/ui/GeoShape'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Sobre o Liac Eventos: alto padrão na Pampulha'
const description =
  'O Liac nasceu para receber eventos sociais e corporativos com estrutura, hospitalidade e atenção aos detalhes, junto ao Grupo Let’s Go Festas, em BH.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/sobre' })

const team: { role: string; text: string; icon: IconName }[] = [
  {
    role: 'Atendimento comercial',
    text: 'Entende o que você está planejando e apresenta disponibilidade, configurações e proposta.',
    icon: 'handshake',
  },
  {
    role: 'Produção & operação',
    text: 'Cuida da montagem, dos ambientes e de cada detalhe para o evento acontecer como combinado.',
    icon: 'sparkles',
  },
  {
    role: 'Experiência do cliente',
    text: 'Acompanha anfitriões e convidados do primeiro contato ao grande dia.',
    icon: 'heart',
  },
]

export default function SobrePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/sobre', name: title, description, type: 'AboutPage' })} />
      <PageHero
        crumb={{ label: 'Sobre nós', href: '/sobre' }}
        image={photos.loungeNoite}
        title="Liac Eventos: alto padrão, cuidado e compromisso em cada celebração."
        highlight={{ celebração: 'text-highlight' }}
        description="O Liac nasceu para receber eventos sociais e corporativos com estrutura, hospitalidade e atenção aos detalhes. Mais do que oferecer um salão, queremos criar o cenário certo para cada história."
      />

      <section className="bg-paper relative overflow-hidden py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Nossa história</Eyebrow>
            <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
              Uma estrutura pensada para <span className="text-highlight-dark">superar expectativas.</span>
            </h2>
            <p className="text-ink-950/70 mt-7 text-lg leading-relaxed">
              Na Pampulha, em Belo Horizonte, o Liac reúne uma estrutura de alto padrão com uma equipe focada em
              entender cada necessidade e entregar a melhor solução para o evento. Qualidade, seriedade e compromisso
              fazem parte da essência da marca e da atuação construída junto ao Grupo Let’s Go Festas.
            </p>
            <p className="text-ink-950/70 mt-5 text-lg leading-relaxed">
              Nossa missão é simples: oferecer uma experiência à altura do momento, com conforto para os convidados,
              segurança para os anfitriões e cuidado em cada etapa da realização.
            </p>
          </Reveal>
          <Reveal scale={0.95} className="relative">
            <ParallaxImage
              src={photos.salaoVertical.src}
              alt={photos.salaoVertical.alt}
              sizes="(min-width: 1024px) 620px, 100vw"
              className="photo-frame aspect-[4/5] w-full"
            />
            <GeoShape shape="half" className="text-accent-400 animate-float absolute -bottom-6 -left-6 w-28" />
          </Reveal>
        </div>
      </section>

      <section className="bg-primary-100 py-24 md:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="Pessoas" title="Uma equipe focada no seu evento." />
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3" stagger={0.1}>
            {team.map((t) => (
              <StaggerItem
                as="li"
                key={t.role}
                className="bg-paper group relative h-full overflow-hidden p-10 transition duration-500 hover:-translate-y-2"
              >
                <div
                  aria-hidden="true"
                  className="bg-pattern absolute inset-x-0 top-0 h-2 opacity-80"
                  style={{ backgroundSize: '120px' }}
                />
                <Icon name={t.icon} size={30} className="text-primary-600" />
                <h3 className="mt-8 text-3xl font-light">{t.role}</h3>
                <p className="eyebrow text-ink-950/55 mt-2 text-[0.6rem]">Equipe Liac</p>
                <p className="text-ink-950/70 mt-5 leading-relaxed">{t.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-28">
        <div className="container-site">
          <div className="border-ink-950/10 border bg-white p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl">Ficha do {site.name}</h2>
            <dl className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {[
                { t: 'Nome', d: site.name },
                { t: 'Segmento', d: site.category },
                { t: 'Capacidade', d: '50 a 300 convidados' },
                { t: 'Exclusividade', d: '1 evento por dia' },
                { t: 'Endereço', d: fullAddress },
                { t: 'Região', d: `${site.address.region}, ${site.address.landmark}` },
                { t: 'WhatsApp', d: site.contact.whatsapp.display },
                { t: 'E-mail', d: site.contact.email },
              ].map((item) => (
                <div key={item.t} className="border-primary-400 border-l-2 pl-5">
                  <dt className="eyebrow text-primary-700 text-[0.62rem]">{item.t}</dt>
                  <dd className="text-ink-950/80 mt-2 leading-relaxed">{item.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
