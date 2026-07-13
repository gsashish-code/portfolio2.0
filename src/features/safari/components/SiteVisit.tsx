import { ExternalLink, Globe } from 'lucide-react'

import { getHostname } from '../utils/url'

interface SiteVisitProps {
  url: string
}

/**
 * Real external sites can't reliably be embedded in an iframe (most set
 * X-Frame-Options/CSP to block it), so visiting one opens a real browser
 * tab and this view just confirms it — with a manual link in case the
 * popup was blocked.
 */
function SiteVisit({ url }: SiteVisitProps) {
  const hostname = getHostname(url)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <Globe className="h-10 w-10 text-gray-300 dark:text-gray-600" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Opened{' '}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {hostname}
        </span>{' '}
        in a new tab
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        Open again
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

export default SiteVisit
