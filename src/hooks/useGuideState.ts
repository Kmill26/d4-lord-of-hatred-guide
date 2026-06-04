import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUILD_BY_ID, DEFAULT_BUILD_ID, LEVEL_CAP } from '../data/builds'
import type { Build } from '../data/types'
import { storage } from '../lib/storage'

export type ViewId =
  | 'paths'
  | 'guide'
  | 'quickref'
  | 'builds'
  | 'compare'
  | 'tiers'
  | 'route'
  | 'systems'
  | 'glossary'
  | 'advisor'

export const VIEW_IDS: ViewId[] = [
  'paths',
  'guide',
  'quickref',
  'builds',
  'compare',
  'tiers',
  'route',
  'systems',
  'glossary',
  'advisor',
]

const STORAGE_KEY = 'd4_loh_guide_v3'
const LEGACY_KEY = 'd4_loh_guide_v2'
const MAX_COMPARE = 3

interface BuildProgress {
  completed: number[]
  flags: number[]
  /** Checklist item keys (gear/quest tracker) the user has ticked. */
  checks: string[]
}

interface PersistShape {
  v: 3
  buildId: string
  level: number
  view: ViewId
  progress: Record<string, BuildProgress>
  /** Free-text notes keyed by `${buildId}:${level}`. */
  notes: Record<string, string>
  /** Build ids selected for side-by-side comparison. */
  compare: string[]
  seenOnboarding: boolean
  /** Tint the UI chrome with the active build's class accent. */
  theme: boolean
}

export const clampLevel = (lvl: number): number =>
  Number.isFinite(lvl) ? Math.max(1, Math.min(LEVEL_CAP, Math.round(lvl))) : 1

