import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, type PanInfo } from "motion/react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Testimonial } from "@/content/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

/**
 * Card colours, in rotation: white, ink, terracotta and violet. Violet is the
 * site's action colour, so it appears on only one card in four.
 */
const TONES = [
  { card: "bg-white text-ink ring-1 ring-line", muted: "text-stone", rule: "bg-line", quote: "text-bronze" },
  { card: "bg-night text-white", muted: "text-white/65", rule: "bg-white/15", quote: "text-white/40" },
  { card: "bg-bronze-deep text-white", muted: "text-white/80", rule: "bg-white/25", quote: "text-white/50" },
  { card: "bg-brand text-white", muted: "text-white/75", rule: "bg-white/25", quote: "text-white/50" },
] as const

const SPRING = { type: "spring", stiffness: 260, damping: 26 } as const

/**
 * Client testimonials as a scattered pile of cards.
 * - Large screens: the cards fan across the width; hovering, clicking or
 *   focusing one brings it to the front, straight and slightly larger.
 * - Phones and tablets: a tidy deck. Tap or swipe the front card, or use the
 *   buttons, to bring the next one forward.
 */
export function ScatteredTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const wide = useMediaQuery("(min-width: 1024px)")
  if (testimonials.length === 0) return null
  return wide ? <Scatter items={testimonials} /> : <Deck items={testimonials} />
}

/* ------------------------------------------------------------------ */
/* Large screens: scatter                                              */
/* ------------------------------------------------------------------ */

const CARD_REM = 21

/**
 * Fan the cards across the width: spread, a little vertical jitter and
 * alternating tilt. `maxSpread` keeps the outermost cards inside the container.
 */
function slot(i: number, n: number, maxSpread: number) {
  const t = n === 1 ? 0 : (i / (n - 1)) * 2 - 1 // -1 … 1, left to right
  const spread = Math.min(n <= 2 ? 12 : n === 3 ? 18 : 26, maxSpread) // rem from centre to the outermost card
  return {
    x: t * spread,
    y: (i % 2 === 0 ? 3 : 0) + Math.abs(t) * 1.5,
    rotate: (i % 2 === 0 ? -6 : 6) + t * 4, // every card visibly tilted, alternating
  }
}

function Scatter({ items }: { items: Testimonial[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const active = hovered ?? pinned

  // Room either side of centre, minus half a card and a little air for the tilt.
  const ref = useRef<HTMLUListElement>(null)
  const [maxSpread, setMaxSpread] = useState(24)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const ro = new ResizeObserver(([entry]) => {
      const width = (entry?.contentRect.width ?? 0) / rem
      setMaxSpread(Math.max(0, width / 2 - CARD_REM / 2 - 1.5))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <ul ref={ref} className="relative mx-auto h-[27rem] max-w-6xl" onMouseLeave={() => setHovered(null)}>
      {items.map((t, i) => {
        const s = slot(i, items.length, maxSpread)
        const isActive = active === i
        return (
          <motion.li
            key={t.id}
            className="absolute top-0 left-1/2 w-[21rem]"
            style={{ marginLeft: `${s.x}rem`, zIndex: isActive ? 50 : i + 1 }}
            initial={false}
            animate={{
              x: "-50%",
              y: isActive ? `${s.y - 1}rem` : `${s.y}rem`,
              rotate: isActive ? 0 : s.rotate,
              scale: isActive ? 1.06 : 1,
            }}
            transition={SPRING}
          >
            <Card
              item={t}
              tone={i % TONES.length}
              raised={isActive}
              tabIndex={0}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setPinned(i)}
              onBlur={() => setPinned((p) => (p === i ? null : p))}
              onClick={() => setPinned((p) => (p === i ? null : i))}
            />
          </motion.li>
        )
      })}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Phones and tablets: deck                                            */
/* ------------------------------------------------------------------ */

function Deck({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion() ?? false
  const n = items.length
  const go = (step: number) => setIndex((i) => (i + step + n) % n)
  // A swipe ends with a pointer-up that would also count as a tap; ignore that one.
  const dragged = useRef(false)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    window.setTimeout(() => (dragged.current = false), 0)
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 400) go(info.offset.x < 0 ? 1 : -1)
  }

  return (
    <div>
      {/* All cards share one grid cell, so the deck is as tall as its tallest card */}
      <ul className="mx-auto grid max-w-md pt-4 pb-6 [&>li]:col-start-1 [&>li]:row-start-1">
        {items.map((t, i) => {
          const depth = (i - index + n) % n // 0 = front
          const front = depth === 0
          const hidden = depth > 2
          return (
            <motion.li
              key={t.id}
              aria-hidden={!front || undefined}
              inert={!front || undefined}
              className={cn(front && "cursor-grab active:cursor-grabbing")}
              style={{ zIndex: n - depth, touchAction: "pan-y" }}
              initial={false}
              animate={{
                rotate: front ? 0 : depth % 2 === 1 ? -4 * depth : 3 * depth,
                y: depth * 10,
                scale: 1 - depth * 0.04,
                opacity: hidden ? 0 : 1,
              }}
              transition={reduce ? { duration: 0 } : SPRING}
              drag={front && !reduce ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={onDragEnd}
            >
              <Card item={t} tone={i % TONES.length} raised={front} onClick={front ? () => !dragged.current && go(1) : undefined} />
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="focus-ring grid size-11 place-items-center rounded-btn border border-ink/15 bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <ArrowLeft aria-hidden className="size-5" />
        </button>
        <p className="text-meta min-w-16 text-center font-semibold text-stone tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="focus-ring grid size-11 place-items-center rounded-btn border border-ink/15 bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <ArrowRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function Card({
  item,
  tone,
  raised,
  ...rest
}: {
  item: Testimonial
  tone: number
  raised: boolean
} & React.HTMLAttributes<HTMLElement>) {
  const c = TONES[tone] ?? TONES[0]
  return (
    <figure
      {...rest}
      className={cn(
        "focus-ring flex h-full min-h-[18rem] flex-col rounded-media p-6 transition-shadow duration-500 select-none sm:p-7",
        c.card,
        raised ? "shadow-[0_30px_60px_-24px_rgb(20_20_20/0.45)]" : "shadow-[0_14px_30px_-18px_rgb(20_20_20/0.35)]",
      )}
    >
      <Quote aria-hidden className={cn("size-8", c.quote)} strokeWidth={1.5} />
      <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed font-medium tracking-[-0.01em]">
        <p>{item.feedback}</p>
      </blockquote>
      <span aria-hidden className={cn("mt-6 block h-px w-24", c.rule)} />
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="size-11 shrink-0 overflow-hidden rounded-brick">
          <ResponsiveImage name={item.image.name} alt="" sizes="44px" className="size-full" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold">{item.clientName}</span>
          <span className={cn("block text-sm", c.muted)}>
            {item.projectName} · {item.location}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
