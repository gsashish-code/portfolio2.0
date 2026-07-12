import { dockApps, navLinks } from '#constants/index'

export interface SearchableItem {
  id: string
  name: string
}

const SEARCHABLE_ITEMS: SearchableItem[] = [
  ...navLinks.map(({ id, name }) => ({ id: `nav-${id}`, name })),
  ...dockApps.map(({ id, name }) => ({ id: `dock-${id}`, name })),
]

export function filterSearchableItems(query: string): SearchableItem[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []
  return SEARCHABLE_ITEMS.filter(({ name }) =>
    name.toLowerCase().includes(trimmed),
  )
}
