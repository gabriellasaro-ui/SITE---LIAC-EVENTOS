import type { Metadata } from 'next'
import { Suspense } from 'react'
import { directionsUrl, site, whatsappUrl } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { LeadForm } from '@/components/forms/LeadForm'

const title = 'Fale conosco: proposta para o seu evento'
const description = `Fale com o Liac Eventos: WhatsApp ${site.contact.whatsapp.display}, e-mail e endereço na Pampulha. Consulte disponibilidade e receba uma proposta para o seu evento em BH.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/contato' })

const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: 'whatsapp', label: 'WhatsApp', value: site.contact.whatsapp.display, href: whatsappUrl(), external: true },
  { icon: 'mail', label: 'E-mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
  {
    icon: 'mapPin',
    label: 'Endereço',
    value: `${site.address.street} · ${site.address.neighborhood} (${site.address.region}) · ${site.address.city} – ${site.address.stateCode}`,
    href: directionsUrl,
    external: true,
  },
  { icon: 'instagram', label: 'Instagram', value: '@liaceventos', href: site.social[0].href, external: true },
]

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/contato', name: title, description, type: 'ContactPage' })} />
      <PageHero
        crumb={{ label: 'Fale conosco', href: '/contato' }}
        image={photos.jardimPalmeiras}
        title="Vamos transformar sua ideia em um evento memorável?"
        highlight={{ memorável: 'text-highlight' }}
        description="Fale com a equipe do Liac Eventos, consulte disponibilidade e receba uma proposta para casamento, festa ou evento corporativo em Belo Horizonte."
      >
        <ButtonLink href="#proposta" variant="primary" size="lg" icon="arrowRight">
          Solicitar proposta
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg" iconLeft="whatsapp">
          WhatsApp
        </ButtonLink>
      </PageHero>

      <section id="proposta" className="bg-mist scroll-mt-20 py-24 md:py-32">
        <div className="container-site grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="bg-ink-900 relative overflow-hidden p-9 text-white md:p-12">
            <div
              aria-hidden="true"
              className="bg-pattern absolute inset-x-0 bottom-0 h-3 opacity-80"
              style={{ backgroundSize: '140px' }}
            />
            <div className="relative">
              <Eyebrow tone="dark">Fale com o Liac</Eyebrow>
              <h2 className="text-5xl font-light">{site.name}</h2>
              <ul className="mt-10 grid gap-6">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex gap-4"
                    >
                      <span className="group-hover:bg-primary-400 group-hover:text-ink-950 grid h-11 w-11 shrink-0 place-items-center border border-white/25 transition">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow text-primary-300 block text-[0.6rem]">{c.label}</span>
                        <span className="mt-1 block break-words text-white/85 group-hover:text-white">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              {site.openingHours && (
                <div className="mt-10 border-t border-white/15 pt-7">
                  <p className="eyebrow text-primary-300 text-[0.6rem]">Horário de atendimento</p>
                  <ul className="mt-3 grid gap-1 text-white/85">
                    {site.openingHours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.opens.replace(':00', 'h')} às {h.closes.replace(':00', 'h')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Suspense fallback={<div className="min-h-[640px] bg-white" />}>
              <LeadForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <section aria-label="Mapa" className="h-[460px] bg-[#e5e3df]">
        <iframe
          title={`Mapa com a localização do ${site.name}`}
          src={site.address.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[35%]"
        />
      </section>
    </>
  )
}
