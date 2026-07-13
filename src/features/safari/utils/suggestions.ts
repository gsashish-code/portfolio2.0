import { searchBlogPosts } from '../services/blogPosts'
import { ABOUT_PAGES, type AboutPage } from './url'

export interface AddressSuggestion {
  id: string
  label: string
  description: string
  /** What gets submitted when this suggestion is picked. */
  value: string
}

const ABOUT_PAGE_LABELS: Record<AboutPage, string> = {
  blogs: 'Dev blog (home)',
  projects: 'Projects',
  me: 'About me',
  'github-stats': 'GitHub stats',
}

/**
 * Everything the address bar can autocomplete to: the internal "about:"
 * pages (always available, filtered by what's typed so far) plus any dev
 * blog posts whose title matches — so typing surfaces what's actually
 * navigable instead of the user having to already know the scheme.
 */
export function getAddressSuggestions(rawInput: string): AddressSuggestion[] {
  const trimmed = rawInput.trim().toLowerCase()

  const aboutSuggestions: AddressSuggestion[] = ABOUT_PAGES.map((page) => ({
    id: `about-${page}`,
    label: `about://${page}`,
    description: ABOUT_PAGE_LABELS[page],
    value: `about://${page}`,
  })).filter((suggestion) => !trimmed || suggestion.label.includes(trimmed))

  const blogSuggestions: AddressSuggestion[] = trimmed
    ? searchBlogPosts(trimmed).map((post) => ({
        id: `blog-${post.id}`,
        label: post.title,
        description: 'Dev blog',
        value: post.title,
      }))
    : []

  return [...aboutSuggestions, ...blogSuggestions]
}
