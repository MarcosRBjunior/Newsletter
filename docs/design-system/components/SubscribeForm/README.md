# SubscribeForm

Painel de inscrição sobre `ink`: chamada, campo de e-mail, botão `hot` e prova social — o coração do Projeto 05.

## Estados
- **Padrão** — input transparente, borda `stroke-mid` `paper-30`, placeholder "your@email.com".
- **Foco** — borda `hot`.
- **Enviando** — botão desabilitado com rótulo "Subscribing…" (adição: o código original não tem estado de carregamento; necessário com Mailchimp).
- **Erro** — `aria-invalid="true"` (borda `hot`) + mensagem mono 11px em `paper` com "×" em `hot`. Use as mensagens da API (e-mail inválido, já inscrito → "You're already on the list.").
- **Sucesso** — caixa com borda `stroke-mid` `hot`: "You're on the list." + data da próxima edição.

## Integração
- `onSubmit` faz `POST /api/subscribe` com `{ email }` (função serverless na Vercel → Mailchimp Marketing API v3). Nunca chame a API do Mailchimp direto do navegador: a API key ficaria exposta.
- O consumidor fornece `onSubscribe(email): Promise`, o texto da chamada e a data da próxima edição.
- Sempre `type="email"` e `required`; `aria-label` no input.
