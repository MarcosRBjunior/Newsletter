# EmailTemplate

Modelo do e-mail da newsletter, seguindo o wireframe do Projeto 05: logo → título 1 + corpo + imagem 1 → título 2 + corpo + imagem 2 → e-mail + "Inscrever-se".

## Estrutura
1. **Cabeçalho** — kicker (`No. 031 · data`) + "THE LONG VIEW" em `masthead`, centralizados, régua `stroke-heavy`.
2. **Blocos de matéria** (1–n) — `CategoryBadge`, título Fraunces 900 28px, corpo opcional em `ink-70`, imagem com borda `stroke-mid` (placeholder `warm`).
3. **Rodapé de inscrição** — fundo `ink`, input + botão `hot` "Inscrever-se" (no e-mail real o botão é um link para a landing page, já que formulários não funcionam na maioria dos clientes de e-mail).

## Regras para o HTML de e-mail (Mailchimp)
- Largura máxima 600px, layout em `<table>`, estilos inline — clientes de e-mail ignoram classes e `@import`.
- Fontes: Fraunces/Work Sans via `<link>` com fallback `Georgia, serif` / `Arial, sans-serif` (Outlook usa o fallback).
- Use `*|MC:SUBJECT|*`, `*|UNSUB|*` e `*|LIST:ADDRESS|*` (rodapé obrigatório do Mailchimp).
- Claro e conciso: no máximo 3 matérias por envio; cada título leva para a edição no site.
