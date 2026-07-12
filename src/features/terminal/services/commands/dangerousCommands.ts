import type { OutputLine } from '#features/terminal/types'

interface DangerousPattern {
  test: RegExp
  reply: string
}

/**
 * Playful refusals for the classic "break the terminal" inputs people try
 * first. Checked before normal command resolution — matching here always
 * short-circuits the registry.
 */
const DANGEROUS_PATTERNS: DangerousPattern[] = [
  {
    test: /^rm\s+-rf\s+(\/|\*|--no-preserve-root)/,
    reply:
      "Nice try. This portfolio doesn't have a root — it has a résumé. Try 'resume' instead.",
  },
  {
    test: /^:\(\)\s*\{\s*:\|:&\s*\};\s*:/,
    reply:
      "A fork bomb, in MY portfolio? This terminal has seen zero combat and it's staying that way.",
  },
  {
    test: /^sudo\b/,
    reply:
      "Permission denied: nice try, but you're not root here — this is a portfolio, not a prod server.",
  },
  {
    test: /^su(\s+-|\s+root)?$/,
    reply:
      'Access denied. There is exactly one admin on this machine, and he is busy shipping features.',
  },
  {
    test: /^(shutdown|reboot|halt|poweroff)\b/,
    reply:
      "This isn't your machine to shut down — but I respect the confidence.",
  },
  {
    test: /(mkfs|dd\s+if=\S*\s+of=\/dev|>\s*\/dev\/sd)/,
    reply:
      'That command formats real disks. This one only formats my career. Please leave it be.',
  },
  {
    test: /(curl|wget).*\|\s*(sh|bash|zsh)\b/,
    reply:
      "I don't run scripts piped in from strangers on the internet — good instinct to try, though.",
  },
  {
    test: /^chmod\s+(-r\s+)?777\s+\//,
    reply:
      'Giving the entire filesystem write access to everyone? Bold strategy. Declined.',
  },
  {
    test: /^del\s+\/f\s+\/s\s+\/q/,
    reply: "This isn't Windows, and even if it were: no.",
  },
]

export function matchDangerousCommand(input: string): OutputLine[] | null {
  const normalized = input.trim().toLowerCase()
  const match = DANGEROUS_PATTERNS.find(({ test }) => test.test(normalized))
  if (!match) return null
  return [{ type: 'error', content: match.reply }]
}
