import { useCallback, useRef, useState } from 'react'
import {
  buildPayloadFromGuideState,
  copyText,
  exportJson,
} from '../lib/exportProgress'
import type { GuideState } from '../hooks/useGuideState'

type CopyState = 'idle' | 'ok' | 'err'

interface Props {
  state: GuideState
}

export function ExportMenu({ state }: Props) {
  const [linkState, setLinkState] = useState<CopyState>('idle')
  const [jsonState, setJsonState] = useState<CopyState>('idle')
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])

  const resetLater = useCallback((setter: (s: CopyState) => void) => {
    const id = setTimeout(() => setter('idle'), 2000)
    timers.current.push(id)
  }, [])

  const copyLink = async () => {
    const payload = buildPayloadFromGuideState(state, { includeNotes: false })
    const ok = await copyText(payload.shareUrl)
    setLinkState(ok ? 'ok' : 'err')
    resetLater(setLinkState)
  }

  const copyJson = async () => {
    const notes = state.getBuildNotes()
    const hasNotes = Object.keys(notes).length > 0
    if (
      hasNotes &&
      !window.confirm(
        'Export includes your private per-level notes for this build. Copy to clipboard anyway?',
      )
    ) {
      return
    }
    const payload = buildPayloadFromGuideState(state, { includeNotes: hasNotes })
    const ok = await copyText(exportJson(payload))
    setJsonState(ok ? 'ok' : 'err')
    resetLater(setJsonState)
  }

  return (
    <div className="export-menu" role="group" aria-label="Share and export progress">
      <button
        type="button"
        className={`ctrl-btn ${linkState === 'err' ? 'export-err' : ''}`}
        onClick={copyLink}
        title="Copy deep link (#build/level) to clipboard"
      >
        {linkState === 'ok' ? 'Link copied!' : linkState === 'err' ? 'Copy failed' : '⎘ Share link'}
      </button>
      <button
        type="button"
        className={`ctrl-btn ${jsonState === 'err' ? 'export-err' : ''}`}
        onClick={copyJson}
        title="Copy this build's progress as JSON (level, completed, flags, checklist, notes)"
      >
        {jsonState === 'ok' ? 'JSON copied!' : jsonState === 'err' ? 'Copy failed' : '{ } Export build'}
      </button>
      {linkState === 'err' && (
        <span className="export-err-msg" role="alert">
          Could not copy the link — copy the URL from your browser address bar (#build/level).
        </span>
      )}
      {jsonState === 'err' && (
        <span className="export-err-msg" role="alert">
          Could not copy JSON — check clipboard permissions or try again.
        </span>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {linkState === 'ok' ? 'Share link copied to clipboard' : ''}
        {jsonState === 'ok' ? 'Build progress JSON copied to clipboard' : ''}
      </span>
    </div>
  )
}