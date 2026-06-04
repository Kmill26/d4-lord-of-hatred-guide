import { useEffect, useRef } from 'react'

const GROUPS: Array<{ scope: string; items: Array<[string, string]> }> = [
  {
    scope: 'Anywhere',
    items: [
      ['⌘K / Ctrl K', 'Command palette — jump to anything'],
      ['?', 'Show / hide this help'],
      ['Tab', 'Move between controls'],
      ['← →', 'Switch section (when a tab is focused)'],
    ],
  },
  {
    scope: 'Point Guide',
    items: [
      ['Space / Enter', 'Mark done & advance a level'],
      ['← / →', 'Previous / next level'],
      ['M', 'Jump to the next ★ milestone'],
      ['/', 'Toggle the full level list'],
      ['R', 'Open Quick Reference'],
    ],
  },
  {
    scope: 'Quick Ref',
    items: [
      ['← / →', 'Previous / next level'],
      ['R or /', 'Back to the Point Guide'],
    ],
  },
]

export function ShortcutsHelp({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab') {
        // Single focusable element — trap focus on it.
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="help-title">Keyboard shortcuts</h2>
          <button
            ref={closeRef}
            type="button"
            className="ctrl-btn"
            onClick={onClose}
            aria-label="Close shortcuts"
          >
            ✕
          </button>
        </div>
        {GROUPS.map((g) => (
          <div className="shortcut-group" key={g.scope}>
            <h3>{g.scope}</h3>
            <dl>
              {g.items.map(([key, desc]) => (
                <div className="shortcut-row" key={key}>
                  <dt>
                    <kbd>{key}</kbd>
                  </dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
