import type { RoutePhase } from './types'

/**
 * The Season 13 (Lord of Hatred) 1→70 leveling route.
 *
 * Corrected vs the old guide:
 *  - The campaign is set in SKOVOS (main hub Temis), not Nahantu/Kurast (those
 *    are Vessel of Hatred).
 *  - XP DOES scale with difficulty (Hard +75%, Expert +125%, Penitent +175%),
 *    so you push difficulty up as soon as you can kill quickly — you do NOT
 *    stay on Normal to "save XP".
 *  - Level cap is 70; Paragon begins at 70. Torment 1 is unlocked by clearing
 *    Pit Tier 10. The post-campaign endgame loop is War Plans + Echoing Hatred.
 */
export const ROUTE: RoutePhase[] = [
  {
    range: '1–45',
    title: 'Campaign & Foundation (Skovos)',
    steps: [
      'Start the Lord of Hatred campaign in Skovos on Normal; it runs ~7–8h and unlocks the hub city of Temis and the Horadric Cube.',
      'Recruit your first Mercenary during the campaign — Raheir (Shieldbearer) is the safest all-round pick.',
      'Turn on the Loot Filter (Options → Gameplay) early so you only stop for upgrades.',
      'Your class mechanic comes online around level 15 (Necromancer’s Book of the Dead is free at 5; Paladin’s Oaths auto-unlock at 15).',
      'Upgrade your WEAPON whenever you can — it is the base of all your damage.',
      'Bump to Hard as soon as you can kill quickly: Hard grants +75% open-world XP (XP scales with difficulty).',
    ],
  },
  {
    range: '45–60',
    title: 'Capstones, Helltides & Strongholds',
    steps: [
      'After the campaign (~45), run the first Capstone Dungeon to advance difficulty/progression.',
      'Farm Hard-difficulty Helltides and Tree of Whispers; chase the Experience Wells (Forgotten Wisdom, +15% XP/1h).',
      'Clear Strongholds around level 50 — first-clear XP is a flat one-time bonus, so it is worth more a bit later.',
      'Run the second Capstone to unlock The Pit (the path to Torment and Paragon).',
      'Push to Expert/Penitent when clears stay fast (Expert +125%, Penitent +175% XP).',
    ],
  },
  {
    range: '60–70',
    title: 'The Pit, Torment & Endgame Handoff',
    steps: [
      'Temper, imprint Aspects, and socket runewords (1 Rune of Ritual + 1 of Invocation) on your rare gear.',
      'Clear Pit Tier 10 to unlock Torment 1, then select it at a World Difficulty statue.',
      'Reach level 70 — the cap — to begin Paragon (account-wide; up to 300 points, Glyphs cap at rank 50).',
      'Unlock War Plans (after the campaign) to chain endgame activities, and Echoing Hatred (Torment 1) for the new pinnacle wave-survival arena.',
      'Respec is cheap at 70 — re-temper and pivot from your leveling build into its endgame version.',
    ],
  },
]

export const ROUTE_NOTE =
  'Season 13 (Season of Reckoning) intentionally ships with NO bespoke seasonal mechanic — the "season" is the expansion itself ' +
  '(War Plans, Echoing Hatred, the Horadric Cube, Talismans/Charms, the skill-tree rework and the loot filter).'

/** A rung on the World Difficulty ladder, with its leveling XP incentive. */
export interface DifficultyTier {
  name: string
  /** Open-world XP bonus vs. Normal, as shown to the player. */
  xp: string
  unlock: string
  /** Rough character-level band where most players sit here while leveling. */
  band: [number, number]
  /** Highlight the tiers you actually push to while leveling 1→70. */
  levelingFocus?: boolean
}

/**
 * The 16-tier ladder. XP scales with difficulty (Hard +75%, Expert +125%,
 * Penitent +175%), so you climb it as fast as you can clear — you do NOT sit on
 * Normal to "save" XP. Torment is endgame; you arrive there around the cap.
 */
export const DIFFICULTY_LADDER: DifficultyTier[] = [
  { name: 'Normal', xp: 'baseline', unlock: 'Default', band: [1, 20], levelingFocus: true },
  { name: 'Hard', xp: '+75% XP', unlock: 'Available from the start', band: [20, 45], levelingFocus: true },
  { name: 'Expert', xp: '+125% XP', unlock: 'Clear the 1st Capstone Dungeon', band: [45, 55], levelingFocus: true },
  { name: 'Penitent', xp: '+175% XP', unlock: 'Clear the 2nd Capstone Dungeon', band: [55, 70], levelingFocus: true },
  { name: 'Torment 1', xp: 'Endgame scaling', unlock: 'Clear Pit Tier 10', band: [70, 70] },
  { name: 'Torment 2–12', xp: 'Endgame scaling', unlock: 'Clear successive Pit tiers', band: [70, 70] },
]

