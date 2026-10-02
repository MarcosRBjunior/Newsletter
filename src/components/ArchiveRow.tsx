import type { ArchiveItem } from '../data/issues'
import { CategoryBadge } from './CategoryBadge'

export function ArchiveRow({ item }: { item: ArchiveItem }) {
  return (
    <li className="group flex items-start gap-6 border-b border-ink-15 py-4 transition-colors last:border-b-0 hover:text-hot">
      <span className="mt-0.5 shrink-0 font-mono text-nav text-ink-30 transition-colors group-hover:text-hot">
        #{item.id}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-title-row font-semibold">{item.title}</p>
        <div className="mt-1 flex items-center gap-3">
          <span className="font-mono text-meta text-ink-40">{item.date}</span>
          <CategoryBadge cat={item.category} />
        </div>
      </div>
      <span aria-hidden="true" className="shrink-0 text-ink-20 transition-colors group-hover:text-hot">
        →
      </span>
    </li>
  )
}
