import { useId } from "react"
import { motion, useReducedMotion } from "motion/react"

import type { Photo } from "@/content/types"
import { imageSrc } from "@/lib/images"
import { EASE } from "@/lib/motion"

/*
 * A photo that is "laid" like a brick wall: it shows through a clip path of
 * bricks in running bond that drop into place course by course, bottom first,
 * then the mortar joints close and the full photo remains. Drawn in a 4:3
 * SVG (the services stage), so it scales with the stage.
 */

const W = 1200
const H = 900
const BRICK_W = 200
const BRICK_H = 100
/** Mortar joint between bricks while the wall is going up. */
const JOINT = 8
/** How far each brick drops as it is set. */
const DROP = 26
const BRICK_SECONDS = 0.45

const ROWS = H / BRICK_H

interface Brick {
  x: number
  y: number
  delay: number
}

const BRICKS: Brick[] = (() => {
  const bricks: Brick[] = []
  for (let row = 0; row < ROWS; row++) {
    const course = ROWS - 1 - row // 0 = bottom course, laid first
    let col = 0
    // Every other course starts half a brick in, like the brick wall on About.
    for (let x = row % 2 ? -BRICK_W / 2 : 0; x < W; x += BRICK_W, col++) {
      const jitter = ((row * 7 + col * 13) % 5) * 0.01 // a hand-laid feel, but the same every time
      bricks.push({ x, y: row * BRICK_H, delay: course * 0.06 + col * 0.012 + jitter })
    }
  }
  return bricks
})()

/** When the last brick is set; then the joints close. */
const MORTAR_DELAY = Math.max(...BRICKS.map((b) => b.delay)) + BRICK_SECONDS * 0.8
const MORTAR_SECONDS = 0.35

/** How long a newly laid photo takes to finish, so the one beneath can leave after it. */
const BRICK_LAY_SECONDS = MORTAR_DELAY + MORTAR_SECONDS

export function BrickLaidImage({ photo, z }: { photo: Photo; z: number }) {
  const clipId = `brick-clip-${useId().replace(/[^\w-]/g, "")}`
  const reduce = useReducedMotion() ?? false

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={photo.alt}
      className="absolute inset-0 size-full"
      style={{ zIndex: z }}
      // Stay until the photo laid over it is complete, then go.
      exit={{ opacity: 0, transition: { duration: 0.2, delay: reduce ? 0 : BRICK_LAY_SECONDS } }}
    >
      <defs>
        <clipPath id={clipId}>
          {BRICKS.map((b, i) => (
            <motion.rect
              key={i}
              x={b.x + JOINT / 2}
              width={BRICK_W - JOINT}
              initial={reduce ? false : { y: b.y + JOINT / 2 - DROP, height: 0 }}
              animate={{ y: b.y + JOINT / 2, height: BRICK_H - JOINT }}
              transition={{ duration: BRICK_SECONDS, delay: b.delay, ease: EASE }}
            />
          ))}
          {/* Mortar: closes the joints from the bottom up once the wall is laid. */}
          <motion.rect
            x={0}
            width={W}
            initial={reduce ? false : { y: H, height: 0 }}
            animate={{ y: 0, height: H }}
            transition={{ duration: MORTAR_SECONDS, delay: MORTAR_DELAY, ease: EASE }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <motion.image
          href={imageSrc(photo.name, 1280)}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid slice"
          // The photo settles slightly while the wall goes up.
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </g>
    </motion.svg>
  )
}
