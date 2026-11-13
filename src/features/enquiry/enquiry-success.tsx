import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { EASE } from "@/lib/motion"

/** Confirmation shown after an enquiry is sent successfully. */
export function EnquirySuccess({
  firstName,
  title,
  message,
  action,
}: {
  firstName: string
  title?: string
  message: string
  action?: ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col items-start gap-6">
      <svg viewBox="0 0 56 56" className="size-14 text-brand" aria-hidden>
        <motion.circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.path
          d="M18 29l7 7 13-15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
        />
      </svg>
      <div>
        <h3 className="text-title text-ink">{title ?? `Thank you${firstName ? `, ${firstName}` : ""}.`}</h3>
        <p className="text-lead mt-3 max-w-md text-stone">{message}</p>
      </div>
      {action}
    </div>
  )
}
