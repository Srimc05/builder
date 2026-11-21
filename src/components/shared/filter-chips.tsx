import { useId } from "react"
import { LayoutGroup, motion } from "motion/react"

import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export interface FilterOption {
  value: string
  label: string
  count?: number
}

/**
 * Single-select filter pills. Uses real borders (not outer rings) so the
 * horizontal scroll container on small screens never clips them.
 */
export function FilterChips({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  label: string
  className?: string
}) {
  const id = useId()
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden", className)}
    >
      <LayoutGroup id={id}>
        <ul className="flex w-max gap-2">
          {options.map((option) => {
            const selected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange(option.value)}
                  className={cn(
                    "focus-ring relative flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:h-10",
                    selected ? "border-ink text-white" : "border-line bg-white text-ink/70 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="chip"
                      className="absolute -inset-px rounded-full bg-ink"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">{option.label}</span>
                  {option.count !== undefined && (
                    <span
                      className={cn(
                        "relative min-w-5 rounded-full px-1.5 text-center text-[0.7rem] leading-5 tabular-nums",
                        selected ? "bg-white/15 text-white" : "bg-sand text-stone",
                      )}
                    >
                      {option.count}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </LayoutGroup>
    </div>
  )
}
