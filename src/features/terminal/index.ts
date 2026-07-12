import WindowWrapper from '#hoc/WindowWrapper'

import TerminalApp from './components/TerminalApp'
import { TERMINAL_DEFAULT_TITLE, TERMINAL_WINDOW_ID } from './constants'

const Terminal = WindowWrapper(
  TerminalApp,
  TERMINAL_WINDOW_ID,
  TERMINAL_DEFAULT_TITLE,
)

export default Terminal
