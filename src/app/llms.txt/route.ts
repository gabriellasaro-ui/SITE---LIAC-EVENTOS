import { absoluteUrl, directionsUrl, facts, fullAddress, site } from '@/config/site'
import { routes } from '@/config/routes'
import { allFaqs } from '@/content/faq'
import { differentials, layouts, services, spaces } from '@/content/venue'

export const dynamic = 'force-static'

/**
 * /llms.txt: resumo factual em Markdown para modelos de linguagem (GEO).
 * Gerado a partir do mesmo conteúdo do site, então nunca fica desatualizado.
 */
export function GET() {
  const r = site.rating
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} é um espaço para eventos e casamentos ${site.address.landmark}, em ${site.address.city} (${site.address.stateCode}). Recebe casamentos, eventos sociais e corporativos de ${facts.capacity.min} a ${facts.capacity.max} convidados, com jardim de palmeiras para cerimônia, salão de alto padrão 100% climatizado, pub, spa/sala dos anfitriões, área kids e boate. Faz parte do Grupo Let’s Go Festas.`,
    '',
    '## Fatos principais',
    '',
    `- Nome: ${site.name}`,
    `- Segmento: ${site.category}`,
    `- Capacidade: ${facts.capacity.min} a ${facts.capacity.max} convidados`,
    `- Exclusividade: ${facts.eventsPerDay} evento por dia`,
    `- Endereço: ${fullAddress}`,
    `- Região: ${site.address.region}, ${site.address.landmark}`,
    `- WhatsApp: ${site.contact.whatsapp.display}`,
    `- E-mail: ${site.contact.email}`,
    ...(site.openingHours ?? []).map((h) => `- Atendimento (${h.days}): ${h.opens} às ${h.closes}`),
    ...(r
      ? [
          `- Avaliação: nota ${r.value.toLocaleString('pt-BR')} de 5 no ${r.platform}, com ${r.count} avaliações; mais de ${facts.couples} casais contrataram o espaço (perfil público)`,
        ]
      : []),
    `- Como chegar: ${directionsUrl}`,
    `- Solicitar proposta ou agendar visita: ${absoluteUrl('/contato')}`,
    `- Site: ${site.url}`,
    ...site.social.map((s) => `- ${s.label}: ${s.href}`),
    '',
    '## Diferenciais',
    '',
    ...differentials.map((d) => `- ${d.title}: ${d.text}`),
    '',
    '## Ambientes',
    '',
    ...spaces.map((s) => `- ${s.title}: ${s.text}`),
    '',
    '## Formatos de evento',
    '',
    ...layouts.map((l) => `- ${l.name}: ${l.text}`),
    '',
    '## Serviços',
    '',
    ...services.map((s) => `- ${s.title}: ${s.text}`),
    '',
    '## Como contratar',
    '',
    `1. Envie o tipo de evento, a data prevista e o número aproximado de convidados pelo formulário (${absoluteUrl('/contato')}) ou pelo WhatsApp ${site.contact.whatsapp.display}.`,
    '2. A equipe confere a disponibilidade e apresenta configurações e proposta comercial.',
    '3. Agende uma visita para conhecer o jardim, o salão e os ambientes de apoio pessoalmente.',
    '',
    '## Páginas',
    '',
    ...routes.map((rt) => `- [${rt.title}](${absoluteUrl(rt.path)}): ${rt.summary}`),
    '',
    '## Perguntas frequentes',
    '',
    ...allFaqs.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    `_Atualizado em ${new Date().toISOString().slice(0, 10)}._`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
