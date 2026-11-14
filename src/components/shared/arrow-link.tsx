import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

interface ArrowLinkProps {
  to: string
  children: ReactNode
  className?: string
  tone?: "light" | "dark"
}

/** Understated text link with an underline that draws in and a nudging arrow. */
export function ArrowLink({ to, children, className, tone = "light" }: ArrowLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group/arrow focus-ring inline-flex items-center gap-2 rounded-sm text-sm font-semibold tracking-[-0.01em]",
        tone === "dark" ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-architect group-hover/arrow:scale-x-100",
            tone === "dark" ? "bg-white" : "bg-brand",
          )}
        />
      </span>
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full border transition-all duration-500 ease-architect group-hover/arrow:rotate-45",
          tone === "dark"
            ? "border-white/30 group-hover/arrow:border-white group-hover/arrow:bg-white group-hover/arrow:text-ink"
            : "border-ink/15 group-hover/arrow:border-brand group-hover/arrow:bg-brand group-hover/arrow:text-white",
        )}
      >
        <ArrowUpRight className="size-3.5" aria-hidden />
      </span>
    </Link>
  )
}

