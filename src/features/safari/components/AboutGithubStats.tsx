import { useQuery } from '@tanstack/react-query'

import { GITHUB_USERNAME } from '#database'
import { fetchGithubStats } from '#services/github/fetchGithubStats'
import useSettingsStore from '#store/settings'

/** about://github-stats — the same live lookup the terminal's `github stats` command runs. */
function AboutGithubStats() {
  const wifiEnabled = useSettingsStore((state) => state.wifiEnabled)
  const isOnline = wifiEnabled && navigator.onLine

  const { data, isLoading, isError } = useQuery({
    queryKey: ['github-stats', GITHUB_USERNAME],
    queryFn: () => fetchGithubStats(GITHUB_USERNAME),
    staleTime: 5 * 60 * 1000,
    enabled: isOnline,
  })

  return (
    <div className="mx-auto max-w-md px-8 py-10 text-center">
      <h2 className="mb-6 text-lg font-bold text-[#ff375f]">GitHub Stats</h2>

      {!isOnline ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          You are not connected to the internet. Turn Wi-Fi on in Control Center
          and try again.
        </p>
      ) : isLoading ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">Loading…</p>
      ) : isError || !data ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Couldn&rsquo;t reach the GitHub API for &ldquo;{GITHUB_USERNAME}
          &rdquo; — rate-limited or offline.
        </p>
      ) : (
        <dl className="space-y-3 text-left">
          {[
            { label: 'Public repos', value: data.publicRepos },
            { label: 'Followers', value: data.followers },
            { label: 'Following', value: data.following },
          ].map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                {row.label}
              </dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

export default AboutGithubStats
