import { queryClient } from '#app/providers/queryClient'
import { GITHUB_USERNAME } from '#database'
import type { Command } from '#features/terminal/types'
import { fetchGithubStats } from '#services/github/fetchGithubStats'
import useSettingsStore from '#store/settings'

export const githubStatsCommand: Command = {
  name: 'github stats',
  description: 'Live stats pulled from the GitHub REST API',
  run: async () => {
    if (!useSettingsStore.getState().wifiEnabled || !navigator.onLine) {
      return [
        {
          type: 'error',
          content:
            'You are not connected to the internet. Turn Wi-Fi on in Control Center and try again.',
        },
      ]
    }

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
