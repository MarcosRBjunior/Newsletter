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

export const ISSUES: Issue[] = [
  {
    id: '031',
    date: 'Sep 28, 2026',
    title: 'The Quiet Death of the Open Web',
    excerpt:
      'Walled gardens have won. What comes next for the people who built their lives in the commons?',
    category: 'Technology',
    readTime: '9 min',
    featured: true,
  },
  {
    id: '030',
    date: 'Sep 14, 2026',
    title: 'Why Cities Are Getting Smaller and Denser at the Same Time',
    excerpt:
      "Urban shrinkage isn't decline — it's a controlled implosion that planners are only beginning to understand.",
    category: 'Urbanism',
    readTime: '7 min',
    featured: false,
  },
  {
    id: '029',
    date: 'Aug 31, 2026',
    title: 'The Return of the Company Town',
    excerpt:
      "Silicon Valley's campus campuses have evolved into something far more ambitious — and far more troubling.",
    category: 'Labour',
    readTime: '11 min',
    featured: false,
  },
  {
    id: '028',
    date: 'Aug 17, 2026',
    title: 'Against Optimization',
    excerpt:
      'The productivity gospel has colonised our leisure time. A case for deliberate inefficiency.',
    category: 'Culture',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '027',
    date: 'Aug 3, 2026',
    title: 'Maps of Power: How Infrastructure Reveals Who Counts',
    excerpt:
      "Follow the pipes, cables, and roads and you'll find the exact contours of political will.",
    category: 'Politics',
    readTime: '13 min',
    featured: false,
  },
  {
    id: '026',
    date: 'Jul 20, 2026',
    title: 'The Second Life of Dead Malls',
    excerpt:
      "From distribution centres to vertical farms, America's abandoned retail cathedrals are finding strange new purposes.",
    category: 'Urbanism',
    readTime: '8 min',
    featured: false,
  },
]

export const ARCHIVE: ArchiveItem[] = [
  { id: '025', date: 'Jul 6, 2026', title: 'In Praise of Friction', category: 'Culture' },
  { id: '024', date: 'Jun 22, 2026', title: 'The Landlord Algorithm', category: 'Technology' },
  { id: '023', date: 'Jun 8, 2026', title: "Carbon Capitalism's Last Stand", category: 'Climate' },
  { id: '022', date: 'May 25, 2026', title: 'Who Owns the Night Sky?', category: 'Science' },
  { id: '021', date: 'May 11, 2026', title: 'Revolt of the Middle Managers', category: 'Labour' },
  { id: '020', date: 'Apr 27, 2026', title: "Why We Can't Stop Doomscrolling", category: 'Technology' },
  { id: '019', date: 'Apr 13, 2026', title: 'The New Paternalism', category: 'Politics' },
  { id: '018', date: 'Mar 30, 2026', title: 'Concrete Utopias', category: 'Urbanism' },
]

export const FEATURED_ISSUE = ISSUES.find((issue) => issue.featured) ?? ISSUES[0]

export const NEXT_ISSUE_DATE = 'Oct 12, 2026'
