// Função serverless (Vercel): recebe { email } e inscreve na audiência do Mailchimp com double opt-in.
// A API key só existe aqui, em variáveis de ambiente sem prefixo VITE_ (nunca chega ao navegador).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MESSAGES = {
  success: "You're on the list.",
  exists: "You're already on the list.",
  invalid: 'Enter a valid email address.',
  generic: 'Something went wrong. Please try again.',
}

function reply(status: number, ok: boolean, message: string) {
  return Response.json({ ok, message }, { status })
}

export async function POST(request: Request) {
  const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_LIST_ID } = process.env
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
    console.error('Mailchimp env vars missing')
    return reply(500, false, MESSAGES.generic)
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown } | null
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!EMAIL_PATTERN.test(email)) {
    return reply(400, false, MESSAGES.invalid)
  }

  try {
    const res = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
          'Content-Type': 'application/json',
        },
        // "pending" dispara o e-mail de confirmação (double opt-in).
        body: JSON.stringify({ email_address: email, status: 'pending' }),
      },
    )

    if (res.ok) {
      return reply(200, true, MESSAGES.success)
    }

    const error = (await res.json().catch(() => ({}))) as { title?: string; detail?: string }
    if (error.title === 'Member Exists') {
      return reply(400, false, MESSAGES.exists)
    }
    if (error.title === 'Invalid Resource') {
      return reply(400, false, MESSAGES.invalid)
    }

    console.error('Mailchimp error', res.status, error.title, error.detail)
    return reply(502, false, MESSAGES.generic)
  } catch (err) {
    console.error('Mailchimp request failed', err)
    return reply(502, false, MESSAGES.generic)
  }
}
