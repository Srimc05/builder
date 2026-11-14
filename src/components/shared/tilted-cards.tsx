import { motion, type Variants } from "motion/react"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Photo } from "@/content/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { revealViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

export interface TiltedCardItem {
  key: string
  image: Photo
  eyebrow?: string
  title: string
  text?: string
}

/** Resting pose of each card: tilt (deg) and a small vertical offset (px). */
const DESKTOP_POSE = [
  { rotate: -6, y: 6 },
  { rotate: 4, y: 26 },
  { rotate: -3, y: 0 },
  { rotate: 5, y: 20 },
]
const MOBILE_POSE = [
  { rotate: -3, y: 0 },
  { rotate: 2.5, y: 14 },
  { rotate: 2, y: 0 },
  { rotate: -2.5, y: 14 },
]

const settle = { type: "spring", stiffness: 210, damping: 22, mass: 0.9 } as const

/**
 * Framed photo cards that rest at slight, alternating angles and overlap
 * like prints laid on a table. Hovering (or tapping) a card straightens it
 * and lifts it in front of its neighbours.
 */
export function TiltedCards({ items, className }: { items: TiltedCardItem[]; className?: string }) {
  const desktop = useMediaQuery("(min-width: 1024px)")
  const poses = desktop ? DESKTOP_POSE : MOBILE_POSE

  const card: Variants = {
    hidden: { opacity: 0, y: 70, rotate: 0 },
    visible: (i: number) => {
      const pose = poses[i % poses.length] ?? { rotate: 0, y: 0 }
      return { opacity: 1, y: pose.y, rotate: pose.rotate, scale: 1, zIndex: 0, transition: settle }
    },
  }
  // An object (not a variant label) so each card keeps inheriting the
  // parent's in-view state — a label would make the card a separate
  // variant root and it would never receive its resting tilt.
  const lifted = { rotate: 0, y: -14, scale: 1.05, zIndex: 20, transition: settle }

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ staggerChildren: 0.09 }}
      className={cn("mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:max-w-6xl lg:grid-cols-4 lg:gap-0 lg:px-4", className)}
    >
      {items.map((item, i) => (
        <motion.li
          key={item.key}
          custom={i}
          variants={card}
          whileHover={lifted}
          whileTap={lifted}
          className="group relative lg:-mx-3"
        >
          <article className="rounded-[1.6rem] bg-white p-2 shadow-soft ring-1 ring-black/5 transition-shadow duration-500 group-hover:shadow-lift sm:p-2.5">
            <div className="aspect-square overflow-hidden rounded-[1.15rem]">
              <ResponsiveImage
                name={item.image.name}
                alt={item.image.alt}
                sizes="(min-width: 1024px) 300px, 46vw"
                className="size-full"
                imgClassName="transition-transform duration-[1.2s] ease-architect group-hover:scale-105"
              />
            </div>
            <div className="px-2 pt-3 pb-2.5 sm:px-3 sm:pt-4 sm:pb-3">
              {item.eyebrow && (
                <span className="text-meta font-semibold text-bronze-deep tabular-nums">{item.eyebrow}</span>
              )}
              <h3 className="mt-1 text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">{item.title}</h3>
              {item.text && <p className="mt-1 text-sm leading-snug text-stone sm:text-[0.95rem]">{item.text}</p>}
            </div>
          </article>
        </motion.li>
      ))}
    </motion.ul>
  )
}
