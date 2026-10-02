# IssueCard

Card de edição na grade: badge, número, título Fraunces, excerto e rodapé de metadados.

- Vive dentro de `lv-grid` (1 / 2 / 3 colunas em <768 / ≥768 / ≥1024px). A grade desenha bordas superior e esquerda, cada card a direita e a inferior — `stroke-mid` sem gap, formando uma tabela.
- Hover: fundo `warm`, título `hot`.
- Título `title-card`; excerto `body-sm` em `ink-60`; data e tempo em `meta` `ink-40` sobre divisória `ink-10`.
- O consumidor fornece `{id, date, title, excerpt, category, readTime}`.
