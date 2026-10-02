import type { Issue } from '../data/issues'
import { CategoryBadge } from './CategoryBadge'

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <article className="group flex cursor-pointer flex-col gap-4 border-r-2 border-b-2 border-rule p-6 transition-colors hover:bg-warm">
      <div className="flex items-center justify-between">
        <CategoryBadge cat={issue.category} />
        <span className="font-mono text-meta tracking-widest text-ink-40">#{issue.id}</span>
      </div>
      <h3 className="font-display text-title-card font-bold transition-colors group-hover:text-hot">
        {issue.title}
      </h3>
      <p className="flex-1 text-body-sm text-ink-60">{issue.excerpt}</p>
      <div className="flex items-center justify-between border-t border-ink-10 pt-2">
        <span className="font-mono text-meta text-ink-40">{issue.date}</span>
        <span className="font-mono text-meta text-ink-40">{issue.readTime}</span>
      </div>
    </article>
  )
}
