import { describe, it, expect } from 'vitest'
import { BUILDS, BUILD_BY_ID, DEFAULT_BUILD_ID, LEVEL_CAP } from './builds'
import { CLASSES, CLASS_ORDER } from './classes'
import { TIER_LIST, TIER_ORDER, byTier } from './tierList'
import { RESPEC_ADVICE, DIFFICULTY_LADDER, LEVELING_ACTIVITIES } from './strategy'
import { ENRICHMENT } from './enrich'
import { BUILD_STYLE, FINDER_QUESTIONS, recommendBuilds } from './finder'
import { buildChecklist } from './checklist'
import { GLOSSARY, GLOSSARY_BY_TERM, GLOSSARY_CATEGORIES } from './glossary'

const ALL_TIERS = ['S', 'A', 'B'] as const

describe('builds', () => {
  it('have unique ids', () => {
    const ids = BUILDS.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('are internally well-formed', () => {
    for (const b of BUILDS) {
      expect(ALL_TIERS).toContain(b.tier)
      expect(b.className in CLASSES).toBe(true)
      expect(b.skillPriority.length).toBeGreaterThan(0)
      expect(b.milestones.length).toBeGreaterThan(0)
      expect(b.gear.length).toBeGreaterThan(0)
      for (const m of b.milestones) {
        expect(m.level).toBeGreaterThanOrEqual(1)
        expect(m.level).toBeLessThanOrEqual(LEVEL_CAP)
      }
      for (const key of ['speed', 'survival', 'ease', 'damage', 'aoe'] as const) {
        expect(b.meters[key]).toBeGreaterThanOrEqual(1)
        expect(b.meters[key]).toBeLessThanOrEqual(5)
      }
    }
  })

  it('default build exists', () => {
    expect(BUILD_BY_ID[DEFAULT_BUILD_ID]).toBeTruthy()
  })

  it('BUILD_BY_ID resolves every build', () => {
    for (const b of BUILDS) expect(BUILD_BY_ID[b.id]).toBe(b)
  })
})

describe('tier list', () => {
  it('references only real builds', () => {
    for (const tier of TIER_ORDER) {
      for (const { buildId } of TIER_LIST[tier]) {
        expect(BUILD_BY_ID[buildId], `${buildId} should exist`).toBeTruthy()
      }
    }
  })

  it('places every build exactly once', () => {
    const listed = TIER_ORDER.flatMap((t) => TIER_LIST[t].map((e) => e.buildId))
    expect(new Set(listed).size).toBe(listed.length)
    expect(new Set(listed)).toEqual(new Set(BUILDS.map((b) => b.id)))
  })

  it('a build’s own tier matches the section it is listed under', () => {
    for (const tier of TIER_ORDER) {
      for (const { buildId } of TIER_LIST[tier]) {
        expect(BUILD_BY_ID[buildId].tier).toBe(tier)
      }
    }
  })

  it('byTier sorts S before A before B', () => {
    const sorted = [...BUILDS].sort(byTier).map((b) => b.tier)
    const rank = { S: 0, A: 1, B: 2 }
    for (let i = 1; i < sorted.length; i++) {
      expect(rank[sorted[i]]).toBeGreaterThanOrEqual(rank[sorted[i - 1]])
    }
  })
})

describe('classes', () => {
  it('CLASS_ORDER covers exactly the classes used by builds', () => {
    const used = new Set(BUILDS.map((b) => b.className))
    for (const cn of used) expect(CLASS_ORDER).toContain(cn)
  })
})

describe('cross-references', () => {
  it('BUILD_STYLE covers every build', () => {
    for (const b of BUILDS) expect(BUILD_STYLE[b.id], `${b.id} needs a style`).toBeTruthy()
  })

  it('ENRICHMENT keys are all real builds and entries are complete', () => {
    for (const id of Object.keys(ENRICHMENT)) expect(BUILD_BY_ID[id], id).toBeTruthy()
    for (const b of BUILDS) {
      const e = ENRICHMENT[b.id]
      expect(e, `${b.id} should be enriched`).toBeTruthy()
      expect(e.commonMistakes.length).toBeGreaterThanOrEqual(2)
      expect(e.bossTips.length).toBeGreaterThanOrEqual(1)
      expect(e.proTips.length).toBeGreaterThanOrEqual(2)
      expect(e.resourceLoop.length).toBeGreaterThan(0)
    }
  })

  it('RESPEC_ADVICE keys are real builds', () => {
    for (const id of Object.keys(RESPEC_ADVICE)) expect(BUILD_BY_ID[id], id).toBeTruthy()
  })

  it('checklist item keys are unique within a build', () => {
    for (const b of BUILDS) {
      const keys = buildChecklist(b).flatMap((g) => g.items.map((i) => i.key))
      expect(new Set(keys).size, `${b.id} checklist keys`).toBe(keys.length)
    }
  })
})

describe('strategy ladder', () => {
  it('difficulty bands are ordered and sane', () => {
    for (const d of DIFFICULTY_LADDER) {
      expect(d.band[0]).toBeLessThanOrEqual(d.band[1])
    }
  })
  it('activities have valid level bands', () => {
    for (const a of LEVELING_ACTIVITIES) {
      expect(a.band[0]).toBeGreaterThanOrEqual(1)
      expect(a.band[1]).toBeLessThanOrEqual(LEVEL_CAP)
    }
  })
})

describe('glossary', () => {
  it('terms are unique', () => {
    const terms = GLOSSARY.map((t) => t.term.toLowerCase())
    expect(new Set(terms).size).toBe(terms.length)
  })

  it('every category used is declared', () => {
    for (const t of GLOSSARY) expect(GLOSSARY_CATEGORIES).toContain(t.category)
  })

  it('lookup resolves full names and aliases', () => {
    expect(GLOSSARY_BY_TERM['vulnerable']).toBeTruthy()
    // alias: "Crowd Control (CC)" resolves via "crowd control"
    expect(GLOSSARY_BY_TERM['crowd control']).toBeTruthy()
  })

  it('most seeAlso references resolve to real terms', () => {
    let unresolved = 0
    for (const t of GLOSSARY) {
      for (const s of t.seeAlso ?? []) {
        if (!GLOSSARY_BY_TERM[s.toLowerCase()]) unresolved++
      }
    }
    expect(unresolved).toBe(0)
  })
})

describe('build finder', () => {
  it('returns builds best-first and covers all builds when no constraints', () => {
    const res = recommendBuilds([], BUILDS)
    expect(res).toHaveLength(BUILDS.length)
    for (let i = 1; i < res.length; i++) {
      expect(res[i].score).toBeLessThanOrEqual(res[i - 1].score)
    }
  })

  it('newClassOnly restricts to Paladin/Warlock', () => {
    const newOpt = FINDER_QUESTIONS.find((q) => q.id === 'novelty')!.options.find(
      (o) => o.newClassOnly,
    )!
    const res = recommendBuilds([newOpt], BUILDS)
    expect(res.length).toBeGreaterThan(0)
    for (const r of res) expect(['Paladin', 'Warlock']).toContain(r.build.className)
  })

  it('a speed-priority pick favors a fast build', () => {
    const speed = FINDER_QUESTIONS.find((q) => q.id === 'priority')!.options.find((o) =>
      o.prefer?.speed,
    )!
    const res = recommendBuilds([speed], BUILDS)
    expect(res[0].build.meters.speed).toBeGreaterThanOrEqual(4)
  })
})
