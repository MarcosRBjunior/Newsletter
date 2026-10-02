# CategoryBadge

Etiqueta quadrada em mono caixa-alta que marca a categoria de uma edição.

## Mapeamento (de `CATEGORY_COLORS` em App.tsx)
| Categoria | Variante | Cores |
|---|---|---|
| Technology, Politics | `lv-badge--hot` | `hot` / `on-hot` |
| Urbanism, Culture, Science | `lv-badge--ink` | `ink` / `paper` |
| Labour, Climate, desconhecida | `lv-badge--warm` | `warm` / `ink` + borda `stroke-hair` `ink` |

## Regras
- Estilo de texto `badge` (10px, 500, tracking .1em); padding `space-0_5` × `space-2`.
- Só três variantes — não crie uma cor por categoria. Categoria nova cai em `warm`.
- O consumidor fornece `cat` (string).
