import type { ReactNode } from 'react'

import type { Photo, PhotoGroup } from '../types'
import LazyImage from './LazyImage'

function PhotoTile({
  photo,
  className = '',
  children,
  onClick,
}: {
  photo: Photo
  className?: string
  children?: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${photo.alt}`}
      className={`relative overflow-hidden rounded-md ${className}`}
    >
      <LazyImage src={photo.src} alt={photo.alt} className="hover:scale-105" />
      {children}
    </button>
  )
}

/**
 * Auto-fill + dense flow means this scales to any photo count without
 * layout code changing: 1 photo is just the hero tile, 20 photos wrap into
 * as many rows as needed, and `dense` fills gaps the 2x2 hero span leaves
 * behind rather than leaving visible holes.
 */
function PhotoGroupSection({
  group,
  onPhotoClick,
}: {
  group: PhotoGroup
  onPhotoClick: (photo: Photo) => void
}) {
  const [hero, ...rest] = group.photos

  return (
    <section>
      <div className="grid auto-rows-27.5 grid-flow-dense grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-1.5">
        <PhotoTile
          photo={hero}
          className="col-span-2 row-span-2"
          onClick={() => onPhotoClick(hero)}
        >
          <span className="absolute top-3 left-3 text-lg font-semibold text-white drop-shadow-md">
            {group.date}
          </span>
        </PhotoTile>
        {rest.map((restPhoto) => (
          <PhotoTile
            key={restPhoto.id}
            photo={restPhoto}
            onClick={() => onPhotoClick(restPhoto)}
          />
        ))}
      </div>
    </section>
  )
}

interface PhotoGridProps {
  groups: PhotoGroup[]
  onPhotoClick: (photo: Photo) => void
}

function PhotoGrid({ groups, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="dark-scrollbar flex-1 space-y-6 overflow-y-auto bg-black p-4">
      {groups.map((group) => (
        <PhotoGroupSection
          key={group.date}
          group={group}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </div>
  )
}

export default PhotoGrid
