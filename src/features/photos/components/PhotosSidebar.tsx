import type { SidebarSection, SidebarSectionId } from '../types'

interface PhotosSidebarProps {
  sections: SidebarSection[]
  activeId: SidebarSectionId
  onSelect: (id: SidebarSectionId) => void
}

function PhotosSidebar({ sections, activeId, onSelect }: PhotosSidebarProps) {
  return (
    // Deliberately <aside>, not <nav>: this repo has a global `nav ul { flex
    // ... }` base style meant for the top menu bar (see index.css) that
    // would otherwise force this sidebar list into a horizontal row.
    <aside
      aria-label="Photos sections"
      className="w-44 shrink-0 border-r border-white/10 bg-[#1c1c1e] p-3"
    >
      <p className="px-2 pb-2 text-xs font-medium text-gray-500">Photos</p>
      <ul className="space-y-0.5">
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              aria-current={id === activeId ? 'true' : undefined}
              onClick={() => onSelect(id)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                id === activeId
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Icon className="size-4" strokeWidth={2} aria-hidden />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default PhotosSidebar
