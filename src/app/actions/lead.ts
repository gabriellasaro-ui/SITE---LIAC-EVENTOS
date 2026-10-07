'use server'

import { site, whatsappUrl } from '@/config/site'
import { eventTypes } from '@/content/form'

type Field = 'nome' | 'whatsapp' | 'email' | 'tipo' | 'data' | 'convidados' | 'mensagem' | 'consentimento'

export type LeadState = {
  status: 'idle' | 'success' | 'whatsapp' | 'error'
  message: string
  errors?: Partial<Record<Field, string>>
  values?: Partial<Record<Field, string>>
  whatsappUrl?: string
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: campo invisível que só robôs preenchem
  if (str(formData, 'empresa')) {
    return { status: 'success', message: 'Recebemos seu pedido! Em breve a equipe entra em contato.' }
  }

  const values = {
    nome: str(formData, 'nome').slice(0, 120),
    whatsapp: str(formData, 'whatsapp').slice(0, 30),
    email: str(formData, 'email').slice(0, 160),
    tipo: str(formData, 'tipo'),
    data: str(formData, 'data'),
    convidados: str(formData, 'convidados'),
    mensagem: str(formData, 'mensagem').slice(0, 2000),
    consentimento: formData.get('consentimento') ? 'on' : '',
  }

  const errors: LeadState['errors'] = {}
  const phoneDigits = values.whatsapp.replace(/\D/g, '')

  if (values.nome.length < 2) errors.nome = 'Informe seu nome.'
  if (phoneDigits.length < 10 || phoneDigits.length > 13) errors.whatsapp = 'Informe um WhatsApp válido com DDD.'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = 'E-mail inválido.'
  if (!eventTypes.includes(values.tipo as (typeof eventTypes)[number])) errors.tipo = 'Escolha o tipo de evento.'
  if (values.data) {
    // "sv-SE" formata como AAAA-MM-DD; fuso de Brasília para não rejeitar "hoje" à noite
    const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }).format(new Date())
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.data) || values.data < today) errors.data = 'Escolha uma data futura.'
  }
  if (values.convidados) {
    const n = Number(values.convidados)
    if (!Number.isInteger(n) || n < 1 || n > 2000) errors.convidados = 'Número de convidados inválido.'
  }
  if (!values.consentimento) errors.consentimento = 'Precisamos do seu consentimento para entrar em contato.'

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Confira os campos destacados.', errors, values }
  }

  const dateBr = values.data ? values.data.split('-').reverse().join('/') : 'a definir'
  const summary = [
    `Olá! Sou ${values.nome} e quero uma proposta do ${site.name}.`,
    `• Tipo: ${values.tipo}`,
    `• Data prevista: ${dateBr}`,
    values.convidados && `• Convidados: ${values.convidados}`,
    values.mensagem && `• Sobre o evento: ${values.mensagem}`,
  ]
    .filter(Boolean)
    .join('\n')
  const waUrl = whatsappUrl(summary)

  const webhook = process.env.LEAD_WEBHOOK_URL
  if (!webhook) {
    return {
      status: 'whatsapp',
      message: 'Falta só um passo: envie seu pedido pelo WhatsApp com a mensagem já preenchida.',
      whatsappUrl: waUrl,
    }
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origem: 'site',
        marca: site.name,
        ...values,
        whatsapp: phoneDigits,
        criadoEm: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`)
  } catch (err) {
    console.error('[lead] falha ao enviar para o webhook:', err)
    return {
      status: 'whatsapp',
      message: 'Não conseguimos registrar seu pedido agora. Envie pelo WhatsApp, a mensagem já está pronta.',
      whatsappUrl: waUrl,
    }
  }

  return {
    status: 'success',
    message: `Recebemos seu pedido, ${values.nome.split(' ')[0]}! A equipe do ${site.name} entra em contato em breve.`,
    whatsappUrl: waUrl,
  }
}
