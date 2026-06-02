# Diablo IV · Lord of Hatred — Leveling Strategium

An interactive **Diablo IV: Lord of Hatred** (Season 13 · *Season of Reckoning*) leveling
companion. Pick a class and build, then get every milestone from level 1 to 70 — plus a
build tier list, the leveling route, mercenary advice, a "what's new" systems primer, and a
respec advisor.

> Fan-made. Not affiliated with Blizzard Entertainment.

## Features

- **Class Guide** — what each of the 8 classes looks like to play, with the new
  **Paladin** and **Warlock** classes highlighted.
- **Point Guide** — a level-by-level companion (keyboard-driven) that flags every real
  milestone: mechanic unlocks, power spikes, capstones, and planned respecs.
- **Quick Ref** — a printable/copyable table of the whole 1→70 path.
- **Builds** — 24 leveling builds (3 per class), searchable and filterable.
- **Tier List** — leveling-speed tiers (S/A/B) with sources.
- **Route** — the Season 13 leveling route (Skovos), difficulty/XP advice, and mercenaries.
- **What's New** — the Lord of Hatred systems that matter for leveling.
- **Respec** — should you switch builds? Build-aware advice.

Progress (current build, level, completed/flagged levels) is saved to `localStorage` and
the URL hash (`#buildId/level`) is shareable and deep-linkable. Fully keyboard navigable
with visible focus, ARIA tabs, and `prefers-reduced-motion` support.

## Accuracy

Game data was researched and adversarially fact-checked (June 2026) against Maxroll, Icy
Veins, Wowhead, Mobalytics, Game8, the official Blizzard pages, and Wikipedia. Lord of
Hatred released **April 28, 2026**, adds **Paladin** and **Warlock** (8 classes total),
raises the level cap to **70**, and expands the difficulty ladder to **16 tiers**
(Normal/Hard/Expert/Penitent + Torment 1–12).

## Tech

Vite + React 19 + TypeScript. Zero runtime dependencies beyond React. All game data is typed
and lives in [`src/data`](src/data).

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run lint       # eslint
```

The build uses a relative base, so the `dist/` output can be hosted from a domain root, a
GitHub Pages project sub-path, or opened directly from disk.

## Project layout

```
src/
  data/         # typed game data: classes, builds, tier list, route, mercenaries, systems
  hooks/        # useGuideState (persistence + hash routing), reduced-motion
  lib/          # leveling-row generator
  components/   # TopBar + per-view components + shared atoms
  styles/       # the HUD design system
```
