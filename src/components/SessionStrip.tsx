import { useLayoutEffect, useState, useSyncExternalStore } from 'react'
import {
  formatSessionDuration,
  getSessionStats,
  subscribeSession,
  touchSession,
} from '../lib/sessionStats'

interface Props {
  buildId: string
  completedCount: number
  level: number
}

export function SessionStrip({ buildId, completedCount, level }: Props) {
  const [tick, setTick] = useState(() => Date.now())

  useLayoutEffect(() => {
    touchSession(buildId)
  }, [buildId])

  const session = useSyncExternalStore(subscribeSession, getSessionStats, () => null)

  useLayoutEffect(() => {
    const bump = () => {
      if (document.visibilityState === 'visible') setTick(Date.now())
    }
    bump()
    const timer = window.setInterval(bump, 60_000)
    document.addEventListener('visibilitychange', bump)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', bump)
    }
  }, [])

  if (!session) return null

  const elapsed = formatSessionDuration(session.startedAt, tick)

  return (
    <div className="session-strip" role="status" aria-live="polite" aria-label="Session progress">
      <span className="session-chip" title="Time since you opened this tab">
        Session · {elapsed}
      </span>
      <span className="session-chip" title="Levels marked done this session">
        +{session.levelsMarked} marked
      </span>
      <span className="session-chip" title="Total levels marked done for this build">
        {completedCount}/70 done · L{level}
      </span>
    </div>
  )
}