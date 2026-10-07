import { testimonials } from '@/content/testimonials'
import { ButtonLink } from '@/components/ui/Button'
import { PublicRating } from '@/components/ui/PublicRating'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialsCarousel } from './TestimonialsCarousel'

/** "Prova social": avaliações públicas reais do Casamentos.com.br em carrossel. */
export function TestimonialsSection({ full = false }: { full?: boolean }) {
  return (
    <section className="bg-mist relative overflow-hidden py-24 md:py-32">
      <div className="container-site relative">
        {full ? (
          <SectionHeading
            eyebrow="Avaliações públicas"
            title="O que dizem os casais que celebraram no Liac."
            description="Avaliações publicadas no perfil do Liac no Casamentos.com.br, com o texto original de cada casal."
          />
        ) : (
          <SectionHeading
            eyebrow="Prova social"
            title="Experiências que viram histórias para contar."
            description="Casamentos e eventos marcantes começam com confiança. Reunimos avaliações, registros e depoimentos para mostrar como é viver uma celebração no Liac Eventos."
            action={
              <ButtonLink href="/clientes" variant="outline-dark" icon="arrowRight">
                Ver todos os clientes
              </ButtonLink>
            }
          />
        )}
        <Reveal className="mb-10">
          <PublicRating variant={full ? 'card' : 'badge'} />
        </Reveal>
        <Reveal>
          <TestimonialsCarousel items={testimonials} />
        </Reveal>
      </div>
    </section>
  )
}
