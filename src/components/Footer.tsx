import type { NavLink } from './Masthead'

export function Footer({ links }: { links: NavLink[] }) {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
      <div>
        <p className="font-display text-lg font-black">THE LONG VIEW</p>
        <p className="mt-0.5 font-mono text-meta text-ink-40">© 2026 Marcus Webb · All issues reserved</p>
      </div>
      <nav className="flex items-center gap-6 font-mono text-nav uppercase text-ink-50">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-hot">
            {link.label}
          </a>
        ))}
        <a href="mailto:marcus@thelongview.email" className="transition-colors hover:text-hot">
          Contact
        </a>
      </nav>
    </footer>
  )
}
