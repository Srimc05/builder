import type { Variants } from "motion/react"

/** Shared easing — a long, calm deceleration used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Viewport options for scroll reveals: trigger once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const
