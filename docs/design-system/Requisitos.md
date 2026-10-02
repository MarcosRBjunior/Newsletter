# Requisitos

Baseados no PDF do Projeto 05 (PSP-2025-PBP-07). Cada requisito aponta o componente do sistema que o atende.

## Níveis

| Nível | O que o PDF pede | Entrega |
|---|---|---|
| **1** | Criar conta num serviço de newsletter (ex.: Mailchimp) para ter lista de assinantes e enviar e-mails. | Conta Mailchimp + audiência criada. |
| **2** | Criar um formulário de inscrição e incorporá-lo ao site. | `SubscribeForm` no hero (`#subscribe`). |
| **3** | Ter uma forma de as pessoas se inscreverem — formulário ou página de destino. | Landing page completa (`Masthead` → hero → grade → arquivo → About → `Footer`). |

## Funcionais

- **RF01** — O site exibe um formulário de inscrição com campo de e-mail e botão. → `SubscribeForm`
- **RF02** — O e-mail inscrito é enviado à lista do Mailchimp. → `api/subscribe.ts`
- **RF03** — O formulário mostra estados de envio, erro e sucesso. → `SubscribeForm` (estados)
- **RF04** — A página principal apresenta a edição mais recente e as anteriores. → hero, `IssueCard`, `ArchiveRow`
- **RF05** — As edições podem ser filtradas por categoria. → `CategoryFilter`
- **RF06** — Existe um modelo de e-mail em HTML para os envios. → `EmailTemplate` (`email/template.html`)
- **RF07** — O modelo de e-mail segue a identidade do site (personalizado "para corresponder à sua marca"). → tokens `ink`, `paper`, `hot`, Fraunces
- **RF08** — O modelo segue o wireframe: logo, título + corpo (opcional) + imagem, repetido, e campo de e-mail + "Inscrever-se". → `EmailTemplate`

## Não funcionais

- **RNF01** — Stack: React + Tailwind CSS + Vite, deploy na Vercel.
- **RNF02** — A chave do Mailchimp nunca chega ao navegador (função serverless + variáveis de ambiente).
- **RNF03** — O modelo de e-mail é **claro e conciso** e **informativo e envolvente** (PDF): no máximo 3 matérias por envio, uma chamada por bloco.
- **RNF04** — Responsivo: grade 1/2/3 colunas; nav oculto abaixo de 768px.
- **RNF05** — Acessível: inputs com rótulo, foco visível em `hot`, texto essencial ≥4.5:1 (ver avisos de contraste no README).
- **RNF06** — Sem segredo no repositório: `.env` no `.gitignore`.
