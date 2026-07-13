import { X } from 'lucide-react'

import type { SafariTab } from '../types'
import { getHostname } from '../utils/url'

interface SafariTabStripProps {
  tabs: SafariTab[]
  activeTabId: string
  onSwitch: (id: string) => void
  onClose: (id: string) => void
}

function tabLabel(tab: SafariTab): string {
  const view = tab.history[tab.historyIndex]
  if (view.kind === 'home') return 'New Tab'
  if (view.kind === 'site') return getHostname(view.url)
  if (view.kind === 'about') return `about://${view.page}`
  return view.query
}

function SafariTabStrip({
  tabs,
  activeTabId,
  onSwitch,
  onClose,
}: SafariTabStripProps) {
  return (
    <div className="flex gap-1 border-b border-black/10 bg-[#ececec] px-2 pt-1.5 dark:border-white/10 dark:bg-[#242426]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId
        return (
          <div
            key={tab.id}
            onClick={() => onSwitch(tab.id)}
            className={`group flex max-w-40 min-w-0 cursor-pointer items-center gap-2 rounded-t-md px-3 py-1.5 text-xs ${
              isActive
                ? 'bg-white text-gray-900 dark:bg-[#1c1c1e] dark:text-gray-100'
                : 'text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'
            }`}
          >
            <span className="truncate">{tabLabel(tab)}</span>
            <button
              type="button"
              aria-label="Close tab"
              onClick={(event) => {
                event.stopPropagation()
                onClose(tab.id)
              }}
              className="ml-auto shrink-0 rounded-full p-0.5 opacity-0 hover:bg-black/10 group-hover:opacity-100 dark:hover:bg-white/10"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SafariTabStrip
