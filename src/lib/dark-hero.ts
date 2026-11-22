import { useLayoutEffect, useSyncExternalStore } from "react"

/**
 * Lets a page announce that it opens with a full-bleed photo, so the site
 * header can start light-on-dark. Counted rather than boolean, so a route
 * change (old header unmounts, new one mounts) never flickers.
 */
let count = 0
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

/** Call from a component that renders a dark, full-bleed hero. */
export function useRegisterDarkHero(active = true) {
  useLayoutEffect(() => {
    if (!active) return
    count += 1
    emit()
    return () => {
      count -= 1
      emit()
    }
  }, [active])
}

/** True while any dark hero is on the page. */
export function useDarkHero() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => count > 0,
    () => false,
  )
}
