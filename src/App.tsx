import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  peekSeenOnboarding,
  useGuideState,
  usePrefersReducedMotion,
  type ViewId,
} from './hooks/useGuideState'
import { CLASSES } from './data/classes'
import { TopBar } from './components/TopBar'
import { Disclaimer } from './components/shared'
import { ShortcutsHelp } from './components/ShortcutsHelp'
import { CommandPalette } from './components/CommandPalette'
import { BuildFinder } from './components/BuildFinder'
import { GlossaryCtx } from './components/glossaryContext'

// Code-split each view so the initial bundle stays lean.
// Lazy views take heterogeneous props; `any` keeps the helper ergonomic.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyView = <T,>(p: Promise<T>, pick: (m: T) => React.ComponentType<any>) =>
  lazy(() => p.then((m) => ({ default: pick(m) })))

const PathsView = lazyView(import('./components/views/PathsView'), (m) => m.PathsView)
const GuideView = lazyView(import('./components/views/GuideView'), (m) => m.GuideView)
const QuickRefView = lazyView(import('./components/views/QuickRefView'), (m) => m.QuickRefView)
const BuildsView = lazyView(import('./components/views/BuildsView'), (m) => m.BuildsView)
const CompareView = lazyView(import('./components/views/CompareView'), (m) => m.CompareView)
const TierListView = lazyView(import('./components/views/TierListView'), (m) => m.TierListView)
const RouteView = lazyView(import('./components/views/RouteView'), (m) => m.RouteView)
const SystemsView = lazyView(import('./components/views/SystemsView'), (m) => m.SystemsView)
const GlossaryView = lazyView(import('./components/views/GlossaryView'), (m) => m.GlossaryView)
const AdvisorView = lazyView(import('./components/views/AdvisorView'), (m) => m.AdvisorView)

function ViewFallback() {
  return (
    <div className="view-loading" role="status" aria-live="polite">
      <span className="loading-rune" aria-hidden="true">✦</span>
      <span className="sr-only">Loading…</span>
    </div>
  )
}

function App() {
  const state = useGuideState()
  const reducedMotion = usePrefersReducedMotion()
  const { view, build, level, completed, compare, theme, selectBuild, resetLevel, setView, goToLevel } =
    state
  const [helpOpen, setHelpOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [finderOpen, setFinderOpen] = useState(() => !peekSeenOnboarding())
  const [glossaryFocus, setGlossaryFocus] = useState<string | undefined>(undefined)

  const pickBuild = (id: string) => selectBuild(id, { view: 'guide' })
  const jumpToLevel = (lvl: number) => {
    goToLevel(lvl)
    setView('guide')
  }
  const openGlossary = (term?: string) => {
    setGlossaryFocus(term)
    setView('glossary')
  }

  // Move focus to the freshly shown panel so screen readers announce the change.
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    document.getElementById('view-panel')?.focus()
  }, [view])

  const closeFinder = () => {
    setFinderOpen(false)
    if (!state.seenOnboarding) state.dismissOnboarding()
  }

  // Global shortcuts: ? help, ⌘K / Ctrl-K command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setCmdOpen((v) => !v)
        return
      }
      const t = e.target as HTMLElement | null
      if (t && t.closest('input, select, textarea, [contenteditable="true"]')) return
      if (e.key === '?') {
        e.preventDefault()
        setHelpOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Tint the chrome with the active build's class accent (optional).
  const accent = CLASSES[build.className].accent

  const renderView = () => {
    switch (view) {
      case 'paths':
        return <PathsView onPickBuild={pickBuild} />
      case 'guide':
        return <GuideView state={state} reducedMotion={reducedMotion} onSwitchView={setView} />
      case 'quickref':
        return <QuickRefView state={state} onSwitchView={setView} />
      case 'builds':
        return (
          <BuildsView
            onPickBuild={pickBuild}
            compare={compare}
            onToggleCompare={state.toggleCompare}
          />
        )
      case 'compare':
        return <CompareView state={state} onPickBuild={pickBuild} />
      case 'tiers':
        return <TierListView currentBuildId={build.id} onPickBuild={pickBuild} />
      case 'route':
        return <RouteView level={level} onJumpToLevel={jumpToLevel} />
      case 'systems':
        return <SystemsView />
      case 'glossary':
        return <GlossaryView focusTerm={glossaryFocus} onFocusTerm={setGlossaryFocus} />
      case 'advisor':
        return <AdvisorView build={build} onPickBuild={pickBuild} />
      default:
        return null
    }
  }

  return (
    <GlossaryCtx.Provider value={openGlossary}>
      <button
        type="button"
        className="skip-link"
        onClick={() => document.getElementById('view-panel')?.focus()}
      >
        Skip to content
      </button>
      <div
        className={`hud ${theme ? 'themed' : ''}`}
        style={{ '--class-accent': accent } as CSSProperties}
      >
        <TopBar
          view={view}
          build={build}
          level={level}
          completedCount={completed.size}
          onSelectView={(v: ViewId) => setView(v)}
          onSelectBuild={(id) => selectBuild(id, { keepLevel: true })}
          onResetLevel={resetLevel}
          onOpenHelp={() => setHelpOpen(true)}
          onOpenCommand={() => setCmdOpen(true)}
          onOpenFinder={() => setFinderOpen(true)}
        />
        <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={<ViewFallback />}>{renderView()}</Suspense>
        </main>
        <Disclaimer />
      </div>

      <ShortcutsHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
      {cmdOpen && (
        <CommandPalette
          onClose={() => setCmdOpen(false)}
          state={state}
          onOpenGlossary={openGlossary}
          onOpenFinder={() => {
            setCmdOpen(false)
            setFinderOpen(true)
          }}
        />
      )}
      {finderOpen && <BuildFinder onClose={closeFinder} onPick={pickBuild} />}
    </GlossaryCtx.Provider>
  )
}

export default App
