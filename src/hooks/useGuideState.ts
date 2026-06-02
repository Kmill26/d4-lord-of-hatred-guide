import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUILD_BY_ID, DEFAULT_BUILD_ID, LEVEL_CAP } from '../data/builds'
import type { Build } from '../data/types'

export type ViewId =
  | 'paths'
  | 'guide'
  | 'quickref'
  | 'builds'
  | 'tiers'
  | 'route'
  | 'systems'
  | 'advisor'

export const VIEW_IDS: ViewId[] = [
  'paths',
  'guide',
  'quickref',
  'builds',
  'tiers',
  'route',
  'systems',
  'advisor',
]

const STORAGE_KEY = 'd4_loh_guide_v2'

interface BuildProgress {
  completed: number[]
  flags: number[]
}

interface PersistShape {
  buildId: string
  level: number
  view: ViewId
  progress: Record<string, BuildProgress>
}

export const clampLevel = (lvl: number): number =>
  Math.max(1, Math.min(LEVEL_CAP, Math.round(lvl) || 1))

/** localStorage with an in-memory fallback (private mode / blocked storage). */
const storage = (() => {
  const mem = new Map<string, string>()
  let ok = false
  try {
    if (typeof localStorage !== 'undefined') {
      const t = '__t__'
      localStorage.setItem(t, t)
      localStorage.removeItem(t)
      ok = true
    }
  } catch {
    ok = false
  }
  return {
    get(k: string): string | null {
      try {
        return ok ? localStorage.getItem(k) : mem.get(k) ?? null
      } catch {
        return mem.get(k) ?? null
      }
    },
    set(k: string, v: string): void {
      try {
        if (ok) localStorage.setItem(k, v)
        else mem.set(k, v)
      } catch {
        mem.set(k, v)
      }
    },
  }
})()

function parseHash(): { buildId?: string; level?: number } {
  const hash = typeof location !== 'undefined' ? location.hash.replace(/^#/, '') : ''
  if (!hash) return {}
  const [bid, lvl] = hash.split('/')
  const out: { buildId?: string; level?: number } = {}
  if (bid && BUILD_BY_ID[bid]) out.buildId = bid
  if (lvl && /^\d+$/.test(lvl)) out.level = clampLevel(parseInt(lvl, 10))
  return out
}

function loadInitial(): PersistShape {
  let saved: Partial<PersistShape>
  try {
    saved = JSON.parse(storage.get(STORAGE_KEY) || '{}') as Partial<PersistShape>
  } catch {
    saved = {}
  }
  const fromHash = parseHash()
  const buildId =
    fromHash.buildId ??
    (saved.buildId && BUILD_BY_ID[saved.buildId] ? saved.buildId : DEFAULT_BUILD_ID)
  const hadState = !!saved.buildId
  return {
    buildId,
    level: clampLevel(fromHash.level ?? saved.level ?? 1),
    view: saved.view && VIEW_IDS.includes(saved.view) ? saved.view : hadState ? 'guide' : 'paths',
    progress: saved.progress ?? {},
  }
}

export interface GuideState {
  build: Build
  level: number
  view: ViewId
  completed: Set<number>
  flags: Set<number>
  selectBuild: (id: string, opts?: { keepLevel?: boolean; view?: ViewId }) => void
  goToLevel: (lvl: number) => void
  advance: () => void
  toggleFlag: (lvl?: number) => void
  resetLevel: () => void
  setView: (view: ViewId) => void
}

const emptyProgress = (): BuildProgress => ({ completed: [], flags: [] })

export function useGuideState(): GuideState {
  const [s, setS] = useState<PersistShape>(loadInitial)

  const { buildId, level, view, progress } = s
  const build = BUILD_BY_ID[buildId] ?? BUILD_BY_ID[DEFAULT_BUILD_ID]

  const completed = useMemo(() => new Set(progress[buildId]?.completed ?? []), [progress, buildId])
  const flags = useMemo(() => new Set(progress[buildId]?.flags ?? []), [progress, buildId])

  // Persist + reflect state in the URL hash.
  useEffect(() => {
    storage.set(STORAGE_KEY, JSON.stringify(s))
    const desired = `#${s.buildId}/${s.level}`
    if (location.hash !== desired) history.replaceState(null, '', desired)
  }, [s])

  // Sync from the URL when the user navigates (back/forward or shared link).
  useEffect(() => {
    const onHash = () => {
      const { buildId: bid, level: lvl } = parseHash()
      setS((prev) => {
        let next = prev
        if (bid && bid !== prev.buildId) next = { ...next, buildId: bid }
        if (typeof lvl === 'number' && lvl !== prev.level) next = { ...next, level: lvl }
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const selectBuild = useCallback<GuideState['selectBuild']>((id, opts = {}) => {
    if (!BUILD_BY_ID[id]) return
    setS((prev) => ({
      ...prev,
      buildId: id,
      level: opts.keepLevel ? prev.level : 1,
      view: opts.view ?? prev.view,
    }))
  }, [])

  const goToLevel = useCallback((lvl: number) => {
    setS((prev) => ({ ...prev, level: clampLevel(lvl) }))
  }, [])

  const advance = useCallback(() => {
    setS((prev) => {
      const cur = prev.progress[prev.buildId] ?? emptyProgress()
      const completedNext = cur.completed.includes(prev.level)
        ? cur.completed
        : [...cur.completed, prev.level]
      return {
        ...prev,
        level: clampLevel(prev.level + 1),
        progress: { ...prev.progress, [prev.buildId]: { ...cur, completed: completedNext } },
      }
    })
  }, [])

  const toggleFlag = useCallback((lvl?: number) => {
    setS((prev) => {
      const target = lvl ?? prev.level
      const cur = prev.progress[prev.buildId] ?? emptyProgress()
      const flagsNext = cur.flags.includes(target)
        ? cur.flags.filter((f) => f !== target)
        : [...cur.flags, target]
      return {
        ...prev,
        progress: { ...prev.progress, [prev.buildId]: { ...cur, flags: flagsNext } },
      }
    })
  }, [])

  const resetLevel = useCallback(() => setS((prev) => ({ ...prev, level: 1 })), [])
  const setView = useCallback((v: ViewId) => setS((prev) => ({ ...prev, view: v })), [])

  return {
    build,
    level,
    view,
    completed,
    flags,
    selectBuild,
    goToLevel,
    advance,
    toggleFlag,
    resetLevel,
    setView,
  }
}

/** Track the user's reduced-motion preference reactively. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof matchMedia === 'undefined') return false
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    if (typeof matchMedia === 'undefined') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}
