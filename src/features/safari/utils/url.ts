/** Matches "google.com", "www.google.com", "https://github.com/user", etc. — not a perfect URL parser, just enough to tell a domain apart from a search phrase. */
const DOMAIN_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?([/?#]\S*)?$/i

/** Heuristic: does this look like a domain/URL rather than a search phrase? */
export function isLikelyUrl(input: string): boolean {
  return DOMAIN_PATTERN.test(input.trim())
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim()
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

/** Internal pages this browser can navigate to via an "about:" address, like a real browser's about:blank. */
export const ABOUT_PAGES = ['blogs', 'projects', 'me', 'github-stats'] as const
export type AboutPage = (typeof ABOUT_PAGES)[number]

const ABOUT_PATTERN = /^about:+\/*([a-z-]+)\/?$/i

/** Tolerates "about:blogs", "about://blogs", even a stray extra colon/slash. */
export function parseAboutUrl(input: string): AboutPage | null {
  const match = input.trim().match(ABOUT_PATTERN)
  if (!match) return null
  const page = match[1].toLowerCase()
  return (ABOUT_PAGES as readonly string[]).includes(page)
    ? (page as AboutPage)
    : null
}
