import { About } from './components/About'
import { Archive } from './components/Archive'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Issues } from './components/Issues'
import { Masthead } from './components/Masthead'
import type { NavLink } from './components/Masthead'
import { ARCHIVE, CATEGORIES, FEATURED_ISSUE, ISSUES, NEXT_ISSUE_DATE } from './data/issues'
import { subscribe } from './lib/subscribe'

const NAV_LINKS: NavLink[] = [
  { href: '#issues', label: 'Issues' },
  { href: '#archive', label: 'Archive' },
  { href: '#about', label: 'About' },
]

export default function App() {
  return (
    <>
      <Masthead links={NAV_LINKS} />
      <main>
        <Hero issue={FEATURED_ISSUE} nextIssueDate={NEXT_ISSUE_DATE} onSubscribe={subscribe} />
        <Issues issues={ISSUES} categories={CATEGORIES} />
        <Archive items={ARCHIVE} />
        <About />
      </main>
      <Footer links={NAV_LINKS} />
    </>
  )
}
