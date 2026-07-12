import { useEffect, useMemo, useState } from 'react'

import useWindowStore from '#store/window'

import { PHOTOS_WINDOW_ID } from '../constants'
import {
  PHOTO_GROUPS_BY_SECTION,
  SIDEBAR_SECTIONS,
} from '../services/photoLibrary'
import type { Photo, SidebarSectionId } from '../types'
import EmptySection from './EmptySection'
import PhotoGrid from './PhotoGrid'
import PhotoPreview from './PhotoPreview'
import PhotosSidebar from './PhotosSidebar'
import PhotosToolbar from './PhotosToolbar'
import SearchEmptyState from './SearchEmptyState'

function PhotosApp() {
  const [activeId, setActiveId] = useState<SidebarSectionId>('library')
  const [query, setQuery] = useState('')
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const setWindowTitle = useWindowStore((state) => state.setWindowTitle)

  const handleSelect = (id: SidebarSectionId) => {
    setActiveId(id)
    setQuery('')
    setPreviewIndex(null)
    const section = SIDEBAR_SECTIONS.find((candidate) => candidate.id === id)
    setWindowTitle(
      PHOTOS_WINDOW_ID,
      id === 'library' ? undefined : section?.label,
    )
  }

  const activeSection = SIDEBAR_SECTIONS.find(
    (section) => section.id === activeId,
  )
  const activeGroups = PHOTO_GROUPS_BY_SECTION[activeId]

  const trimmedQuery = query.trim().toLowerCase()
  const visibleGroups = useMemo(() => {
    if (!trimmedQuery) return activeGroups
    return activeGroups
      .map((group) => ({
        ...group,
        photos: group.photos.filter((photo) =>
          photo.alt.toLowerCase().includes(trimmedQuery),
        ),
      }))
      .filter((group) => group.photos.length > 0)
  }, [activeGroups, trimmedQuery])

  const flatPhotos = useMemo(
    () => visibleGroups.flatMap((group) => group.photos),
    [visibleGroups],
  )
  const previewPhoto =
    previewIndex !== null ? flatPhotos[previewIndex] : undefined
  const currentIndex = previewIndex ?? 0
  const hasPrev = previewIndex !== null && previewIndex > 0
  const hasNext = previewIndex !== null && previewIndex < flatPhotos.length - 1

  const closePreview = () => {
    setPreviewIndex(null)
    setWindowTitle(
      PHOTOS_WINDOW_ID,
      activeId === 'library' ? undefined : activeSection?.label,
    )
  }

  const openPreview = (photo: Photo) => {
    const index = flatPhotos.findIndex((candidate) => candidate.id === photo.id)
    if (index === -1) return
    setPreviewIndex(index)
  }

  const showPrev = () =>
    setPreviewIndex((index) => (index !== null ? index - 1 : index))
  const showNext = () =>
    setPreviewIndex((index) => (index !== null ? index + 1 : index))

  useEffect(() => {
    if (!previewPhoto) return
    setWindowTitle(
      PHOTOS_WINDOW_ID,
      `Photo ${currentIndex + 1} of ${flatPhotos.length}`,
    )
    // setWindowTitle is a stable zustand action; currentIndex/flatPhotos.length are the real deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewPhoto, currentIndex, flatPhotos.length])

  useEffect(() => {
    if (previewIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview()
      else if (event.key === 'ArrowLeft' && hasPrev) showPrev()
      else if (event.key === 'ArrowRight' && hasNext) showNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewIndex, hasPrev, hasNext])

  return (
    <div className="flex h-full w-full bg-black text-gray-200">
      <PhotosSidebar
        sections={SIDEBAR_SECTIONS}
        activeId={activeId}
        onSelect={handleSelect}
      />
      <div className="flex flex-1 flex-col">
        {previewPhoto ? (
          <PhotoPreview
            photo={previewPhoto}
            position={`${currentIndex + 1} of ${flatPhotos.length}`}
            onBack={closePreview}
            onPrev={hasPrev ? showPrev : undefined}
            onNext={hasNext ? showNext : undefined}
          />
        ) : (
          <>
            <PhotosToolbar query={query} onQueryChange={setQuery} />
            {visibleGroups.length > 0 ? (
              <PhotoGrid groups={visibleGroups} onPhotoClick={openPreview} />
            ) : trimmedQuery ? (
              <SearchEmptyState query={query.trim()} />
            ) : (
              <EmptySection label={activeSection?.label ?? ''} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PhotosApp
