export interface SubscribeResult {
  ok: boolean
  message: string
}

const GENERIC_ERROR = 'Something went wrong. Please try again.'

// Fala só com a função serverless (api/subscribe.ts); a API key do Mailchimp nunca chega ao navegador.
export async function subscribe(email: string): Promise<SubscribeResult> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = (await res.json()) as Partial<SubscribeResult>
    return { ok: res.ok && data.ok === true, message: data.message ?? GENERIC_ERROR }
  } catch {
    return { ok: false, message: GENERIC_ERROR }
  }
}
