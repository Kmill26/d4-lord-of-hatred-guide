import { useEffect, useRef, useState } from 'react'
import { BUILDS } from '../data/builds'
import { CLASSES } from '../data/classes'
import { FINDER_QUESTIONS, recommendBuilds, type FinderOption } from '../data/finder'
import { ClassPortrait, TierBadge } from './shared'

interface Props {
  onClose: () => void
  onPick: (id: string) => void
}

/** Mount only while open — parent unmounts to reset the questionnaire. */
export function BuildFinder({ onClose, onPick }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<FinderOption[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => dialogRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const done = step >= FINDER_QUESTIONS.length
  const q = FINDER_QUESTIONS[step]
  const results = done ? recommendBuilds(answers, BUILDS).slice(0, 3) : []

  const choose = (opt: FinderOption) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = opt
      return next
    })
    setStep((s) => s + 1)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal finder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="finder-title"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="finder-title">{done ? 'Your best matches' : 'Find my build'}</h2>
          <button type="button" className="ctrl-btn" onClick={onClose} aria-label="Close build finder">
            ✕
          </button>
        </div>

        {!done && (
          <>
            <div className="finder-progress" aria-hidden="true">
              {FINDER_QUESTIONS.map((_, i) => (
                <span key={i} className={`finder-dot ${i <= step ? 'on' : ''}`} />
              ))}
            </div>
            <p className="finder-step-count">
              Question {step + 1} of {FINDER_QUESTIONS.length}
            </p>
            <h3 className="finder-q">{q.question}</h3>
            <div className="finder-options">
              {q.options.map((opt) => (
                <button key={opt.label} type="button" className="finder-option" onClick={() => choose(opt)}>
                  <span className="finder-opt-label">{opt.label}</span>
                  <span className="finder-opt-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                className="ctrl-btn"
                style={{ marginTop: '0.75rem' }}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                ← Back
              </button>
            )}
          </>
        )}

        {done && (
          <>
            <div className="finder-results">
              {results.map(({ build: b }, i) => {
                const cls = CLASSES[b.className]
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`finder-result ${i === 0 ? 'top' : ''}`}
                    onClick={() => {
                      onPick(b.id)
                      onClose()
                    }}
                  >
                    {i === 0 && <span className="finder-best">Best match</span>}
                    <ClassPortrait cls={cls} height={56} className="thumb" />
                    <div className="finder-result-body">
                      <div className="finder-result-name">
                        {b.className} — {b.name} <TierBadge tier={b.tier} />
                      </div>
                      <div className="finder-result-feels">{b.feelsLike}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <button type="button" className="ctrl-btn" style={{ marginTop: '0.5rem' }} onClick={() => setStep(0)}>
              ↺ Start over
            </button>
          </>
        )}
      </div>
    </div>
  )
}
