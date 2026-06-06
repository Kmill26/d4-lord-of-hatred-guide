import { useEffect, useSyncExternalStore } from 'react'
import {
  formatSessionDuration,
  getSessionStats,
  subscribeSession,
  touchSession,
} from '../lib/sessionStats'
import { LEVEL_CAP } from '../data/builds'

interface Props {
  buildId: string
  completedCount: number
  level: number
}

export function SessionStrip({ buildId, completedCount, level }: Props) {
  useEffect(() => {
    touchSession(buildId)
  }, [buildId])

  const session = useSyncExternalStore(subscribeSession, getSessionStats, () => null)

  if (!session) return null

  const elapsed = formatSessionDuration(session.startedAt)
  const pct = completedCount ? Math.round((completedCount / LEVEL_CAP) * 100) : 0

  return (
    <div className="session-strip" role="status" aria-label="Session progress">
      <span className="session-chip" title="Time since you opened this tab">
        Session · {elapsed}
      </span>
      <span className="session-chip" title="Levels marked done this session">
        +{session.levelsMarked} marked
      </span>
      <span className="session-chip" title={`Total levels marked done for this build (${pct}% of ${LEVEL_CAP})`}>
        {completedCount}/{LEVEL_CAP} <span className="progress-pct">({pct}%)</span> done · L{level}
      </span>
    </div>
  )
}