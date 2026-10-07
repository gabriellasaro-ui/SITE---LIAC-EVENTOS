import { ButtonLink } from '@/components/ui/Button'
import { GeoCluster } from '@/components/ui/GeoShape'

export default function NotFound() {
  return (
    <section className="bg-ink-900 relative flex min-h-svh items-center overflow-hidden pt-[92px] text-white">
      <div aria-hidden="true" className="bg-pattern absolute inset-0 opacity-[0.06]" />
      <GeoCluster className="absolute right-[6%] bottom-[10%] h-64 w-64 opacity-60 max-md:hidden" />
      <div className="container-site relative py-20">
        <p className="font-display text-primary-300 text-[clamp(7rem,22vw,15rem)] leading-none font-light">404</p>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02]">
          Essa página não está no nosso roteiro.
        </h1>
        <p className="mt-5 max-w-xl text-white/75">
          O endereço pode ter mudado. Que tal voltar ao início ou conhecer os ambientes do Liac?
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="primary" size="lg" icon="arrowRight">
            Voltar para a home
          </ButtonLink>
          <ButtonLink href="/nosso-espaco" variant="outline-light" size="lg">
            Nosso espaço
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
