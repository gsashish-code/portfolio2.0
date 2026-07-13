import {
  LIBRARY_GROUPS,
  MEMORIES_GROUPS,
  PEOPLE_GROUPS,
  PLACES_GROUPS,
} from '#database'
import { Heart, History, Image, MapPin, Users } from 'lucide-react'

import type { PhotoGroup, SidebarSection, SidebarSectionId } from '../types'

function collectFavorites(sections: PhotoGroup[][]): PhotoGroup[] {
  const favorites = sections
    .flatMap((groups) => groups.flatMap((group) => group.photos))
    .filter((favoritePhoto) => favoritePhoto.favorite)

  return favorites.length > 0 ? [{ date: 'Favorites', photos: favorites }] : []
}

export const PHOTO_GROUPS_BY_SECTION: Record<SidebarSectionId, PhotoGroup[]> = {
  library: LIBRARY_GROUPS,
  memories: MEMORIES_GROUPS,
  places: PLACES_GROUPS,
  people: PEOPLE_GROUPS,
  favorites: collectFavorites([
    LIBRARY_GROUPS,
    MEMORIES_GROUPS,
    PLACES_GROUPS,
    PEOPLE_GROUPS,
  ]),
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  { id: 'library', label: 'Library', icon: Image },
  { id: 'memories', label: 'Memories', icon: History },
  { id: 'places', label: 'Places', icon: MapPin },
  { id: 'people', label: 'People', icon: Users },
  { id: 'favorites', label: 'Favorites', icon: Heart },
]
