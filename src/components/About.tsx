import { ButtonLink } from './Button'
import { Eyebrow } from './Eyebrow'

// Quem construiu o site (pessoa real), ao lado do autor fictício da newsletter.
const BUILDER_FACTS = [
  { label: 'Stack', value: 'Node.js · TypeScript · React · PostgreSQL' },
  { label: 'Education', value: 'Computer Engineering, FHO' },
  { label: 'Cloud', value: 'AWS Certified Cloud Practitioner' },
]

const BUILDER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/MarcosRBjunior' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marcos-ribeirojr' },
]

export function About() {
  return (
    <section id="about" className="border-b-4 border-rule">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr]">
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
              className="font-mono text-xs tracking-wide text-ink-60 underline underline-offset-2 transition-colors hover:text-hot"
            >
              marcus@thelongview.email
            </a>
          </div>
        </div>
        <aside aria-labelledby="builder-name" className="border-l-2 border-rule pl-8">
          <Eyebrow className="mb-3">Built by</Eyebrow>
          <h3 id="builder-name" className="font-display text-display-panel font-bold">
            Marcos Ribeiro Jr.
          </h3>
          <p className="mt-1 font-mono text-nav uppercase text-ink-60">Backend Developer · Araras, SP</p>
          <p className="mt-5 text-body-sm text-ink-70">
            Backend developer building REST APIs with Node.js and TypeScript, covered by unit, integration and
            end-to-end tests. Designed and built this site, from the design system to the Mailchimp sign-up running on
            a Vercel Function.
          </p>
          <dl className="mt-6 border-t border-rule">
            {BUILDER_FACTS.map((fact) => (
              <div key={fact.label} className="border-b border-ink-15 py-3">
                <dt className="font-mono text-meta uppercase text-ink-60">{fact.label}</dt>
                <dd className="mt-0.5 text-body-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-6">
            {BUILDER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-nav uppercase text-ink transition-colors hover:text-hot"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
