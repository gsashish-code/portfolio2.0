import { Heart, History, Image, MapPin, Users } from 'lucide-react'

import type {
  Photo,
  PhotoGroup,
  SidebarSection,
  SidebarSectionId,
} from '../types'

/**
 * Each section reads from its own `public/images/photos/<section>/` folder.
 * To add a photo: drop the file in that folder, then add one entry here —
 * a static manifest is required because a Vite SPA has no way to list a
 * public folder's contents at runtime (public/ assets are copied verbatim,
 * outside Vite's module graph). The payoff: PhotoGrid itself places any
 * number of photos without layout changes, so once an entry is added here
 * it just appears, correctly laid out.
 */
function photo(
  section: string,
  id: string,
  alt: string,
  favorite = false,
): Photo {
  return { id, src: `/images/photos/${section}/${id}.png`, alt, favorite }
}

const LIBRARY_GROUPS: PhotoGroup[] = [
  {
    date: 'Jun 7, 2025',
    photos: [
      photo(
        'library',
        'gsashish1',
        'Standing in the sea at sunset, wearing a green polo',
        true,
      ),
      photo('library', 'gsashish2', 'Selfie at a colorful temple courtyard'),
      photo('library', 'gsashish3', 'Laughing at a rooftop café table'),
      photo('library', 'gsashish4', 'Portrait on a sunlit balcony, glasses on'),
    ],
  },
  {
    date: 'Mar 15, 2025',
    photos: [
      photo(
        'library',
        'gsashish5',
        'Candid laugh on a balcony, orange earbud visible',
      ),
      photo('library', 'gsashish6', 'Walking through a mall holding a drink'),
    ],
  },
]

const MEMORIES_GROUPS: PhotoGroup[] = [
  {
    date: 'Jun 7, 2025',
    photos: [
      photo(
        'memories',
        'gsashish10',
        'Standing on the shore in a teal polo, palm trees in the distance',
      ),
      photo(
        'memories',
        'gsashish7',
        'Standing on a rocky breakwater in a maroon polo, ocean behind',
      ),
      photo(
        'memories',
        'gsashish8',
        'Sitting on breakwater rocks looking out at the waves',
      ),
      photo(
        'memories',
        'gsashish16',
        'Coastal highway running alongside the beach at sunrise',
      ),
      photo(
        'memories',
        'gsashish17',
        'Empty bridge stretching toward a tree-lined island',
      ),
      photo(
        'memories',
        'gsashish11',
        'Aerial view of a river winding through green mangrove islands',
      ),
      photo(
        'memories',
        'gsashish9',
        'Sitting with two friends on breakwater rocks at sunset',
      ),
      photo(
        'memories',
        'gsashish13',
        'Silhouette of four friends watching the sunset on the rocks',
      ),
      photo(
        'memories',
        'gsashish14',
        'A second silhouette shot of the same sunset gathering',
      ),
      photo(
        'memories',
        'gsashish15',
        'Sitting alone on the breakwater rocks, watching the sunset',
      ),
      photo(
        'memories',
        'gsashish12',
        'Ocean horizon at dusk with the sun setting behind clouds',
      ),
    ],
  },
]
const PLACES_GROUPS: PhotoGroup[] = []
const PEOPLE_GROUPS: PhotoGroup[] = []

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
