import Image from 'next/image'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

type Props = {
  photo: Photo
  sizes?: string
  className?: string
  /** Proporção da moldura (padrão 4:3) */
  aspect?: string
  /** Mostra o ícone de ampliar no hover (galeria com lightbox) */
  zoomable?: boolean
}

/** Foto em moldura de proporção fixa com legenda sobre gradiente. Usada na prévia e na galeria. */
export function PhotoTile({
  photo,
  sizes = '(min-width: 1024px) 800px, 100vw',
  className,
  aspect = 'aspect-[4/3]',
  zoomable,
}: Props) {
  return (
    <div className={cn('group bg-mist relative overflow-hidden', aspect, className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-x-5 bottom-5 text-left text-white">
        <p>
          <span className="eyebrow text-primary-200 block text-[0.6rem]">{photo.category}</span>
          <span className="font-display mt-1 block text-xl leading-tight font-light uppercase">{photo.caption}</span>
        </p>
        <span
          aria-hidden="true"
          className="bg-primary-300 mt-3 block h-px w-8 transition-all duration-500 group-hover:w-16"
        />
      </div>
      {zoomable && (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 grid h-10 w-10 scale-75 place-items-center bg-white/20 text-white opacity-0 backdrop-blur-md transition duration-500 group-hover:scale-100 group-hover:opacity-100"
        >
          <Icon name="expand" size={17} />
        </span>
      )}
    </div>
  )
}
