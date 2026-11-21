import { useEffect } from "react"
import { useLocation } from "react-router"

import { SESSION_KEYS, sessionFlags } from "@/lib/session"

import { useConsultation } from "./consultation-context"

const SCROLL_THRESHOLD = 0.65
const DELAY_MS = 1500
const RETRY_MS = 4000
/** Pages where the visitor is already enquiring — never interrupt them. */
const EXCLUDED_PATHS = ["/contact", "/privacy"]

/**
 * Opens the consultation modal once per session, ~1.5s after the visitor
 * scrolls past 65% of the page. It never opens over another dialog, while a
 * form is being filled in, or after an enquiry has been sent.
 */
export function useConsultationTrigger() {
  const { open, setOpen, isAnyFormActive } = useConsultation()
  const { pathname } = useLocation()

  useEffect(() => {
    if (open || EXCLUDED_PATHS.includes(pathname)) return
    const done = () =>
      sessionFlags.get(SESSION_KEYS.consultationShown) || sessionFlags.get(SESSION_KEYS.enquirySubmitted)
    if (done()) return

    let timer: number | undefined

    const blocked = () =>
      isAnyFormActive() ||
      document.querySelector('[role="dialog"]') !== null ||
      document.activeElement?.closest("form, [contenteditable]") != null

    const attempt = () => {
      timer = undefined
      if (done()) return
      if (blocked()) {
        timer = window.setTimeout(attempt, RETRY_MS)
        return
      }
      setOpen(true)
    }

    const onScroll = () => {
      if (timer !== undefined) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable >= SCROLL_THRESHOLD) {
        window.removeEventListener("scroll", onScroll)
        timer = window.setTimeout(attempt, DELAY_MS)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [open, pathname, setOpen, isAnyFormActive])
}
