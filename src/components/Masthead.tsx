import { ButtonLink } from './Button'

export interface NavLink {
  href: string
  label: string
}

export function Masthead({ links }: { links: NavLink[] }) {
  return (
    <header className="border-b-4 border-rule">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="mb-0.5 font-mono text-eyebrow uppercase text-ink-50">Est. 2023 · Fortnightly</p>
          <h1 className="font-display text-masthead font-black">THE LONG VIEW</h1>
        </div>
        <nav className="hidden items-center gap-6 font-mono text-nav uppercase md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-hot">
              {link.label}
            </a>
          ))}
          <ButtonLink href="#subscribe" size="nav">
            Subscribe
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
