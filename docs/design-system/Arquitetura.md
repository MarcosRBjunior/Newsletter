# Arquitetura

Projeto 05 — Newsletter (Portfólio Boost Program, nível básico, full-stack). Objetivo do briefing: um site pessoal com **formulário de inscrição** que alimenta uma lista de e-mails, e um **modelo de e-mail** para os envios.

## Stack (do PDF)

| Camada | Tecnologia |
|---|---|
| UI | React + Tailwind CSS (v4, via `@tailwindcss/vite`) |
| Build | Vite (vite.js) |
| Serviço de newsletter | Mailchimp — biblioteca `mailchimp-api-v3` / Mailchimp Marketing API |
| Hospedagem / serverless | Vercel |

## Visão geral

```
 Navegador (React SPA — Vite)
   └─ SubscribeForm ──POST /api/subscribe { email }──┐
                                                      ▼
                     Vercel Serverless Function (api/subscribe.ts)
                       • valida o e-mail
                       • lê MAILCHIMP_API_KEY e MAILCHIMP_LIST_ID (env)
                       • chama a Mailchimp Marketing API v3
                                                      ▼
                     Mailchimp  POST /3.0/lists/{list_id}/members
                       status: "pending" (double opt-in) → e-mail de confirmação
                                                      ▼
                     Campanhas enviadas com o EmailTemplate (HTML)
```

- **Por que uma função serverless?** A API key do Mailchimp não pode ir para o bundle do navegador. A função na Vercel guarda a chave em variáveis de ambiente e devolve ao front só `{ ok, message }`. É também o "conhecimento básico de serverless" pedido no PDF.
- **Alternativa do Nível 2** (sem back-end): embutir o formulário hospedado do Mailchimp (`list-manage.com/subscribe/post`). Mais simples, menos controle de estados e de estilo.

## Estrutura de pastas proposta

```
/
├─ api/
│  └─ subscribe.ts          # função serverless (Vercel)
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx               # compõe as seções
│  ├─ index.css             # @theme com os tokens
│  ├─ components/
│  │  ├─ Masthead.tsx
│  │  ├─ Hero.tsx           # edição em destaque + SubscribeForm
│  │  ├─ SubscribeForm.tsx
│  │  ├─ CategoryFilter.tsx
│  │  ├─ IssueCard.tsx
│  │  ├─ ArchiveRow.tsx
│  │  ├─ CategoryBadge.tsx
│  │  ├─ About.tsx
│  │  └─ Footer.tsx
│  ├─ data/issues.ts        # ISSUES, ARCHIVE, CATEGORIES
│  └─ lib/subscribe.ts      # fetch('/api/subscribe')
├─ email/
│  └─ template.html         # modelo de e-mail (importado no Mailchimp)
└─ index.html
```

## Fluxo de inscrição

1. Usuário digita o e-mail → `SubscribeForm` valida (`type="email"`, `required`).
2. Estado **Enviando**: botão desabilitado.
3. `POST /api/subscribe` → função chama `lists/{id}/members` com `status: "pending"`.
4. Respostas: `200` → **Sucesso** ("You're on the list."); `400 Member Exists` → se o contato já está `subscribed`, "You're already on the list."; se está pendente ou descadastrado, `PUT /members/{hash}` com `status: "pending"` reenvia a confirmação (Sucesso); `400 Invalid Resource` → "Enter a valid email address." (e-mail falso) ou "Too many signups…" (excesso de inscrições recentes); outros → erro genérico, com o detalhe no log (sem o e-mail).
5. Proteções: e-mail com até 254 caracteres, `Content-Type: application/json` obrigatório (bloqueia chamadas de outros sites), honeypot `website`, timeout de 8 s no Mailchimp e cabeçalhos de segurança (CSP etc.) no `vercel.json`.
6. Mailchimp envia o e-mail de confirmação (double opt-in).

## Variáveis de ambiente (Vercel)

| Nome | Exemplo |
|---|---|
| `MAILCHIMP_API_KEY` | `xxxxxxxx-us21` |
| `MAILCHIMP_LIST_ID` | ID da audiência |

O server prefix (`us21`) é o sufixo da própria API key, então não é uma variável à parte. Nenhuma delas leva o prefixo `VITE_` — assim o Vite não as expõe ao cliente.
