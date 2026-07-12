import { Mail, Search, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

interface PhotosToolbarProps {
  query: string
  onQueryChange: (value: string) => void
}

function PhotosToolbar({ query, onQueryChange }: PhotosToolbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus()
  }, [isSearchOpen])

  const closeSearch = () => {
    setIsSearchOpen(false)
    onQueryChange('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') closeSearch()
  }

  return (
    <div className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#1c1c1e] px-4">
      <Mail
        className="size-4 shrink-0 text-gray-500"
        strokeWidth={2}
        aria-label="Mail"
      />

      {isSearchOpen ? (
        <div className="flex flex-1 items-center justify-end gap-1.5">
          <Search
            className="size-3.5 shrink-0 text-gray-500"
            strokeWidth={2}
            aria-hidden
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search photos"
            aria-label="Search photos"
            className="w-40 border-b border-white/20 bg-transparent py-0.5 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-blue-400"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Clear search"
            className="text-gray-500 hover:text-gray-300"
          >
            <X className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search photos"
        >
          <Search
            className="size-4 text-gray-500 hover:text-gray-300"
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  )
}

export default PhotosToolbar
