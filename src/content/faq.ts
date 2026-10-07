export type FaqItem = { question: string; answer: string; featured?: boolean }
export type FaqGroup = { title: string; items: FaqItem[] }

/**
 * Perguntas do wireframe aprovado (home + página de FAQ), no formato "answer-first":
 * a primeira frase responde direto (é o trecho que buscadores e IAs costumam citar).
 */
export const faqGroups: FaqGroup[] = [
  {
    title: 'Estrutura',
    items: [
      {
        question: 'Qual é a capacidade do Liac Eventos?',
        answer:
          'O Liac recebe eventos de 50 a 300 convidados. A capacidade ideal varia conforme o formato da celebração, a disposição do salão e as experiências previstas para o evento.',
        featured: true,
      },
      {
        question: 'O espaço possui estacionamento?',
        answer:
          'Sim. O Liac Eventos conta com estacionamento entre as conveniências oferecidas para tornar a chegada dos convidados mais prática.',
        featured: true,
      },
      {
        question: 'O espaço é acessível?',
        answer:
          'Sim. O Liac informa acessibilidade em todo o espaço, contribuindo para uma experiência mais confortável e inclusiva.',
      },
      {
        question: 'É possível realizar cerimônia e festa no mesmo local?',
        answer:
          'Sim. O Liac reúne jardim, salão e ambientes complementares que permitem organizar diferentes momentos da celebração no mesmo endereço.',
        featured: true,
      },
    ],
  },
  {
    title: 'Fornecedores',
    items: [
      {
        question: 'É possível levar fornecedores externos?',
        answer:
          'A composição de fornecedores depende do formato contratado. Nossa equipe apresenta as possibilidades e orienta a melhor configuração para o seu evento.',
        featured: true,
      },
      {
        question: 'Posso contratar meu próprio buffet?',
        answer:
          'As condições para contratação de buffet e fornecedores variam conforme a proposta do evento. Fale com nossa equipe para entender as possibilidades disponíveis para a sua data.',
      },
    ],
  },
  {
    title: 'Reserva e visita',
    items: [
      {
        question: 'Como agendo uma visita?',
        answer:
          'Você pode solicitar uma visita pelo formulário ou pelo WhatsApp. Nossa equipe entra em contato para entender seu evento e encontrar o melhor horário para conhecer o espaço.',
        featured: true,
      },
      {
        question: 'Como funciona a reserva da data?',
        answer:
          'O processo começa com o contato e, sempre que possível, uma visita ao espaço. Depois de entendermos seu evento, nossa equipe apresenta disponibilidade, configuração e proposta comercial.',
      },
      {
        question: 'Qual antecedência é recomendada?',
        answer:
          'Quanto antes você iniciar a busca, mais opções de datas e planejamento terá. Entre em contato para consultar a disponibilidade do Liac na data desejada.',
      },
    ],
  },
]

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items)
export const featuredFaqs: FaqItem[] = allFaqs.filter((f) => f.featured)
