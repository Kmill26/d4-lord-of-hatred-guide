import type { SystemInfo } from './types'

/**
 * What's new (and what changed) in Diablo IV: Lord of Hatred (Season 13).
 * The systems rework (skill trees, level cap, Torment 1–12, loot filter) is
 * FREE to all players; Skovos, the two classes, War Plans, Echoing Hatred,
 * the Horadric Cube and Talismans/Charms are expansion content.
 */
export const SYSTEMS: SystemInfo[] = [
  {
    name: 'Two new classes: Paladin & Warlock',
    tag: 'New',
    summary:
      'Paladin (holy Oath-driven frontline) and Warlock (dual-resource demon-binding caster) join the roster, bringing it to eight classes alongside Spiritborn from Vessel of Hatred.',
    levelingRelevance: 'New leveling paths — Paladin’s Oaths auto-unlock at 15; Warlock’s Soul Shards unlock via a class quest at 15.',
  },
  {
    name: 'Level cap raised to 70',
    tag: 'Changed',
    summary: 'The character level cap rises from 60 to 70. Paragon (account-wide, up to 300 points) now begins at level 70; Glyphs cap at rank 50.',
    levelingRelevance: 'This guide targets the full 1→70 band; skill-point progression effectively finishes ~60 and 60→70 is largely Paragon-driven.',
  },
  {
    name: 'Skill-tree rework (all 8 classes)',
    tag: 'Reworked',
    summary:
      'Passive nodes were REMOVED from the skill tree (moved onto Uniques/Aspects). Every active skill now has three branches; the third grants a build-defining Skill Variant. Skills rank up to 15 and you can allocate points anywhere, any time (~83 total points).',
    levelingRelevance:
      'There is no rigid "one passive per level" path anymore — this companion tells you what to PRIORITIZE at each level and flags every real milestone (mechanic unlocks, variants, capstones).',
  },
  {
    name: 'Torment expanded to 12 tiers',
    tag: 'Changed',
    summary:
      'The difficulty ladder is now 16 tiers: Normal, Hard, Expert, Penitent, then Torment 1 through Torment 12 (up from 4). Torment 1 unlocks by clearing Pit Tier 10.',
    levelingRelevance: 'Crucially, XP scales with difficulty (Hard +75%, Expert +125%, Penitent +175%) — push difficulty up to level faster.',
  },
  {
    name: 'Skovos — the new region',
    tag: 'New',
    summary:
      'A seven-island archipelago in the Twin Seas, the largest area added since launch, with the hub city Temis (Queen Adreona / The Oracle). 8 waypoints, 12 dungeons, 3 strongholds, 30 side quests.',
    levelingRelevance: 'Your campaign and early leveling happen here. (Nahantu / Kurast Undercity belong to the prior Vessel of Hatred expansion.)',
  },
  {
    name: 'War Plans',
    tag: 'New',
    summary:
      'A post-campaign endgame board (the Command Table in Temis) where you chain up to five activities — Whispers, Nightmare Dungeons, Helltides, the Pit, Lair Bosses, Infernal Hordes — into one run.',
    levelingRelevance: 'Unlocks after the campaign; great for efficient XP and lets you enter activities without keys.',
  },
  {
    name: 'Echoing Hatred',
    tag: 'New',
    summary:
      'A Torment-1-gated wave-survival arena (the Sightless Eye in Temis). An Overwhelm meter rises if too many enemies live; every kill lowers it. Rewards high-tier gear, Uniques/Mythics, and Talismans.',
    levelingRelevance: 'A pinnacle endgame target once you reach Torment 1 — beyond the leveling band, but it’s where you’re headed.',
  },
  {
    name: 'Horadric Cube & gear crafting',
    tag: 'Returning',
    summary: 'The returning Horadric Cube (in Temis) enables new gear crafting and conversions.',
    levelingRelevance: 'Useful for shoring up resistances and converting materials while you gear up.',
  },
  {
    name: 'Talismans & Charms',
    tag: 'Returning',
    summary: 'A returning charm system — small items (Seals/Charms) that grant bonus affixes in dedicated slots.',
    levelingRelevance: 'Charm slots open during leveling; minion/skill/elemental charms can meaningfully boost your build.',
  },
  {
    name: 'Loot Filter',
    tag: 'New',
    summary: 'A long-requested loot filter (Options → Gameplay) hides items below your chosen thresholds.',
    levelingRelevance: 'Turn it on early so you only stop for genuine upgrades — a real speed boost while leveling.',
  },
]
