'use server'

import { site, whatsappUrl } from '@/config/site'
import { careerAreas, careerAvailability } from '@/content/form'

type Field =
  'nome' | 'whatsapp' | 'email' | 'cidade' | 'area' | 'disponibilidade' | 'experiencia' | 'curriculo' | 'consentimento'

export type CareerState = {
  status: 'idle' | 'success' | 'whatsapp' | 'error'
  message: string
  errors?: Partial<Record<Field, string>>
  values?: Partial<Record<Field, string>>
  whatsappUrl?: string
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

export async function submitCareer(_prev: CareerState, formData: FormData): Promise<CareerState> {
  // Honeypot: campo invisível que só robôs preenchem
  if (str(formData, 'empresa')) {
    return { status: 'success', message: 'Recebemos sua candidatura! Obrigado pelo interesse.' }
  }

  const values = {
    nome: str(formData, 'nome').slice(0, 120),
    whatsapp: str(formData, 'whatsapp').slice(0, 30),
    email: str(formData, 'email').slice(0, 160),
    cidade: str(formData, 'cidade').slice(0, 120),
    area: str(formData, 'area'),
    disponibilidade: str(formData, 'disponibilidade'),
    experiencia: str(formData, 'experiencia').slice(0, 2000),
    curriculo: str(formData, 'curriculo').slice(0, 500),
    consentimento: formData.get('consentimento') ? 'on' : '',
  }

  const errors: CareerState['errors'] = {}
  const phoneDigits = values.whatsapp.replace(/\D/g, '')

  if (values.nome.length < 2) errors.nome = 'Informe seu nome completo.'
  if (phoneDigits.length < 10 || phoneDigits.length > 13) errors.whatsapp = 'Informe um WhatsApp válido com DDD.'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = 'E-mail inválido.'
  if (!careerAreas.includes(values.area as (typeof careerAreas)[number])) errors.area = 'Escolha a área de interesse.'
  if (!careerAvailability.includes(values.disponibilidade as (typeof careerAvailability)[number]))
    errors.disponibilidade = 'Escolha sua disponibilidade.'
  if (values.curriculo && !/^https?:\/\/\S+\.\S+/.test(values.curriculo))
    errors.curriculo = 'Cole um link válido (começando com https://).'
  if (!values.consentimento) errors.consentimento = 'Precisamos do seu consentimento para guardar seus dados.'

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Confira os campos destacados.', errors, values }
  }

  const summary = [
    `Olá! Sou ${values.nome} e quero trabalhar no ${site.name}.`,
    `• Área: ${values.area}`,
    `• Disponibilidade: ${values.disponibilidade}`,
    values.cidade && `• Bairro/cidade: ${values.cidade}`,
    values.experiencia && `• Experiência: ${values.experiencia}`,
    values.curriculo && `• Currículo: ${values.curriculo}`,
  ]
    .filter(Boolean)
    .join('\n')
  const waUrl = whatsappUrl(summary)

  const webhook = process.env.CAREERS_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL
  if (!webhook) {
    return {
      status: 'whatsapp',
      message: 'Falta só um passo: envie sua candidatura pelo WhatsApp com a mensagem já preenchida.',
      whatsappUrl: waUrl,
    }
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origem: 'site',
        tipo: 'trabalhe-conosco',
        marca: site.name,
        ...values,
        whatsapp: phoneDigits,
        criadoEm: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`)
  } catch (err) {
    console.error('[trabalhe-conosco] falha ao enviar para o webhook:', err)
    return {
      status: 'whatsapp',
      message: 'Não conseguimos registrar sua candidatura agora. Envie pelo WhatsApp, a mensagem já está pronta.',
      whatsappUrl: waUrl,
    }
  }

  return {
    status: 'success',
    message: `Recebemos sua candidatura, ${values.nome.split(' ')[0]}! Quando surgir uma vaga com o seu perfil, a equipe do ${site.name} entra em contato.`,
  }
}
