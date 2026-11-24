import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useReducedMotion, type Variants } from "motion/react"

import { brick, BRICK_PATTERN } from "@/components/shared/brick"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Photo } from "@/content/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { revealViewport } from "@/lib/motion"
import { spotlight } from "@/lib/spotlight"
import { cn } from "@/lib/utils"

export interface BrickItem {
  key: string
  image: Photo
  title: string
  text?: string
}

export interface HalfBrick {
  value: string
  label: string
  /** Count up from 0 to the number in `value` when the wall comes into view. */
  countUp?: boolean
  /** Start the count here instead of 0; above the target it counts down (e.g. this year → 2001). */
  countFrom?: number
}

const lay: Variants = {
  hidden: { opacity: 0, y: -44 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 19, mass: 0.9, delay: order * 0.09 },
  }),
}

/**
 * Cards laid like a brick wall in running bond. On large screens: two courses
 * of two full bricks, offset by half a brick, with half-bricks closing the
 * ends. Bricks are laid bottom course first as the wall scrolls into view.
 * Smaller screens get a simple grid (bricks stacked, half-bricks side by side).
 */
export function BrickWall({ items, halves, className }: { items: BrickItem[]; halves: [HalfBrick, HalfBrick]; className?: string }) {
  const [a, b, c, d] = items
  // Courses only exist on large screens; elsewhere bricks are laid top to bottom.
  const coursed = useMediaQuery("(min-width: 1024px)")
  // Grid placement on lg (5 columns × 2 courses) and laying order (bottom course first).
  const bricks = [
    { item: a, place: "lg:col-span-2 lg:col-start-1 lg:row-start-1", order: 3 },
    { item: b, place: "lg:col-span-2 lg:col-start-3 lg:row-start-1", order: 4 },
    { item: c, place: "lg:col-span-2 lg:col-start-2 lg:row-start-2", order: 1 },
    { item: d, place: "lg:col-span-2 lg:col-start-4 lg:row-start-2", order: 2 },
  ].filter((x): x is { item: BrickItem; place: string; order: number } => Boolean(x.item))

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn(
        // The sand panel is the mortar: it shows in the joints between bricks.
        "grid grid-cols-2 lg:grid-cols-5 lg:grid-rows-[13rem_13rem]",
        brick.panel,
        brick.gap,
        className,
      )}
    >
      {bricks.map(({ item, place, order }, i) => (
        <motion.li key={item.key} custom={coursed ? order : i} variants={lay} className={cn("col-span-2 sm:col-span-1", place)}>
          <Brick item={item} index={i} />
        </motion.li>
      ))}
      {/* Half-bricks close the courses: end of the top course, start of the bottom one */}
      <motion.li custom={coursed ? 5 : 4} variants={lay} className="lg:col-start-5 lg:row-start-1">
        <HalfBrickTile {...halves[0]} tone="terracotta" />
      </motion.li>
      <motion.li custom={coursed ? 0 : 5} variants={lay} className="lg:col-start-1 lg:row-start-2">
        <HalfBrickTile {...halves[1]} tone="night" />
      </motion.li>
    </motion.ul>
  )
}

function Brick({ item, index }: { item: BrickItem; index: number }) {
  return (
    // The site-wide 3D lift; the photo and numeral share its timing so the
    // whole brick moves as one.
    // On touch screens the hover look shows while the brick crosses the middle of the screen.
    <article ref={spotlight} className={cn(brick.surface, brick.lift, "relative flex h-full flex-row overflow-hidden sm:flex-col lg:flex-row")}>
      <div className="w-[36%] shrink-0 overflow-hidden sm:aspect-[16/10] sm:w-auto lg:aspect-auto lg:w-[44%]">
        <ResponsiveImage
          name={item.image.name}
          alt={item.image.alt}
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 36vw"
          className="size-full"
          imgClassName={cn(
            "grayscale-[0.9] sepia-[0.18] transition-[scale,filter] group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0",
            "group-spot:grayscale-0 group-spot:sepia-0 motion-safe:group-spot:scale-105",
            HOVER_EASE,
          )}
        />
      </div>
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden p-4 sm:p-5 lg:p-6">
        {/* Decorative numeral, drawn via CSS content so it isn't read or contrast-checked */}
        <span
          aria-hidden
          data-numeral={String(index + 1).padStart(2, "0")}
          className={cn(
            brick.numeral,
            "transition-colors group-hover:text-bronze-soft group-spot:text-bronze-soft",
            HOVER_EASE,
          )}
        />
        <h3 className="relative text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">{item.title}</h3>
        {item.text && <p className="relative mt-1 text-sm leading-relaxed text-stone sm:mt-1.5 sm:text-[0.95rem]">{item.text}</p>}
      </div>
    </article>
  )
}

/** Photo and numeral follow the site-wide hover timing (instant with reduced motion). */
const HOVER_EASE = `${brick.timing} motion-reduce:duration-0`

function HalfBrickTile({ value, label, tone, countUp, countFrom }: HalfBrick & { tone: "night" | "terracotta" }) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-28 flex-col justify-end overflow-hidden rounded-brick p-5 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_2px_0_rgb(20_20_20/0.12)] lg:p-6",
        tone === "night" ? "bg-night" : "bg-bronze-deep",
      )}
      style={{ backgroundImage: BRICK_PATTERN }}
    >
      <span className="text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] leading-none font-bold tracking-[-0.03em]">
        {countUp ? <CountUp value={value} from={countFrom} /> : value}
      </span>
      <span className={cn("mt-2 text-sm", tone === "night" ? "text-white/65" : "text-white/85")}>{label}</span>
    </div>
  )
}

/**
 * Counts from `from` (default 0) to the leading number in `value` (keeping any
 * suffix, e.g. "50+"), once, after the brick has been laid. A `from` above the
 * target counts down instead, e.g. from the current year back to 2001. The final value is reserved
 * invisibly so the tile never changes size, and screen readers hear only the
 * final value. With reduced motion the final value is shown straight away.
 */
function CountUp({ value, from = 0 }: { value: string; from?: number }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[1]) : 0
  const suffix = match?.[2] ?? ""
  const hasNumber = match !== null
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion() ?? false
  const [current, setCurrent] = useState(from)

  useEffect(() => {
    if (!inView || reduce || !hasNumber) return
    const controls = animate(from, target, {
      duration: 2.2,
      delay: 0.45, // let the brick settle first
      ease: [0.25, 0.1, 0.35, 1], // gentle ease-out: every number is visible, slowing into the target
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, from, target, hasNumber])

  if (!hasNumber) return <>{value}</>
  const shown = reduce ? target : current
  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible">{value}</span>
      <span aria-hidden className="absolute inset-0">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
