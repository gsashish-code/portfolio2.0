import { BLOG_POSTS } from '../services/blogPosts'
import BlogPostRow from './BlogPostRow'

/** Safari's home / new-tab page — the dev blog post list. */
function BlogList() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h2 className="mb-6 text-lg font-bold text-[#ff375f]">
        My Developer Blog
      </h2>
      <ul className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <BlogPostRow key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default BlogList
