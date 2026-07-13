import type { BlogPost } from '../types'

interface BlogPostRowProps {
  post: BlogPost
}

function BlogPostRow({ post }: BlogPostRowProps) {
  return (
    <li className="flex gap-4">
      <img
        src={post.image}
        alt=""
        className="h-16 w-16 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {post.title}
        </h3>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Check out the full post &rsaquo;
        </a>
      </div>
    </li>
  )
}

export default BlogPostRow
