import { queryClient } from '#app/providers/queryClient'
import type { Command } from '#features/terminal/types'

import { fetchGithubStats } from '../github/fetchGithubStats'

export const GITHUB_USERNAME = 'gsashish-code'

export const githubStatsCommand: Command = {
  name: 'github stats',
  description: 'Live stats pulled from the GitHub REST API',
  run: async () => {
    try {
      const stats = await queryClient.fetchQuery({
        queryKey: ['github-stats', GITHUB_USERNAME],
        queryFn: () => fetchGithubStats(GITHUB_USERNAME),
        staleTime: 5 * 60 * 1000,
      })

      return [
        {
          type: 'table',
          headers: ['Metric', 'Value'],
          rows: [
            { cells: ['Public repos', String(stats.publicRepos)], ok: true },
            { cells: ['Followers', String(stats.followers)], ok: true },
            { cells: ['Following', String(stats.following)], ok: true },
          ],
        },
        {
          type: 'success',
          content: `Fetched live from github.com/${stats.username}`,
        },
      ]
    } catch {
      return [
        {
          type: 'error',
          content: `Couldn't reach the GitHub API for "${GITHUB_USERNAME}" — rate-limited or offline. Try again shortly.`,
        },
      ]
    }
  },
}
