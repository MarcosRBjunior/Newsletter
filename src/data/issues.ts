export const CATEGORIES = [
  'All',
  'Technology',
  'Urbanism',
  'Labour',
  'Culture',
  'Politics',
  'Climate',
  'Science',
] as const

export type CategoryOption = (typeof CATEGORIES)[number]
export type Category = Exclude<CategoryOption, 'All'>

export interface Issue {
  id: string
  date: string
  title: string
  excerpt: string
  category: Category
  readTime: string
  featured: boolean
}

export interface ArchiveItem {
  id: string
  date: string
  title: string
  category: Category
}

// As datas não ficam fixas: a edição mais recente sai no último domingo do
// calendário quinzenal e as anteriores recuam de 14 em 14 dias a partir dela.
const DAY_MS = 24 * 60 * 60 * 1000
const FORTNIGHT_MS = 14 * DAY_MS
const SCHEDULE_ANCHOR = Date.UTC(2026, 8, 27) // um domingo de edição

const now = new Date()
const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
const latestIssueTime = SCHEDULE_ANCHOR + Math.floor((today - SCHEDULE_ANCHOR) / FORTNIGHT_MS) * FORTNIGHT_MS

const formatDate = (time: number) =>
  new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

const RAW_ISSUES: Omit<Issue, 'date'>[] = [
  {
    id: '031',
    title: 'The Quiet Death of the Open Web',
    excerpt:
      'Walled gardens have won. What comes next for the people who built their lives in the commons?',
    category: 'Technology',
    readTime: '9 min',
    featured: true,
  },
  {
    id: '030',
    title: 'Why Cities Are Getting Smaller and Denser at the Same Time',
    excerpt:
      "Urban shrinkage isn't decline — it's a controlled implosion that planners are only beginning to understand.",
    category: 'Urbanism',
    readTime: '7 min',
    featured: false,
  },
  {
    id: '029',
    title: 'The Return of the Company Town',
    excerpt:
      "Silicon Valley's campuses have evolved into something far more ambitious — and far more troubling.",
    category: 'Labour',
    readTime: '11 min',
    featured: false,
  },
  {
    id: '028',
    title: 'Against Optimization',
    excerpt:
      'The productivity gospel has colonised our leisure time. A case for deliberate inefficiency.',
    category: 'Culture',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '027',
    title: 'Maps of Power: How Infrastructure Reveals Who Counts',
    excerpt:
      "Follow the pipes, cables, and roads and you'll find the exact contours of political will.",
    category: 'Politics',
    readTime: '13 min',
    featured: false,
  },
  {
    id: '026',
    title: 'The Second Life of Dead Malls',
    excerpt:
      "From distribution centres to vertical farms, America's abandoned retail cathedrals are finding strange new purposes.",
    category: 'Urbanism',
    readTime: '8 min',
    featured: false,
  },
]

const RAW_ARCHIVE: Omit<ArchiveItem, 'date'>[] = [
  { id: '025', title: 'In Praise of Friction', category: 'Culture' },
  { id: '024', title: 'The Landlord Algorithm', category: 'Technology' },
  { id: '023', title: "Carbon Capitalism's Last Stand", category: 'Climate' },
  { id: '022', title: 'Who Owns the Night Sky?', category: 'Science' },
  { id: '021', title: 'Revolt of the Middle Managers', category: 'Labour' },
  { id: '020', title: "Why We Can't Stop Doomscrolling", category: 'Technology' },
  { id: '019', title: 'The New Paternalism', category: 'Politics' },
  { id: '018', title: 'Concrete Utopias', category: 'Urbanism' },
]

// Edições são numeradas em sequência; a mais recente dá o total publicado.
export const ISSUE_COUNT = Math.max(...RAW_ISSUES.map((issue) => Number(issue.id)))

const issueTime = (id: string) => latestIssueTime - (ISSUE_COUNT - Number(id)) * FORTNIGHT_MS

export const ISSUES: Issue[] = RAW_ISSUES.map((issue) => ({ ...issue, date: formatDate(issueTime(issue.id)) }))

export const ARCHIVE: ArchiveItem[] = RAW_ARCHIVE.map((item) => ({ ...item, date: formatDate(issueTime(item.id)) }))

export const FEATURED_ISSUE = ISSUES.find((issue) => issue.featured) ?? ISSUES[0]

export const NEXT_ISSUE_DATE = formatDate(latestIssueTime + FORTNIGHT_MS)

// Ano da edição nº 001.
export const FOUNDED_YEAR = new Date(issueTime('001')).getUTCFullYear()
