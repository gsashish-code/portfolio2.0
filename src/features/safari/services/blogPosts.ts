import { BLOG_POSTS } from '#database'

import type { BlogPost } from '../types'

export { BLOG_POSTS }

/** Simple substring match over post titles — the only "search index" this browser needs for now. */
export function searchBlogPosts(query: string): BlogPost[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []
  return BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(normalized),
  )
}
