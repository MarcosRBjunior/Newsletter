export interface SubscribeResult {
  ok: boolean
  message: string
}

export type Subscribe = (email: string, honeypot?: string) => Promise<SubscribeResult>

// As mensagens vêm da função; esta só aparece quando ela nem responde (rede, timeout).
export const UNREACHABLE_ERROR = 'Something went wrong. Please try again.'

const REQUEST_TIMEOUT_MS = 10_000

// Fala só com a função serverless (api/subscribe.ts); a API key do Mailchimp nunca chega ao navegador.
export const subscribe: Subscribe = async (email, honeypot = '') => {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, website: honeypot }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    const data = (await res.json()) as Partial<SubscribeResult>
    return { ok: res.ok && data.ok === true, message: data.message ?? UNREACHABLE_ERROR }
  } catch {
    return { ok: false, message: UNREACHABLE_ERROR }
  }
}
