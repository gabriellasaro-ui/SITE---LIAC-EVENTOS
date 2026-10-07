'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { submitLead, type LeadState } from '@/app/actions/lead'
import { eventTypeBySlug, eventTypes } from '@/content/form'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Field, Honeypot, inputClass } from './Field'
import { cn } from '@/lib/cn'

const initialState: LeadState = { status: 'idle', message: '' }

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState)
  const searchParams = useSearchParams()
  const presetType = eventTypeBySlug[searchParams.get('evento') ?? ''] ?? ''
  const v = state.values ?? {}
  const err = state.errors ?? {}
  const a11y = (field: keyof NonNullable<LeadState['errors']>) =>
    err[field] ? { 'aria-invalid': true, 'aria-describedby': `${field}-erro` } : {}

  if (state.status === 'success' || state.status === 'whatsapp') {
    return (
      <div role="status" className="flex flex-col items-start self-start bg-white p-8 md:p-12">
        <span className="bg-primary-400 text-ink-950 grid h-16 w-16 place-items-center">
          <Icon name={state.status === 'success' ? 'check' : 'whatsapp'} size={30} />
        </span>
        <h3 className="mt-6 text-2xl font-bold">{state.status === 'success' ? 'Pedido enviado!' : 'Quase lá!'}</h3>
        <p className="text-ink-950/70 mt-3 text-lg leading-relaxed">{state.message}</p>
        {state.whatsappUrl && (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses(state.status === 'whatsapp' ? 'accent' : 'outline-dark', 'lg', 'mt-8')}
          >
            <Icon name="whatsapp" size={20} />{' '}
            {state.status === 'whatsapp' ? 'Enviar pelo WhatsApp' : 'Continuar no WhatsApp'}
          </a>
        )}
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="relative bg-white p-7 md:p-12">
      <p className="eyebrow text-primary-700">Solicite uma proposta</p>
      <h2 className="mt-3 text-3xl md:text-4xl">Conte como você imagina o seu evento</h2>
      <p className="text-ink-950/60 mt-2">
        Leva menos de 1 minuto. A equipe responde pelo WhatsApp com disponibilidade e possibilidades.
      </p>

      {state.status === 'error' && (
        <p role="alert" className="bg-primary-100 text-primary-700 mt-6 px-4 py-3 font-semibold">
          {state.message}
        </p>
      )}

      <Honeypot />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="nome" label="Seu nome" error={err.nome}>
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            required
            defaultValue={v.nome}
            placeholder="Seu nome"
            className={inputClass}
            {...a11y('nome')}
          />
        </Field>
        <Field id="whatsapp" label="WhatsApp" error={err.whatsapp}>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            defaultValue={v.whatsapp}
            placeholder="(31) 99999-9999"
            className={inputClass}
            {...a11y('whatsapp')}
          />
        </Field>
        <Field id="email" label="E-mail" optional error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v.email}
            placeholder="voce@email.com"
            className={inputClass}
            {...a11y('email')}
          />
        </Field>
        <Field id="tipo" label="Tipo de evento" error={err.tipo}>
          <select
            id="tipo"
            name="tipo"
            required
            defaultValue={v.tipo ?? presetType}
            className={cn(inputClass, 'appearance-none')}
            {...a11y('tipo')}
          >
            <option value="" disabled>
              Selecione
            </option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="data" label="Data prevista" optional error={err.data}>
          <input id="data" name="data" type="date" defaultValue={v.data} className={inputClass} {...a11y('data')} />
        </Field>
        <Field id="convidados" label="Nº de convidados" optional error={err.convidados}>
          <input
            id="convidados"
            name="convidados"
            type="number"
            inputMode="numeric"
            min={1}
            defaultValue={v.convidados}
            placeholder="Ex.: 180"
            className={inputClass}
            {...a11y('convidados')}
          />
        </Field>
        <Field id="mensagem" label="Conte um pouco sobre o seu evento" optional full>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            defaultValue={v.mensagem}
            placeholder="Conte o formato, estilo e o que é indispensável para você."
            className={cn(inputClass, 'h-auto resize-y py-3')}
          />
        </Field>
        <div className="sm:col-span-2">
          <label className="text-ink-950/70 flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="consentimento"
              defaultChecked={v.consentimento === 'on'}
              className="accent-accent-600 mt-0.5 h-5 w-5 shrink-0"
              {...a11y('consentimento')}
            />
            <span>
              Autorizo o Liac Eventos a entrar em contato pelo WhatsApp, telefone ou e-mail para enviar a proposta,
              conforme a{' '}
              <Link href="/politica-de-privacidade" className="text-ink-950 font-bold underline underline-offset-4">
                política de privacidade
              </Link>
              .
            </span>
          </label>
          {err.consentimento && (
            <p id="consentimento-erro" className="text-primary-700 mt-2 text-sm font-semibold">
              {err.consentimento}
            </p>
          )}
        </div>
      </div>

      <button type="submit" disabled={pending} className={buttonClasses('primary', 'lg', 'mt-8 w-full sm:w-auto')}>
        {pending ? 'Enviando…' : 'Quero receber uma proposta'}
        {!pending && <Icon name="send" size={18} />}
      </button>
    </form>
  )
}
