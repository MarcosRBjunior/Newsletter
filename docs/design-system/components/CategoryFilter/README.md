# CategoryFilter

Barra de abas que filtra a grade de edições por categoria.

- Abas coladas, separadas por `stroke-hair`; barra fechada por `stroke-mid`.
- Ativa: fundo `ink`, texto `paper` (`aria-pressed="true"`). Hover: fundo `warm`.
- Rola na horizontal em telas estreitas; nunca quebra linha.
- O consumidor fornece a lista `CATEGORIES` (com "All" primeiro), a ativa e `onChange`.
- Abaixo da barra mostre a contagem num `Eyebrow --muted` ("2 issues in Urbanism") e, sem resultados, "No issues in this category yet." em mono `ink-40`.
