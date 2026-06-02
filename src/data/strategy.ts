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
