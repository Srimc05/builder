import { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { NavLink, useLocation } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { navigation } from "@/content/site"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { getProject } from "@/lib/content"
import { EASE } from "@/lib/motion"
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
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setAtTop(y < 24)
    setHidden(y > 520 && y > prev + 2)
    if (y < prev - 2) setHidden(false)
  })

  const overDark = atTop && hasDarkHero(pathname)
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to))

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div
        className={cn(
          "mx-auto transition-[max-width,padding,margin] duration-700 ease-architect",
          atTop ? "max-w-[80rem] px-0" : "mt-3 max-w-[72rem] px-3 sm:px-4",
        )}
      >
        <div
          className={cn(
            "flex h-[4.5rem] items-center justify-between gap-6 border transition-[background-color,border-color,box-shadow,border-radius,padding] duration-700 ease-architect",
            atTop
              ? "rounded-none border-transparent bg-transparent px-5 sm:px-8 lg:px-12"
              : "h-16 rounded-full border-line/80 bg-white/85 pr-2 pl-4 shadow-soft backdrop-blur-xl min-[360px]:pl-5 sm:pl-6",
          )}
        >
          <Logo tone={overDark ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden xl:block" onMouseLeave={() => setHovered(null)}>
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
                        "focus-ring relative z-10 block rounded-full px-3.5 py-2 text-[0.85rem] font-semibold tracking-[-0.01em] transition-colors duration-300",
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
                        className={cn("absolute inset-0 rounded-full", overDark ? "bg-white/12" : "bg-sand-deep")}
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
    </motion.header>
  )
}
