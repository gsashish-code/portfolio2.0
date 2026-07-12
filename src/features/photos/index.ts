import WindowWrapper from '#hoc/WindowWrapper'

import PhotosApp from './components/PhotosApp'
import {
  PHOTOS_DEFAULT_HEIGHT,
  PHOTOS_DEFAULT_TITLE,
  PHOTOS_DEFAULT_WIDTH,
  PHOTOS_WINDOW_ID,
} from './constants'

const Photos = WindowWrapper(
  PhotosApp,
  PHOTOS_WINDOW_ID,
  PHOTOS_DEFAULT_TITLE,
  {
    defaultWidth: PHOTOS_DEFAULT_WIDTH,
    defaultHeight: PHOTOS_DEFAULT_HEIGHT,
  },
)

export default Photos
