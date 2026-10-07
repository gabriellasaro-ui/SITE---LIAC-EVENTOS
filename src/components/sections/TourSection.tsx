import { ButtonLink } from '@/components/ui/Button'
import { GeoShape } from '@/components/ui/GeoShape'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { VideoTour } from './VideoTour'

/** "Tour imersivo" (home): bloco sálvia com o vídeo dos ambientes. */
export function TourSection() {
  return (
    <section id="tour" className="bg-paper scroll-mt-20 py-24 md:py-32">
      <div className="container-site">
        <div className="bg-accent-600 relative grid grid-cols-1 overflow-hidden text-white lg:grid-cols-[0.75fr_1.25fr]">
          <GeoShape shape="arc" className="text-accent-400 absolute -bottom-10 -left-10 w-48 opacity-60" />
          <Reveal className="relative flex flex-col justify-center p-10 md:p-14">
            <Eyebrow tone="dark" className="!text-primary-100">
              Tour imersivo
            </Eyebrow>
            <h2 className="text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02]">
              Conheça o Liac antes mesmo da sua visita.
            </h2>
            <p className="mt-6 leading-relaxed text-white/85">
              Faça um tour virtual pelo Liac Eventos e conheça os principais ambientes do espaço: jardim, salão, pub,
              spa, área kids e áreas de celebração. Depois, venha sentir tudo de perto em uma visita presencial.
            </p>
            <div className="mt-9">
              <ButtonLink href="/contato" variant="light" size="lg" icon="arrowRight">
                Agende sua visita
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal scale={0.96} delay={0.1} className="relative lg:min-h-[460px]">
            <VideoTour />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
