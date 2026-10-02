import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import type { SubscribeResult } from '../lib/subscribe'
import { Button } from './Button'
import { Eyebrow } from './Eyebrow'

type Status = 'idle' | 'sending' | 'error' | 'success'

interface SubscribeFormProps {
  id?: string
  title: string
  description: string
  nextIssueDate: string
  onSubscribe: (email: string) => Promise<SubscribeResult>
}

export function SubscribeForm({ id, title, description, nextIssueDate, onSubscribe }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const errorId = useId()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const result = await onSubscribe(email.trim())
    if (result.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setError(result.message)
      setStatus('error')
    }
  }

  const hasError = status === 'error'

  return (
    <div id={id} className="flex flex-col justify-center bg-ink px-6 py-14 text-paper">
      <Eyebrow className="mb-5">Free · Fortnightly · No ads</Eyebrow>
      <h3 className="mb-4 font-display text-display-panel font-bold">{title}</h3>
      <p className="mb-8 text-body-sm text-paper-60">{description}</p>

      {status === 'success' ? (
        <div role="status" className="border-2 border-hot p-5">
          <p className="font-display text-title-card font-bold">You're on the list.</p>
          <p className="mt-1 font-mono text-body-sm text-paper-60">
            Check your inbox to confirm. Next issue arrives {nextIssueDate}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={status === 'sending'} className="flex flex-col gap-3">
          <input
            type="email"
            required
            aria-label="Email address"
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (hasError) setStatus('idle')
            }}
            className="border-2 border-paper-30 bg-transparent px-4 py-3 font-mono text-input text-paper outline-none transition-colors placeholder:text-paper-30 focus:border-hot aria-[invalid=true]:border-hot"
          />
          {hasError && (
            <p id={errorId} role="alert" className="font-mono text-[11px] text-paper">
              <span aria-hidden="true" className="text-hot">
                ×{' '}
              </span>
              {error}
            </p>
          )}
          <Button type="submit" variant="hot" disabled={status === 'sending'} className="disabled:cursor-wait">
            {status === 'sending' ? 'Subscribing…' : "Subscribe — It's Free"}
          </Button>
        </form>
      )}

      <p className="mt-4 font-mono text-meta text-paper-30">4,800+ readers · Unsubscribe any time</p>
    </div>
  )
}
