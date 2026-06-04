import { useState } from 'react'
import { buildChecklist } from '../data/checklist'
import { getEnrichment } from '../data/enrich'
import type { Build } from '../data/types'

type Tab = 'tips' | 'checklist' | 'notes'

interface Props {
  build: Build
  level: number
  checks: Set<string>
  toggleCheck: (key: string) => void
  getNote: (lvl?: number) => string
  setNote: (lvl: number, value: string) => void
  goToLevel: (lvl: number) => void
}

export function GuideDossier({
  build,
  level,
  checks,
  toggleCheck,
  getNote,
  setNote,
  goToLevel,
}: Props) {
  const [tab, setTab] = useState<Tab>('tips')
  const enrich = getEnrichment(build.id)
  const groups = buildChecklist(build)
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const doneCount = groups.reduce(
    (n, g) => n + g.items.filter((i) => checks.has(i.key)).length,
    0,
  )

  const tabs: Array<[Tab, string]> = [
    ['tips', 'Pro Tips'],
    ['checklist', `Checklist · ${doneCount}/${total}`],
    ['notes', 'My Notes'],
  ]

  return (
    <div className="dossier">
      <div className="dossier-tabs" role="tablist" aria-label="Build dossier">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`dossier-tab ${tab === id ? 'on' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="dossier-body">
        {tab === 'tips' &&
          (enrich ? (
            <div className="tips-grid">
              <div className="tip-block span2">
                <h4>Core loop</h4>
                <p className="loop">{enrich.resourceLoop}</p>
              </div>
              <div className="tip-block">
                <h4>Common mistakes</h4>
                <ul>
                  {enrich.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="tip-block">
                <h4>Boss &amp; elite tips</h4>
                <ul>
                  {enrich.bossTips.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="tip-block span2">
                <h4>Pro tips</h4>
                <ul>
                  {enrich.proTips.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="empty-note">No extra tips for this build yet.</p>
          ))}

        {tab === 'checklist' && (
          <div className="checklist">
            {groups.map((g) => (
              <div className="checklist-group" key={g.title}>
                <h4>{g.title}</h4>
                <ul>
                  {g.items.map((item) => {
                    const on = checks.has(item.key)
                    return (
                      <li key={item.key} className={on ? 'checked' : ''}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          className="check-box"
                          onClick={() => toggleCheck(item.key)}
                        >
                          <span className="check-mark" aria-hidden="true">
                            {on ? '✓' : ''}
                          </span>
                          <span className="check-label">{item.label}</span>
                        </button>
                        {item.level != null && (
                          <button
                            type="button"
                            className="check-jump"
                            title={`Go to level ${item.level}`}
                            aria-label={`Jump to level ${item.level}`}
                            onClick={() => goToLevel(item.level!)}
                          >
                            L{item.level} →
                          </button>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'notes' && (
          <div className="notes-panel">
            <label htmlFor="level-note" className="notes-label">
              Your note for <strong>Level {level}</strong> — saved automatically, per build.
            </label>
            <textarea
              id="level-note"
              className="notes-area"
              placeholder={`e.g. "respec'd here", "got Litany of Sable", "switch to Inner Sight"…`}
              value={getNote(level)}
              onChange={(e) => setNote(level, e.target.value)}
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  )
}
