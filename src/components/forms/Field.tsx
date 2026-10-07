import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Estilo base dos campos dos formulários (orçamento, trabalhe conosco). */
export const inputClass =
  'h-13 w-full border border-ink-950/20 bg-paper px-4 text-base transition outline-none placeholder:text-ink-950/40 focus:border-primary-500 focus:bg-white aria-[invalid=true]:border-primary-600'

/** Rótulo + campo + mensagem de erro (ligada ao campo via `${id}-erro`). */
export function Field({
  id,
  label,
  error,
  optional,
  children,
  full,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
  full?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-2', full && 'sm:col-span-2')}>
      <label htmlFor={id} className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
        {label} {optional && <span className="text-ink-950/60 font-normal">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="text-primary-700 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  )
}

/** Campo invisível que só robôs preenchem. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="empresa">Empresa</label>
      <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
