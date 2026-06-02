import type { Build, Milestone } from '../data/types'
import { LEVEL_CAP } from '../data/builds'

export interface LevelRow {
  level: number
  skill: string
  note: string
  major: boolean
  respec: boolean
  /** True for an authored milestone; false for generated "keep ranking" filler. */
  isMilestone: boolean
}

/** Strip parenthetical asides and tidy slashes for filler labels. */
function tidy(skill: string): string {
  return skill
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s*(→|->)\s*.*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Produce a 1→cap leveling checklist for a build.
 *
 * In Lord of Hatred (patch 3.0) passives moved off the skill tree and you can
 * allocate points anywhere at any time, so there is no rigid "one passive per
 * level". Authored milestones (mechanic unlocks, power spikes, capstones,
 * respecs) are shown verbatim; every other level is honest filler that keeps
 * you ranking your core while rotating a secondary suggestion.
 */
export function buildLevelRows(build: Build, cap: number = LEVEL_CAP): LevelRow[] {
  const byLevel = new Map<number, Milestone>(build.milestones.map((m) => [m.level, m]))
  const prio = build.skillPriority.length ? build.skillPriority : [build.name]
  const core = tidy(prio[0])
  const supports = prio.slice(1).map(tidy).filter(Boolean)

  const rows: LevelRow[] = []
  for (let level = 1; level <= cap; level++) {
    const m = byLevel.get(level)
    if (m) {
      rows.push({
        level,
        skill: m.skill,
        note: m.note,
        major: !!m.major,
        respec: !!m.respec,
        isMilestone: true,
      })
      continue
    }
    const support = supports.length ? supports[(level - 1) % supports.length] : ''
    rows.push({
      level,
      skill: `Rank up ${core}`,
      note: support
        ? `Keep maxing ${core}; put spare points into ${support}. (Active skills cap at rank 15.)`
        : `Keep maxing ${core}. (Active skills cap at rank 15.)`,
      major: false,
      respec: false,
      isMilestone: false,
    })
  }
  return rows
}

/** Copyable one-liner for a row. */
export function levelRowText(row: LevelRow): string {
  return `L${row.level}: ${row.skill}${row.note ? ' — ' + row.note : ''}`
}
