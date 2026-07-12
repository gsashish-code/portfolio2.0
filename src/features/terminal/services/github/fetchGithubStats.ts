export interface GithubStats {
  username: string
  publicRepos: number
  followers: number
  following: number
}

const GITHUB_API_BASE = 'https://api.github.com/users'

interface GithubUserResponse {
  login: string
  public_repos: number
  followers: number
  following: number
}

export async function fetchGithubStats(username: string): Promise<GithubStats> {
  const response = await fetch(`${GITHUB_API_BASE}/${username}`)
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`)
  }

  const data = (await response.json()) as GithubUserResponse
  return {
    username: data.login,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
  }
}
