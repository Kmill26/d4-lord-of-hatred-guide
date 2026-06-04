/**
 * Resilient key/value storage: localStorage with an in-memory fallback for
 * private-mode / blocked-storage environments. Extracted from useGuideState so
 * it can be shared and unit-tested.
 */
export interface KVStorage {
  get(key: string): string | null
  set(key: string, value: string): void
  remove(key: string): void
}

export function createStorage(): KVStorage {
  const mem = new Map<string, string>()
  let ok = false
  try {
    if (typeof localStorage !== 'undefined') {
      const t = '__loh_probe__'
      localStorage.setItem(t, t)
      localStorage.removeItem(t)
      ok = true
    }
  } catch {
    ok = false
  }
  return {
    get(k) {
      try {
        return ok ? localStorage.getItem(k) : mem.get(k) ?? null
      } catch {
        return mem.get(k) ?? null
      }
    },
    set(k, v) {
      try {
        if (ok) localStorage.setItem(k, v)
        else mem.set(k, v)
      } catch {
        mem.set(k, v)
      }
    },
    remove(k) {
      try {
        if (ok) localStorage.removeItem(k)
        else mem.delete(k)
      } catch {
        mem.delete(k)
      }
    },
  }
}

export const storage: KVStorage = createStorage()
