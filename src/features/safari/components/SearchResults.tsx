import { searchBlogPosts } from '../services/blogPosts'
import BlogPostRow from './BlogPostRow'

interface SearchResultsProps {
  query: string
}

/**
 * There's no real internet to search yet — this searches the one thing
 * Safari actually hosts (the dev blog) by title, honestly labeled as such
 * rather than pretending to be a full web search.
 */
function SearchResults({ query }: SearchResultsProps) {
  const results = searchBlogPosts(query)

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Search results for &ldquo;{query}&rdquo;
      </p>

      {results.length > 0 ? (
        <ul className="space-y-6">
          {results.map((post) => (
            <BlogPostRow key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          No matches in the dev blog. General web search isn&rsquo;t wired up in
          this browser (yet).
        </p>
      )}
    </div>
  )
}

export default SearchResults
