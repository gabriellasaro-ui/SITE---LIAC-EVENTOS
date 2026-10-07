'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { submitCareer, type CareerState } from '@/app/actions/career'
import { careerAreas, careerAvailability } from '@/content/form'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Field, Honeypot, inputClass } from './Field'
import { cn } from '@/lib/cn'

const initialState: CareerState = { status: 'idle', message: '' }

export function CareerForm() {
  const [state, formAction, pending] = useActionState(submitCareer, initialState)
  const v = state.values ?? {}
  const err = state.errors ?? {}
  const a11y = (field: keyof NonNullable<CareerState['errors']>) =>
    err[field] ? { 'aria-invalid': true, 'aria-describedby': `${field}-erro` } : {}

  if (state.status === 'success' || state.status === 'whatsapp') {
    return (
      <div role="status" className="flex flex-col items-start self-start bg-white p-8 md:p-12">
        <span className="bg-primary-400 text-ink-950 grid h-16 w-16 place-items-center">
          <Icon name={state.status === 'success' ? 'check' : 'whatsapp'} size={30} />
        </span>
        <h3 className="mt-6 text-3xl">{state.status === 'success' ? 'Candidatura enviada!' : 'Quase lá!'}</h3>
        <p className="text-ink-950/70 mt-3 text-lg leading-relaxed">{state.message}</p>
        {state.whatsappUrl && (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('accent', 'lg', 'mt-8')}
          >
            <Icon name="whatsapp" size={20} /> Enviar pelo WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="relative bg-white p-7 md:p-12">
      <p className="eyebrow text-primary-700">Banco de talentos</p>
      <h2 className="mt-3 text-3xl md:text-4xl">Cadastre seu currículo</h2>
      <p className="text-ink-950/60 mt-2">Preencha em poucos minutos. Seus dados ficam no nosso banco de talentos.</p>

      {state.status === 'error' && (
        <p role="alert" className="bg-primary-100 text-primary-700 mt-6 px-4 py-3 font-semibold">
          {state.message}
        </p>
      )}

      <Honeypot />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="nome" label="Nome completo" error={err.nome}>
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
        <Field id="cidade" label="Bairro / cidade" optional>
          <input
            id="cidade"
            name="cidade"
            autoComplete="address-level2"
            defaultValue={v.cidade}
            placeholder="Ex.: São Luiz, BH"
            className={inputClass}
          />
        </Field>
        <Field id="area" label="Área de interesse" error={err.area}>
          <select
            id="area"
            name="area"
            required
            defaultValue={v.area ?? ''}
            className={cn(inputClass, 'appearance-none')}
            {...a11y('area')}
          >
            <option value="" disabled>
              Selecione
            </option>
            {careerAreas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field id="disponibilidade" label="Disponibilidade" error={err.disponibilidade}>
          <select
            id="disponibilidade"
            name="disponibilidade"
            required
            defaultValue={v.disponibilidade ?? ''}
            className={cn(inputClass, 'appearance-none')}
            {...a11y('disponibilidade')}
          >
            <option value="" disabled>
              Selecione
            </option>
            {careerAvailability.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field id="experiencia" label="Conte sobre sua experiência" optional full>
          <textarea
            id="experiencia"
            name="experiencia"
            rows={4}
            defaultValue={v.experiencia}
            placeholder="Onde já trabalhou, com o quê, por quanto tempo… Primeira experiência também vale!"
            className={cn(inputClass, 'h-auto resize-y py-3')}
          />
        </Field>
        <Field id="curriculo" label="Link do currículo ou LinkedIn" optional full error={err.curriculo}>
          <input
            id="curriculo"
            name="curriculo"
            type="url"
            inputMode="url"
            defaultValue={v.curriculo}
            placeholder="https://drive.google.com/…"
            className={inputClass}
            {...a11y('curriculo')}
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
              Autorizo o Liac Eventos a guardar meus dados no banco de talentos e a entrar em contato sobre vagas,
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
        {pending ? 'Enviando…' : 'Enviar candidatura'}
        {!pending && <Icon name="send" size={18} />}
      </button>
    </form>
  )
}
