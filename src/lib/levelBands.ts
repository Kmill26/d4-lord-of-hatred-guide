import type { LevelingActivity } from '../data/strategy'

/** Parse a range like "45–60" or "1-45" into an inclusive [min, max] band. */
export function parseBand(range: string): [number, number] {
  const parts = range.split(/[–-]/).map((s) => parseInt(s.trim(), 10))
  return [parts[0] || 1, parts[1] || parts[0] || 70]
}

export function inBand(level: number, band: [number, number]): boolean {
  return level >= band[0] && level <= band[1]
}

/** Pick the narrowest activity band that contains this level. */
export function pickActivityAtLevel(
  level: number,
  activities: LevelingActivity[],
): LevelingActivity | undefined {
  const inRange = activities.filter((a) => inBand(level, a.band))
  if (!inRange.length) return undefined
  return inRange.reduce((best, a) => {
    const bestSpan = best.band[1] - best.band[0]
    const span = a.band[1] - a.band[0]
    return span < bestSpan ? a : best
  })
}