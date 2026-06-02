import { useEffect, useRef } from 'react'
import { useGuideState, usePrefersReducedMotion, type ViewId } from './hooks/useGuideState'
import { TopBar } from './components/TopBar'
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
  const { view, build, level, completed, selectBuild, resetLevel, setView } = state

  const pickBuild = (id: string) => selectBuild(id, { view: 'guide' })

  // Move focus to the freshly shown panel so screen readers announce the change.
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    document.getElementById('view-panel')?.focus()
  }, [view])

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
        return <RouteView />
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
        />
        <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {renderView()}
        </main>
      </div>
    </>
  )
}

export default App
