import Image from 'next/image'
import Link from 'next/link'
import { homeServices } from '@/content/venue'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'

/** "Serviços & ocasiões" (home): 4 cards altos com foto; o texto sobe no hover. */
export function ServicesShowcase() {
  return (
    <section className="bg-paper pb-24 md:pb-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Serviços & ocasiões"
          title="Do casamento ao evento corporativo: o Liac se adapta à sua celebração."
          action={
            <ButtonLink href="/servicos" variant="outline-dark" icon="arrowRight">
              Conheça todas as possibilidades
            </ButtonLink>
          }
        />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {homeServices.map((s) => (
            <StaggerItem as="li" key={s.title}>
              <Link
                href="/servicos"
                className="group relative block aspect-[3/4] overflow-hidden text-white lg:aspect-[3/4.6]"
              >
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                  quality={85}
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90"
                />
                <span className="absolute inset-x-6 bottom-6">
                  <h3 className="text-3xl leading-none">{s.title}</h3>
                  <span className="mt-3 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                    <span className="overflow-hidden text-sm leading-relaxed text-white/85">{s.text}</span>
                  </span>
                  <span className="text-primary-200 mt-4 flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.25em] uppercase">
                    Saiba mais <Icon name="arrowRight" size={14} className="transition group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
