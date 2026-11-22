/**
 * Animated Testimonials — adapted from Aceternity UI
 * (ui.aceternity.com/components/animated-testimonials).
 *
 * Preserved: stacked image transitions with tilt + lift, previous/next
 * navigation, word-by-word blur reveal and the two-column layout.
 *
 * Improvements:
 *  - stable per-card rotation (no Math.random during render)
 *  - prefers-reduced-motion: no tilt, lift or blur — a simple crossfade
 *  - optional autoplay (off by default) that pauses on hover/focus and when
 *    the tab is hidden, with proper interval cleanup
 *  - labelled 44px controls, arrow-key support and carousel semantics
 *  - responsive WebP images via ResponsiveImage
 *  - construction-specific fields (client, project, location)
 */
import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from "react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Testimonial } from "@/content/types"
import { cn } from "@/lib/utils"

/** Deterministic tilt in the original's -10°…10° range. */
const tiltFor = (index: number) => [-7, 5, -3, 9, -9, 3, 7, -5][index % 8] ?? 0

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  interval = 6000,
  className,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
  interval?: number
  className?: string
}) => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion() ?? false
  const regionId = useId()
  const count = testimonials.length

  const handleNext = useCallback(() => setActive((prev) => (prev + 1) % count), [count])
  const handlePrev = useCallback(() => setActive((prev) => (prev - 1 + count) % count), [count])

  const tilts = useMemo(() => testimonials.map((_, i) => tiltFor(i)), [testimonials])

  // Autoplay: off by default, never under reduced motion, paused while the
  // visitor interacts or the tab is hidden.
  const shouldPlay = autoplay && !reduce && !paused && count > 1
  useEffect(() => {
    if (!shouldPlay) return
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") handleNext()
    }, interval)
    return () => window.clearInterval(id)
  }, [shouldPlay, interval, handleNext])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      handleNext()
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      handlePrev()
    }
  }

  const current = testimonials[active]
  if (!current) return null

  const isActive = (index: number) => index === active

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn("mx-auto w-full font-sans antialiased", className)}
    >
      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
        <div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[17rem] [perspective:1200px] md:max-w-none">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  aria-hidden={!isActive(index)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, z: -100, rotate: tilts[index] }}
                  animate={
                    reduce
                      ? { opacity: isActive(index) ? 1 : 0, zIndex: isActive(index) ? 40 : 1 }
                      : {
                          opacity: isActive(index) ? 1 : 0.7,
                          scale: isActive(index) ? 1 : 0.95,
                          z: isActive(index) ? 0 : -100,
                          rotate: isActive(index) ? 0 : tilts[index],
                          zIndex: isActive(index) ? 40 : count + 2 - index,
                          y: isActive(index) ? [0, -80, 0] : 0,
                        }
                  }
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, z: 100, rotate: tilts[index] }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <ResponsiveImage
                    name={testimonial.image.name}
                    alt={isActive(index) ? testimonial.image.alt : ""}
                    sizes="(min-width: 1024px) 320px, 272px"
                    className="h-full w-full rounded-media"
                    imgClassName="object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 md:py-2">
          <motion.div
            key={active}
            id={regionId}
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${count}`}
            initial={{ y: reduce ? 0 : 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <svg aria-hidden viewBox="0 0 40 32" className="h-6 w-7.5 text-bronze">
              <path
                fill="currentColor"
                d="M0 32V19.2C0 8.6 5.6 2.2 16.8 0l1.6 4.4C12.3 6.3 9.4 9.9 9.2 15.2H16V32H0Zm22.4 0V19.2C22.4 8.6 28 2.2 39.2 0l.8 4.4c-6.1 1.9-9 5.5-9.2 10.8h7.2V32H22.4Z"
              />
            </svg>
            <blockquote className="mt-5">
              <p className="max-w-2xl text-[clamp(1.08rem,0.98rem+0.45vw,1.3rem)] leading-[1.55] font-medium tracking-[-0.01em] text-ink">
                {reduce
                  ? current.feedback
                  : current.feedback.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
              </p>
              <footer className="mt-7 max-w-2xl border-t border-ink/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.015em] text-ink">{current.clientName}</h3>
                <p className="mt-1 text-sm text-stone">
                  {current.projectName} <span aria-hidden>·</span> {current.location}
                </p>
              </footer>
            </blockquote>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-controls={regionId}
              aria-label="Previous testimonial"
              className="group/button focus-ring flex size-11 items-center justify-center rounded-btn bg-white text-ink shadow-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-white hover:ring-ink"
            >
              <IconArrowLeft aria-hidden className="size-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-controls={regionId}
              aria-label="Next testimonial"
              className="group/button focus-ring flex size-11 items-center justify-center rounded-btn bg-white text-ink shadow-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-white hover:ring-ink"
            >
              <IconArrowRight aria-hidden className="size-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
            <p className="text-meta ml-2 font-semibold text-stone tabular-nums" aria-hidden>
              {String(active + 1).padStart(2, "0")} <span className="text-stone/50">/ {String(count).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
