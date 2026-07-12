import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'

import { dockApps, navLinks } from '#constants/index'

interface SearchOverlayProps {
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
}

const SEARCHABLE_ITEMS = [
  ...navLinks.map(({ id, name }) => ({ id: `nav-${id}`, name })),
  ...dockApps.map(({ id, name }) => ({ id: `dock-${id}`, name })),
]

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
  const dragOffset = useRef<{ x: number; y: number } | null>(null)

  const [query, setQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(() => ({
    x: Math.max(16, window.innerWidth / 2 - BAR_WIDTH / 2),
    y: window.innerHeight * 0.22,
  }))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (containerRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [anchorRef, onClose])

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragOffset.current) return
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      })
    }
    const stopDragging = () => {
      dragOffset.current = null
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
    }
  }, [isDragging])

  const handleDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    setIsDragging(true)
  }

  const trimmedQuery = query.trim()
  const results = trimmedQuery
    ? SEARCHABLE_ITEMS.filter(({ name }) =>
        name.toLowerCase().includes(trimmedQuery.toLowerCase()),
      )
    : []

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Search"
      onPointerDown={handleDragStart}
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
