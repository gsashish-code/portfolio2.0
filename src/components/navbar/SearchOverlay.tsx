import { useEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'

import { useDraggablePosition } from './hooks/useDraggablePosition'
import { usePopoverDismiss } from './hooks/usePopoverDismiss'
import { usePopoverEntrance } from './hooks/usePopoverEntrance'
import { filterSearchableItems } from './utils/searchItems'

interface SearchOverlayProps {
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
}

const QUICK_ACTIONS = [
  { id: 'apps', icon: '/icons/work.svg', label: 'Apps' },
  { id: 'files', icon: '/icons/file.svg', label: 'Files' },
  { id: 'about', icon: '/icons/info.svg', label: 'About' },
  { id: 'contact', icon: '/icons/user.svg', label: 'Contact' },
]

const BAR_WIDTH = 360

function SearchOverlay({ anchorRef, onClose }: SearchOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')
  const { position, isDragging, startDrag } = useDraggablePosition(
    containerRef,
    () => ({
      x: Math.max(16, window.innerWidth / 2 - BAR_WIDTH / 2),
      y: window.innerHeight * 0.22,
    }),
  )

  usePopoverEntrance(containerRef)
  usePopoverDismiss(containerRef, anchorRef, onClose)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const trimmedQuery = query.trim()
  const results = filterSearchableItems(query)

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Search"
      onPointerDown={startDrag}
      className={`fixed z-50 flex items-start gap-3 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`w-90 overflow-hidden border border-white/30 bg-white/70 shadow-2xl backdrop-blur-xl ${
          trimmedQuery ? 'rounded-3xl' : 'rounded-full'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <img src="/icons/search.svg" alt="" className="h-4 w-4 opacity-50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onPointerDown={(event) => event.stopPropagation()}
            placeholder="Spotlight Search"
            className="w-full cursor-text bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-500"
          />
        </div>

        {results.length > 0 && (
          <ul className="max-h-72 overflow-y-auto border-t border-black/10">
            {results.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-black/5"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}

        {trimmedQuery && results.length === 0 && (
          <p className="border-t border-black/10 px-4 py-3 text-sm text-gray-400">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {!trimmedQuery && (
        <div
          className="flex items-center gap-2 pt-1"
          onPointerDown={(event) => event.stopPropagation()}
        >
          {QUICK_ACTIONS.map((action) => (
            <span
              key={action.id}
              title={action.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/50 shadow backdrop-blur-xl"
            >
              <img src={action.icon} alt="" className="h-4 w-4 opacity-70" />
            </span>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}

export default SearchOverlay
