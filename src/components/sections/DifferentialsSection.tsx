import { differentials } from '@/content/venue'
import { GeoCluster } from '@/components/ui/GeoShape'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'

/** "Por que o Liac" (home): 6 diferenciais em cards claros sobre fundo blush. */
export function DifferentialsSection() {
  return (
    <section className="bg-primary-100 relative overflow-hidden py-24 md:py-32">
      <GeoCluster variant="b" className="absolute -top-10 -right-10 h-72 w-72 opacity-50 max-md:hidden" />
      <div className="container-site relative">
        <SectionHeading eyebrow="Por que o Liac" title="Por que escolher o Liac para o seu evento em Belo Horizonte?" />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {differentials.map((d, i) => (
            <StaggerItem
              as="li"
              key={d.title}
              className="group bg-paper relative flex h-full flex-col overflow-hidden p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgb(31_31_31/0.35)] md:p-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-primary-200 group-hover:text-primary-400 absolute top-5 right-6 text-5xl font-light transition-colors duration-500"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="bg-ink-900 group-hover:bg-primary-400 group-hover:text-ink-950 grid h-14 w-14 place-items-center text-white transition-colors duration-500">
                <Icon name={d.icon} size={24} />
              </span>
              <h3 className="mt-8 text-2xl leading-tight font-normal">{d.title}</h3>
              <p className="text-ink-950/70 mt-3 leading-relaxed">{d.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