/** A repeatable leveling activity, with when it opens and why it’s worth doing. */
export interface LevelingActivity {
  name: string
  unlock: string
  band: [number, number]
  value: string
}

export const LEVELING_ACTIVITIES: LevelingActivity[] = [
  { name: 'Campaign (Skovos)', unlock: 'From level 1', band: [1, 45], value: 'The backbone of 1→45; ~7–8h on Normal. Skips available if replaying.' },
  { name: 'Side Quests & Renown', unlock: 'Throughout', band: [1, 50], value: 'Renown tiers hand out bonus skill & Paragon points and potion charges.' },
  { name: 'Strongholds', unlock: 'Overworld', band: [45, 60], value: 'Flat one-time first-clear XP — worth slightly more done a bit later (~50).' },
  { name: 'Tree of Whispers', unlock: 'After the campaign', band: [45, 70], value: 'Grim Favors → reward caches. Steady, reliable XP and gear.' },
  { name: 'Helltides', unlock: 'Overworld (corrupted zones)', band: [45, 65], value: 'Dense packs + Cinders; excellent XP on Hard+. A primary 45–60 farm.' },
  { name: 'Capstone Dungeons', unlock: '~45 and ~55', band: [45, 60], value: 'Gate the next difficulty tier (more XP) and, later, The Pit.' },
  { name: 'Nightmare Dungeons', unlock: 'Sigils after the campaign', band: [50, 70], value: 'Affixed dungeons; solid XP and Glyph leveling on the way up.' },
  { name: 'The Pit', unlock: '2nd Capstone', band: [60, 70], value: 'Clear Tier 10 → Torment 1. Then the main place to level Glyphs.' },
  { name: 'War Plans', unlock: 'After the campaign', band: [50, 70], value: 'Chain up to five activities into one efficient, key-free run.' },
]

/** Build-specific respec / pivot advice surfaced in the Respec advisor. */
export interface RespecAdvice {
  stay: string
  switch: string
}

export const RESPEC_ADVICE: Record<string, RespecAdvice> = {
  'warlock-dread-claws': {
    stay: 'Great all-rounder with strong AoE and the best Warlock endgame scaling. Two planned in-build respecs at L34 (Command Fallen + Dark Prison) and L40 (Metamorphosis) — these are tweaks, not a full rebuild.',
    switch: 'Want it safer/faster? Respec to Minion Warlock. Want the absolute fastest level? Dance of Knives Rogue.',
  },
  'paladin-shield-retribution': {
    stay: 'The fastest, tankiest Paladin leveler — almost all damage comes from Thorns, so it barely cares about your weapon. Swap Shield of Justice → Shield of Retribution at L32.',
    switch: 'Prefer the Hammerdin fantasy? Blessed Hammer (Disciple). Want flashy melee? Zeal (Zealot).',
  },
  'rogue-dance-of-knives': {
    stay: 'The fastest leveler in the game. Switch your Specialization from Combo Points to Inner Sight at ~L20 for effortless Core spam.',
    switch: 'Want tankier melee? Twisting Blades. Want the safest ranged option? Barrage.',
  },
  'necro-minion': {
    stay: 'The most forgiving leveler — the army does the work. Remember Book of the Dead is free at level 5, not 15.',
    switch: 'Want to deal the damage yourself? Blood Surge (Overpower AoE) or Blood Lance.',
  },
  'sorc-static-blizzard': {
    stay: 'The safest caster. The big spike is the Static Field pivot at L38 — it fixes your mana and ramps damage hard.',
    switch: 'Want the strongest season-start damage with zero gear? Charged Bolts. Prefer fire? Firewall/Burn.',
  },
  'spiritborn-quill-volley': {
    stay: 'The best Spiritborn leveler — take Eagle as both your primary (15) and secondary (30) Spirit Hall. No mid-leveling respec needed.',
    switch: 'Prefer melee slams? Crushing Hand. Like counter-attacks? Payback (Eagle/Jaguar).',
  },
}
