import type { FaqItem } from '@/content/faq'
import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'

/**
 * Acordeão com <details>/<summary> nativos: funciona sem JavaScript
 * e mantém todas as respostas no HTML (indexáveis por buscadores e IAs).
 * A abertura é animada via CSS (`::details-content`) onde o navegador suporta.
 */
export function FaqList({ items, openFirst }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <Stagger className="border-ink-950/15 border-t" stagger={0.06}>
      {items.map((item, i) => (
        <StaggerItem key={item.question}>
          <details name="faq" open={openFirst && i === 0} className="group border-ink-950/15 border-b">
            <summary className="hover:text-primary-700 flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-xl leading-snug font-normal md:text-2xl">{item.question}</h3>
              <span className="border-ink-950/25 group-open:bg-primary-400 group-open:border-primary-400 grid h-11 w-11 shrink-0 place-items-center border transition duration-500 group-open:rotate-[135deg]">
                <Icon name="plus" size={18} strokeWidth={1.8} />
              </span>
            </summary>
            <p className="text-ink-950/70 max-w-3xl pb-7 leading-relaxed">{item.answer}</p>
          </details>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
