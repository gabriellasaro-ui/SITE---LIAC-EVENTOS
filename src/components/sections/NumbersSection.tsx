import { facts, site } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CountUp } from '@/components/motion/Effects'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

/** "Autoridade em números" (home): bloco grafite com contadores. Números confirmados (site + Casamentos.com.br). */
export function NumbersSection() {
  const nota = site.rating?.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
  const items = [
    { value: <CountUp to={facts.capacity.max} />, label: 'convidados de capacidade máxima informada pelo Liac' },
    {
      value: (
        <>
          <CountUp to={facts.couples} />+
        </>
      ),
      label: 'casais já escolheram o Liac, segundo Casamentos.com.br',
    },
    {
      value: (
        <>
          {nota}
          <span className="text-[0.5em]">/5</span>
        </>
      ),
      label: 'avaliação pública no Casamentos.com.br',
    },
    {
      value: <CountUp to={facts.eventsPerDay} duration={0.6} />,
      label: 'evento por dia: mais exclusividade para cada celebração',
    },
  ]
  return (
    <section className="bg-ink-900 relative overflow-hidden py-24 text-white md:py-32">
      <div aria-hidden="true" className="bg-pattern absolute inset-0 opacity-[0.06]" />
      <div className="container-site relative">
        <SectionHeading
          tone="dark"
          eyebrow="Autoridade em números"
          title="Confiança se constrói antes mesmo do grande dia."
          description="Estrutura, exclusividade e avaliações públicas ajudam você a escolher seu espaço para eventos em Belo Horizonte com mais segurança."
        />
        <Stagger as="dl" className="grid border border-white/15 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {items.map((it, i) => (
            <StaggerItem
              key={i}
              className="flex min-h-48 flex-col-reverse justify-between gap-6 border-white/15 p-8 not-last:border-b md:p-10 lg:border-b-0 lg:not-last:border-r sm:[&:nth-child(odd)]:border-r"
            >
              <dt className="text-sm leading-relaxed text-white/70">{it.label}</dt>
              <dd className="font-display text-primary-300 text-[clamp(3.4rem,6vw,5rem)] leading-none font-light">
                {it.value}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-5 text-xs text-white/55">
            *Avaliação e volume de casais conforme perfil público do Liac no Casamentos.com.br, consultado em outubro de
            2026.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
