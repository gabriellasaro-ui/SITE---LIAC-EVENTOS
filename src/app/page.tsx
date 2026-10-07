import type { Metadata } from 'next'
import { site } from '@/config/site'
import { featuredFaqs } from '@/content/faq'
import { heroSlides } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { IntroSection } from '@/components/sections/IntroSection'
import { NumbersSection } from '@/components/sections/NumbersSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { DifferentialsSection } from '@/components/sections/DifferentialsSection'
import { TourSection } from '@/components/sections/TourSection'
import { ServicesShowcase } from '@/components/sections/ServicesShowcase'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LocationSection } from '@/components/sections/LocationSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Liac Eventos | Espaço para Eventos e Casamentos em Belo Horizonte'
const description =
  'Espaço para eventos na Pampulha, em BH: casamentos, eventos sociais e corporativos de 50 a 300 convidados, com climatização, acessibilidade e estacionamento.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/', absoluteTitle: true })

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/', name: title, description: site.description })} />
      <PageHero
        eyebrow="Bem-vindo ao futuro · Pampulha, Belo Horizonte"
        crumb={{ label: 'Home', href: '/' }}
        images={heroSlides}
        title="Seu evento merece um cenário à altura."
        highlight={{ altura: 'text-highlight' }}
        description="Na Pampulha, em Belo Horizonte, o Liac Eventos reúne elegância, conforto e uma estrutura de alto padrão para casamentos, eventos sociais e corporativos de 50 a 300 convidados. Um espaço pensado para impressionar, e uma equipe preparada para cuidar de cada detalhe."
      >
        <ButtonLink href="/contato" variant="primary" size="lg" icon="arrowRight">
          Agende uma visita
        </ButtonLink>
        <ButtonLink href="#tour" variant="outline-light" size="lg">
          Conheça o espaço
        </ButtonLink>
      </PageHero>
      <IntroSection />
      <NumbersSection />
      <TestimonialsSection />
      <DifferentialsSection />
      <TourSection />
      <ServicesShowcase />
      <GalleryPreview />
      <LocationSection />
      <FinalCta />
      {/* FAQ é sempre a última seção antes do rodapé */}
      <FaqSection items={featuredFaqs} className="bg-mist py-24 md:py-32" />
    </>
  )
}
