import { useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { Outlet, ScrollRestoration, useLocation, useNavigation } from "react-router"
import { X } from "lucide-react"

import { ConsultationProvider } from "@/features/enquiry/consultation-provider"
import { ConsultationModal } from "@/features/enquiry/consultation-modal"
import { hasSampleContent } from "@/lib/content"
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
        {hasSampleContent && <SampleContentNotice />}
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

/**
 * Shown whenever placeholder projects / testimonials / articles are included
 * (development and showcase builds). Never present in a default production build.
 */
function SampleContentNotice() {
  const [visible, setVisible] = useState(true)
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="note"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5 } }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-4 left-4 z-30 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-bronze/30 bg-white/95 py-1.5 pr-1.5 pl-3.5 text-xs font-medium text-ink shadow-soft backdrop-blur"
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-bronze" />
          Preview: projects, testimonials &amp; articles are sample content
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="focus-ring grid size-6 shrink-0 place-items-center rounded-full hover:bg-sand"
            aria-label="Dismiss sample content notice"
          >
            <X aria-hidden className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
