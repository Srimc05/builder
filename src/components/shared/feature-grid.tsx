import type { LucideIcon } from "lucide-react"

import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

export interface FeatureItem {
  icon: LucideIcon
  title: string
  text: string
}

/**
 * Compact grid of informational cards (icon, title, one or two lines).
 * Deliberately static: the cards are not links, so they carry no hover
 * effects that would suggest they can be clicked.
 */
export function FeatureGrid({
  items,
  numbered = false,
  surface = "white",
  className,
}: {
  items: FeatureItem[]
  /** Show a small 01, 02… index in each card (useful when order matters). */
  numbered?: boolean
  /** Card colour — use "sand" on white sections and "white" on sand sections. */
  surface?: "white" | "sand"
  className?: string
}) {
  return (
    <RevealGroup as="ul" className={cn("grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4", className)}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <RevealItem
          as="li"
          key={title}
          className={cn(
            // Phones: icon beside the text (shorter cards). Larger screens: icon on top.
            "relative flex gap-4 rounded-media p-5 sm:flex-col sm:gap-0 sm:p-6",
            surface === "white" ? "border border-line bg-white" : "bg-sand",
          )}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <Icon aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          {numbered && (
            <span className="text-meta absolute top-5 right-5 font-semibold text-stone tabular-nums sm:top-9 sm:right-6" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className={cn("sm:mt-5", numbered && "pr-7 sm:pr-0")}>
            <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone">{text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
