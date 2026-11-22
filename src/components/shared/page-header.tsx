import type { ReactNode } from "react"
import { motion } from "motion/react"

import { MaskedLines } from "@/components/shared/reveal"
import { useBootReady } from "@/lib/boot"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  eyebrow: string
  title: string[]
  description?: ReactNode
  children?: ReactNode
  /** Smaller title and tighter spacing, for pages that lead straight into content. */
  compact?: boolean
  className?: string
}

/** Opening block for inner pages — generous, typographic, animated on load. */
export function PageHeader({ eyebrow, title, description, children, compact = false, className }: PageHeaderProps) {
  const booted = useBootReady()
  return (
    <header className={cn("container-site", compact ? "pt-28 pb-8 md:pt-32 md:pb-10" : "pt-32 pb-12 md:pt-40 md:pb-16", className)}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={booted ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="text-eyebrow flex items-center gap-3 text-stone"
      >
        {eyebrow}
      </motion.p>
      <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 className={cn(compact ? "text-headline" : "text-display", "lg:col-span-8")}>
          <MaskedLines lines={title} delay={0.2} animateOnMount />
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={booted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="text-lead max-w-md text-stone lg:col-span-4 lg:pb-2"
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </header>
  )
}