export function parseHash(): { buildId?: string; level?: number } {
  const hash = typeof location !== 'undefined' ? location.hash.replace(/^#/, '') : ''
  if (!hash) return {}
  const [bid, lvl] = hash.split('/')
  const out: { buildId?: string; level?: number } = {}
  if (bid && BUILD_BY_ID[bid]) out.buildId = bid
  if (lvl && /^\d+$/.test(lvl)) out.level = clampLevel(parseInt(lvl, 10))
  return out
}

const emptyProgress = (): BuildProgress => ({ completed: [], flags: [], checks: [] })

function defaults(): PersistShape {
  return {
    v: 3,
    buildId: DEFAULT_BUILD_ID,
    level: 1,
    view: 'paths',
    progress: {},
    notes: {},
    compare: [],
    seenOnboarding: false,
    theme: true,
  }
}

/** Read v3, else migrate v2, else defaults — then overlay the URL hash. */
function loadInitial(): PersistShape {
  const base = defaults()
  let saved: Partial<PersistShape> = {}
  let hadState = false
  try {
    const raw = storage.get(STORAGE_KEY)
    if (raw) {
      saved = JSON.parse(raw) as Partial<PersistShape>
      hadState = !!saved.buildId
    } else {
      // One-time migration from the v2 schema (no checks/notes/compare).
      const legacy = storage.get(LEGACY_KEY)
      if (legacy) {
        const v2 = JSON.parse(legacy) as Partial<{
          buildId: string
          level: number
          view: ViewId
          progress: Record<string, { completed: number[]; flags: number[] }>
        }>
        if (v2.buildId) {
          hadState = true
          saved = {
            buildId: v2.buildId,
            level: v2.level,
            view: v2.view,
            progress: Object.fromEntries(
              Object.entries(v2.progress ?? {}).map(([id, p]) => [
                id,
                { completed: p.completed ?? [], flags: p.flags ?? [], checks: [] },
              ]),
            ),
          }
        }
      }
    }
  } catch {
    saved = {}
  }

  const fromHash = parseHash()
  const buildId =
    fromHash.buildId ??
    (saved.buildId && BUILD_BY_ID[saved.buildId] ? saved.buildId : base.buildId)

  return {
    ...base,
    ...saved,
    v: 3,
    buildId,
    level: clampLevel(fromHash.level ?? saved.level ?? 1),
    view:
      saved.view && VIEW_IDS.includes(saved.view) ? saved.view : hadState ? 'guide' : 'paths',
    progress: saved.progress ?? {},
    notes: saved.notes ?? {},
    compare: (saved.compare ?? []).filter((id) => BUILD_BY_ID[id]).slice(0, MAX_COMPARE),
    seenOnboarding: saved.seenOnboarding ?? false,
    theme: saved.theme ?? true,
  }
}

/** Whether the build finder onboarding has already been shown (sync read). */
export function peekSeenOnboarding(): boolean {
  return loadInitial().seenOnboarding
}

export interface GuideState {
  build: Build
  level: number
  view: ViewId
  completed: Set<number>
  flags: Set<number>
  checks: Set<string>
  compare: string[]
  seenOnboarding: boolean
  theme: boolean
  selectBuild: (id: string, opts?: { keepLevel?: boolean; view?: ViewId }) => void
  goToLevel: (lvl: number) => void
  advance: () => void
  toggleFlag: (lvl?: number) => void
  toggleCheck: (key: string) => void
  resetProgress: () => void
  resetLevel: () => void
  setView: (view: ViewId) => void
  getNote: (lvl?: number) => string
  setNote: (lvl: number, value: string) => void
  toggleCompare: (id: string) => void
  clearCompare: () => void
  dismissOnboarding: () => void
  setTheme: (on: boolean) => void
}

export function useGuideState(): GuideState {
  const [s, setS] = useState<PersistShape>(loadInitial)

  const { buildId, level, view, progress } = s
  const build = BUILD_BY_ID[buildId] ?? BUILD_BY_ID[DEFAULT_BUILD_ID]

  const completed = useMemo(() => new Set(progress[buildId]?.completed ?? []), [progress, buildId])
  const flags = useMemo(() => new Set(progress[buildId]?.flags ?? []), [progress, buildId])
  const checks = useMemo(() => new Set(progress[buildId]?.checks ?? []), [progress, buildId])

  // Persist + reflect build/level in the URL hash.
  useEffect(() => {
    storage.set(STORAGE_KEY, JSON.stringify(s))
    if (typeof location === 'undefined' || typeof history === 'undefined') return
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

  const mutateBuild = useCallback(
    (id: string, fn: (p: BuildProgress) => BuildProgress) =>
      setS((prev) => {
        const cur = prev.progress[id] ?? emptyProgress()
        return { ...prev, progress: { ...prev.progress, [id]: fn(cur) } }
      }),
    [],
  )

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

  const toggleFlag = useCallback(
    (lvl?: number) =>
      setS((prev) => {
        const target = lvl ?? prev.level
        const cur = prev.progress[prev.buildId] ?? emptyProgress()
        const flagsNext = cur.flags.includes(target)
          ? cur.flags.filter((f) => f !== target)
          : [...cur.flags, target]
        return { ...prev, progress: { ...prev.progress, [prev.buildId]: { ...cur, flags: flagsNext } } }
      }),
    [],
  )

  const toggleCheck = useCallback(
    (key: string) =>
      mutateBuild(buildId, (cur) => ({
        ...cur,
        checks: cur.checks.includes(key)
          ? cur.checks.filter((k) => k !== key)
          : [...cur.checks, key],
      })),
    [buildId, mutateBuild],
  )

  const resetProgress = useCallback(
    () =>
      setS((prev) => ({
        ...prev,
        level: 1,
        progress: { ...prev.progress, [prev.buildId]: emptyProgress() },
      })),
    [],
  )

  const resetLevel = useCallback(() => setS((prev) => ({ ...prev, level: 1 })), [])
  const setView = useCallback((v: ViewId) => setS((prev) => ({ ...prev, view: v })), [])

  const getNote = useCallback(
    (lvl?: number) => s.notes[`${buildId}:${lvl ?? level}`] ?? '',
    [s.notes, buildId, level],
  )
  const setNote = useCallback(
    (lvl: number, value: string) =>
      setS((prev) => {
        const key = `${prev.buildId}:${lvl}`
        const notes = { ...prev.notes }
        if (value.trim()) notes[key] = value
        else delete notes[key]
        return { ...prev, notes }
      }),
    [],
  )

  const toggleCompare = useCallback(
    (id: string) =>
      setS((prev) => {
        if (!BUILD_BY_ID[id]) return prev
        const has = prev.compare.includes(id)
        const compare = has
          ? prev.compare.filter((c) => c !== id)
          : [...prev.compare, id].slice(-MAX_COMPARE)
        return { ...prev, compare }
      }),
    [],
  )
  const clearCompare = useCallback(() => setS((prev) => ({ ...prev, compare: [] })), [])
  const dismissOnboarding = useCallback(
    () => setS((prev) => ({ ...prev, seenOnboarding: true })),
    [],
  )
  const setTheme = useCallback((on: boolean) => setS((prev) => ({ ...prev, theme: on })), [])

  return {
    build,
    level,
    view,
    completed,
    flags,
    checks,
    compare: s.compare,
    seenOnboarding: s.seenOnboarding,
    theme: s.theme,
    selectBuild,
    goToLevel,
    advance,
    toggleFlag,
    toggleCheck,
    resetProgress,
    resetLevel,
    setView,
    getNote,
    setNote,
    toggleCompare,
    clearCompare,
    dismissOnboarding,
    setTheme,
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
