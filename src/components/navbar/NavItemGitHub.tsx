import { SOURCE_CODE_GITHUB_REPO } from "@/config/site"

import { GitHubStars } from "./GitHubStars"

async function getStargazerCount() {
  try {
    const token = process.env.GITHUB_API_TOKEN
    const response = await fetch(
      `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as { stargazers_count?: number }
    const stargazersCount = Number(payload.stargazers_count)

    if (!Number.isFinite(stargazersCount) || stargazersCount <= 0) {
      return null
    }

    return stargazersCount
  } catch {
    return null
  }
}

export async function NavItemGitHub() {
  const stargazersCount = await getStargazerCount()

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  )
}
