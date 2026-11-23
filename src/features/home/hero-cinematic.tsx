/**
 * Cinematic home hero — an alternative to `hero.tsx` (kept intact).
 * Switched by `HERO_VARIANT` in `src/lib/experiments.ts`.
 *
 *  - Photography: a slow zoom-out (1.12 → 1 over ~10s) on every photograph and
 *    long cross-fades between a few, so it reads as one continuous shot rather
 *    than a slideshow. Only the first photo loads up front; each next one is
 *    fetched quietly while the current one is on screen.
 *  - A light horizontal parallax follows the mouse.
 *  - Headline lines rise out of a mask while sharpening from a blur.
 *  - Scrolling out: the photograph draws in to a framed, rounded panel and the
 *    copy lifts away — no pinning or scroll hijacking.
 *  - Reduced motion: one still photograph, no zoom, parallax, blur or cycling.
 */
import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { ActionButton } from "@/components/shared/action-button"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { ImageName } from "@/content/types"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { useBootReady } from "@/lib/boot"
import { EASE } from "@/lib/motion"

interface Slide {
  name: ImageName
  alt: string
  /** Tailwind object-position class (written out in full so Tailwind can see it). */
  position?: string
}

const SLIDES: Slide[] = [
  {
    name: "hero-residence-dusk",
    alt: "Contemporary two-storey residence at dusk, its timber and glass facade glowing with warm interior light",
    position: "object-[60%_center]",
  },
  { name: "facade-timber-night", alt: "Timber-slatted facade of a modern home lit warmly at night" },
  { name: "svc-residential", alt: "Row of new two-storey homes with sandstone facades at golden hour" },
  { name: "house-courtyard", alt: "Timber-clad family home with a courtyard entrance" },
]

/** Seconds each photograph leads before the next fades in. */
const HOLD = 7.5
/** Cross-fade length, in seconds. */
const FADE = 2.6
/** Zoom-out length, in seconds (outlasts the hold, so the camera never stops). */
const ZOOM = 10
const START_SCALE = 1.12
/** How far the photograph drifts with the mouse, in px each way. */
const PARALLAX = 22

