'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { CONSENT_KEY, CONSENT_OPEN_EVENT, consentModeUpdate, type ConsentChoice } from '@/lib/consent'
import { cn } from '@/lib/cn'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function readChoice(): ConsentChoice | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null')
  } catch {
    return null
  }
}

/** Aviso de cookies (LGPD): aceitar, recusar ou escolher por categoria. Reabre pelo link do rodapé. */
export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    // Abre um pouco depois do carregamento (não disputa o 1º paint com o topo da página)
    const timer = readChoice() ? undefined : window.setTimeout(() => setOpen(true), 900)
    const reopen = () => {
      const saved = readChoice()
      if (saved) {
        setAnalytics(saved.analytics)
        setMarketing(saved.marketing)
      }
      setCustom(true)
      setOpen(true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
    }
  }, [])

  function save(choice: Pick<ConsentChoice, 'analytics' | 'marketing'>) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...choice, at: new Date().toISOString() }))
    } catch {
      // navegação anônima/bloqueio de armazenamento: vale só para esta visita
    }
    window.gtag?.('consent', 'update', consentModeUpdate(choice))
    window.dataLayer?.push({ event: 'consent_update', ...choice })
    setAnalytics(choice.analytics)
    setMarketing(choice.marketing)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      className="animate-rise border-accent-400 text-ink-950 fixed inset-x-3 bottom-3 z-[60] rounded-[1.75rem] border-4 bg-white p-6 shadow-[0_8px_0_var(--color-accent-700),0_24px_60px_-20px_rgb(28_25_23/0.5)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <p id="cookies-titulo" className="font-display text-2xl">
        A gente usa cookies
      </p>
      <p id="cookies-texto" className="text-ink-950/75 mt-2 leading-relaxed">
        Usamos cookies para medir as visitas e melhorar nossos anúncios. Os essenciais ficam sempre ativos; os demais só
        com a sua permissão. Saiba mais na{' '}
        <Link href="/politica-de-privacidade#cookies" className="font-bold underline underline-offset-4">
          política de privacidade
        </Link>
        .
      </p>

      {custom && (
        <fieldset className="mt-5 grid gap-3">
          <legend className="sr-only">Categorias de cookies</legend>
          <label className="bg-mist flex items-start gap-3 rounded-2xl p-3">
            <input type="checkbox" checked disabled className="accent-accent-600 mt-1 h-5 w-5 shrink-0" />
            <span>
              <span className="block font-bold">Essenciais</span>
              <span className="text-ink-950/70 text-sm">Necessários para o site funcionar. Sempre ativos.</span>
            </span>
          </label>
          <label className="bg-mist flex cursor-pointer items-start gap-3 rounded-2xl p-3">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-accent-600 mt-1 h-5 w-5 shrink-0"
            />
            <span>
              <span className="block font-bold">Medição</span>
              <span className="text-ink-950/70 text-sm">Estatísticas de acesso (ex.: Google Analytics).</span>
            </span>
          </label>
          <label className="bg-mist flex cursor-pointer items-start gap-3 rounded-2xl p-3">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="accent-accent-600 mt-1 h-5 w-5 shrink-0"
            />
            <span>
              <span className="block font-bold">Marketing</span>
              <span className="text-ink-950/70 text-sm">Anúncios mais relevantes (ex.: Google Ads, Meta).</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className={cn('mt-5 flex flex-wrap items-center gap-3')}>
        {custom ? (
          <button type="button" onClick={() => save({ analytics, marketing })} className={buttonClasses('primary')}>
            Salvar escolhas
          </button>
        ) : (
          <button
            type="button"
            onClick={() => save({ analytics: true, marketing: true })}
            className={buttonClasses('primary')}
          >
            Aceitar todos
          </button>
        )}
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className={buttonClasses('outline-dark')}
        >
          Só essenciais
        </button>
        {!custom && (
          <button
            type="button"
            onClick={() => setCustom(true)}
            className="text-ink-950 font-bold underline underline-offset-4"
          >
            Personalizar
          </button>
        )}
      </div>
    </div>
  )
}

/** Link do rodapé que reabre o aviso de cookies. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={cn('underline-offset-4 hover:underline', className)}
    >
      Preferências de cookies
    </button>
  )
}
