# Tarefas

Ordem sugerida, seguindo as etapas do PDF (Configurando o viteJS → Front-end → Mailchimp).

## 1. Configuração (viteJS)
- [x] Criar o projeto com `npm create vite@latest` (template React + TypeScript), conforme a documentação oficial do Vite.
- [x] Instalar Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`) e registrar o plugin no `vite.config.ts`.
- [x] Colocar os `@import` do Google Fonts e o bloco `@theme` (tokens deste sistema) em `src/index.css`.
- [x] Criar o repositório no GitHub e conectar à Vercel.

## 2. Mailchimp
- [x] Criar conta no Mailchimp (Nível 1).
- [x] Criar a audiência / newsletter list e anotar o List ID.
- [x] Gerar a API key e o server prefix.
- [ ] Ativar double opt-in e personalizar o e-mail de confirmação com as cores da marca. (double opt-in ativo; cores pendentes)

## 3. Front-end
- [x] Separar `App.tsx` em componentes (`Masthead`, `Hero`, `SubscribeForm`, `CategoryFilter`, `IssueCard`, `ArchiveRow`, `CategoryBadge`, `About`, `Footer`).
- [x] Mover `ISSUES`, `ARCHIVE` e `CATEGORIES` para `src/data/issues.ts`.
- [x] Trocar cores literais (`#E8150A`…) pelas utilidades do tema (`bg-hot`, `text-ink`…).
- [x] Criar a marcação do formulário de inscrição e estilizá-la com Tailwind (Nível 2).
- [x] Adicionar o formulário à página principal (`#subscribe`).
- [x] Implementar os estados Enviando / Erro / Sucesso no `SubscribeForm`.

## 4. Serverless (Vercel)
- [x] Criar `api/subscribe.ts` que valida o e-mail e chama `POST /3.0/lists/{id}/members`.
- [x] Configurar `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX` e `MAILCHIMP_LIST_ID` na Vercel.
- [x] Mapear respostas ("Member Exists", "Invalid Resource") para as mensagens do formulário.
- [x] Testar localmente com `vercel dev`.

## 5. Modelo de e-mail
- [x] Criar `email/template.html` com a marcação do modelo (tabelas, estilos inline, 600px).
- [x] Personalizar o template para corresponder à marca (`EmailTemplate`).
- [x] Incluir merge tags obrigatórias (`*|UNSUB|*`, `*|LIST:ADDRESS|*`).
- [x] Importar no Mailchimp como template e enviar um teste para Gmail e Outlook. (conferido no Gmail e no Outlook/Microsoft 365; o Hotmail descarta os envios porque o domínio do remetente não está autenticado)

## 6. Entrega
- [x] Deploy na Vercel e teste de inscrição real ponta a ponta.
- [x] Revisar responsividade (375px, 768px, 1280px) e contraste.
- [x] README do repositório com prints, stack e link do deploy (portfólio).
