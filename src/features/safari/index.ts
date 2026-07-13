import WindowWrapper from '#hoc/WindowWrapper'

import SafariApp from './components/SafariApp'
import {
  SAFARI_DEFAULT_HEIGHT,
  SAFARI_DEFAULT_TITLE,
  SAFARI_DEFAULT_WIDTH,
  SAFARI_WINDOW_ID,
} from './constants'

const Safari = WindowWrapper(
  SafariApp,
  SAFARI_WINDOW_ID,
  SAFARI_DEFAULT_TITLE,
  {
    defaultWidth: SAFARI_DEFAULT_WIDTH,
    defaultHeight: SAFARI_DEFAULT_HEIGHT,
    chrome: 'none',
  },
)

export default Safari
