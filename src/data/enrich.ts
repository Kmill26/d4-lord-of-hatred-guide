/**
 * Per-build leveling companion notes: common mistakes, boss/elite tips, pro
 * tips, and the moment-to-moment resource loop. Authored from each build's
 * fact-checked playstyle data (see builds.ts) — grounded, no invented skills.
 *
 * Keyed by build id. A build without an entry simply renders no notes panel.
 */
export interface BuildEnrichment {
  commonMistakes: string[]
  bossTips: string[]
  proTips: string[]
  /** One sentence describing the core rotation. */
  resourceLoop: string
}

export const ENRICHMENT: Record<string, BuildEnrichment> = {
  'rogue-dance-of-knives': {
    resourceLoop:
      'Hold Dance of Knives while weaving Blade Shift through packs to refund Energy; pop Dark Shroud and Cold Imbuement before big groups.',
    commonMistakes: [
      'Forgetting to swap your Specialization from Combo Points to Inner Sight around L20 — that swap is what makes Energy effortless.',
      'Channeling while standing still; spin tight circles through the pack so Energy and Dark Shroud stay up.',
      'Letting Dark Shroud stacks expire — they are both your move speed and your survivability.',
    ],
    bossTips: [
      'Pre-stack Dark Shroud, apply Cold Imbuement, then channel from point-blank; Shadow Clone doubles your single-target.',
      'Keep moving in small arcs so you never run dry on Energy mid-burn.',
    ],
    proTips: [
      'Blade Shift + Dark Shroud overflow break the ~200% move-speed cap — chain them between packs.',
      'Cold Imbuement’s chill feeds Vulnerable and freeze synergies for free early damage.',
    ],
  },
  'rogue-twisting-blades': {
    resourceLoop:
      'Cast Twisting Blades into a pack, immediately Dash / Shadow Step away, and the blades boomerang back ~1.5s later for the big second hit.',
    commonMistakes: [
      'Standing where you cast — the heavy damage is on the RETURN, so reposition after every Twisting Blades.',
      'Not swapping to Inner Sight at ~L20 for Energy sustain.',
      'Expecting both imbuements at once — only one imbuement is active at a time.',
    ],
    bossTips: [
      'Dash through the boss so the blades return through it, and use Shadow Imbuement for the burst.',
      'Pop Dark Shroud for damage reduction during boss slams.',
    ],
    proTips: [
      'Tankier than Dance of Knives — facetank trash while the blades return.',
      'Shadow Clone mirrors your Twisting Blades for a second full rotation on elites.',
    ],
  },
  'rogue-barrage': {
    resourceLoop:
      'Generate Energy with Heartseeker, then spam Barrage (Multishot) from range while Dash repositions and Dark Shroud overflow regens Energy.',
    commonMistakes: [
      'Forgetting the Multishot enhancement — that is what carpets the whole screen with arrows.',
      'Walking into melee; Barrage wants you at the back of the pack.',
      'Skipping Heartseeker and then running dry on Energy.',
    ],
    bossTips: [
      'Funnel every volley into the boss from max range; weave Heartseeker to refund Energy between Barrages.',
      'Shadow Imbuement procs spread damage when adds appear.',
    ],
    proTips: [
      'The safest, most brain-off Rogue leveler — let Dark Shroud handle Energy and move speed.',
      'Pre-cast an imbuement before opening a pack so the first volley lands buffed.',
    ],
  },
  'barb-frenzy-throw': {
    resourceLoop:
      'Throw Frenzy axes to stack Attack Speed while spamming Rallying Cry for move speed and Fury; kite packs and burst elites at range.',
    commonMistakes: [
      'Letting Frenzy’s Attack Speed stacks drop — keep throwing to hold the ramp.',
      'Neglecting Weapon Expertise; assign weapons at ~L5 and level the one-handed Expertise Frenzy uses.',
      'Standing in melee instead of kiting — this is a ranged hit-and-run barb.',
    ],
    bossTips: [
      'Open with shouts for the buffs, then unload stacked Frenzy throws from range.',
      'Ground Stomp / Iron Skin to survive windups, then resume throwing.',
    ],
    proTips: [
      'Spam Rallying Cry on cooldown — it is move speed AND summons Madawc.',
      'Upgrade weapons constantly; throw damage scales directly off weapon damage.',
    ],
  },
  'barb-whirlwind': {
    resourceLoop:
      'Build Fury with Lunging Strike, then hold Whirlwind through packs; from L15 it spawns Dust Devils for free.',
    commonMistakes: [
      'Spinning before you have Fury — open with Lunging Strike to fund the first Whirlwind.',
      'Expecting strong single-target early; Whirlwind is weak on bosses until aspects fill in.',
      'Forgetting that at L15 Dust Devils are FREE — no aspect required.',
    ],
    bossTips: [
      'Lean on Lunging Strike, shouts and Call of the Ancients for boss damage while Whirlwind is weak.',
      'Challenging Shout / War Cry for damage reduction and a Fury / damage boost.',
    ],
    proTips: [
      'Prioritize 2H Mace or Polearm Expertise for the Technique slot.',
      'Run into the densest part of a pack and hold the button — the Dust Devils clean up.',
    ],
  },
  'barb-hota': {
    resourceLoop:
      'Alternate Lunging Strike for Fury with Hammer of the Ancients for damage — roughly 2:1 early, easing to 1:1 as aspects come online.',
    commonMistakes: [
      'Spamming HotA dry — you need ~2 Lunging Strikes per Hammer early.',
      'Ignoring Overpower scaling; HotA wants Life / Fortify, not just raw damage.',
      'Skipping the shouts that keep you alive and topped on Fury.',
    ],
    bossTips: [
      'HotA has strong single-target — funnel slams into the boss and time Wrath of the Berserker for the burst.',
      'Iron Skin / Rallying Cry before big hits.',
    ],
    proTips: [
      'Aim toward the Walking Arsenal key passive as you level.',
      'Two-Handed Mace Expertise boosts your slams; keep that weapon upgraded.',
    ],
  },
  'sorc-static-blizzard': {
    resourceLoop:
      'Carpet packs with Blizzard, Teleport to kite, Frost Nova for Vulnerable + mana; after L38 Static Field converts Blizzard to a Shock skill that fixes mana.',
    commonMistakes: [
      'Holding onto Fireball / Arc Lash too long — once Blizzard is available (~L13) strip down to it.',
      'Missing the L38 Static Field pivot — it is the mana fix and the biggest damage spike.',
      'Forgetting to assign Enchantments (Ice Armor at 15, Frost Nova at 30).',
    ],
    bossTips: [
      'Stack Blizzards on the boss and Frost Nova for Vulnerable; save Unstable Currents for the burst window.',
      'Teleport around the boss to reset the cooldown loop and stay safe.',
    ],
    proTips: [
      'Frost Nova as an Enchantment auto-applies Vulnerable and generates mana — huge for uptime.',
      'Kite backward and leave blizzards on the floor; you rarely need to facetank anything.',
    ],
  },
  'sorc-charged-bolts': {
    resourceLoop:
      'Spam Charged Bolts to shotgun close targets, Teleport to reposition, Frost Nova for Vulnerable, and Unstable Currents for boss burst.',
    commonMistakes: [
      'Firing at long range — Charged Bolts shotguns, so get medium-close so multiple bolts hit one target.',
      'Forgetting it pierces — line up packs so bolts pass through several enemies.',
      'Treating Ball Lightning as a manual pivot — Unstable Currents auto-casts it; no skill slot needed.',
    ],
    bossTips: [
      'Hug the boss so several bolts connect at once, then pop Unstable Currents for the burst.',
      'Frost Nova for Vulnerable before the burst window.',
    ],
    proTips: [
      'Best raw damage with zero gear — ideal for a fresh season start.',
      'Ride Charged Bolts to 70, or pivot to Static Field Blizzard at L38.',
    ],
  },
  'sorc-firewall': {
    resourceLoop:
      'Lob Fireballs and lay Firewall lanes, pull packs into the flames with Frost Nova / Teleport, and let the burning DoT stack.',
    commonMistakes: [
      'Expecting enemies to stand in Firewall — use Frost Nova / positioning to hold them in the flames.',
      'Playing it like a burst build; Burn is damage-over-time, so let the stacks tick.',
      'Dropping Ice Armor / Frost Nova because it is a fire build — you still need them for mana and Vulnerable.',
    ],
    bossTips: [
      'Stack Firewall under the boss and keep it in the lanes; Fireball tops up direct damage.',
      'Inferno / Unstable Currents for the elite / boss window.',
    ],
    proTips: [
      'Clunkier early than Charged Bolts / Blizzard — push to where reworked fire uniques carry it.',
      'Burn scales smoothly from low gear, so prioritize +Burning / DoT and Fire damage.',
    ],
  },
  'necro-minion': {
    resourceLoop:
      'Summon and maintain Skeletal Warriors + Mages + Golem, curse with Iron Maiden / Decrepify, and reposition while the army kills.',
    commonMistakes: [
      'Waiting until 15 for your mechanic — Book of the Dead is FREE at level 5; build the army immediately.',
      'Letting minions die and not re-summoning between packs.',
      'Standing in danger; your job is to position and curse, not to tank.',
    ],
    bossTips: [
      'Curse the boss and let the army DPS while you keep minions alive and detonate corpses.',
      'Cold Mages apply Vulnerable for a big minion damage boost.',
    ],
    proTips: [
      'The most forgiving leveler in the game — minimal aim, minimal gear dependence.',
      'Igni + Wat can auto-cast Decrepify, freeing a skill slot.',
    ],
  },
  'necro-blood-surge': {
    resourceLoop:
      'Spam Hemorrhage to generate Essence and build Overpower, then unleash Blood Surge for screen-wide AoE amplified by your skeletons.',
    commonMistakes: [
      'Firing Blood Surge without Overpower banked — build it with Hemorrhage first.',
      'Skipping the small skeleton army; “You And What Army?” scales Blood Surge off your Warriors.',
      'Neglecting Max Life / Fortify, which feed Overpower damage.',
    ],
    bossTips: [
      'Keep Warriors alive on the boss for the amp, and time Blood Surge with an Overpower proc.',
      'Cold Mages apply Vulnerable; Blood Mist to dodge dangerous hits.',
    ],
    proTips: [
      'LoH made Overpower strong again — stack Life and Overpower Damage to scale hard.',
      'Pulse Blood Surge in the center of a pack to clear whole screens at once.',
    ],
  },
  'necro-blood-lance': {
    resourceLoop:
      'Throw Blood Lances that chain between lanced enemies, weaving Hemorrhage and Defender skeletons to keep Essence and Blood Orbs flowing.',
    commonMistakes: [
      'Lancing single targets — Blood Lance pays off when several enemies are lanced so spears bounce.',
      'Letting Essence dry up; you need Defender skeletons / crafting for sustain.',
      'Forgetting Sever for mobility.',
    ],
    bossTips: [
      'Lance the boss plus an add so the spear chains for bonus hits; Iron Maiden / Decrepify to debuff.',
      'Defender Warriors generate Blood Orbs to keep you topped during long fights.',
    ],
    proTips: [
      'Defender skeletons make Blood Orbs — your sustain engine for spamming Lance.',
      'Igni + Wat auto-casts Decrepify, freeing a slot for utility.',
    ],
  },
  'paladin-shield-retribution': {
    resourceLoop:
      'Generate Faith with Clash, throw Blessed Shield (Shield of Retribution from L32) to pulse Thorns through packs, and keep Defiance Aura up.',
    commonMistakes: [
      'Stacking weapon damage — almost all damage here is Thorns, so chase Thorns instead.',
      'Forgetting the L32 swap from Shield of Justice to Shield of Retribution — the build’s namesake spike.',
      'Letting Resolve drop; Juggernaut wants you building and spending it.',
    ],
    bossTips: [
      'Thorns shines when the boss hits you, so let it; keep Defiance Aura and Resolve up for the damage reduction.',
      'Aegis / Fortress to soak big hits while the shield pulses.',
    ],
    proTips: [
      'Because damage is Thorns, almost any weapon works — chase Thorns, Crit and Vulnerable.',
      'Aspect of Dominance caps Resolve for steady ~20% damage reduction.',
    ],
  },
  'paladin-blessed-hammer': {
    resourceLoop:
      'Generate Faith with Advance, spin Blessed Hammers through packs, and cast Disciple cooldown skills (Condemn / Falling Star) to keep Arbiter Form up.',
    commonMistakes: [
      'Letting Arbiter Form lapse — its big damage buff is the whole build; rotate cooldown skills to maintain it.',
      'Standing still; Blessed Hammers orbit, so position so the spirals pass through the pack.',
      'Skipping Cooldown Reduction, which directly drives Arbiter uptime.',
    ],
    bossTips: [
      'Hold Arbiter Form on the boss by chaining Condemn / Falling Star, and stand so the hammers spiral through it.',
      'Condemn detonates and extends Arbiter Form on elites.',
    ],
    proTips: [
      'Stack Cooldown Reduction above all — more Arbiter uptime is more damage.',
      'Herald’s Morningstar massively amplifies Blessed Hammer once it drops.',
    ],
  },
  'paladin-zeal': {
    resourceLoop:
      'Generate Faith with Advance, then spam Zeal; Crits consume Fervor stacks to make Zeal repeat, ramping into a buzzsaw.',
    commonMistakes: [
      'Playing at range — Zeal is point-blank melee; commit to the pack.',
      'Neglecting Attack Speed and Crit, which drive the Fervor repeat loop.',
      'Forgetting Fanaticism Aura (~25), which strongly feeds the crit-repeat engine.',
    ],
    bossTips: [
      'Stand on the boss and keep Zeal going so Fervor stacks repeat your hits; Fanaticism Aura boosts speed and crit.',
      'Rally / Defiance for survivability since you are in melee.',
    ],
    proTips: [
      'More positioning-dependent than the Thorns build — pick your moments to wade in.',
      'Attack Speed is king: it feeds both Zeal’s hit-rate and the Fervor repeats.',
    ],
  },
  'warlock-dread-claws': {
    resourceLoop:
      'Place your Rampage Greater Demon inside the pack, spam Dread Claws so claws hit twice, and melt elites with Hellion Sting; Shadowform recasts without breaking stealth.',
    commonMistakes: [
      'Casting Dread Claws away from your demon — the double-hit only happens when the demon is inside the pack.',
      'Missing the planned respecs at L34 (Command Fallen + Dark Prison) and L40 (Metamorphosis).',
      'Before L15, expecting circular AoE — Dread Claws is a frontal cone until Encircling Terror.',
    ],
    bossTips: [
      'Lock the target with Hellion Sting (Eviscerate) and hold Tail Spikes to shred elites and bosses.',
      'Drop Rampage on the boss so your claws double-hit it.',
    ],
    proTips: [
      'At L15 Encircling Terror turns Dread Claws into circular AoE around you and your demon — a big clear spike.',
      'Aspect of Deeper Shadows is near-mandatory; it raises your max Shadowform stacks.',
    ],
  },
  'warlock-minion': {
    resourceLoop:
      'Build a lesser-demon swarm with Sigil of Summons + Legion, spam Bombardment for AoE, command Rampage, and stay back-line.',
    commonMistakes: [
      'Pushing to the front; you are a back-line general — let the demon army absorb and clear.',
      'Dropping Command Fallen too early, before Rampage / gear sustain your resources.',
      'Forgetting to replenish the lesser-demon swarm via Sigil of Summons.',
    ],
    bossTips: [
      'Park Rampage on the boss, keep the swarm alive, chip with Bombardment; Fiend of Abaddon for the burst.',
      'Stay mobile with Nether Step to avoid boss mechanics while pets DPS.',
    ],
    proTips: [
      'The safest and among the fastest Warlock routes — very forgiving.',
      'Sacrificial Fragment at 30 grants Unstoppable and upgrades the Legion shard.',
    ],
  },
  'warlock-eviscerate': {
    resourceLoop:
      'Stack Eviscerate (Bleed) from Hellion Sting, Rampage and your lesser demons, while Bombardment / Rampage handle pack clear.',
    commonMistakes: [
      'Expecting strong AoE — its clear is mediocre, so lean on Bombardment / Rampage for packs.',
      'Applying Bleed from only one source; the build wants Eviscerate from many angles at once.',
      'Skipping the enabling uniques that make the Bleed ramp shine.',
    ],
    bossTips: [
      'The boss-killer Warlock — stack Eviscerate from every source and let the Bleed hemorrhage elites and bosses.',
      'Tail Spikes for sustained single-target shred.',
    ],
    proTips: [
      'Lesser Demons become Eviscerate trigger engines once Legion is online.',
      'A solid third Warlock pick if you find Lurid Pact / Spine of Tathamet / Litany of Sable.',
    ],
  },
  'spiritborn-quill-volley': {
    resourceLoop:
      'Generate Vigor with Thunderspike, then spend it spamming Quill Volley; Eagle skills and Evade loose Storm Feathers that apply Vulnerable.',
    commonMistakes: [
      'Spending Vigor you do not have — weave Thunderspike to refill before Quill Volley spam.',
      'Ignoring Storm Feathers / Evade for Vulnerable, which is a big chunk of your damage.',
      'Taking a different secondary Spirit — for this build, take Eagle again at 30.',
    ],
    bossTips: [
      'Fan Quill Volley into the boss from range and keep Vulnerable up via Eagle skills; The Hunter for burst + Ferocity.',
      'Evade through the boss to drop Storm Feathers and reposition.',
    ],
    proTips: [
      'No mid-leveling respec needed — take Eagle as both primary (15) and secondary (30).',
      'Pierce lets one Quill Volley hit a whole line — angle your fans through packs.',
    ],
  },
  'spiritborn-crushing-hand': {
    resourceLoop:
      'Generate Vigor and heal / dash with Withering Fist, group packs with Vortex, then slam Crushing Hand (Unrelenting Assault) for barrier + Resolve.',
    commonMistakes: [
      'Slamming scattered enemies — use Vortex to clump packs first for the big AoE slam.',
      'Forgetting Withering Fist is your heal + mobility, not just a Vigor generator.',
      'Letting the Resolve / barrier lapse between slams.',
    ],
    bossTips: [
      'Vortex adds onto the boss, then chain Crushing Hand; the Unrelenting Assault barrier keeps you safe.',
      'Lucky Hit resource restore keeps Crushing Hand uptime high in long fights.',
    ],
    proTips: [
      'A strong AoE speedfarmer for dense content — group, slam, dash, repeat.',
      'At 30 you can lean Gorilla (“GorFist”) for extra healing / Weaken, or keep double-Eagle.',
    ],
  },
  'spiritborn-payback': {
    resourceLoop:
      'Free up Vigor with Thunderspike, cast The Hunter / Ravager / Armored Hide / Scourge on cooldown, and unleash Payback as the ramping counter-spender.',
    commonMistakes: [
      'Playing passively — Payback rewards aggressive, melee-range counter-flurries.',
      'Letting Ferocity drop; Jaguar at 30 ramps attack speed from stacks on kills / boss hits.',
      'Forgetting to keep your cooldown skills rolling between Paybacks.',
    ],
    bossTips: [
      'Tank a hit, then unload Payback; Jaguar Ferocity ramps your attack speed the longer the fight runs.',
      'Armored Hide / Scourge for survivability during boss windups.',
    ],
    proTips: [
      'Primary Eagle (Vulnerable + move speed) with secondary Jaguar (attack-speed ramp) is the snappy combo.',
      'Snappiest the longer you stay in melee — commit and let Ferocity build.',
    ],
  },
  'druid-lightning-storm': {
    resourceLoop:
      'Channel Lightning Storm to rain bolts on everything nearby while Cyclone Armor and Earthen Bulwark keep you alive; Cataclysm nukes elites.',
    commonMistakes: [
      'Channeling without Spirit — weave Wind Shear / Storm Strike to refund Spirit between casts.',
      'Ignoring Cyclone Armor (Vulnerable) and Earthen Bulwark (Unstoppable) at ~11, your big survivability spike.',
      'Standing in danger; Lightning Storm hits everything nearby, so keep moving.',
    ],
    bossTips: [
      'Stand near the boss and hold Lightning Storm; Cataclysm is your elite / boss nuke once upgraded (~22–25).',
      'Earthen Bulwark for Unstoppable through boss crowd control.',
    ],
    proTips: [
      'The most beginner-friendly, self-sufficient Druid leveler — works 1→70 with no gear requirement.',
      'Run it in Human form or shift Lightning into Werewolf via LoH Shifting Nodes.',
    ],
  },
  'druid-pulverize': {
    resourceLoop:
      'Slam Pulverize to send earth shockwaves through packs while Earthen Bulwark, Cyclone Armor and Poison Creeper keep you very tanky.',
    commonMistakes: [
      'Spamming Pulverize with a tiny Spirit pool — take the Cost Reduction upgrade (~L6) to make it spammable.',
      'Suffering the low early mobility; respec Storm Strike → Claw at ~L30 to fix it.',
      'Forgetting Ursine Horror, which gives Pulverize its Earth + Nature Magic tags.',
    ],
    bossTips: [
      'Slam directly on the boss; Earthen Bulwark / Cyclone Armor make you tanky enough to facetank most hits.',
      'Greater Pulverize (Spirit Boons at 15) boosts your core.',
    ],
    proTips: [
      'Very durable — prioritize Spirit Regeneration everywhere so you can keep slamming.',
      'Waxing Gibbous is a great unique to chase for this build.',
    ],
  },
  'druid-shred': {
    resourceLoop:
      'Dash between enemies with Shred’s cleaving claw combos, weaving Wind Shear for Spirit and Cyclone Armor / Poison Creeper for sustain.',
    commonMistakes: [
      'Giving up during the slow early game — Shred spikes hard once Roundhouse comes online at 15.',
      'Ignoring the weak early AoE; Cataclysm at 19 helps cover it.',
      'Missing the Storm Shred pivot ~L32 into the hybrid Storm build.',
    ],
    bossTips: [
      'Dash through the boss with Shred combos; save Cataclysm for the right window given its long cooldown.',
      'Cyclone Armor keeps you alive while you stay in melee.',
    ],
    proTips: [
      'Best mobility of the Druid levelers — dash between enemies to stay safe.',
      'It pivots into a full hybrid Storm build via Storm Shred ~L32, your final leveling form.',
    ],
  },
}

export function getEnrichment(buildId: string): BuildEnrichment | undefined {
  return ENRICHMENT[buildId]
}
