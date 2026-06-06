# Diablo IV · Lord of Hatred — Leveling Strategium

An interactive **Diablo IV: Lord of Hatred** (Season 13 · *Season of Reckoning*) leveling
companion. Pick a class and build, then get every milestone from level 1 to 70 — plus a
build tier list, the leveling route, mercenary advice, a "what's new" systems primer, and a
respec advisor.

> Fan-made. Not affiliated with Blizzard Entertainment.

## Features

- **Command palette (`⌘K` / `Ctrl-K`)** — fuzzy-jump to any build, section, level (“level
  38”), or glossary term. Pins up to **4 favorite builds**, then actions and tabs.
- **Build finder** — answer a few quick questions and get your best-matched builds; pops on first
  visit and is always a click away.
- **Class Guide** — what each of the 8 classes looks like to play, with **Paladin** and
  **Warlock** spotlight quick-starts on the Paths view.
- **Point Guide** — level-by-level companion with **context callouts** (route, difficulty,
  mechanics, milestones), a **session strip** (time + levels marked this session), **share
  link** and **JSON export** in the footer, dossier checklist/notes, and keyboard shortcuts.
- **Favorites** — star up to **12 builds** (TopBar + Builds grid); filter to ★ only on Builds.
- **Quick Ref** — printable/copyable table of the whole 1→70 path.
- **Builds** — 24 leveling builds (3 per class), searchable, filterable, add-to-compare.
- **Compare** — put 2–3 builds side by side: meters, style, skill bar, milestones, runewords.
- **Tier List** — leveling-speed tiers (S/A/B) with methodology sources (Maxroll, Icy Veins,
  Wowhead, Mobalytics).
- **Route** — Season 13 route (Skovos), difficulty/XP ladder, leveling activities, mercenaries.
- **What's New** — Lord of Hatred systems that matter for leveling.
- **Glossary** — **54** fact-checked Diablo IV terms, searchable and cross-linked.
- **Respec** — build-aware stay/switch advice for all **24** builds.

### Progress & persistence

- Saved to **`localStorage` key `d4_loh_guide_v4`** (auto-migrates from `d4_loh_guide_v3` /
  `d4_loh_guide_v2`).
- **URL hash** `#buildId/level` is updated as you play — shareable deep links. This is not
  full JSON state: only build + level live in the hash; completed levels, checklist, notes,
  compare, and favorites are in localStorage (or export JSON from the guide footer).
- Optional per-class accent **theming**. PWA with offline precache.

## Accuracy

Game data was researched and adversarially fact-checked (June 2026) against Maxroll, Icy
Veins, Wowhead, Mobalytics, Game8, the official Blizzard pages, and Wikipedia. Lord of
Hatred released **April 28, 2026**, adds **Paladin** and **Warlock** (8 classes total),
raises the level cap to **70**, and expands the difficulty ladder to **16 tiers**
(Normal/Hard/Expert/Penitent + Torment 1–12).

## Tech

Vite + React 19 + TypeScript, **zero runtime dependencies beyond React**. Views are
code-split. Typed game data in [`src/data`](src/data). Vitest covers libs, hooks, data
integrity, and UI smoke tests.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/ (+ PWA service worker)
npm run preview    # preview the production build
npm run lint       # eslint
npm test           # vitest run
```

The build uses a relative base, so `dist/` can be hosted from a domain root, GitHub Pages
sub-path, or opened from disk.

## Project layout

```
src/
  data/         # classes, builds, tier list, route, glossary, enrichment, finder
  hooks/        # useGuideState (v4 persistence, favorites, hash routing)
  lib/          # leveling rows, level callouts/bands, session stats, export, favorites, fuzzy, storage
  components/   # TopBar, command palette, LevelCallout, SessionStrip, ExportMenu, views
  styles/       # HUD design system
```