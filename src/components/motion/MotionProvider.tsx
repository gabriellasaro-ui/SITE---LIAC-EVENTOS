'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import { useEffect, type ReactNode } from 'react'

// Os recursos de animação chegam num chunk separado, depois do JS inicial (melhora TBT/LCP)
const loadFeatures = () => import('./features').then((mod) => mod.default)

/** Respeita "reduzir movimento" do sistema e avisa o failsafe do <head> que o JS hidratou. */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.hydrated = '1'
    document.documentElement.classList.remove('motion-fallback')
  }, [])
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
