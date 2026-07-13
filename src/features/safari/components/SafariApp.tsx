import { useState, type RefObject } from 'react'

import useWindowStore from '#store/window'

import { SAFARI_WINDOW_ID } from '../constants'
import { useSafariTabs } from '../hooks/useSafariTabs'
import type { TabView } from '../types'
import { isLikelyUrl, normalizeUrl, parseAboutUrl } from '../utils/url'
import AboutGithubStats from './AboutGithubStats'
import AboutMe from './AboutMe'
import AboutProjects from './AboutProjects'
import BlogList from './BlogList'
import SafariSidebar from './SafariSidebar'
import SafariTabStrip from './SafariTabStrip'
import SafariToolbar from './SafariToolbar'
import SearchResults from './SearchResults'
import SiteVisit from './SiteVisit'

interface SafariAppProps {
  data?: unknown
  dragHandleRef?: RefObject<HTMLDivElement | null>
}

function SafariApp({ dragHandleRef }: SafariAppProps) {
  const closeWindow = useWindowStore((state) => state.closeWindow)
  const {
    tabs,
    activeTabId,
    activeView,
    canGoBack,
    canGoForward,
    addTab,
    closeTab,
    switchTab,
    navigate,
    goBack,
    goForward,
  } = useSafariTabs()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTabStripOpen, setIsTabStripOpen] = useState(false)
  const [addressDraft, setAddressDraft] = useState('')
  const [addressFocusToken, setAddressFocusToken] = useState(0)
  // Tracks which view the draft was last synced from, so typing (which
  // doesn't change activeView) is never clobbered — only an actual
  // navigation/tab-switch/back-forward is. Comparing by reference works
  // because `tabs` state is only replaced on a real navigation; unrelated
  // re-renders (e.g. from typing) return the exact same view object.
  const [syncedView, setSyncedView] = useState<TabView>(activeView)

  const showTabStrip = isTabStripOpen || tabs.length > 1

  if (activeView !== syncedView) {
    setSyncedView(activeView)
    setAddressDraft(
      activeView.kind === 'home'
        ? ''
        : activeView.kind === 'search'
          ? activeView.query
          : activeView.kind === 'site'
            ? activeView.url
            : `about://${activeView.page}`,
    )
  }

  const handleAddressSubmit = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const aboutPage = parseAboutUrl(trimmed)
    if (aboutPage) {
      navigate(
        aboutPage === 'blogs'
          ? { kind: 'home' }
          : { kind: 'about', page: aboutPage },
      )
      return
    }

    if (isLikelyUrl(trimmed)) {
      const url = normalizeUrl(trimmed)
      // Real sites mostly refuse to be framed (X-Frame-Options/CSP), so
      // "visiting" one opens an actual browser tab; this window just
      // confirms it happened, matching real Safari's own behavior for
      // sites it can't render.
      window.open(url, '_blank', 'noopener,noreferrer')
      navigate({ kind: 'site', url })
      return
    }

    navigate({ kind: 'search', query: trimmed })
  }

  const handleNewTab = () => {
    addTab()
    setAddressFocusToken((token) => token + 1)
  }

  const handleCloseTab = (id: string) => {
    const wasLastTab = closeTab(id)
    if (wasLastTab) closeWindow(SAFARI_WINDOW_ID)
  }

  const handleNavigateHome = () => navigate({ kind: 'home' })

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#1c1c1e]">
      <SafariToolbar
        dragHandleRef={dragHandleRef}
        onClose={() => closeWindow(SAFARI_WINDOW_ID)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onBack={goBack}
        onForward={goForward}
        addressValue={addressDraft}
        addressFocusToken={addressFocusToken}
        onAddressChange={setAddressDraft}
        onAddressSubmit={handleAddressSubmit}
        onNewTab={handleNewTab}
        onToggleTabStrip={() => setIsTabStripOpen((prev) => !prev)}
      />

      {showTabStrip && (
        <SafariTabStrip
          tabs={tabs}
          activeTabId={activeTabId}
          onSwitch={switchTab}
          onClose={handleCloseTab}
        />
      )}

      <div className="flex min-h-0 flex-1">
        {isSidebarOpen && <SafariSidebar onSelectHome={handleNavigateHome} />}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {activeView.kind === 'home' ? (
            <BlogList />
          ) : activeView.kind === 'site' ? (
            <SiteVisit url={activeView.url} />
          ) : activeView.kind === 'about' ? (
            activeView.page === 'projects' ? (
              <AboutProjects />
            ) : activeView.page === 'me' ? (
              <AboutMe />
            ) : (
              <AboutGithubStats />
            )
          ) : (
            <SearchResults query={activeView.query} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SafariApp
