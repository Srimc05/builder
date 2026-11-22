/**
 * Magnetic Button — adapted from Aceternity UI (ui.aceternity.com/components/magnetic-button).
 *
 * Preserved from the original: the pull strength (0.8), the 100px maximum
 * travel, the spring (stiffness 150, damping 25, mass 0.1) and the dashed
 * outline with a 20% tint that appears while the cursor is near.
 *
 * Changed for this site:
 *  - accent is the brand violet instead of blue, to match the button inside
 *  - corners use the site's button radius (`rounded-btn`) instead of `rounded-lg`
 *  - optional `className` on the wrapper, so a full-width button stays full width
 *  - prefers-reduced-motion: the button stays put (the source has no handling)
 *  - pointer events, mouse only: on touch screens a tap would otherwise nudge
 *    the button and leave the outline showing
 */
import React, { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export const MagneticButton = ({
  children,
  strength = 0.8,
  maxDistance = 100,
  className,
}: {
  children: React.ReactNode
  strength?: number
  maxDistance?: number
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion() ?? false

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || reduce || e.pointerType !== "mouse") return

    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const { clientX, clientY } = e

    let x = (clientX - (left + width / 2)) * strength
    let y = (clientY - (top + height / 2)) * strength

    const distance = Math.hypot(x, y)
    if (distance > maxDistance) {
      const scale = maxDistance / distance
      x *= scale
      y *= scale
    }

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const hasMoved = position.x !== 0 || position.y !== 0
  return (
    <div
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className={cn(
        "cursor-pointer rounded-btn border border-dashed transition-colors duration-150 [--show-color:var(--color-brand)]",
        className,
      )}
      style={{
        borderColor: hasMoved ? "var(--show-color)" : "transparent",
        backgroundColor: hasMoved ? "color-mix(in srgb,var(--show-color) 20%, transparent)" : "transparent",
      }}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
