'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { photos } from '@/content/photos'
import { Icon } from '@/components/ui/Icon'

export const TOUR_VIDEO = '/videos/tour-liac-eventos.mp4'

/**
 * Tour em vídeo pelos ambientes. Só baixa o vídeo quando a pessoa clica em play
 * (capa leve + preload="none"), para não pesar no carregamento da página.
 */
export function VideoTour() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <div className="group relative aspect-video w-full overflow-hidden bg-black lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
      <video
        ref={ref}
        src={TOUR_VIDEO}
        preload="none"
        playsInline
        controls={playing}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label="Tour em vídeo pelos ambientes do Liac Eventos"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => {
            setPlaying(true)
            void ref.current?.play()
          }}
          className="absolute inset-0 grid place-items-center"
          aria-label="Assistir ao tour em vídeo pelo Liac"
        >
          <Image
            src={photos.tourCapa.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
          <span className="text-ink-950 relative grid h-24 w-24 place-items-center rounded-full bg-white/90 transition duration-500 group-hover:scale-110">
            <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            <Icon name="play" size={30} className="relative ml-1 fill-current" />
          </span>
          <span className="eyebrow absolute bottom-6 left-6 text-white">Tour pelos ambientes · 1:26</span>
        </button>
      )}
    </div>
  )
}
