import type { Metadata, Viewport } from 'next'
// Antonio ≈ Heading Compressed Pro (títulos) · Montserrat ≈ Anurati (rótulos) e textos
import { Antonio, Montserrat } from 'next/font/google'
import Script from 'next/script'
import { site } from '@/config/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { ScrollProgress } from '@/components/motion/Effects'
import { JsonLd } from '@/components/seo/JsonLd'
import { businessSchema, websiteSchema } from '@/lib/schema'
import { consentDefaultScript } from '@/lib/consent'
import './globals.css'

// Títulos esperam a fonte (block): a reserva é bem mais larga que a Antonio e mudaria a quebra de linha (CLS)
const display = Antonio({ subsets: ['latin'], variable: '--font-antonio', display: 'block' })
const sans = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })

const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  category: site.category,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: '/',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  other: {
    'geo.region': `BR-${site.address.stateCode}`,
    'geo.placename': `${site.address.city}, ${site.address.region}`,
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
}

export const viewport: Viewport = {
  themeColor: '#2b2b2b',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Failsafe das animações: sem JS ou sem hidratação em 2,5s, tudo aparece */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){var d=document.documentElement;if(!d.dataset.hydrated)d.classList.add('motion-fallback')},2500)",
          }}
        />
        {/* Consent Mode v2: tudo negado até a pessoa escolher (precisa vir antes do GTM) */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}'}</style>
        </noscript>
      </head>
      <body className="min-h-dvh overflow-x-clip">
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  )
}
