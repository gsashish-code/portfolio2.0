import { TrafficLight } from '#hoc/WindowWrapper'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Minus,
  Plus,
  Search,
  Share,
  Shield,
  SidebarOpen,
  X,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react'

import { getAddressSuggestions } from '../utils/suggestions'

interface SafariToolbarProps {
  dragHandleRef?: RefObject<HTMLDivElement | null>
  onClose: () => void
  onToggleSidebar: () => void
  canGoBack: boolean
  canGoForward: boolean
  onBack: () => void
  onForward: () => void
  addressValue: string
  addressFocusToken: number
  onAddressChange: (value: string) => void
  onAddressSubmit: (value: string) => void
  onNewTab: () => void
  onToggleTabStrip: () => void
}

function SafariToolbar({
  dragHandleRef,
  onClose,
  onToggleSidebar,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  addressValue,
  addressFocusToken,
  onAddressChange,
  onAddressSubmit,
  onNewTab,
  onToggleTabStrip,
}: SafariToolbarProps) {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)

  const suggestions = getAddressSuggestions(addressValue)
  const showSuggestions = isSuggestionsOpen && suggestions.length > 0

  useEffect(() => {
    // The native focus event this triggers is what actually opens the
    // suggestions list, via the input's own onFocus below.
    if (addressFocusToken > 0) addressInputRef.current?.focus()
  }, [addressFocusToken])

  const selectSuggestion = (index: number) => {
    const suggestion = suggestions[index]
    if (!suggestion) return
    onAddressChange(suggestion.value)
    onAddressSubmit(suggestion.value)
    setIsSuggestionsOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsSuggestionsOpen(true)
      setHighlightedIndex((index) =>
        suggestions.length === 0 ? -1 : (index + 1) % suggestions.length,
      )
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsSuggestionsOpen(true)
      setHighlightedIndex((index) =>
        suggestions.length === 0
          ? -1
          : (index - 1 + suggestions.length) % suggestions.length,
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (highlightedIndex >= 0) selectSuggestion(highlightedIndex)
      else {
        onAddressSubmit(addressValue)
        setIsSuggestionsOpen(false)
      }
    } else if (event.key === 'Escape') {
      setIsSuggestionsOpen(false)
    }
  }

  return (
    <div
      ref={dragHandleRef}
      className="flex h-11 shrink-0 cursor-grab items-center gap-3 border-b border-black/10 bg-[#f6f6f6] px-3 active:cursor-grabbing dark:border-white/10 dark:bg-[#2c2c2e]"
    >
      <div className="group flex items-center gap-2">
        <TrafficLight color="red" icon={X} label="Close" onClick={onClose} />
        <TrafficLight color="yellow" icon={Minus} label="Minimize" />
        <TrafficLight color="green" icon={Plus} label="Maximize" />
      </div>

      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <SidebarOpen className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Back"
          disabled={!canGoBack}
          onClick={onBack}
          className="text-gray-400 enabled:text-gray-600 enabled:hover:text-gray-900 disabled:cursor-default dark:enabled:text-gray-300 dark:enabled:hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Forward"
          disabled={!canGoForward}
          onClick={onForward}
          className="text-gray-400 enabled:text-gray-600 enabled:hover:text-gray-900 disabled:cursor-default dark:enabled:text-gray-300 dark:enabled:hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <span title="Privacy Report" className="shrink-0">
        <Shield
          aria-hidden
          className="h-4 w-4 text-gray-400 dark:text-gray-500"
        />
      </span>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          onAddressSubmit(addressValue)
          setIsSuggestionsOpen(false)
        }}
        className="relative min-w-0 flex-1"
      >
        <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5 dark:bg-white/10">
          <Search className="h-3.5 w-3.5 shrink-0 text-gray-500 dark:text-gray-400" />
          <input
            ref={addressInputRef}
            type="text"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls="safari-address-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={
              highlightedIndex >= 0
                ? suggestions[highlightedIndex]?.id
                : undefined
            }
            value={addressValue}
            onChange={(event) => {
              onAddressChange(event.target.value)
              setHighlightedIndex(-1)
            }}
            onFocus={() => {
              setIsSuggestionsOpen(true)
              setIsFocused(true)
            }}
            onBlur={() => {
              setIsSuggestionsOpen(false)
              setIsFocused(false)
            }}
            onKeyDown={handleKeyDown}
            onPointerDown={(event) => event.stopPropagation()}
            placeholder="Search or enter website name"
            className={`w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400 ${
              isFocused || addressValue ? 'text-left' : 'text-center'
            }`}
          />
        </div>

        {showSuggestions && (
          <ul
            id="safari-address-suggestions"
            role="listbox"
            className="absolute top-full right-0 left-0 z-10 mt-1 max-h-64 overflow-y-auto rounded-lg border border-black/10 bg-white py-1 text-left shadow-lg dark:border-white/10 dark:bg-[#2c2c2e]"
          >
            {suggestions.map((suggestion, index) => {
              const isHighlighted = index === highlightedIndex
              return (
                <li
                  key={suggestion.id}
                  id={suggestion.id}
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectSuggestion(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-1.5 text-sm ${
                    isHighlighted
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  <span className="truncate">{suggestion.label}</span>
                  <span
                    className={`shrink-0 text-xs ${
                      isHighlighted ? 'text-white/80' : 'text-gray-400'
                    }`}
                  >
                    {suggestion.description}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </form>

      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <span title="Share" className="shrink-0">
          <Share aria-hidden className="h-4 w-4 opacity-60" />
        </span>
        <button
          type="button"
          aria-label="New tab"
          onClick={onNewTab}
          className="hover:text-gray-900 dark:hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Show tabs"
          onClick={onToggleTabStrip}
          className="hover:text-gray-900 dark:hover:text-white"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default SafariToolbar
