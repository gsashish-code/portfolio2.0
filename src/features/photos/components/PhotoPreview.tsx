import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { Photo } from '../types'
import LazyImage from './LazyImage'

interface PhotoPreviewProps {
  photo: Photo
  position: string
  onBack: () => void
  onPrev?: () => void
  onNext?: () => void
}

function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-gray-200 shadow-md backdrop-blur-sm transition-colors hover:bg-black/90 ${
        direction === 'prev' ? 'left-3' : 'right-3'
      }`}
    >
      <Icon className="size-5" strokeWidth={2.5} />
    </button>
  )
}

function PhotoPreview({
  photo,
  position,
  onBack,
  onPrev,
  onNext,
}: PhotoPreviewProps) {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <div className="flex h-11 shrink-0 items-center border-b border-white/10 bg-[#1c1c1e] px-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center rounded-md py-1 pr-2 pl-1 text-sm font-medium text-blue-400 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} aria-hidden />
          Photos
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black p-6">
        <div className="relative h-full w-full overflow-hidden rounded-lg ring-1 ring-white/10">
          <LazyImage
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            fit="contain"
            className="bg-black"
          />
        </div>
        {onPrev && <NavButton direction="prev" onClick={onPrev} />}
        {onNext && <NavButton direction="next" onClick={onNext} />}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-[#1c1c1e] px-4 py-2">
        <p className="truncate text-xs text-gray-400">{photo.alt}</p>
        <p className="shrink-0 pl-3 text-xs text-gray-500">{position}</p>
      </div>
    </div>
  )
}

export default PhotoPreview
