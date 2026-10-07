import { galleryPhotos } from '@/content/photos'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { GalleryGrid } from './GalleryGrid'

/** Prévia da galeria (home): filtros + 6 fotos com visualização ampliada. */
export function GalleryPreview() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Galeria"
          title="Imagine seu casamento ou evento acontecendo aqui."
          action={
            <ButtonLink href="/galeria" variant="dark" icon="arrowRight">
              Ver galeria completa
            </ButtonLink>
          }
        />
        <Reveal>
          <GalleryGrid items={galleryPhotos} limit={6} lite />
        </Reveal>
      </div>
    </section>
  )
}
