import type { LucideIcon } from 'lucide-react'

export interface Photo {
  id: string
  src: string
  alt: string
  /** Surfaced in the Favorites tab — Favorites is a filter over other
   * sections' photos, not its own uploaded folder. */
  favorite?: boolean
}

export interface PhotoGroup {
  date: string
  photos: Photo[]
}

export type SidebarSectionId =
  'library' | 'memories' | 'places' | 'people' | 'favorites'

export interface SidebarSection {
  id: SidebarSectionId
  label: string
  icon: LucideIcon
}
