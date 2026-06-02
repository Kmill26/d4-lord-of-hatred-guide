import type { Mercenary } from './types'

/**
 * The four Hireling Mercenaries (the system debuted in Vessel of Hatred and
 * continues in Lord of Hatred). You recruit your first merc during the campaign.
 * Each also has a Reinforcement perk you can call in from a second merc.
 */
export const MERCENARIES: Mercenary[] = [
  {
    name: 'Raheir',
    archetype: 'Shieldbearer (tank / support)',
    reinforcement: 'Valiance',
    role: 'Damage reduction, healing, buffs/debuffs, shielding',
    levelingNote:
      'The consensus safest all-around pick — if you are unsure, hire Raheir. Keeps you alive through the campaign on any build.',
    best: true,
  },
  {
    name: 'Varyana',
    archetype: 'Berserker Crone (melee DPS)',
    reinforcement: 'Massacre',
    role: 'AoE melee damage; the Massacre perk grants Movement & Attack Speed on kill-stacks',
    levelingNote:
      'Top speed-leveling alternative: Massacre stacks on kills (10→5%, 25→10%, 50→15%, 100→…) for big movement speed. Some leveling guides (e.g. Dread Claws Warlock) hire Varyana.',
  },
  {
    name: 'Subo',
    archetype: 'Drunken Archer (ranged)',
    reinforcement: 'Seeker',
    role: 'Ranged damage and pulls; reveals/marks targets',
    levelingNote: 'Good ranged supplement; less impactful than Raheir or Varyana for raw leveling speed.',
  },
  {
    name: 'Aldkin',
    archetype: 'Cursed Child (caster / debuff)',
    reinforcement: 'Blasphemous Fate',
    role: 'Magic damage and curses/debuffs that amplify your damage',
    levelingNote:
      'Often slotted as the Reinforcement (Blasphemous Fate) rather than the hired merc — a common pairing with Varyana.',
  },
]

export const MERC_NOTE =
  'Mercenary choice is build-dependent. Raheir is the most-recommended general launch pick for survivability; ' +
  'Varyana is favored when you want maximum movement/attack speed for speed-leveling.'
