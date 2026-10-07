import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { fullAddress, site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'

const title = 'Política de privacidade'
const description = `Como o ${site.name} coleta, usa e protege seus dados pessoais, quais cookies usa e como exercer seus direitos pela LGPD.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/politica-de-privacidade' })

const { legal, contact } = site
const controller = legal.companyName ?? site.name
const updatedAt = new Date(`${legal.policyUpdatedAt}T12:00:00-03:00`).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

// Classes dos blocos de texto da política
const p = 'text-ink-950/80 mt-4 text-lg leading-relaxed'
const ul = 'text-ink-950/80 mt-4 grid list-disc gap-2 pl-6 text-lg leading-relaxed marker:text-primary-500'
const strong = 'text-ink-950 font-bold'

const cookieRows = [
  {
    type: 'Essenciais',
    what: 'Guardam sua escolha sobre cookies e mantêm o site seguro e funcionando.',
    when: 'Sempre ativos',
  },
  {
    type: 'Medição',
    what: 'Estatísticas de acesso, como páginas vistas e origem da visita (ex.: Google Analytics).',
    when: 'Só com consentimento',
  },
  {
    type: 'Marketing',
    what: 'Medem resultados de anúncios e mostram anúncios mais relevantes (ex.: Google Ads, Meta).',
    when: 'Só com consentimento',
  },
  {
    type: 'Mapa (terceiros)',
    what: 'O mapa do Google incorporado na página de contato pode gravar cookies do próprio Google.',
    when: 'Ao abrir a página de contato',
  },
]

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'quem-somos',
    title: 'Quem é responsável pelos seus dados',
    body: (
      <>
        <p className={p}>
          O controlador dos dados pessoais tratados neste site é o <strong className={strong}>{controller}</strong>
          {legal.cnpj ? `, inscrito no CNPJ ${legal.cnpj}` : ''}, com sede na {fullAddress}.
        </p>
        <p className={p}>
          Esta política explica, de forma direta, quais dados coletamos, para quê, por quanto tempo e quais são os seus
          direitos, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018, a “LGPD”).
        </p>
      </>
    ),
  },
  {
    id: 'dados-coletados',
    title: 'Quais dados coletamos',
    body: (
      <ul className={ul}>
        <li>
          <strong className={strong}>Pedido de proposta ou visita:</strong> nome, WhatsApp, e-mail (opcional), tipo de
          evento, data prevista, número de convidados e o que você escrever sobre o evento.
        </li>
        <li>
          <strong className={strong}>Trabalhe conosco:</strong> nome, WhatsApp, e-mail (opcional), bairro ou cidade,
          área de interesse, disponibilidade, experiência e o link do currículo, se você enviar.
        </li>
        <li>
          <strong className={strong}>Contato direto:</strong> as informações que você compartilha ao falar com a gente
          pelo WhatsApp, telefone, e-mail ou redes sociais.
        </li>
        <li>
          <strong className={strong}>Navegação:</strong> dados técnicos como endereço IP, tipo de aparelho, navegador,
          páginas visitadas e origem do acesso, coletados por cookies, conforme a sua escolha (veja{' '}
          <a href="#cookies" className="text-ink-950 font-bold underline underline-offset-4">
            Cookies
          </a>
          ).
        </li>
      </ul>
    ),
  },
  {
    id: 'finalidades',
    title: 'Para que usamos os dados',
    body: (
      <ul className={ul}>
        <li>Responder ao seu contato, consultar a disponibilidade da data e enviar orçamentos e propostas.</li>
        <li>Agendar e confirmar visitas ao espaço.</li>
        <li>Preparar e executar o evento contratado.</li>
        <li>Avaliar candidaturas e entrar em contato sobre vagas.</li>
        <li>Entender como o site é usado e melhorar o conteúdo, a navegação e as campanhas (com consentimento).</li>
        <li>Cumprir obrigações legais e proteger o site contra fraudes e abusos.</li>
      </ul>
    ),
  },
  {
    id: 'bases-legais',
    title: 'Bases legais',
    body: (
      <ul className={ul}>
        <li>
          <strong className={strong}>Consentimento</strong> (art. 7º, I): ao marcar a caixa de autorização dos
          formulários e ao aceitar cookies de medição e marketing. Você pode revogar a qualquer momento.
        </li>
        <li>
          <strong className={strong}>Procedimentos preliminares e execução de contrato</strong> (art. 7º, V): para
          propostas, visitas e a realização do evento.
        </li>
        <li>
          <strong className={strong}>Cumprimento de obrigação legal</strong> (art. 7º, II): por exemplo, guarda de
          registros fiscais e de acesso ao site exigidos por lei.
        </li>
        <li>
          <strong className={strong}>Legítimo interesse</strong> (art. 7º, IX): segurança do site e prevenção de spam,
          sempre respeitando seus direitos.
        </li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <>
        <p className={p}>
          Cookies são pequenos arquivos guardados no seu navegador. Ferramentas de medição e marketing só são ativadas
          depois que você aceita, e você pode mudar a escolha quando quiser pelo link “Preferências de cookies” no
          rodapé ou apagando os cookies no seu navegador.
        </p>
        <div className="border-ink-950/10 mt-6 overflow-x-auto border bg-white">
          <table className="w-full min-w-[520px] text-left">
            <caption className="sr-only">Categorias de cookies usadas no site</caption>
            <thead className="bg-mist">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Categoria
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Para que serve
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Quando é usado
                </th>
              </tr>
            </thead>
            <tbody>
              {cookieRows.map((r) => (
                <tr key={r.type} className="border-ink-950/10 border-t align-top">
                  <th scope="row" className="px-4 py-3 font-bold">
                    {r.type}
                  </th>
                  <td className="text-ink-950/80 px-4 py-3">{r.what}</td>
                  <td className="text-ink-950/80 px-4 py-3 whitespace-nowrap">{r.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'compartilhamento',
    title: 'Com quem compartilhamos',
    body: (
      <>
        <p className={p}>
          <strong className={strong}>Não vendemos seus dados.</strong> Eles podem ser compartilhados apenas com
          fornecedores que nos ajudam a operar, sempre para as finalidades desta política:
        </p>
        <ul className={ul}>
          <li>hospedagem do site e ferramentas de atendimento e gestão de clientes (CRM e automação);</li>
          <li>WhatsApp, quando você escolhe continuar a conversa por lá;</li>
          <li>Google e Meta, para medição e anúncios, somente se você consentir;</li>
          <li>autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
        </ul>
        <p className={p}>
          Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, a transferência segue as
          garantias previstas no art. 33 da LGPD.
        </p>
      </>
    ),
  },
  {
    id: 'retencao',
    title: 'Por quanto tempo guardamos',
    body: (
      <ul className={ul}>
        <li>
          <strong className={strong}>Propostas e contatos:</strong> até 2 anos após o último contato, ou pelo prazo do
          contrato do evento e das obrigações legais e fiscais ligadas a ele.
        </li>
        <li>
          <strong className={strong}>Candidaturas:</strong> até 12 meses no banco de talentos, ou até você pedir a
          exclusão.
        </li>
        <li>
          <strong className={strong}>Cookies:</strong> pelo prazo de cada ferramenta, ou até você apagá-los no
          navegador.
        </li>
      </ul>
    ),
  },
  {
    id: 'seguranca',
    title: 'Como protegemos',
    body: (
      <p className={p}>
        O site usa conexão criptografada (HTTPS), os formulários têm proteção contra robôs e o acesso aos dados é
        restrito às pessoas da equipe que precisam deles para atender você. Nenhum sistema é 100% imune, mas adotamos
        medidas técnicas e administrativas razoáveis para proteger as informações. Em caso de incidente relevante,
        avisaremos os titulares e a Autoridade Nacional de Proteção de Dados (ANPD), como manda a lei.
      </p>
    ),
  },
  {
    id: 'criancas',
    title: 'Dados de crianças',
    body: (
      <p className={p}>
        O site é voltado a adultos que planejam eventos. Não coletamos dados de crianças de propósito. Se você contar no
        formulário o nome ou a idade de uma criança (por exemplo, em um aniversário), essa informação é usada apenas
        para preparar o evento, com o consentimento do responsável e no melhor interesse da criança (art. 14 da LGPD).
      </p>
    ),
  },
  {
    id: 'direitos',
    title: 'Seus direitos',
    body: (
      <>
        <p className={p}>Pelo art. 18 da LGPD, você pode, a qualquer momento e sem custo:</p>
        <ul className={ul}>
          <li>confirmar se tratamos seus dados e ter acesso a eles;</li>
          <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>pedir anonimização, bloqueio ou exclusão de dados desnecessários ou tratados em desacordo com a lei;</li>
          <li>pedir a portabilidade dos dados a outro fornecedor;</li>
          <li>saber com quem compartilhamos seus dados;</li>
          <li>revogar o consentimento e pedir a exclusão dos dados tratados com base nele;</li>
          <li>apresentar reclamação à ANPD.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'contato',
    title: 'Como falar com a gente sobre privacidade',
    body: (
      <>
        <p className={p}>
          Para exercer seus direitos ou tirar dúvidas, fale com o nosso canal de privacidade (encarregado de dados) pelo
          e-mail{' '}
          <a href={`mailto:${legal.privacyEmail}`} className="text-ink-950 font-bold underline underline-offset-4">
            {legal.privacyEmail}
          </a>{' '}
          ou pelo WhatsApp {contact.whatsapp.display}. Respondemos em até 15 dias.
        </p>
        <p className={p}>
          Esta política pode ser atualizada para refletir mudanças no site ou na lei. A data da última revisão fica
          sempre no topo desta página. Veja também a nossa página de{' '}
          <Link href="/contato" className="text-ink-950 font-bold underline underline-offset-4">
            contato
          </Link>
          .
        </p>
      </>
    ),
  },
]

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd
        data={{
          ...webPageSchema({ path: '/politica-de-privacidade', name: title, description }),
          dateModified: legal.policyUpdatedAt,
        }}
      />
      <PageHero
        crumb={{ label: 'Política de privacidade', href: '/politica-de-privacidade' }}
        size="short"
        title="Política de privacidade"
        description={`Como o ${site.name} trata os dados pessoais enviados pelo site, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).`}
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <nav aria-label="Nesta página" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-primary-700">Nesta página</p>
            <ol className="mt-4 grid gap-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-ink-950/75 hover:bg-mist hover:text-ink-950 flex gap-2 px-3 py-2 text-sm transition"
                  >
                    <span className="text-primary-700">{String(i + 1).padStart(2, '0')}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="bg-primary-100 text-ink-950 inline-flex px-4 py-2 text-sm font-medium">
              Última atualização: <time dateTime={legal.policyUpdatedAt}>&nbsp;{updatedAt}</time>
            </p>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`} className="mt-12 scroll-mt-28">
                <h2 id={`${s.id}-titulo`} className="text-2xl md:text-3xl">
                  {i + 1}. {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
