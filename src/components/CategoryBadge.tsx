import type { Category } from '../data/issues'

type Variant = 'hot' | 'ink' | 'warm'

const VARIANTS: Record<Variant, string> = {
  hot: 'bg-hot text-on-hot',
  ink: 'bg-ink text-paper',
  warm: 'bg-warm text-ink border border-rule',
}

// Só três variantes; o tipo obriga toda categoria a ter uma (categoria nova: use warm).
const CATEGORY_VARIANTS: Record<Category, Variant> = {
  Technology: 'hot',
  Politics: 'hot',
  Urbanism: 'ink',
  Culture: 'ink',
  Science: 'ink',
  Labour: 'warm',
  Climate: 'warm',
}

export function CategoryBadge({ cat }: { cat: Category }) {
  return (
    <span className={`inline-block px-2 py-0.5 font-mono text-badge uppercase ${VARIANTS[CATEGORY_VARIANTS[cat]]}`}>
      {cat}
    </span>
  )
}
