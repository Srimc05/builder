/**
 * Scroll spotlight: touch screens can't hover, so on them the card crossing the
 * middle of the screen gets `data-spot` and shows its hover look instead
 * (styled with the `spot:` / `group-spot:` variants defined in index.css).
 * Mouse and trackpad devices are left alone and keep real hover.
 *
 * Usage: `<Link ref={spotlight} className="group …">`. One shared
 * IntersectionObserver per band, so there are no scroll listeners.
 */

const BANDS = {
  /** A thin band across the middle of the screen: one card of a vertical list at a time. */
  y: "-45% 0px -45% 0px",
  /**
   * A strip 30–60% across the screen: on phones it holds only the card
   * snapped in a horizontal carousel, including the last card, which can't
   * snap to the start.
   */
  x: "-25% -40% -25% -30%",
} as const

type Band = keyof typeof BANDS

const observers = new Map<Band, IntersectionObserver>()

/**
 * Cards currently in their band, oldest first. Short cards can share the band,
 * so only one card on the page is lit: the one that reached the middle last
 * (whichever way the visitor is scrolling). When it leaves, the previous one
 * still in the band takes over.
 */
const inBand = new Set<Element>()
let lit: Element | null = null

function relight() {
  const next = [...inBand].at(-1) ?? null
  if (next === lit) return
  lit?.removeAttribute("data-spot")
  next?.setAttribute("data-spot", "")
  lit = next
}

function observerFor(band: Band) {
  let io = observers.get(band)
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          inBand.delete(target) // re-adding moves it to the end (newest)
          if (isIntersecting) inBand.add(target)
        }
        relight()
      },
      { rootMargin: BANDS[band] },
    )
    observers.set(band, io)
  }
  return io
}

function spotlightRef(band: Band) {
  return (el: HTMLElement | null) => {
    if (!el || typeof IntersectionObserver === "undefined" || !window.matchMedia("(hover: none)").matches) return
    const io = observerFor(band)
    io.observe(el)
    return () => {
      io.unobserve(el)
      inBand.delete(el)
      relight()
    }
  }
}

/** Ref for cards in a vertical list or grid. */
export const spotlight = spotlightRef("y")

/** Ref for cards in a horizontal, snap-scrolling carousel. */
export const spotlightX = spotlightRef("x")
