import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { NavLink, useLocation } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { LiquidGlass } from "@/components/ui/liquid-glass"
import { navigation } from "@/content/site"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { getProject } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { useDarkHero } from "@/lib/dark-hero"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"
import { MobileNav } from "./mobile-nav"

/** Pages that open with a full-bleed photograph, so the header starts light-on-dark. */
function hasDarkHero(pathname: string) {
  if (pathname === "/") return true
  const project = /^\/projects\/([^/]+)$/.exec(pathname)
  return project ? getProject(project[1]) !== undefined : false
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const { openConsultation } = useConsultation()
  const { scrollY } = useScroll()
  const [atTop, setAtTop] = useState(true)
  // Liquid glass attaches once the pill has finished shrinking (its refraction
  // map is rebuilt on every size change, so we avoid doing that mid-transition).
  const [glass, setGlass] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  // The navbar stays visible at all times; only its style changes after the top.
  useMotionValueEvent(scrollY, "change", (y) => {
    const top = y < 24
    setAtTop(top)
    if (top) setGlass(false)
  })

  useEffect(() => {
    if (atTop) return
    const t = window.setTimeout(() => setGlass(true), 750)
    return () => window.clearTimeout(t)
  }, [atTop])

  const darkHero = useDarkHero()
  const overDark = atTop && (darkHero || hasDarkHero(pathname))
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to))

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "mx-auto transition-[max-width,padding,margin] duration-700 ease-architect",
          atTop ? "max-w-[80rem] px-0" : "mt-3 max-w-[72rem] px-3 sm:px-4",
        )}
      >
        <div
          className={cn(
            "relative isolate flex h-[4.5rem] items-center justify-between gap-6 border transition-[background-color,border-color,box-shadow,border-radius,padding,backdrop-filter] duration-700 ease-architect",
            atTop
              ? "rounded-none border-transparent bg-transparent px-5 sm:px-8 lg:px-12"
              : "h-16 rounded-panel pr-2 pl-4 min-[360px]:pl-5 sm:pl-6",
            !atTop && !glass && "border-line/80 bg-white/85 shadow-soft backdrop-blur-xl",
            glass && "border-transparent bg-transparent",
          )}
        >
          <AnimatePresence>
            {glass && (
              <motion.div
                aria-hidden
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <LiquidGlass
                  radius={16}
                  bevelDepth={14}
                  scale={36}
                  aberration={2}
                  tint={0.62}
                  className="size-full shadow-[0_6px_24px_rgb(0_0_0/0.10),0_0_0_1px_rgb(0_0_0/0.04),inset_0_1px_0_rgb(255_255_255/0.8)]"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Logo tone={overDark ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden min-[72rem]:block" onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => {
                const active = isActive(item.to)
                return (
                  <li key={item.to} className="relative">
                    <NavLink
                      to={item.to}
                      onMouseEnter={() => setHovered(item.to)}
                      onFocus={() => setHovered(item.to)}
                      className={cn(
                        "focus-ring relative z-10 block rounded-btn px-3.5 py-2 text-[0.85rem] font-semibold tracking-[-0.01em] transition-colors duration-300",
                        overDark ? "text-white/85 hover:text-white" : "text-ink/70 hover:text-ink",
                        active && (overDark ? "text-white" : "text-ink"),
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className={cn(
                            "absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full",
                            overDark ? "bg-white" : "bg-brand",
                          )}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      )}
                    </NavLink>
                    {hovered === item.to && (
                      <motion.span
                        layoutId="nav-hover"
                        aria-hidden
                        className={cn("absolute inset-0 rounded-btn", overDark ? "bg-white/12" : "bg-sand-deep")}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ActionButton
              variant={overDark ? "light" : "primary"}
              size="md"
              onClick={openConsultation}
              className="hidden sm:inline-flex"
            >
              Get a Free Quote
            </ActionButton>
            <MobileNav overDark={overDark} isActive={isActive} />
          </div>
        </div>
      </div>
    </header>
  )
}
