import type { AboutPage } from '../utils/url'

export interface BlogPost {
  id: number
  date: string
  title: string
  image: string
  link: string
}

/** What a tab is currently showing — a real history stack of these per tab. */
export type TabView =
  | { kind: 'home' }
  | { kind: 'search'; query: string }
  | { kind: 'site'; url: string }
  | { kind: 'about'; page: AboutPage }

export interface SafariTab {
  id: string
  history: TabView[]
  historyIndex: number
}
