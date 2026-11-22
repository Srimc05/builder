import type { LucideIcon } from "lucide-react"

import { brick } from "@/components/shared/brick"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

export interface FeatureItem {
  icon: LucideIcon
  title: string
  text: string
}

/**
 * Compact grid of informational cards (icon, title, one or two lines), set as
 * bricks in a mortar panel to match the brick wall, with the shared 3D lift on
 * hover (the same effect as the blog cards).
 */
export function FeatureGrid({
  items,
  numbered = false,
  className,
}: {
  items: FeatureItem[]
  /** Show a large faint 01, 02… behind each card (useful when order matters). */
  numbered?: boolean
  className?: string
}) {
  return (
    <RevealGroup as="ul" className={cn("grid sm:grid-cols-2 lg:grid-cols-4", brick.panel, brick.gap, className)}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <RevealItem
          as="li"
          key={title}
          className={cn(
            brick.surface,
            brick.lift,
            // Phones: icon beside the text (shorter cards). Larger screens: icon on top.
            "relative flex gap-4 overflow-hidden p-5 sm:flex-col sm:gap-0 sm:p-6",
          )}
        >
          {numbered && <span aria-hidden data-numeral={String(i + 1).padStart(2, "0")} className={brick.numeral} />}
          <span className={cn(brick.icon, brick.iconHover, "relative")}>
            <Icon aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <div className="relative sm:mt-5">
            <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone">{text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
