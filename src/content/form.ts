/** Opções do campo "tipo de evento" do formulário (wireframe). */
export const eventTypes = ['Casamento', 'Corporativo', 'Aniversário', 'Formatura', '15 anos', 'Outro'] as const

/** Mapeia o ?evento=slug vindo dos cards de serviço para a opção do formulário. */
export const eventTypeBySlug: Record<string, (typeof eventTypes)[number]> = {
  casamento: 'Casamento',
  corporativo: 'Corporativo',
  formatura: 'Formatura',
  aniversario: 'Aniversário',
}

/** Áreas do formulário "Trabalhe conosco". */
export const careerAreas = [
  'Garçom / Garçonete',
  'Cozinha',
  'Bar / Bartender',
  'Recepção',
  'Limpeza',
  'Segurança',
  'Produção de eventos',
  'Atendimento comercial',
  'Outra área',
] as const

/** Disponibilidade de horário (eventos acontecem principalmente aos fins de semana e à noite). */
export const careerAvailability = [
  'Fins de semana',
  'Dias de semana',
  'Qualquer dia',
  'Só para eventos pontuais (freelancer)',
] as const
