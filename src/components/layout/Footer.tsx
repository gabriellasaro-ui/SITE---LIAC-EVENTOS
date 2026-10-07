import Image from 'next/image'
import Link from 'next/link'
import { fullAddress, site, whatsappUrl } from '@/config/site'
import { Icon } from '@/components/ui/Icon'
import { CookiePreferencesButton } from './CookieConsent'

const columns = [
  {
    title: 'Institucional',
    links: [
      { label: 'Nosso espaço', href: '/nosso-espaco' },
      { label: 'Sobre nós', href: '/sobre' },
      { label: 'Clientes', href: '/clientes' },
      { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    ],
  },
  {
    title: 'Experiência',
    links: [
      { label: 'Serviços', href: '/servicos' },
      { label: 'Galeria', href: '/galeria' },
      { label: 'Perguntas frequentes', href: '/perguntas-frequentes' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  const logo = site.logoOnDark ?? site.logo
  return (
    <footer className="bg-ink-950 relative text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label={`${site.name}: página inicial`} className="inline-block">
            <Image
              src={logo.src}
              unoptimized
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">
            Espaço para casamentos, festas e eventos corporativos na Pampulha, em Belo Horizonte, com estrutura de alto
            padrão para receber momentos que merecem ser lembrados.
          </p>
          <ul className="mt-6 flex gap-3">
            {site.social
              .filter((s) => s.label === 'Instagram')
              .map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} do ${site.name}`}
                    className="hover:bg-primary-400 hover:border-primary-400 hover:text-ink-950 grid h-11 w-11 place-items-center border border-white/30 transition"
                  >
                    <Icon name="instagram" size={18} />
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow text-primary-300 mb-5 font-sans normal-case">{col.title}</h2>
            <ul className="grid gap-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="not-italic">
          <h2 className="eyebrow text-primary-300 mb-5 font-sans normal-case">Contato</h2>
          <ul className="grid gap-3 text-white/75">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                <Icon name="whatsapp" size={18} className="text-primary-300 mt-0.5 shrink-0" />
                {site.contact.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 break-all hover:text-white">
                <Icon name="mail" size={18} className="text-primary-300 mt-0.5 shrink-0" />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-white"
              >
                <Icon name="mapPin" size={18} className="text-primary-300 mt-0.5 shrink-0" />
                <span>{fullAddress}</span>
              </a>
            </li>
            {site.openingHours?.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Icon name="clock" size={18} className="text-primary-300 mt-0.5 shrink-0" />
                <span>
                  {h.days}: {h.opens.replace(':00', 'h')}–{h.closes.replace(':00', 'h')}
                </span>
              </li>
            ))}
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/60 md:flex-row md:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados. Parte do Grupo Let’s Go Festas.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/politica-de-privacidade" className="underline-offset-4 hover:underline">
              Privacidade
            </Link>
            <CookiePreferencesButton />
            <Link href="/contato" className="underline-offset-4 hover:underline">
              Fale conosco
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
