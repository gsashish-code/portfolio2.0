export type OutputLine =
  | { type: 'command'; prompt: string; input: string }
  | { type: 'text'; content: string; tone?: 'default' | 'muted' }
  | { type: 'success'; content: string }
  | { type: 'error'; content: string }
  | { type: 'link'; label: string; href: string }
  | {
      type: 'table'
      headers: [string, string]
      rows: { cells: [string, string]; ok?: boolean }[]
    }
  | {
      type: 'profile'
      avatar: string
      fields: { label: string; value: string }[]
    }

export interface CommandContext {
  openWindow: (windowId: string, data?: unknown) => void
  setTitle: (title: string | undefined) => void
}

export type CommandResult = OutputLine[] | Promise<OutputLine[]>

export interface Command {
  /** Normalized (lowercase, single-spaced) invocation, e.g. "show techstack". */
  name: string
  description: string
  /** Text after the command name, verbatim (only `echo` uses this). */
  run: (rawArgs: string, ctx: CommandContext) => CommandResult
}