export function HeroCinematic() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() ?? false
  const booted = useBootReady()
  const { openConsultation } = useConsultation()

  /* ---- Photography cycle --------------------------------------------- */
  const [index, setIndex] = useState(0)
  const [cycled, setCycled] = useState(false)
  // Hold back the second photo until the first has had the network to itself.
  const [extras, setExtras] = useState(false)
  useEffect(() => {
    if (!booted || reduce) return
    const t = window.setTimeout(() => setExtras(true), 1800)
    return () => window.clearTimeout(t)
  }, [booted, reduce])
  useEffect(() => {
    if (!extras || reduce) return
    const t = window.setInterval(() => {
      // Don't advance unseen: a background tab resumes where it left off.
      if (document.hidden) return
      setIndex((i) => (i + 1) % SLIDES.length)
      setCycled(true)
    }, HOLD * 1000)
    return () => window.clearInterval(t)
  }, [extras, reduce])
  const next = (index + 1) % SLIDES.length
  const mounted = extras ? [index, next] : [index]

  /* ---- Mouse parallax ------------------------------------------------- */
  const drift = useSpring(0, { stiffness: 40, damping: 18, mass: 0.8 })
  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return
    drift.set(-((e.clientX / window.innerWidth) * 2 - 1) * PARALLAX)
  }

  /* ---- Scroll-out ------------------------------------------------------ */
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const insetX = useTransform(p, [0, 0.7], [0, reduce ? 0 : 2.5])
  const insetY = useTransform(p, [0, 0.7], [0, reduce ? 0 : 3])
  const radius = useTransform(p, [0, 0.7], [0, reduce ? 0 : 28])
  const frame = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`
  const imageY = useTransform(p, [0, 1], ["0%", reduce ? "0%" : "14%"])
  const dim = useTransform(p, [0, 0.8], [0, 0.45])
  const contentY = useTransform(p, [0, 0.6], [0, reduce ? 0 : -70])
  const contentOpacity = useTransform(p, [0, 0.5], [1, reduce ? 1 : 0])

  /* ---- Entrances ------------------------------------------------------- */
  const soft = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(8px)" },
          animate: booted ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
          transition: { duration: 1.2, delay, ease: EASE },
        }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-canvas text-white"
    >
      {/* Framed media layer: photographs + overlays draw in together on scroll */}
      <motion.div className="absolute inset-0 -z-10 overflow-hidden bg-night" style={{ clipPath: frame }}>
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          {/* Parallax drift; a fixed 6% overscale keeps the edges off screen */}
          <motion.div className="absolute inset-0 scale-[1.06]" style={{ x: drift }}>
            <AnimatePresence>
              {mounted.map((i) => {
                const s = SLIDES[i]!
                const active = i === index
                const firstShot = i === 0 && !cycled
                return (
                  <motion.div
                    key={s.name}
                    className="absolute inset-0"
                    style={{ zIndex: active ? 1 : 0 }}
                    initial={{ opacity: firstShot || reduce ? 1 : 0, scale: reduce ? 1 : START_SCALE }}
                    animate={
                      reduce
                        ? { opacity: 1, scale: 1 }
                        : active
                          ? booted
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 1, scale: START_SCALE }
                          : { opacity: 0, scale: START_SCALE }
                    }
                    // The outgoing photo stays solid underneath until the new one has fully faded in.
                    exit={{
                      opacity: 0,
                      zIndex: 0,
                      transition: { opacity: { delay: FADE, duration: 0.01 }, zIndex: { duration: 0 } },
                    }}
                    transition={{
                      opacity: { duration: active ? FADE : 0, ease: [0.4, 0, 0.2, 1] },
                      scale: { duration: active ? ZOOM : 0, ease: [0.3, 0, 0.4, 1] }, // slow, even drift that eases to rest
                    }}
                  >
                    <ResponsiveImage
                      name={s.name}
                      alt={active ? s.alt : ""}
                      priority={i === 0}
                      sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
                      className="size-full bg-night"
                      imgClassName={s.position}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Layered overlays: depth from the ground, a reading shadow on the left, a cap for the header */}
        <div aria-hidden className="absolute inset-0 z-10 bg-linear-to-t from-night/90 via-night/45 to-night/20" />
        <div aria-hidden className="absolute inset-0 z-10 bg-linear-to-r from-night/60 via-night/15 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-night/45 to-transparent" />
        <div aria-hidden className="absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgb(0_0_0/0.35)_100%)]" />
        <motion.div aria-hidden className="absolute inset-0 z-10 bg-night" style={{ opacity: dim }} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site flex flex-1 flex-col justify-end pt-32 pb-16 md:pb-24"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h1 id="hero-title" className="text-display">
              {["Building Trust.", "Creating Homes."].map((line, i) => (
                // Side padding gives the blur room, so the mask only clips top and bottom.
                <span key={line} className="-mx-[0.4em] -mb-[0.12em] block overflow-hidden px-[0.4em] pb-[0.16em]">
                  <motion.span
                    className="block will-change-transform"
                    initial={reduce ? false : { y: "108%", opacity: 0, filter: "blur(14px)" }}
                    animate={booted ? { y: "0%", opacity: 1, filter: "blur(0px)" } : undefined}
                    transition={{
                      y: { duration: 1.35, delay: 0.35 + i * 0.16, ease: EASE },
                      opacity: { duration: 0.9, delay: 0.35 + i * 0.16, ease: "easeOut" },
                      filter: { duration: 1.5, delay: 0.4 + i * 0.16, ease: EASE },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <motion.p {...soft(0.95)} className="text-lead max-w-md text-white/80">
              Your build is one of the biggest decisions you&rsquo;ll make. Since 2001, we&rsquo;ve stood
              beside families and businesses from the first plan to the final key &mdash; and long after.
            </motion.p>
            <motion.div {...soft(1.12)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
              <ActionButton variant="light" size="md" className="w-full sm:w-auto" onClick={openConsultation}>
                Tell Us About Your Project
              </ActionButton>
              <ActionButton variant="outline-light" size="md" className="w-full sm:w-auto" to="/projects">
                Explore Our Projects
              </ActionButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
