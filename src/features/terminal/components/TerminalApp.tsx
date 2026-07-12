import { useEffect, useRef } from 'react'

import { useTerminal } from '../hooks/useTerminal'
import BootLine from './BootLine'
import OutputRenderer from './OutputRenderer'
import PromptLine from './PromptLine'

function TerminalApp() {
  const { input, output, setInput, handleKeyDown } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [output])

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full w-full overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-[#e5e5e5]"
    >
      {output.length === 0 && <BootLine />}
      <OutputRenderer lines={output} />
      <PromptLine
        value={input}
        onChange={setInput}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
    </div>
  )
}

export default TerminalApp
