/**
 * Design experiments that can be switched off without deleting anything.
 *
 * HERO_VARIANT
 *  - "cinematic": the new home hero (slow cross-fading photography, blur-to-sharp
 *    headline, framed scroll-out), the header's
 *    load-in animation and the full-screen menu with image previews.
 *  - "classic": the original hero and the original slide-in menu, exactly as before.
 *
 * To go back permanently, change the default below to "classic".
 * To compare without editing code, add `?hero=classic` or `?hero=cinematic` to
 * any URL (the choice is remembered for the rest of the browser session).
 */
export type HeroVariant = "cinematic" | "classic"

const DEFAULT_VARIANT: HeroVariant = "cinematic"
const KEY = "hsb:hero-variant"

function resolveVariant(): HeroVariant {
  if (typeof window === "undefined") return DEFAULT_VARIANT
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("hero")
    if (fromUrl === "classic" || fromUrl === "cinematic") {
      sessionStorage.setItem(KEY, fromUrl)
      return fromUrl
    }
    const stored = sessionStorage.getItem(KEY)
    if (stored === "classic" || stored === "cinematic") return stored
  } catch {
    // Storage can be unavailable (private mode); fall back to the default.
  }
  return DEFAULT_VARIANT
}

export const HERO_VARIANT: HeroVariant = resolveVariant()
export const isCinematic = HERO_VARIANT === "cinematic"
