import { describe, it, expect } from 'vitest'
import { buildLevelRows, levelRowText } from './leveling'
import { BUILDS, LEVEL_CAP } from '../data/builds'

const sample = BUILDS[0]

describe('buildLevelRows', () => {
  it('produces exactly one row per level up to the cap', () => {
    const rows = buildLevelRows(sample)
    expect(rows).toHaveLength(LEVEL_CAP)
    rows.forEach((r, i) => expect(r.level).toBe(i + 1))
  })

  it('renders authored milestones verbatim and flags them', () => {
    const rows = buildLevelRows(sample)
    for (const m of sample.milestones) {
      const row = rows[m.level - 1]
      expect(row.skill).toBe(m.skill)
      expect(row.note).toBe(m.note)
      expect(row.isMilestone).toBe(true)
      expect(row.major).toBe(!!m.major)
      expect(row.respec).toBe(!!m.respec)
    }
  })

  it('fills non-milestone levels with "keep ranking" guidance', () => {
    const rows = buildLevelRows(sample)
    const milestoneLevels = new Set(sample.milestones.map((m) => m.level))
    const filler = rows.find((r) => !milestoneLevels.has(r.level))!
    expect(filler.isMilestone).toBe(false)
    expect(filler.skill.toLowerCase()).toContain('rank up')
  })

  it('every build generates a full, valid ladder', () => {
    for (const b of BUILDS) {
      const rows = buildLevelRows(b)
      expect(rows).toHaveLength(LEVEL_CAP)
      expect(rows.every((r) => r.skill.length > 0)).toBe(true)
    }
  })
})

describe('levelRowText', () => {
  it('formats a copyable one-liner', () => {
    const [row] = buildLevelRows(sample)
    expect(levelRowText(row)).toBe(`L1: ${row.skill} — ${row.note}`)
  })
})
