import type { CategoryOption } from '../data/issues'

interface CategoryFilterProps {
  categories: readonly CategoryOption[]
  active: CategoryOption
  onChange: (category: CategoryOption) => void
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="mx-auto max-w-7xl border-b-2 border-rule px-6">
      <div role="group" aria-label="Filter issues by category" className="flex overflow-x-auto">
        {categories.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(category)}
              className={`whitespace-nowrap border-r border-rule px-5 py-4 font-mono text-nav uppercase transition-colors ${
                isActive ? 'bg-ink text-paper' : 'hover:bg-warm'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}
