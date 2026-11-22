/**
 * Text Generate Effect — adapted from Aceternity UI
 * (ui.aceternity.com/components/text-generate-effect).
 *
 * Preserved from the original: words fade in from opacity 0 and a 10px blur,
 * 0.5s per word, 0.2s stagger, and the `TextGenerateEffect` API and styling.
 *
 * Added for production use:
 *  - `GeneratedText`, an inline variant that inherits the surrounding type
 *    styles, so headings and statements across the site can use the effect
 *  - styled parts (e.g. a two-tone statement) via `words: TextPart[]`
 *  - starts when scrolled into view (and after the boot loader), not on mount
 *  - screen readers get the sentence once, not word by word
 *  - prefers-reduced-motion: text is shown immediately, with no blur
 */
import { useEffect } from "react"
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react"

import { useBootReady } from "@/lib/boot"
import { cn } from "@/lib/utils"

/** Faster stagger for the site's longer statements (the source uses 0.2s). */
export const STATEMENT_STAGGER = 0.06

export interface TextPart {
  text: string
  className?: string
}

interface GeneratedTextProps {
  /** Plain text, or parts with their own classes (joined with a space). */
  words: string | TextPart[]
  className?: string
  filter?: boolean
  duration?: number
  /** Delay between words, in seconds. */
  stagger?: number
  /** "mount" matches the source; "inView" waits until the text is on screen. */
  trigger?: "mount" | "inView"
}

/** The effect as inline text: put it inside any heading or paragraph. */
export function GeneratedText({
  words,
  className,
  filter = true,
  duration = 0.5,
  stagger: step = 0.2,
  trigger = "inView",
}: GeneratedTextProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  const inView = useInView(scope, { once: true, amount: 0.35 })
  const bootReady = useBootReady()
  const reduce = useReducedMotion() ?? false
  const start = bootReady && (trigger === "mount" || inView)

  const parts = typeof words === "string" ? [{ text: words }] : words
  const list = parts.flatMap((part) =>
    part.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, className: part.className })),
  )
  const sentence = parts.map((p) => p.text.trim()).join(" ")

  useEffect(() => {
    if (!start || reduce) return
    void animate(
      "[data-word]",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration: duration ? duration : 1, delay: stagger(step) },
    )
  }, [start, reduce, animate, filter, duration, step])

  return (
    <span className={className}>
      <span className="sr-only">{sentence}</span>
      <span ref={scope} aria-hidden>
        {list.map(({ word, className: wordClass }, idx) => (
          <span
            key={word + idx}
            data-word
            className={cn(!reduce && "opacity-0", wordClass)}
            style={{ filter: filter && !reduce ? "blur(10px)" : "none" }}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    </span>
  )
}

/** The original Aceternity component: same API, markup and styling. */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}) => {
  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide text-black dark:text-white">
          <GeneratedText words={words} filter={filter} duration={duration} trigger="mount" className="block" />
        </div>
      </div>
    </div>
  )
}
