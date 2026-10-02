import type { Issue } from '../data/issues'
import type { Subscribe } from '../lib/subscribe'
import { ButtonLink } from './Button'
import { Eyebrow } from './Eyebrow'
import { SubscribeForm } from './SubscribeForm'

interface HeroProps {
  issue: Issue
  nextIssueDate: string
  onSubscribe: Subscribe
}

export function Hero({ issue, nextIssueDate, onSubscribe }: HeroProps) {
  return (
    <section className="border-b-4 border-rule">
      <div className="mx-auto grid min-h-hero-min max-w-7xl md:grid-cols-2">
        <div className="flex flex-col justify-between border-rule px-6 py-14 md:border-r-4">
          <div>
            <Eyebrow className="mb-6">Latest Issue · No. {issue.id}</Eyebrow>
            <h2 className="mb-6 font-display text-display-hero-sm font-black lg:text-display-hero">{issue.title}</h2>
            <p className="max-w-md text-lede text-ink-70">{issue.excerpt}</p>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <ButtonLink href="#issues">
              Read Issue
              <span aria-hidden="true" className="text-base leading-none">
                →
              </span>
            </ButtonLink>
            <span className="font-mono text-nav tracking-wide text-ink-40">
              {issue.readTime} read · {issue.date}
            </span>
          </div>
        </div>
        <SubscribeForm
          id="subscribe"
          title="Read the ideas that don't fit in a feed."
          description="Deeply reported essays on cities, labour, technology, and the slow forces shaping the world. Delivered every other Sunday."
          nextIssueDate={nextIssueDate}
          onSubscribe={onSubscribe}
        />
      </div>
    </section>
  )
}
