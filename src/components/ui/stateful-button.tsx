/**
 * Stateful Button — adapted from Aceternity UI (ui.aceternity.com/components/stateful-button).
 *
 * Preserved from the original: the loader → check sequence, 0.2s step
 * durations, the 2s success hold and the layout animation of the label.
 *
 * Added for production use:
 *  - brand accent instead of green
 *  - controlled mode (`status` prop) so forms can drive it after validation
 *  - duplicate-submission guard while a request is in flight
 *  - an error state (no success tick on failure)
 *  - disabled / aria-busy handling
 *  - prefers-reduced-motion support
 *  - no shared `layoutId`, so several buttons can coexist on one page
 */
import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useAnimate, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type ButtonStatus = "idle" | "loading" | "success" | "error"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  /** Controlled status. When provided the button only reflects it. */
  status?: ButtonStatus
  /** Uncontrolled mode: a returned promise drives loading → success / error. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>
}

const HIDDEN = { width: "0px", scale: 0, display: "none" } as const
const SHOWN = { width: "20px", scale: 1, display: "block" } as const

export const Button = ({ className, children, status: controlled, disabled, ...props }: ButtonProps) => {
  const [scope, animate] = useAnimate()
  const reduceMotion = useReducedMotion() ?? false
  const [internal, setInternal] = useState<ButtonStatus>("idle")
  const status = controlled ?? internal
  const inFlight = useRef(false)
  const queue = useRef<Promise<void>>(Promise.resolve())

  const duration = reduceMotion ? 0 : 0.2

  const animateLoading = useCallback(async () => {
    await animate(".check, .error", HIDDEN, { duration: 0 })
    await animate(".loader", SHOWN, { duration })
  }, [animate, duration])

  const animateResult = useCallback(
    async (icon: ".check" | ".error") => {
      await animate(".loader", HIDDEN, { duration })
      await animate(icon, SHOWN, { duration })
      await animate(icon, HIDDEN, { delay: 2, duration })
    },
    [animate, duration],
  )

  const reset = useCallback(async () => {
    await animate(".loader, .check, .error", HIDDEN, { duration: 0 })
  }, [animate])

  // Animations are queued so a fast response never cuts the loading step short.
  useEffect(() => {
    const run = () => {
      switch (status) {
        case "loading":
          return animateLoading()
        case "success":
          return animateResult(".check")
        case "error":
          return animateResult(".error")
        default:
          return reset()
      }
    }
    queue.current = queue.current.then(run).catch(() => undefined)
    if (controlled === undefined && (status === "success" || status === "error")) {
      void queue.current.then(() => setInternal("idle"))
    }
  }, [status, controlled, animateLoading, animateResult, reset])

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inFlight.current || status === "loading" || disabled) {
      event.preventDefault()
      return
    }
    if (controlled !== undefined) {
      await props.onClick?.(event)
      return
    }
    inFlight.current = true
    setInternal("loading")
    try {
      await props.onClick?.(event)
      setInternal("success")
    } catch {
      setInternal("error")
    } finally {
      inFlight.current = false
    }
  }

  const {
    onClick: _onClick,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    ...buttonProps
  } = props

  const busy = status === "loading"

  return (
    <motion.button
      layout={!reduceMotion}
      ref={scope}
      className={cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-btn bg-brand px-4 py-2 text-[0.78rem] font-semibold tracking-[0.12em] text-white uppercase ring-offset-2 transition duration-200 hover:ring-2 hover:ring-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:ring-0 aria-busy:cursor-progress",
        className,
      )}
      {...buttonProps}
      disabled={disabled}
      aria-busy={busy || undefined}
      onClick={handleClick}
    >
      <motion.div layout={!reduceMotion} className="flex items-center gap-2">
        <Loader reduceMotion={reduceMotion} />
        <CheckIcon />
        <ErrorIcon />
        <motion.span layout={!reduceMotion}>{children}</motion.span>
      </motion.div>
    </motion.button>
  )
}

const iconBase = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

const Loader = ({ reduceMotion }: { reduceMotion: boolean }) => (
  <motion.svg
    animate={reduceMotion ? undefined : { rotate: [0, 360] }}
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
    {...iconBase}
    className="loader text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
)

const CheckIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    {...iconBase}
    className="check text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </motion.svg>
)

const ErrorIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    {...iconBase}
    className="error text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </motion.svg>
)

export { Button as StatefulButton }
