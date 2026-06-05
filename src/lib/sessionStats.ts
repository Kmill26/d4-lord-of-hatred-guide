export interface SessionStats {
  startedAt: number
  levelsMarked: number
  lastBuildId: string
}

const SESSION_KEY = 'd4_loh_session'
const CHANGED = 'd4-session-changed'

let cache: SessionStats | null = null
let cacheRaw: string | null = null

function invalidateCache(): void {
  cache = null
  cacheRaw = null
}

function readRaw(): SessionStats | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SessionStats>
    if (!parsed.startedAt || typeof parsed.levelsMarked !== 'number') return null
    return {
      startedAt: parsed.startedAt,
      levelsMarked: parsed.levelsMarked,
      lastBuildId: parsed.lastBuildId ?? '',
    }
  } catch {
    return null
  }
}

function write(stats: SessionStats): void {
  try {
    const raw = JSON.stringify(stats)
    sessionStorage.setItem(SESSION_KEY, raw)
    cacheRaw = raw
    cache = stats
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CHANGED))
    }
  } catch {
    /* sessionStorage blocked */
  }
}

export function subscribeSession(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onChange = () => {
    invalidateCache()
    listener()
  }
  window.addEventListener(CHANGED, onChange)
  return () => window.removeEventListener(CHANGED, onChange)
}

export function getSessionStats(): SessionStats | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw === cacheRaw) return cache
    cacheRaw = raw
    cache = readRaw()
    return cache
  } catch {
    return null
  }
}

/** Touch session on build change; starts a new session if none exists. */
export function touchSession(buildId: string): SessionStats {
  const cur = readRaw()
  if (!cur) {
    const next = { startedAt: Date.now(), levelsMarked: 0, lastBuildId: buildId }
    write(next)
    return next
  }
  if (cur.lastBuildId !== buildId) {
    const next = { ...cur, lastBuildId: buildId }
    write(next)
    return next
  }
  return cur
}

/** Increment levels marked — call only when a level is newly completed. */
export function recordLevelAdvance(buildId: string): SessionStats {
  const cur = touchSession(buildId)
  const next = { ...cur, levelsMarked: cur.levelsMarked + 1, lastBuildId: buildId }
  write(next)
  return next
}

export function formatSessionDuration(startedAt: number, now: number = Date.now()): string {
  const ms = Math.max(0, now - startedAt)
  const mins = Math.floor(ms / 60_000)
  if (mins < 1) return '<1 min'
  if (mins < 60) return `${mins} min`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return rem ? `${hrs}h ${rem}m` : `${hrs}h`
}