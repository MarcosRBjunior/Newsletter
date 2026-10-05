# Button

Botão retangular em mono caixa-alta: `ink` que vira `hot` no hover, ou `hot` que escurece para `hot-press`.

## Quando usar
- **`ink`** (`lv-btn--ink`) — ação principal sobre `paper`: "Read Issue →", "Subscribe" no nav e no About. Hover → fundo `hot`.
- **`hot`** (`lv-btn--hot`) — a ação de conversão sobre `ink`: "Subscribe — It's Free" no painel de inscrição. Hover → `hot-press`.
- **Link sublinhado** (`lv-link`) — ação secundária (e-mail do autor) em `ink-60`, hover `hot`.

## Tamanhos
- padrão: `space-3` × `space-6` (hero, formulário)
- `--sm`: 10px × `space-5` (About)
- `--nav`: `space-2` × `space-4`, texto 11px (cabeçalho)

## Regras
- Rótulo em estilo `button` (DM Mono 12px, tracking .1em, caixa-alta). Seta `→` só em ações de leitura.
- `radius-none` sempre. Sem sombra, sem gradiente.
- Foco: contorno `stroke-mid` em `hot`, offset 2px.
- O consumidor fornece o rótulo e o `href`/`onClick`.
