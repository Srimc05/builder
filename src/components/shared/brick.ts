/**
 * Hover speed for every card on the site — change it here to change it everywhere.
 * 0.5s with a gentle ease-out (cubic): calm, but still answers the cursor at once.
 */
const HOVER_TIMING = "duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"

/**
 * Shared brick language, so every card grid on the site matches the wall:
 * a sand "mortar" panel with bricks set into it.
 */
export const brick = {
  panel: "rounded-media bg-sand-deep p-2.5 ring-1 ring-black/[0.04] sm:p-3",
  gap: "gap-2.5 sm:gap-3",
  surface:
    "rounded-brick bg-white shadow-[inset_0_1px_0_rgb(255_255_255),0_2px_0_rgb(20_20_20/0.07),0_6px_14px_-8px_rgb(20_20_20/0.18)]",
  /**
   * The one hover timing for every card on the site. Anything that changes
   * inside a card on hover (photo, icon, numeral) uses it too, so the whole
   * card moves as one.
   */
  timing: HOVER_TIMING,
  /**
   * 3D lift on hover (and keyboard focus): the card rises up and left and a
   * solid ink block appears behind it on the right and bottom, like an
   * extruded button. Reduced motion keeps the block but not the movement.
   * Add `group` to the card so its contents can react via `group-hover`.
   */
  lift: `group transition-[translate,box-shadow] ${HOVER_TIMING} hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] hover:ring-1 hover:ring-ink focus-visible:-translate-x-1.5 focus-visible:-translate-y-1.5 focus-visible:shadow-[6px_6px_0_0_var(--color-ink)] focus-visible:ring-1 focus-visible:ring-ink motion-reduce:hover:translate-none motion-reduce:focus-visible:translate-none`,
  icon: "grid size-11 shrink-0 place-items-center rounded-brick bg-bronze-soft text-bronze-deep",
  /** Icon tile turns solid terracotta when its card is hovered. */
  iconHover: `transition-colors ${HOVER_TIMING} group-hover:bg-bronze-deep group-hover:text-white`,
  /** Large faint number behind a brick's text (drawn via CSS content, so it isn't read or contrast-checked). */
  numeral:
    "pointer-events-none absolute -right-1 -bottom-4 hidden text-[5.5rem] leading-none font-bold tracking-[-0.06em] text-sand-deep/80 tabular-nums select-none before:content-[attr(data-numeral)] sm:block",
} as const

/** Faint stretcher-bond courses for dark bricks, as a repeating SVG background. */
export const BRICK_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='24'%3E%3Cpath d='M0 .5H48M0 12.5H48M24 0V12M12 12V24M36 12V24' stroke='white' stroke-opacity='.09' fill='none'/%3E%3C/svg%3E\")"
