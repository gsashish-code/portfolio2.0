import { useState } from 'react'

import type { SafariTab, TabView } from '../types'

let nextTabId = 1
const createTab = (): SafariTab => ({
  id: `tab-${nextTabId++}`,
  history: [{ kind: 'home' }],
  historyIndex: 0,
})

function viewsEqual(a: TabView, b: TabView): boolean {
  if (a.kind !== b.kind) return false
  if (a.kind === 'search' && b.kind === 'search') return a.query === b.query
  if (a.kind === 'site' && b.kind === 'site') return a.url === b.url
  if (a.kind === 'about' && b.kind === 'about') return a.page === b.page
  return true
}

interface UseSafariTabsResult {
  tabs: SafariTab[]
  activeTabId: string
  activeTab: SafariTab
  activeView: TabView
  canGoBack: boolean
  canGoForward: boolean
  addTab: () => void
  /** Closes the tab; returns true if it was the last tab (caller should close the window instead). */
  closeTab: (id: string) => boolean
  switchTab: (id: string) => void
  navigate: (view: TabView) => void
  goBack: () => void
  goForward: () => void
}

/**
 * Per-tab browser history (home | search), all local to the Safari window —
 * nothing outside Safari needs to read or drive this, so it's a hook rather
 * than a Zustand store (same call PhotosApp made for its own sidebar state).
 */
export function useSafariTabs(): UseSafariTabsResult {
  const [tabs, setTabs] = useState<SafariTab[]>(() => [createTab()])
  const [activeTabId, setActiveTabId] = useState(() => tabs[0].id)

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]
  const activeView = activeTab.history[activeTab.historyIndex]

  const updateTab = (id: string, updater: (tab: SafariTab) => SafariTab) => {
    setTabs((prev) => prev.map((tab) => (tab.id === id ? updater(tab) : tab)))
  }

  const addTab = () => {
    const tab = createTab()
    setTabs((prev) => [...prev, tab])
    setActiveTabId(tab.id)
  }

  const closeTab = (id: string): boolean => {
    if (tabs.length <= 1) return true

    const closingIndex = tabs.findIndex((tab) => tab.id === id)
    const remaining = tabs.filter((tab) => tab.id !== id)
    setTabs(remaining)

    if (activeTabId === id) {
      const fallback = remaining[Math.max(0, closingIndex - 1)]
      setActiveTabId(fallback.id)
    }
    return false
  }

  const switchTab = (id: string) => setActiveTabId(id)

  const navigate = (view: TabView) => {
    updateTab(activeTabId, (tab) => {
      const current = tab.history[tab.historyIndex]
      if (viewsEqual(current, view)) return tab

      const history = [...tab.history.slice(0, tab.historyIndex + 1), view]
      return { ...tab, history, historyIndex: history.length - 1 }
    })
  }

  const goBack = () => {
    updateTab(activeTabId, (tab) =>
      tab.historyIndex > 0
        ? { ...tab, historyIndex: tab.historyIndex - 1 }
        : tab,
    )
  }

  const goForward = () => {
    updateTab(activeTabId, (tab) =>
      tab.historyIndex < tab.history.length - 1
        ? { ...tab, historyIndex: tab.historyIndex + 1 }
        : tab,
    )
  }

  return {
    tabs,
    activeTabId,
    activeTab,
    activeView,
    canGoBack: activeTab.historyIndex > 0,
    canGoForward: activeTab.historyIndex < activeTab.history.length - 1,
    addTab,
    closeTab,
    switchTab,
    navigate,
    goBack,
    goForward,
  }
}
