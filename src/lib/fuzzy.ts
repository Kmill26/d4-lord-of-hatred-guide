/**
 * Tiny dependency-free fuzzy matcher used by the command palette and searches.
 *
 * `fuzzyScore` returns null when the query's characters don't appear in order
 * in the target, otherwise a score where higher = better (consecutive runs,
 * word-boundary and prefix hits are rewarded). `fuzzyHighlight` returns the
 * matched character indices so the UI can bold them.
 */
export interface FuzzyResult {
  score: number
  /** Indices in the target string that matched, in order. */
  matches: number[]
}

export function fuzzyMatch(query: string, target: string): FuzzyResult | null {
  const q = query.trim().toLowerCase()
  if (!q) return { score: 0, matches: [] }
  const t = target.toLowerCase()
  let qi = 0
  let score = 0
  let run = 0
  let prevMatch = -2
  const matches: number[] = []
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      matches.push(ti)
      // Consecutive characters form a run — reward longer runs quadratically-ish.
      run = ti === prevMatch + 1 ? run + 1 : 1
      let pts = 1 + run
      // Word-boundary / start bonus.
      const before = ti === 0 ? ' ' : t[ti - 1]
      if (ti === 0) pts += 6
      else if (before === ' ' || before === '-' || before === '/' || before === ':') pts += 4
      score += pts
      prevMatch = ti
      qi++
    }
  }
  if (qi < q.length) return null
  // Prefer shorter targets and earlier first-match.
  score += Math.max(0, 12 - (matches[0] ?? 0))
  score -= t.length * 0.05
  return { score, matches }
}

/** Convenience boolean wrapper. */
export function fuzzyTest(query: string, target: string): boolean {
  return fuzzyMatch(query, target) !== null
}

/** Split a string into [text, isMatch] segments for highlight rendering. */
export function fuzzySegments(
  target: string,
  matches: number[],
): Array<{ text: string; hit: boolean }> {
  if (!matches.length) return [{ text: target, hit: false }]
  const set = new Set(matches)
  const out: Array<{ text: string; hit: boolean }> = []
  let buf = ''
  let bufHit = set.has(0)
  for (let i = 0; i < target.length; i++) {
    const hit = set.has(i)
    if (hit === bufHit) {
      buf += target[i]
    } else {
      if (buf) out.push({ text: buf, hit: bufHit })
      buf = target[i]
      bufHit = hit
    }
  }
  if (buf) out.push({ text: buf, hit: bufHit })
  return out
}
