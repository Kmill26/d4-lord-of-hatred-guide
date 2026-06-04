import type { Build } from './types'

/**
 * Derive a stable, trackable progression checklist for a build from its own
 * data. Item `key`s are stable strings persisted per-build in localStorage, so
 * they must not change between sessions for the same build.
 */
export interface ChecklistItem {
  key: string
  label: string
  /** Optional level this item is tied to (enables "jump to level"). */
  level?: number
}

export interface ChecklistGroup {
  title: string
  items: ChecklistItem[]
}

export function buildChecklist(build: Build): ChecklistGroup[] {
  const groups: ChecklistGroup[] = []

  const majors = build.milestones.filter((m) => m.major || m.respec)
  if (majors.length) {
    groups.push({
      title: 'Key milestones',
      items: majors.map((m) => ({
        key: `ms:${m.level}`,
        label: `L${m.level} · ${m.skill.replace(/^★\s*/, '')}`,
        level: m.level,
      })),
    })
  }

  if (build.gear.length) {
    groups.push({
      title: 'Gear & Aspects',
      items: build.gear.map((g, i) => ({ key: `gear:${i}`, label: g })),
    })
  }

  if (build.runes.length) {
    groups.push({
      title: 'Runewords',
      items: build.runes.map((r, i) => ({
        key: `rune:${i}`,
        label: `${r.ritual} + ${r.invocation} — ${r.effect}`,
      })),
    })
  }

  groups.push({
    title: 'Leveling chores',
    items: [
      { key: 'chore:filter', label: 'Turn on the Loot Filter (Options → Gameplay)' },
      { key: 'chore:merc', label: 'Recruit a Mercenary (Raheir is the safe pick)' },
      { key: 'chore:weapon', label: 'Always carry your highest-damage weapon' },
      { key: 'chore:capstone1', label: 'Clear the 1st Capstone → Expert difficulty', level: 45 },
      { key: 'chore:capstone2', label: 'Clear the 2nd Capstone → The Pit', level: 60 },
      { key: 'chore:pit10', label: 'Clear Pit Tier 10 → Torment 1', level: 70 },
    ],
  })

  return groups
}

/** Total checklist item count for a build (for progress display). */
export function checklistSize(build: Build): number {
  return buildChecklist(build).reduce((n, g) => n + g.items.length, 0)
}
