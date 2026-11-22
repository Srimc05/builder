import type { ReactNode } from "react"

import { MaskedLines, Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  index?: string
  eyebrow: string
  /** Each entry renders as its own masked line. */
  title: string[]
  description?: ReactNode
  action?: ReactNode
  align?: "left" | "split"
  tone?: "light" | "dark"
  className?: string
  id?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  align = "split",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "grid gap-6",
        align === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <Reveal>
          <p className={cn("text-eyebrow flex items-center gap-2.5", dark ? "text-white/60" : "text-stone")}>
            {index && <span className={dark ? "text-bronze" : "text-bronze-deep"}>{index}</span>}
            {eyebrow}
          </p>
        </Reveal>
        <h2 id={id} className={cn("text-headline mt-4", dark ? "text-white" : "text-ink")}>
          <MaskedLines lines={title} />
        </h2>
      </div>
      {(description || action) && (
        <Reveal
          delay={0.15}
          className={cn("flex flex-col items-start gap-6", align === "split" && "lg:col-span-5 lg:pb-2")}
        >
          {description && (
            <p className={cn("text-lead max-w-xl", dark ? "text-white/70" : "text-stone")}>{description}</p>
          )}
          {action}
        </Reveal>
      )}
    </div>
  )
}
