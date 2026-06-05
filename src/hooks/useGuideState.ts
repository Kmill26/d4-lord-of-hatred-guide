import { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { BUILD_BY_ID, DEFAULT_BUILD_ID, LEVEL_CAP } from '../data/builds'
import type { Build } from '../data/types'
import { MAX_FAVORITES } from '../lib/favorites'
import { recordLevelAdvance } from '../lib/sessionStats'
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

const STORAGE_KEY = 'd4_loh_guide_v4'
const LEGACY_V3 = 'd4_loh_guide_v3'
const LEGACY_V2 = 'd4_loh_guide_v2'
const MAX_COMPARE = 3
const MAX_NOTE_KEYS = 250
const MAX_NOTE_LEN = 4096
const MAX_CHECKS = 80

interface BuildProgress {
  completed: number[]
  flags: number[]
  checks: string[]
}

interface PersistShape {
  v: 4
  buildId: string
  level: number
  view: ViewId
  progress: Record<string, BuildProgress>
  notes: Record<string, string>
  compare: string[]
  favorites: string[]
  seenOnboarding: boolean
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

function asNumArray(raw: unknown): number[] {
  if (!Array.isArray(raw)) return []
  const nums = raw
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
    .map((v) => Math.round(v))
    .filter((v) => v >= 1 && v <= LEVEL_CAP)
  return [...new Set(nums)]
}

function asStrArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const strs = raw.filter((v): v is string => typeof v === 'string' && v.length > 0)
  return [...new Set(strs)]
}

export function normalizeBuildProgress(raw: unknown): BuildProgress {
  if (!raw || typeof raw !== 'object') return emptyProgress()
  const p = raw as Partial<BuildProgress>
  return {
    completed: asNumArray(p.completed).slice(0, LEVEL_CAP),
    flags: asNumArray(p.flags).slice(0, LEVEL_CAP),
    checks: asStrArray(p.checks).slice(0, MAX_CHECKS),
  }
}

function normalizeProgressMap(raw: unknown): Record<string, BuildProgress> {
  if (!raw || typeof raw !== 'object') return {}
  return Object.fromEntries(
    Object.entries(raw as Record<string, unknown>).map(([id, p]) => [id, normalizeBuildProgress(p)]),
  )
}

function normalizeNotes(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, string> = {}
  const entries = Object.entries(raw as Record<string, unknown>).slice(0, MAX_NOTE_KEYS)
  for (const [key, value] of entries) {
    if (typeof value === 'string') out[key] = value.slice(0, MAX_NOTE_LEN)
  }
  return out
}

function defaults(): PersistShape {
  return {
    v: 4,
    buildId: DEFAULT_BUILD_ID,
    level: 1,
    view: 'paths',
    progress: {},
    notes: {},
    compare: [],
    favorites: [],
    seenOnboarding: false,
    theme: true,
  }
}

function readSaved(): { saved: Partial<PersistShape>; hadState: boolean } {
  let saved: Partial<PersistShape> = {}
  let hadState = false
  try {
    const rawV4 = storage.get(STORAGE_KEY)
    if (rawV4) {
      saved = JSON.parse(rawV4) as Partial<PersistShape>
      hadState = !!saved.buildId
      return { saved, hadState }
    }
    const rawV3 = storage.get(LEGACY_V3)
    if (rawV3) {
      saved = JSON.parse(rawV3) as Partial<PersistShape>
      hadState = !!saved.buildId
      return { saved, hadState }
    }
    const legacy = storage.get(LEGACY_V2)
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
  } catch {
    saved = {}
  }
  return { saved, hadState }
}

/** Read v4, else v3, else migrate v2, else defaults — then overlay the URL hash. */
function loadInitial(): PersistShape {
  const base = defaults()
  const { saved, hadState } = readSaved()
  const fromHash = parseHash()
  const buildId =
    fromHash.buildId ??
    (saved.buildId && BUILD_BY_ID[saved.buildId] ? saved.buildId : base.buildId)

  return {
    ...base,
    ...saved,
    v: 4,
    buildId,
    level: clampLevel(fromHash.level ?? saved.level ?? 1),
    view:
      saved.view && VIEW_IDS.includes(saved.view) ? saved.view : hadState ? 'guide' : 'paths',
    progress: normalizeProgressMap(saved.progress),
    notes: normalizeNotes(saved.notes),
    compare: asStrArray(saved.compare)
      .filter((id) => BUILD_BY_ID[id])
      .slice(0, MAX_COMPARE),
    favorites: asStrArray(saved.favorites)
      .filter((id) => BUILD_BY_ID[id])
      .slice(0, MAX_FAVORITES),
    seenOnboarding: saved.seenOnboarding ?? false,
    theme: saved.theme ?? true,
  }
}

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
  favorites: string[]
  seenOnboarding: boolean
  theme: boolean
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => boolean
  selectBuild: (id: string, opts?: { keepLevel?: boolean; view?: ViewId }) => void
  goToLevel: (lvl: number) => void
  advance: () => void
  toggleFlag: (lvl?: number) => void
  toggleCheck: (key: string) => void
  resetProgress: () => void
  resetLevel: () => void
  setView: (view: ViewId) => void
  getNote: (lvl?: number) => string
  getBuildNotes: () => Record<string, string>
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
  const buildProgress = useMemo(() => normalizeBuildProgress(progress[buildId]), [progress, buildId])

  const completed = useMemo(() => new Set(buildProgress.completed), [buildProgress])
  const flags = useMemo(() => new Set(buildProgress.flags), [buildProgress])
  const checks = useMemo(() => new Set(buildProgress.checks), [buildProgress])
  const compare = useMemo(
    () => s.compare.filter((id) => BUILD_BY_ID[id]).slice(0, MAX_COMPARE),
    [s.compare],
  )
  const favorites = useMemo(
    () => s.favorites.filter((id) => BUILD_BY_ID[id]),
    [s.favorites],
  )

  useEffect(() => {
    try {
      storage.set(STORAGE_KEY, JSON.stringify(s))
    } catch {
      /* storage full / blocked */
    }
    if (typeof location === 'undefined' || typeof history === 'undefined') return
    const desired = `#${s.buildId}/${s.level}`
    if (location.hash !== desired) history.replaceState(null, '', desired)
  }, [s])

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
        const cur = normalizeBuildProgress(prev.progress[id])
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
      const cur = normalizeBuildProgress(prev.progress[prev.buildId])
      const already = cur.completed.includes(prev.level)
      const completedNext = already ? cur.completed : [...cur.completed, prev.level]
      if (!already) recordLevelAdvance(prev.buildId)
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
        const cur = normalizeBuildProgress(prev.progress[prev.buildId])
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

  const getBuildNotes = useCallback(() => {
    const prefix = `${buildId}:`
    return Object.fromEntries(
      Object.entries(s.notes).filter(([key, val]) => key.startsWith(prefix) && val.trim()),
    )
  }, [s.notes, buildId])

  const setNote = useCallback(
    (lvl: number, value: string) =>
      setS((prev) => {
        const key = `${prev.buildId}:${lvl}`
        const notes = { ...prev.notes }
        const trimmed = value.slice(0, MAX_NOTE_LEN)
        if (trimmed.trim()) notes[key] = trimmed
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
        const next = has
          ? prev.compare.filter((c) => c !== id)
          : [...prev.compare, id].slice(-MAX_COMPARE)
        return { ...prev, compare: next }
      }),
    [],
  )

  const clearCompare = useCallback(() => setS((prev) => ({ ...prev, compare: [] })), [])

  const dismissOnboarding = useCallback(
    () => setS((prev) => ({ ...prev, seenOnboarding: true })),
    [],
  )

  const setTheme = useCallback((on: boolean) => setS((prev) => ({ ...prev, theme: on })), [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id: string): boolean => {
    if (!BUILD_BY_ID[id]) return false
    let allowed = false
    flushSync(() => {
      setS((prev) => {
        const cur = prev.favorites.filter((fid) => BUILD_BY_ID[fid])
        const has = cur.includes(id)
        if (!has && cur.length >= MAX_FAVORITES) return prev
        allowed = true
        const next = has ? cur.filter((fid) => fid !== id) : [...cur, id]
        return { ...prev, favorites: next }
      })
    })
    return allowed
  }, [])

  return {
    build,
    level,
    view,
    completed,
    flags,
    checks,
    compare,
    favorites,
    seenOnboarding: s.seenOnboarding,
    theme: s.theme,
    isFavorite,
    toggleFavorite,
    selectBuild,
    goToLevel,
    advance,
    toggleFlag,
    toggleCheck,
    resetProgress,
    resetLevel,
    setView,
    getNote,
    getBuildNotes,
    setNote,
    toggleCompare,
    clearCompare,
    dismissOnboarding,
    setTheme,
  }
}

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