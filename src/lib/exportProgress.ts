import { BUILD_BY_ID } from '../data/builds'
import { SEASON } from '../data/sources'
import type { GuideState } from '../hooks/useGuideState'

export interface ExportPayload {
  app: 'd4-lord-of-hatred-guide'
  version: 1
  exportedAt: string
  season: typeof SEASON
  buildId: string
  buildName: string
  className: string
  level: number
  completed: number[]
  flags: number[]
  checks: string[]
  notes: Record<string, string>
  compare: string[]
  favorites: string[]
  shareUrl: string
}

export function shareUrl(buildId: string, level: number): string {
  if (typeof location === 'undefined') return `#${buildId}/${level}`
  return `${location.origin}${location.pathname}#${buildId}/${level}`
}

export function collectBuildNotes(buildId: string, notes: Record<string, string>): Record<string, string> {
  const prefix = `${buildId}:`
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(notes)) {
    if (key.startsWith(prefix) && value.trim()) out[key] = value
  }
  return out
}

export function buildPayloadFromState(input: {
  buildId: string
  level: number
  progress: { completed: number[]; flags: number[]; checks: string[] }
  notes: Record<string, string>
  compare: string[]
  favorites: string[]
}): ExportPayload {
  const build = BUILD_BY_ID[input.buildId]
  const buildId = input.buildId
  return {
    app: 'd4-lord-of-hatred-guide',
    version: 1,
    exportedAt: new Date().toISOString(),
    season: SEASON,
    buildId,
    buildName: build?.name ?? buildId,
    className: build?.className ?? '',
    level: input.level,
    completed: input.progress.completed,
    flags: input.progress.flags,
    checks: input.progress.checks,
    notes: collectBuildNotes(buildId, input.notes),
    compare: input.compare,
    favorites: input.favorites,
    shareUrl: shareUrl(buildId, input.level),
  }
}

export function buildPayloadFromGuideState(
  state: GuideState,
  opts?: { includeNotes?: boolean },
): ExportPayload {
  const includeNotes = opts?.includeNotes !== false
  return buildPayloadFromState({
    buildId: state.build.id,
    level: state.level,
    progress: {
      completed: [...state.completed],
      flags: [...state.flags],
      checks: [...state.checks],
    },
    notes: includeNotes ? state.getBuildNotes() : {},
    compare: state.compare,
    favorites: state.favorites,
  })
}

export function exportJson(payload: ExportPayload): string {
  return JSON.stringify(payload, null, 2)
}

export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}