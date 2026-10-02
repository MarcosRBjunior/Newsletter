# Newsletter — Projeto 05 (Portfólio Boost Program)

React + Vite + Tailwind CSS v4, inscrição via Mailchimp, deploy na Vercel.

## Design system — leia antes de mexer na UI
- `docs/design-system/README.md` — regras visuais (cores, tipografia, réguas, estados). Siga à risca.
- `docs/design-system/tokens.json` — valores exatos dos tokens. Use as utilidades do `@theme` em `src/index.css` (`bg-hot`, `text-ink`, `border-rule`), nunca cores literais.
- `docs/design-system/components/<Nome>/README.md` + `preview.html` — guia e referência visual de cada componente.
- `docs/design-system/Arquitetura.md`, `Requisitos.md`, `Tarefas.md` — escopo do projeto.

## Regras rápidas
- Tudo quadrado (sem border-radius), sem sombras: hierarquia por bordas de 4px/2px/1px em `ink`.
- Um único acento: `hot` (#E8150A).
- Fraunces nos títulos, Work Sans no texto, DM Mono em rótulos/metadados (caixa-alta).
- A API key do Mailchimp fica só na função serverless `api/subscribe.ts` (variáveis de ambiente sem prefixo `VITE_`).
