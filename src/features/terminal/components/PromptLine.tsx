import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type RefObject,
  type SyntheticEvent,
} from 'react'

import { TERMINAL_PROMPT } from '../constants'

interface PromptLineProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
}

function PromptLine({ value, onChange, onKeyDown, inputRef }: PromptLineProps) {
  const [cursorIndex, setCursorIndex] = useState(value.length)
  const pendingEndResetRef = useRef(false)

  const syncCursor = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    setCursorIndex(target.selectionStart ?? target.value.length)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    setCursorIndex(event.target.selectionStart ?? event.target.value.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Up/Down recall history externally (via the store) — the resulting
    // value swap should land the caret at the end, like a real shell.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      pendingEndResetRef.current = true
    }
    onKeyDown(event)
  }

  useEffect(() => {
    if (pendingEndResetRef.current) {
      setCursorIndex(value.length)
      pendingEndResetRef.current = false
    }
  }, [value])

  const before = value.slice(0, cursorIndex)
  const after = value.slice(cursorIndex)

  return (
    <div className="flex items-start gap-2">
      <span className="shrink-0 text-[#8e8e93]">{TERMINAL_PROMPT}</span>
      <div className="relative flex-1">
        <span aria-hidden className="whitespace-pre-wrap break-all">
          {before}
          <span className="ml-px inline-block h-[1em] w-[7px] translate-y-[2px] animate-[terminal-caret-blink_1s_step-end_infinite] bg-[#e5e5e5] motion-reduce:animate-none" />
          {after}
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={syncCursor}
          onClick={syncCursor}
          onSelect={syncCursor}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command input"
          className="absolute inset-0 h-full w-full resize-none bg-transparent text-transparent caret-transparent outline-none"
        />
      </div>
    </div>
  )
}

export default PromptLine
