import { useRef } from 'react'
import { BUILDS, LEVEL_CAP } from '../data/builds'
import { CLASS_ORDER } from '../data/classes'
import type { ViewId } from '../hooks/useGuideState'
import { TierBadge } from './shared'
import { TABS } from './tabs'
import type { Build } from '../data/types'

interface Props {
  view: ViewId
  build: Build
  level: number
  completedCount: number
  onSelectView: (v: ViewId) => void
  onSelectBuild: (id: string) => void
  onResetLevel: () => void
  onOpenHelp: () => void
  onOpenCommand: () => void
  onOpenFinder: () => void
}

export function TopBar({
  view,
  build,
  level,
  completedCount,
  onSelectView,
  onSelectBuild,
  onResetLevel,
  onOpenHelp,
  onOpenCommand,
  onOpenFinder,
}: Props) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const showBuildControls = view === 'guide' || view === 'quickref'
  const pct = Math.round((completedCount / LEVEL_CAP) * 100)

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === view)
    let next: number
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    else return
    e.preventDefault()
    onSelectView(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <header className="topbar">
      <h1 className="brand">
        Diablo IV <span className="sep">·</span> Lord of Hatred
      </h1>

      <nav aria-label="Guide sections" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="nav-tabs" role="tablist" aria-label="Guide sections" onKeyDown={onTabKeyDown}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={view === t.id}
              aria-controls="view-panel"
              tabIndex={view === t.id ? 0 : -1}
              className="nav-tab"
              onClick={() => onSelectView(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {showBuildControls && (
        <div className="build-select">
          <label className="sr-only" htmlFor="build-select">
            Active build
          </label>
          <select
            id="build-select"
            value={build.id}
            onChange={(e) => onSelectBuild(e.target.value)}
          >
            {CLASS_ORDER.map((cn) => {
              const classBuilds = BUILDS.filter((b) => b.className === cn)
              if (!classBuilds.length) return null
              return (
                <optgroup key={cn} label={cn}>
                  {classBuilds.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.className} — {b.name}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </select>
          <TierBadge tier={build.tier} />
          <button
            type="button"
            className="level-pill"
            onClick={() => {
              if (level <= 1 || window.confirm('Jump back to level 1?')) onResetLevel()
            }}
            title="Jump to level 1"
          >
            <span>L</span>
            <span className="num">{level}</span>
          </button>
          <div
            className="progress"
            role="progressbar"
            aria-label="Levels marked done"
            aria-valuemin={0}
            aria-valuemax={LEVEL_CAP}
            aria-valuenow={completedCount}
          >
            <div className="progress-bar" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="topbar-tools">
        <button
          type="button"
          className="cmd-trigger"
          onClick={onOpenCommand}
          aria-label="Open command palette"
          title="Search & jump (⌘K)"
        >
          <span className="cmd-trigger-icon" aria-hidden="true">⌕</span>
          <span className="cmd-trigger-label">Search</span>
          <kbd className="cmd-trigger-kbd" aria-hidden="true">⌘K</kbd>
        </button>
        <button
          type="button"
          className="ctrl-btn finder-btn"
          onClick={onOpenFinder}
          aria-label="Find my build"
          title="Find my build"
        >
          <span aria-hidden="true">✦</span> Find
        </button>
        <button
          type="button"
          className="ctrl-btn help-btn"
          onClick={onOpenHelp}
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts (?)"
        >
          ?
        </button>
      </div>
    </header>
  )
}
