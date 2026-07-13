import { BookOpen } from 'lucide-react'

interface SafariSidebarProps {
  onSelectHome: () => void
}

function SafariSidebar({ onSelectHome }: SafariSidebarProps) {
  return (
    <aside className="w-44 shrink-0 border-r border-black/10 bg-gray-50 p-3 dark:border-white/10 dark:bg-[#1c1c1e]">
      <p className="mb-2 px-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
        Favorites
      </p>
      <button
        type="button"
        onClick={onSelectHome}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10"
      >
        <BookOpen className="h-4 w-4 shrink-0 text-[#ff375f]" />
        My Developer Blog
      </button>
    </aside>
  )
}

export default SafariSidebar
