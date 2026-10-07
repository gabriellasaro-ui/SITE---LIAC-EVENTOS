import { photos } from '@/content/photos'
import { quickFacts } from '@/content/venue'
import { ButtonLink } from '@/components/ui/Button'
import { GeoShape } from '@/components/ui/GeoShape'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Parallax, ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

/** "Nosso espaço" (home): texto do wireframe + duas fotos sobrepostas com parallax. */
export function IntroSection() {
  return (
    <section className="bg-paper relative overflow-hidden py-24 md:py-36">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Nosso espaço</Eyebrow>
            <h2 className="text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02]">
              Um espaço para eventos em Belo Horizonte onde cada detalhe{' '}
              <span className="text-highlight-dark">faz diferença.</span>
            </h2>
            <p className="text-ink-950/70 mt-8 max-w-xl text-lg leading-relaxed">
              Mais do que um salão de festas em Belo Horizonte, o Liac combina ambientes de alto padrão, áreas verdes e
              estrutura completa para criar celebrações com personalidade. Do planejamento à experiência dos convidados,
              cada espaço foi pensado para unir beleza, conforto, segurança e versatilidade.
            </p>
          </Reveal>
          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.07}>
            {quickFacts.map((f) => (
              <StaggerItem
                as="li"
                key={f}
                className="border-primary-300 text-ink-950 flex items-center gap-2 border px-4 py-2 text-sm font-medium"
              >
                <Icon name="check" size={16} className="text-primary-600" strokeWidth={2.2} />
                {f}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href="/nosso-espaco" variant="dark" size="lg" icon="arrowRight">
              Conheça o Liac por dentro
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative h-[480px] sm:h-[580px] lg:h-[640px]">
          <Reveal scale={0.94} className="absolute top-0 right-0 h-[80%] w-[82%]">
            <ParallaxImage
              src={photos.jardimNoite.src}
              alt={photos.jardimNoite.alt}
              sizes="(min-width: 1024px) 560px, 82vw"
              className="photo-frame h-full w-full"
            />
          </Reveal>
          <Parallax speed={50} className="absolute bottom-0 left-0 h-[46%] w-[50%]">
            <Reveal scale={0.9} delay={0.15} className="h-full w-full">
              <ParallaxImage
                src={photos.salaoFlores.src}
                alt={photos.salaoFlores.alt}
                sizes="(min-width: 1024px) 340px, 50vw"
                className="photo-frame border-paper h-full w-full border-[10px]"
              />
            </Reveal>
          </Parallax>
          <Reveal
            delay={0.3}
            className="absolute right-4 bottom-[12%] w-56 bg-white/95 p-5 shadow-[0_24px_50px_-20px_rgb(31_31_31/0.4)] backdrop-blur max-sm:hidden"
          >
            <p className="font-display text-xl uppercase">Na orla da Pampulha</p>
            <p className="text-ink-950/65 mt-1 text-sm">Na Pampulha, um endereço marcante para celebrar.</p>
          </Reveal>
          <GeoShape
            shape="arc"
            className="text-primary-300 animate-float absolute -top-8 left-[6%] w-24 opacity-90"
            style={{ animationDelay: '0.6s' }}
          />
          <GeoShape shape="ring" className="text-accent-400 animate-float absolute right-[-18px] -bottom-6 w-16" />
        </div>
      </div>
    </section>
  )
}
