import { useEffect, useRef, useState } from 'react'
import { useGuideState, usePrefersReducedMotion, type ViewId } from './hooks/useGuideState'
import { TopBar } from './components/TopBar'
import { Disclaimer } from './components/shared'
import { ShortcutsHelp } from './components/ShortcutsHelp'
import { PathsView } from './components/views/PathsView'
import { GuideView } from './components/views/GuideView'
import { QuickRefView } from './components/views/QuickRefView'
import { BuildsView } from './components/views/BuildsView'
import { TierListView } from './components/views/TierListView'
import { RouteView } from './components/views/RouteView'
import { SystemsView } from './components/views/SystemsView'
import { AdvisorView } from './components/views/AdvisorView'

function App() {
  const state = useGuideState()
  const reducedMotion = usePrefersReducedMotion()
  const { view, build, level, completed, selectBuild, resetLevel, setView, goToLevel } = state
  const [helpOpen, setHelpOpen] = useState(false)

  const pickBuild = (id: string) => selectBuild(id, { view: 'guide' })
  const jumpToLevel = (lvl: number) => {
    goToLevel(lvl)
    setView('guide')
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

  // Global "?" opens the shortcuts overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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

  const renderView = () => {
    switch (view) {
      case 'paths':
        return <PathsView onPickBuild={pickBuild} />
      case 'guide':
        return <GuideView state={state} reducedMotion={reducedMotion} onSwitchView={setView} />
      case 'quickref':
        return <QuickRefView state={state} onSwitchView={setView} />
      case 'builds':
        return <BuildsView onPickBuild={pickBuild} />
      case 'tiers':
        return <TierListView currentBuildId={build.id} onPickBuild={pickBuild} />
      case 'route':
        return <RouteView level={level} onJumpToLevel={jumpToLevel} />
      case 'systems':
        return <SystemsView />
      case 'advisor':
        return <AdvisorView build={build} onPickBuild={pickBuild} />
      default:
        return null
    }
  }

  return (
    <>
      <button
        type="button"
        className="skip-link"
        onClick={() => document.getElementById('view-panel')?.focus()}
      >
        Skip to content
      </button>
      <div className="hud">
        <TopBar
          view={view}
          build={build}
          level={level}
          completedCount={completed.size}
          onSelectView={(v: ViewId) => setView(v)}
          onSelectBuild={(id) => selectBuild(id, { keepLevel: true })}
          onResetLevel={resetLevel}
          onOpenHelp={() => setHelpOpen(true)}
        />
        <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {renderView()}
        </main>
        <Disclaimer />
      </div>
      <ShortcutsHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}

export default App
