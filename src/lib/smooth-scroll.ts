import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * Smooth wheel scrolling (Lenis) for mouse and trackpad visitors. The page
 * glides to where the wheel sends it instead of jumping in steps. It still uses
 * the browser's own scroll position, so Motion's scroll animations, sticky
 * sections and ScrollRestoration work unchanged.
 *
 * Off on touch screens (native touch scrolling is already smooth) and for
 * visitors who prefer reduced motion.
 */
let lenis: Lenis | null = null

/** Light glide: smooth, but never floaty. Higher is snappier (Lenis default 0.1). */
const LERP = 0.11

export function useSmoothScroll() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)")
  const enabled = finePointer && !reduce

  useEffect(() => {
    if (!enabled) return
    const instance = new Lenis({
      lerp: LERP,
      autoRaf: true,
      // Clicking a link stops any glide still running, so the next page starts clean.
      stopInertiaOnNavigate: true,
      // Dialogs (menu, consultation form, lightbox) scroll natively.
      prevent: (node) => node.getAttribute("role") === "dialog",
    })
    lenis = instance

    // Pause while a dialog is open, so the page behind it can't glide. Radix
    // blocks the wheel with its own listener, which Lenis would bypass, so we
    // watch for the dialog itself (Radix portals it straight into <body>).
    const sync = () => {
      const locked =
        document.querySelector('[role="dialog"]') !== null ||
        document.body.hasAttribute("data-scroll-locked") ||
        document.body.style.overflow === "hidden"
      if (locked) instance.stop()
      else instance.start()
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, attributes: true, attributeFilter: ["data-scroll-locked", "style"] })
    sync()

    return () => {
      observer.disconnect()
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [enabled])
}

/** Stops any glide still running (e.g. on back/forward navigation). */
export function resetSmoothScroll() {
  lenis?.scrollTo(window.scrollY, { immediate: true, force: true })
}

/**
 * Scrolls the page to `top`: glides with Lenis when it is active, otherwise
 * uses the browser (smooth unless the visitor prefers reduced motion).
 */
export function scrollToY(top: number) {
  if (lenis) {
    lenis.scrollTo(top)
    return
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
}
