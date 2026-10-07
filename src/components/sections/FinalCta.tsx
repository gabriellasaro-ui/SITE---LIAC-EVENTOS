import { site, whatsappUrl } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { GeoCluster } from '@/components/ui/GeoShape'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  eyebrow?: string
  title?: string
  description?: string
  cta?: string
}

/** Chamada final: grafite com o padrão geométrico da marca visível, sombra suave por cima e formas flutuando. */
export function FinalCta({
  eyebrow = 'Próximo passo',
  title = 'O primeiro passo para o seu evento pode ser uma visita.',
  description = 'Conte para a equipe o que você está planejando. Vamos apresentar o espaço, entender o perfil do seu evento e mostrar as possibilidades para transformar sua ideia em uma celebração memorável.',
  cta = 'Solicite uma proposta',
}: Props) {
  return (
    <section className="bg-ink-900 relative isolate overflow-hidden py-28 text-center text-white md:py-40">
      {/* padrão geométrico da marca bem visível + sombra suave por cima para dar leitura */}
      <div
        aria-hidden="true"
        className="bg-pattern absolute inset-0 -z-20 opacity-60"
        style={{ backgroundSize: '300px' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(18_18_18/0.85)_0%,rgb(18_18_18/0.7)_45%,rgb(18_18_18/0.42)_100%)]"
      />
      <GeoCluster className="absolute -top-6 -left-10 h-56 w-56 opacity-40 max-md:hidden" />
      <GeoCluster variant="b" className="absolute -right-8 -bottom-8 h-64 w-64 opacity-40 max-md:hidden" />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow tone="dark" className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 className="mx-auto max-w-4xl text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.98]">{title}</h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-white/90 [text-shadow:0_2px_10px_rgb(0_0_0/0.8)]">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-11 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contato" variant="primary" size="lg" icon="arrowRight">
            {cta}
          </ButtonLink>
          <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg" iconLeft="whatsapp">
            {site.contact.whatsapp.display}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
