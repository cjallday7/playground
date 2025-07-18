// Simple className utility function (replaces clsx dependency)
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter(Boolean)
    .join(' ')
    .trim()
}

export function formatPlayTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`
}

export function formatCompletionPercentage(percentage: number): string {
  return `${Math.round(percentage)}%`
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    xbox: "hsl(var(--xbox))",
    playstation: "hsl(var(--playstation))",
    steam: "hsl(var(--steam))",
    nintendo: "hsl(var(--nintendo))",
    epic: "hsl(var(--epic))",
    gog: "#8b5fbf",
    ea: "#ff6600",
    hoyoverse: "#4CAF50"
  }
  return colors[platform.toLowerCase()] || "hsl(var(--muted-foreground))"
}

export function getRarityColor(rarity: string): string {
  const rarities: Record<string, string> = {
    common: "text-gray-400",
    uncommon: "text-green-400",
    rare: "text-blue-400",
    epic: "text-purple-400",
    legendary: "text-yellow-400"
  }
  return rarities[rarity.toLowerCase()] || "text-gray-400"
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
} 