// Função serverless (Vercel): recebe { email } e inscreve na audiência do Mailchimp com double opt-in.
// A API key só existe aqui, em variáveis de ambiente sem prefixo VITE_ (nunca chega ao navegador).
import { createHash } from 'node:crypto'

// Rótulos do domínio não contêm ponto, então cada entrada só tem uma divisão possível: sem backtracking.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/
const MAX_EMAIL_LENGTH = 254
const MAX_LOCAL_PART_LENGTH = 64
const MAILCHIMP_TIMEOUT_MS = 8000

const MESSAGES = {
  success: "You're on the list.",
  exists: "You're already on the list.",
  invalid: 'Enter a valid email address.',
  tooMany: 'Too many signups for this address right now. Try again later.',
  blocked: "This address can't be subscribed here. Please contact us.",
  generic: 'Something went wrong. Please try again.',
}

interface MailchimpError {
  title?: string
  detail?: string
}

function reply(status: number, ok: boolean, message: string) {
  return Response.json({ ok, message }, { status })
}

function isValidEmail(email: string) {
  const localPart = email.split('@')[0]
  return (
    email.length <= MAX_EMAIL_LENGTH && localPart.length <= MAX_LOCAL_PART_LENGTH && EMAIL_PATTERN.test(email)
  )
}

// O detalhe do Mailchimp costuma citar o endereço; tira antes de ir para o log.
function redact(text = '') {
  return text.replace(/\S+@\S+/g, '<email>')
}

function mailchimpFailure(error: MailchimpError, status: number) {
  const detail = error.detail ?? ''
  console.warn('Mailchimp rejected signup', status, error.title, redact(detail))

  if (error.title === 'Invalid Resource') {
    // O mesmo título cobre e-mail falso, excesso de inscrições recentes e merge fields obrigatórios.
    if (/fake or invalid|valid email/i.test(detail)) return reply(400, false, MESSAGES.invalid)
    if (/a lot of lists/i.test(detail)) return reply(429, false, MESSAGES.tooMany)
  }
  if (error.title === 'Forgotten Email Not Subscribed' || error.title === 'Member In Compliance State') {
    return reply(400, false, MESSAGES.blocked)
  }
  return reply(502, false, MESSAGES.generic)
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim()
  const listId = process.env.MAILCHIMP_LIST_ID?.trim()
  // O server prefix é o sufixo da própria key (xxxx-us18), então não tem como divergir dela.
  const serverPrefix = apiKey?.includes('-') ? apiKey.split('-').pop() : undefined
  if (!apiKey || !listId || !serverPrefix) {
    console.error('Mailchimp env vars missing or malformed')
    return reply(500, false, MESSAGES.generic)
  }

  // Exigir JSON força o preflight de CORS em navegadores de outros sites, e a função não o libera.
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply(415, false, MESSAGES.generic)
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown; website?: unknown } | null

  // Honeypot: campo invisível que só bot preenche. Responde sucesso para não dar pista.
  if (typeof body?.website === 'string' && body.website !== '') {
    return reply(200, true, MESSAGES.success)
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!isValidEmail(email)) {
    return reply(400, false, MESSAGES.invalid)
  }

  const membersUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`
  const mailchimp = (path: string, method: string, data?: object) =>
    fetch(`${membersUrl}${path}`, {
      method,
      headers: {
        Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
      signal: AbortSignal.timeout(MAILCHIMP_TIMEOUT_MS),
    })

  try {
    // "pending" dispara o e-mail de confirmação (double opt-in).
    const created = await mailchimp('', 'POST', { email_address: email, status: 'pending' })
    if (created.ok) {
      return reply(200, true, MESSAGES.success)
    }

    const error = (await created.json().catch(() => ({}))) as MailchimpError
    if (error.title !== 'Member Exists') {
      return mailchimpFailure(error, created.status)
    }

    // Já existe na audiência: só quem confirmou está de fato inscrito.
    const hash = createHash('md5').update(email.toLowerCase()).digest('hex')
    const member = (await (await mailchimp(`/${hash}?fields=status`, 'GET')).json()) as { status?: string }
    if (member.status === 'subscribed') {
      return reply(400, false, MESSAGES.exists)
    }

    // Pendente, descadastrado ou arquivado: voltar para "pending" reenvia a confirmação.
    const resent = await mailchimp(`/${hash}`, 'PUT', { email_address: email, status: 'pending' })
    if (resent.ok) {
      return reply(200, true, MESSAGES.success)
    }
    return mailchimpFailure((await resent.json().catch(() => ({}))) as MailchimpError, resent.status)
  } catch (err) {
    console.error('Mailchimp request failed', err instanceof Error ? err.name : err)
    return reply(502, false, MESSAGES.generic)
  }
}
