import type { CSSProperties } from "react"
import { Link } from "react-router"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

/** Placeholder brand mark — three offset strata. Replace with the company logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden fill="none">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" />
      <path d="M8 21.5h16" stroke="var(--logo-accent, #C58A50)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M10.5 16h13.5" stroke="var(--logo-ground, #fff)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13 10.5h11" stroke="var(--logo-ground, #fff)" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
    </svg>
  )
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light"
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn("focus-ring group flex min-h-11 min-w-0 items-center gap-2 rounded-lg min-[360px]:gap-2.5", className)}
      style={light ? ({ "--logo-ground": "#141414" } as CSSProperties) : undefined}
    >
      <LogoMark className={cn("size-7 shrink-0 transition-transform duration-500 ease-architect group-hover:rotate-[-8deg] min-[360px]:size-8", light ? "text-white" : "text-ink")} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[0.9rem] font-bold tracking-[-0.03em] whitespace-nowrap min-[360px]:text-[1.05rem]", light ? "text-white" : "text-ink")}>
          {site.name}
        </span>
        {site.descriptor && (
          <span className={cn("mt-1 text-[0.6rem] font-semibold tracking-[0.18em] uppercase", light ? "text-white/60" : "text-stone")}>
            {site.descriptor}
          </span>
        )}
      </span>
    </Link>
  )
}
