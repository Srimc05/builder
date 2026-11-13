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
      className={cn("focus-ring group flex items-center gap-2.5 rounded-lg", className)}
      style={light ? ({ "--logo-ground": "#141414" } as CSSProperties) : undefined}
    >
      <LogoMark className={cn("transition-transform duration-500 ease-architect group-hover:rotate-[-8deg]", light ? "text-white" : "text-ink")} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.05rem] font-bold tracking-[-0.03em]", light ? "text-white" : "text-ink")}>
          {site.name}
        </span>
        <span className={cn("mt-1 text-[0.6rem] font-semibold tracking-[0.18em] uppercase", light ? "text-white/60" : "text-stone")}>
          {site.descriptor}
        </span>
      </span>
    </Link>
  )
}
