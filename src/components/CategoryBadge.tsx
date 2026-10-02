type Variant = 'hot' | 'ink' | 'warm'

const VARIANTS: Record<Variant, string> = {
  hot: 'bg-hot text-on-hot',
  ink: 'bg-ink text-paper',
  warm: 'bg-warm text-ink border border-rule',
}

// Só três variantes; categoria nova cai em warm.
const CATEGORY_VARIANTS: Record<string, Variant> = {
  Technology: 'hot',
  Politics: 'hot',
  Urbanism: 'ink',
  Culture: 'ink',
  Science: 'ink',
  Labour: 'warm',
  Climate: 'warm',
}

export function CategoryBadge({ cat }: { cat: string }) {
  const variant = CATEGORY_VARIANTS[cat] ?? 'warm'
  return (
    <span className={`inline-block px-2 py-0.5 font-mono text-badge uppercase ${VARIANTS[variant]}`}>
      {cat}
    </span>
  )
}
