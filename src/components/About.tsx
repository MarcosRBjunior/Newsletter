import { ButtonLink } from './Button'
import { Eyebrow } from './Eyebrow'

export function About() {
  return (
    <section id="about" className="border-b-4 border-rule">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-16 md:grid-cols-[auto_1fr]">
        <div className="size-32 shrink-0 overflow-hidden border-4 border-rule bg-portrait md:size-portrait-lg">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=352&h=352&fit=crop&auto=format"
            alt="Marcus Webb, writer and editor"
            width={352}
            height={352}
            loading="lazy"
            className="size-full object-cover grayscale"
          />
        </div>
        <div>
          <Eyebrow className="mb-3">About</Eyebrow>
          <h2 className="mb-5 font-display text-display-section font-black">Written by Marcus Webb</h2>
          <div className="max-w-2xl space-y-4 text-body text-ink-70">
            <p>
              I'm a journalist and essayist who has spent fifteen years reporting on the systems that quietly shape
              everyday life — housing policy, infrastructure, corporate power, and the strange politics of attention.
            </p>
            <p>
              <em>The Long View</em> started as a way to write the stories that don't fit a news cycle: slower, longer,
              more willing to sit with complexity. It's funded entirely by readers, which means I answer only to them.
            </p>
            <p>
              Previously at <strong className="font-semibold text-ink">The Atlantic</strong>,{' '}
              <strong className="font-semibold text-ink">Bloomberg CityLab</strong>, and{' '}
              <strong className="font-semibold text-ink">The Guardian Cities</strong> desk.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="#subscribe" size="sm">
              Subscribe
            </ButtonLink>
            <a
              href="mailto:marcus@thelongview.email"
              className="font-mono text-xs tracking-wide text-ink-50 underline underline-offset-2 transition-colors hover:text-hot"
            >
              marcus@thelongview.email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
