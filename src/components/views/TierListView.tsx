import { useState } from 'react'
import { BUILD_BY_ID } from '../../data/builds'
import { CLASS_ORDER } from '../../data/classes'
import { TIER_LIST, TIER_LIST_NOTE, TIER_ORDER } from '../../data/tierList'
import { BUILD_STYLE } from '../../data/finder'
import type { ClassName } from '../../data/types'

interface Props {
  currentBuildId: string
  onPickBuild: (id: string) => void
}

export function TierListView({ currentBuildId, onPickBuild }: Props) {
  const [classFilter, setClassFilter] = useState<ClassName | 'all'>('all')

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-tiers" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Tier List</h2>
        <p className="section-intro" style={{ marginBottom: '1rem' }}>
          {TIER_LIST_NOTE}
        </p>

        <div className="chip-row" role="group" aria-label="Filter tier list by class" style={{ marginBottom: '1.1rem' }}>
          <button
            type="button"
            className={`filter-chip ${classFilter === 'all' ? 'on' : ''}`}
            onClick={() => setClassFilter('all')}
          >
            All classes
          </button>
          {CLASS_ORDER.map((cn) => (
            <button
              key={cn}
              type="button"
              className={`filter-chip ${classFilter === cn ? 'on' : ''}`}
              onClick={() => setClassFilter(cn)}
            >
              {cn}
            </button>
          ))}
        </div>

        <div className="tier-list-wrap">
          {TIER_ORDER.map((tier) => {
            const entries = TIER_LIST[tier].filter(({ buildId }) => {
              const b = BUILD_BY_ID[buildId]
              return b && (classFilter === 'all' || b.className === classFilter)
            })
            return (
              <div className="tier-row" key={tier}>
                <div className={`tier-label ${tier}`} aria-hidden="true">
                  {tier}
                </div>
                <div className="tier-items">
                  <span className="sr-only">{tier} tier:</span>
                  {entries.length === 0 ? (
                    <span className="tier-empty">—</span>
                  ) : (
                    entries.map(({ buildId, note }) => {
                      const b = BUILD_BY_ID[buildId]
                      const you = b.id === currentBuildId
                      return (
                        <button
                          key={buildId}
                          type="button"
                          className={`tier-chip ${you ? 'you' : ''}`}
                          title={note}
                          onClick={() => onPickBuild(buildId)}
                        >
                          <span className="chip-tier">{b.tier}</span>
                          {b.className} · {b.name}
                          <span className="chip-style">{BUILD_STYLE[b.id]}</span>
                          {you && <span className="sr-only"> (your current build)</span>}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
