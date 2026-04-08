const AVERAGE_WPM = 220
const IMAGE_TIME_MINUTES = 0.5

export interface ReadTimeResult {
  readTimeMinutes: number
  readTimeText: string
}

export function estimateReadTime(content: string): ReadTimeResult {
  const markdownImageMatches = content.match(/!\[[^\]]*\]\([^)]*\)/g) ?? []
  const htmlImageMatches = content.match(/<img\b[^>]*>/g) ?? []
  const mdxImageMatches = content.match(/<Image\b[^>]*\/?\s*>/g) ?? []
  const imageCount =
    markdownImageMatches.length + htmlImageMatches.length + mdxImageMatches.length

  const cleanedContent = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]+/g, " ")

  const words = cleanedContent.trim().split(/\s+/).filter(Boolean).length
  const baseMinutes = words / AVERAGE_WPM
  const minutes = Math.max(1, Math.ceil(baseMinutes + imageCount * IMAGE_TIME_MINUTES))

  return {
    readTimeMinutes: minutes,
    readTimeText: `${minutes} min read`,
  }
}
