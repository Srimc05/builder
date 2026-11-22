/**
 * Boot loader control. The loader markup lives in index.html so it paints
 * before any JavaScript arrives; this module decides when it leaves.
 *
 * It lifts as soon as the brand font and the first priority (hero) image are
 * ready — with a short minimum on the first visit so it never flickers, no
 * minimum on later loads in the same session, and a hard cap so it can never
 * hold the page hostage. Entrance animations wait for `useBootReady()`.
 */
import { useSyncExternalStore } from "react"

import { sessionFlags } from "@/lib/session"

const SEEN_KEY = "hsb:boot-seen"
const MIN_FIRST_VISIT_MS = 900
const MAX_WAIT_MS = 3500

let ready = typeof document === "undefined" || !document.getElementById("boot-loader")
const listeners = new Set<() => void>()

function markReady() {
  if (ready) return
  ready = true
  listeners.forEach((l) => l())
}

/** True once the loader has started to lift — use it to start entrance animations. */
export function useBootReady() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => ready,
    () => true,
  )
}

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

/** Resolves when the first high-priority image on the page has loaded (or none appears). */
function priorityImageLoaded(): Promise<void> {
  return new Promise((resolve) => {
    const deadline = performance.now() + MAX_WAIT_MS
    const poll = () => {
      const img = document.querySelector<HTMLImageElement>('#root img[fetchpriority="high"]')
      if (img) {
        if (img.complete) return resolve()
        img.addEventListener("load", () => resolve(), { once: true })
        img.addEventListener("error", () => resolve(), { once: true })
        return
      }
      // Pages without a hero photo: give the route a moment to render, then go.
      if (performance.now() > deadline || (document.querySelector("#root main") && performance.now() > 400)) return resolve()
      requestAnimationFrame(poll)
    }
    poll()
  })
}

export async function dismissBootLoader() {
  const el = document.getElementById("boot-loader")
  if (!el) return markReady()

  const firstVisit = !sessionFlags.get(SEEN_KEY)
  await Promise.race([Promise.all([document.fonts?.ready, priorityImageLoaded()]), sleep(MAX_WAIT_MS)])
  const minimum = firstVisit ? MIN_FIRST_VISIT_MS - performance.now() : 0
  if (minimum > 0) await sleep(minimum)

  sessionFlags.set(SEEN_KEY)
  markReady()
  el.classList.add("is-done")
  el.setAttribute("aria-hidden", "true")
  const remove = () => el.remove()
  el.addEventListener("transitionend", remove, { once: true })
  window.setTimeout(remove, 1200)
}
