import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { UNREACHABLE_ERROR } from '../lib/subscribe'
import type { Subscribe, SubscribeResult } from '../lib/subscribe'
import { Button } from './Button'
import { Eyebrow } from './Eyebrow'

type State = { status: 'idle' | 'sending' } | { status: 'error' | 'success'; message: string }

interface SubscribeFormProps {
  id?: string
  title: string
  description: string
  nextIssueDate: string
  onSubscribe: Subscribe
}

export function SubscribeForm({ id, title, description, nextIssueDate, onSubscribe }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [state, setState] = useState<State>({ status: 'idle' })
  const errorId = useId()
  const successRef = useRef<HTMLDivElement>(null)

  // O form some no sucesso; levar o foco à caixa faz o leitor de tela anunciar o resultado.
  useEffect(() => {
    if (state.status === 'success') successRef.current?.focus()
  }, [state.status])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'sending' })
    let result: SubscribeResult
    try {
      result = await onSubscribe(email.trim(), honeypot)
    } catch {
      result = { ok: false, message: UNREACHABLE_ERROR }
    }
    if (result.ok) setEmail('')
    setState({ status: result.ok ? 'success' : 'error', message: result.message })
  }

  const hasError = state.status === 'error'

  return (
    <div id={id} className="flex flex-col justify-center bg-ink px-6 py-14 text-paper">
      <Eyebrow className="mb-5">Free · Fortnightly · No ads</Eyebrow>
      <h3 className="mb-4 font-display text-display-panel font-bold">{title}</h3>
      <p className="mb-8 text-body-sm text-paper-60">{description}</p>

      {state.status === 'success' ? (
        <div ref={successRef} tabIndex={-1} role="status" className="border-2 border-hot p-5 outline-none">
          <p className="font-display text-title-card font-bold">{state.message}</p>
          <p className="mt-1 font-mono text-body-sm text-paper-60">
            Check your inbox to confirm. Next issue arrives {nextIssueDate}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={state.status === 'sending'} className="flex flex-col gap-3">
          <input
            type="email"
            required
            maxLength={254}
            aria-label="Email address"
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (hasError) setState({ status: 'idle' })
            }}
            className="border-2 border-paper-30 bg-transparent px-4 py-3 font-mono text-input text-paper outline-none transition-colors placeholder:text-paper-30 focus:border-hot aria-[invalid=true]:border-hot"
          />
          {/* Honeypot: fora da tela, do Tab e do leitor de tela; só bot preenche. */}
          <div aria-hidden="true" className="sr-only">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>
          {hasError && (
            <p id={errorId} role="alert" className="font-mono text-[11px] text-paper">
              <span aria-hidden="true" className="text-hot">
                ×{' '}
              </span>
              {state.message}
            </p>
          )}
          <Button
            type="submit"
            variant="hot"
            disabled={state.status === 'sending'}
            className="disabled:cursor-wait"
          >
            {state.status === 'sending' ? 'Subscribing…' : "Subscribe — It's Free"}
          </Button>
        </form>
      )}

      <p className="mt-4 font-mono text-meta text-paper-30">4,800+ readers · Unsubscribe any time</p>
    </div>
  )
}
