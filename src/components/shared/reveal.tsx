import type { ReactNode, Ref } from "react"
import { motion, useReducedMotion } from "motion/react"

import { useBootReady } from "@/lib/boot"
import { EASE, fadeUp, revealViewport, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

type RevealTag = "div" | "section" | "header" | "li" | "ul" | "ol" | "p" | "article"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: RevealTag
}

/** Fades and lifts its content into view once, when scrolled to. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  )
}

/** Parent that staggers `RevealItem` children as they enter the viewport. */
export function RevealGroup({
  children,
  className,
  as = "div",
  gap = 0.08,
  delay = 0,
}: RevealProps & { gap?: number }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={stagger(gap, delay)}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({
  children,
  className,
  as = "div",
  ref,
}: Omit<RevealProps, "delay"> & { ref?: Ref<HTMLElement> }) {
  const Comp = motion[as]
  return (
    // The element type varies with `as`, so the ref is typed as a plain HTMLElement.
    <Comp ref={ref as Ref<never>} className={className} variants={fadeUp}>
      {children}
    </Comp>
  )
}

/**
 * Architectural image reveal — a clip-path wipe from the bottom while the
 * photograph settles from a slight zoom.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={revealViewport}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      <motion.div
        className="size-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.6, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Headline that rises line by line from behind a mask. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  animateOnMount?: boolean
}) {
  const booted = useBootReady()
  const trigger = animateOnMount
    ? { initial: "hidden", animate: booted ? "visible" : "hidden" }
    : { initial: "hidden", whileInView: "visible", viewport: revealViewport }
  return (
    <motion.span className={cn("block", className)} {...trigger} variants={stagger(0.11, delay)}>
      {lines.map((line) => (
        <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.2em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "130%" },
              visible: { y: "0%", transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
