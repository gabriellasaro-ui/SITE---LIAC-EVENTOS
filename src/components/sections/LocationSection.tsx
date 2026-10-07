import { directionsUrl, site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

/** "Localização" (home): card com endereço + mapa. */
export function LocationSection() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-site grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <Reveal className="bg-primary-100 flex flex-col justify-center p-10 md:p-14">
          <Eyebrow>Localização</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.03]">
            Seu evento na Pampulha, em um dos endereços mais marcantes de Belo Horizonte.
          </h2>
          <p className="text-ink-950/75 mt-6 leading-relaxed">
            Localizado na Av. Otacílio Negrão de Lima, o Liac Eventos combina a atmosfera da Pampulha com uma estrutura
            preparada para receber celebrações sociais e eventos corporativos em Belo Horizonte.
          </p>
          <address className="border-ink-950/15 my-8 border-y py-6 not-italic">
            <span className="font-display block text-xl uppercase">{site.name}</span>
            <span className="text-ink-950/75 mt-1 block">
              {site.address.street}
              <br />
              {site.address.neighborhood} ({site.address.region}) · {site.address.city} – {site.address.stateCode},{' '}
              {site.address.postalCode}
            </span>
          </address>
          <div>
            <ButtonLink href={directionsUrl} variant="dark" icon="arrowUpRight">
              Como chegar
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} scale={0.97} className="min-h-[420px] overflow-hidden bg-[#e5e3df] lg:min-h-[560px]">
          <iframe
            title={`Mapa com a localização do ${site.name}`}
            src={site.address.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[420px] w-full border-0 grayscale-[35%] lg:min-h-[560px]"
          />
        </Reveal>
      </div>
    </section>
  )
}
