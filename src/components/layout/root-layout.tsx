import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { Outlet, ScrollRestoration, useLocation, useNavigation } from "react-router"

import { ConsultationProvider } from "@/features/enquiry/consultation-provider"
import { ConsultationModal } from "@/features/enquiry/consultation-modal"
import { EASE } from "@/lib/motion"

import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <ConsultationProvider>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <RouteProgress />
        <SiteHeader />
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Outlet />
        </motion.main>
        <SiteFooter />
        <ConsultationModal />
        <ScrollRestoration />
      </ConsultationProvider>
    </MotionConfig>
  )
}

/**
 * Thin brand-coloured bar at the top of the screen while the next page loads
 * (pages are code-split, so a slow connection could otherwise feel unresponsive).
 * Appears only after a short delay, so fast navigations show nothing at all.
 */
function RouteProgress() {
  const navigation = useNavigation()
  const loading = navigation.state !== "idle"
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-progress"
          role="progressbar"
          aria-label="Loading page"
          className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-brand"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 0.85, opacity: 1, transition: { scaleX: { duration: 2.4, ease: EASE }, opacity: { duration: 0.2, delay: 0.15 } } }}
          exit={{ scaleX: 1, opacity: 0, transition: { scaleX: { duration: 0.2 }, opacity: { duration: 0.3, delay: 0.15 } } }}
        />
      )}
    </AnimatePresence>
  )
}
