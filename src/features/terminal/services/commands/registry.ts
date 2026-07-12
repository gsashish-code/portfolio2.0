import type {
  Command,
  CommandContext,
  OutputLine,
} from '#features/terminal/types'

import { matchDangerousCommand } from './dangerousCommands'
import { dateCommand } from './date'
import { echoCommand } from './echo'
import { githubStatsCommand } from './githubStats'
import { helpCommand } from './help'
import { historyCommand } from './history'
import { blogCommand } from './blog'
import { lsCommand } from './ls'
import { projectsCommand } from './projects'
import { resumeCommand } from './resume'
import { techstackCommand } from './techstack'
import { whoamiCommand } from './whoami'

const COMMANDS: Command[] = [
  helpCommand,
  whoamiCommand,
  techstackCommand,
  githubStatsCommand,
  lsCommand,
  projectsCommand,
  resumeCommand,
  historyCommand,
  dateCommand,
  blogCommand,
]

const COMMAND_MAP = new Map(COMMANDS.map((command) => [command.name, command]))

/** Window-title text shown in the title bar while a command's output is on screen. */
const TITLE_CONTEXT: Record<string, string> = {
  'show techstack': 'Tech Stack — zsh — 80×24',
  'github stats': 'GitHub Stats — zsh — 80×24',
}

export async function dispatchCommand(
  raw: string,
  ctx: CommandContext,
): Promise<OutputLine[]> {
  const trimmed = raw.trim()
  if (!trimmed) return []

  const dangerousReply = matchDangerousCommand(trimmed)
  if (dangerousReply) {
    ctx.setTitle(undefined)
    return dangerousReply
  }

  const lower = trimmed.toLowerCase()

  if (lower === 'echo' || lower.startsWith('echo ')) {
    ctx.setTitle(undefined)
    return echoCommand.run(lower === 'echo' ? '' : trimmed.slice(5), ctx)
  }

  const lookupKey = lower === 'blogs' ? 'blog' : lower
  const command = COMMAND_MAP.get(lookupKey)

  if (!command) {
    ctx.setTitle(undefined)
    return [
      {
        type: 'error',
        content: `command not found: ${trimmed}. Type 'help' for available commands.`,
      },
    ]
  }

  ctx.setTitle(TITLE_CONTEXT[lookupKey])
  return command.run('', ctx)
}
