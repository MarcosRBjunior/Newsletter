import { useState } from 'react'
import type { CategoryOption, Issue } from '../data/issues'
import { CategoryFilter } from './CategoryFilter'
import { Eyebrow } from './Eyebrow'
import { IssueCard } from './IssueCard'

interface IssuesProps {
  issues: Issue[]
  categories: readonly CategoryOption[]
}

export function Issues({ issues, categories }: IssuesProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('All')

  const filtered = activeCategory === 'All' ? issues : issues.filter((issue) => issue.category === activeCategory)

  return (
    <section id="issues" className="border-b-4 border-rule">
      <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <Eyebrow muted className="mb-8">
          {filtered.length} issue{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </Eyebrow>

        {filtered.length === 0 ? (
          <p className="py-12 font-mono text-body-sm text-ink-40">No issues in this category yet.</p>
        ) : (
          <div className="grid border-t-2 border-l-2 border-rule md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
