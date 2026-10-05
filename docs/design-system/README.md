The Long View é uma newsletter editorial quinzenal com cara de jornal impresso: papel quase branco, tinta preta, réguas grossas e um único vermelho. É o front-end do **Projeto 05 — Newsletter** do Portfólio Boost Program (React + Vite + Tailwind CSS v4, inscrição via Mailchimp, deploy na Vercel). As seções **Arquitetura**, **Requisitos** e **Tarefas** detalham o projeto.

## Princípios

1. **Réguas, não sombras.** Hierarquia vem de bordas `rule` (`stroke-heavy` entre seções, `stroke-mid` em grades e campos, `stroke-hair` em detalhes). Nunca use `box-shadow` nem cards flutuantes.
2. **Tudo quadrado.** `radius-none` em botões, inputs, badges, cards e imagens.
3. **Um acento só.** `hot` marca o que importa agora: eyebrows, hover, a ação de inscrição. Nunca use `hot` como fundo de área grande, exceto no botão de inscrição.
4. **Três vozes tipográficas.** Fraunces (serifa) para títulos, Work Sans para leitura, DM Mono para tudo que é rótulo, metadado ou controle.

## Conteúdo e tom

- Voz em primeira pessoa do autor ("I'm a journalist and essayist…"), falando com "you". Frases curtas, afirmativas, um pouco provocativas: *"Read the ideas that don't fit in a feed."*, *"The archive is the product."*
- Títulos de edição em Title Case, sem ponto final: "Against Optimization", "The Return of the Company Town".
- Rótulos mono sempre em CAIXA-ALTA, itens separados por ` · `: "FREE · FORTNIGHTLY · NO ADS", "EST. 2023 · FORTNIGHTLY".
- Botões em verbo + objeto: "Read Issue →", "Subscribe — It's Free". O travessão longo (—) separa a promessa.
- Números de edição com três dígitos e `#`: `#031`. Datas em inglês curto: "Sep 28, 2026". Tempo de leitura: "9 min".
- Sem emoji. A única "ilustração" textual é a seta `→`.
- Ênfase com itálico Fraunces, uma palavra por título no máximo: "Every issue, *intact.*"
- Prova social curta e factual: "4,800+ readers · Unsubscribe any time".

## Cor

| Token | Papel |
|---|---|
| `paper` | Fundo de tudo. |
| `ink` | Texto, réguas (`rule`), botão primário, painel de inscrição invertido. |
| `hot` | Acento único; texto `on-hot` (branco) sobre ele. Hover do botão `hot` → `hot-press`. |
| `warm` | Hover de cards/abas e fundo de badges neutros. |
| `ink-70` / `ink-60` | Texto secundário legível (lede, excertos). |
| `ink-50` … `ink-10` | Metadados e divisórias — veja os avisos de contraste. |
| `paper-60` / `paper-30` | Texto de apoio e bordas sobre `ink`. |

- Texto corrido: `ink` sobre `paper` (19:1) ou `warm` (17:1). Texto de apoio: `ink-70` ou `ink-60` (≥5:1).
- Sobre o painel `ink`: título em `paper`, apoio em `paper-60` (7:1).
- **Contraste — pares do código-fonte que falham AA, mantidos como estão:** `hot` em texto pequeno sobre `paper` (4.42:1), `ink-50` (3.68:1), `ink-40` (2.69:1), `ink-30` (2.03:1) e `paper-30` (2.53:1). Use-os só para metadados não essenciais ou decoração; informação necessária vai em `ink-60` ou mais escuro.
- Seleção de texto: fundo `hot`, texto `on-hot`. Scrollbar de `scrollbar` (4px), thumb `ink`.

## Tipografia

- Famílias: `display` = Fraunces (Google Fonts, pesos 400–900, itálico), `sans` = Work Sans (300–700), `mono` = DM Mono (400, 500). Carregue as três pelo Google Fonts antes de `@import 'tailwindcss'`.
- Títulos: `display-hero` (60px/1.05, 900, tracking −0.025em; 48px abaixo de 1024px), `display-section` (36px, 900), `display-panel` (30px, 700), `title-card` (20px, 700), `title-row` (16px, 600). O nome da publicação usa `masthead`.
- Leitura: `lede` (18px) no hero, `body` (16px) em parágrafos, `body-sm` (14px) em excertos — todos com entrelinha 1.625 e largura máxima ~42rem.
- Rótulos: `eyebrow` (10px, tracking .25em), `nav` (11px, .1em), `button` (12px, .1em), `badge` (10px/500), `meta` (10px), sempre caixa-alta exceto `meta` e `input`.

## Espaço e layout

- Container único de `container-max` (1280px) com gutter `space-6`.
- Ritmo vertical: hero `space-14`, grade e arquivo `space-12`, About `space-16`, rodapé `space-8`.
- Seções empilhadas e separadas por régua `stroke-heavy`; dentro delas, colunas divididas por régua vertical (hero: `stroke-heavy`; arquivo: `stroke-mid`).
- Grade de edições: 1 → 2 (≥768px) → 3 colunas (≥1024px), sem gap — as bordas formam a tabela.
- Hero: duas colunas de mesma largura, mín. `hero-min`; à direita, o painel de inscrição em `ink`.

## Estados e movimento

- Hover troca **cor**, nunca tamanho ou posição: texto → `hot`, fundo de card/aba → `warm`, botão `ink` → `hot`.
- Transição só de cor, ~150ms. Rolagem suave nas âncoras. Nada de animações de entrada.
- Foco: borda ou contorno `hot` de `stroke-mid` (input: a própria borda vira `hot`).
- Ativo (aba): fundo `ink`, texto `paper`.

## Imagens e ícones

- Sem fotos na página. O About traz o texto do autor e, ao lado, um bloco "Built by" com quem fez o site, separado por régua `stroke-mid`. Os tokens `portrait` e `portrait-lg` ficam reservados caso um retrato volte (quadrado, em **escala de cinza**, moldura `stroke-heavy`).
- Imagens de e-mail (template) recebem borda `stroke-mid`, sem arredondamento.
- Não há biblioteca de ícones nem logotipo: a marca é o nome "THE LONG VIEW" composto em Fraunces 900. O único glifo é `→` (no texto, não SVG). Não adicione ícones.

## Componentes

`Masthead`, `CategoryFilter`, `IssueCard`, `ArchiveRow`, `CategoryBadge`, `Eyebrow`, `Button`, `SubscribeForm`, `Footer` (recriados de `App.tsx`) e `EmailTemplate` (do wireframe do PDF). As classes ficam em `components/bundle.css` com prefixo `lv-`; no projeto React, use as utilidades Tailwind equivalentes com os tokens do `@theme`.

### Tailwind v4 (`src/index.css`)

```css
@theme {
  --font-display: 'Fraunces', Georgia, serif;
  --font-sans: 'Work Sans', system-ui, sans-serif;
  --font-mono: 'DM Mono', monospace;
  --color-ink: #0A0A0A;
  --color-paper: #FAFAF8;
  --color-hot: #E8150A;
  --color-warm: #F5F0E8;
  --color-rule: #0A0A0A;
}
```

Prefira `bg-hot`, `text-ink`, `border-rule` às cores literais (`bg-[#E8150A]`) que o `App.tsx` ainda usa.
