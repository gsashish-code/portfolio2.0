import { ImageOff } from 'lucide-react'
import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  /** 'cover' fills/crops (grid tiles); 'contain' preserves the whole frame (preview). */
  fit?: 'cover' | 'contain'
}

type LoadStatus = 'loading' | 'loaded' | 'error'

/**
 * `loading="lazy"` defers the network fetch until the browser decides the
 * tile is close enough to the viewport to matter — that's the actual lazy
 * part. The shimmer/fade here just covers the gap between "deferred fetch
 * started" and "image decoded", so a grid of many tiles doesn't pop in
 * as blank/white rectangles. Falls back to an icon rather than a broken-
 * image glyph if a manifest entry ever points at a missing file.
 */
function LazyImage({
  src,
  alt,
  className = '',
  fit = 'cover',
}: LazyImageProps) {
  const [status, setStatus] = useState<LoadStatus>('loading')
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <div className="relative h-full w-full bg-[#1c1c1e]">
      {status === 'loading' && (
        <div aria-hidden className="shimmer absolute inset-0" />
      )}

      {status === 'error' ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-500">
          <ImageOff className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full ${fitClass} transition duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  )
}

export default LazyImage
