import type { ArchiveItem } from '../data/issues'
import { ArchiveRow } from './ArchiveRow'
import { Eyebrow } from './Eyebrow'

export function Archive({ items }: { items: ArchiveItem[] }) {
  return (
    <section id="archive" className="border-b-4 border-rule">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow className="mb-3">Archive</Eyebrow>
          <h2 className="font-display text-display-section font-black">
            Every issue,
            <br />
            <em>intact.</em>
          </h2>
          <p className="mt-4 text-body-sm text-ink-60">
            All 31 issues remain fully readable — no paywalls, no login required. The archive is the product.
          </p>
        </div>
        <ul className="border-l-2 border-rule pl-8">
          {items.map((item) => (
            <ArchiveRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
