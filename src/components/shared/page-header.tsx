import type { ReactNode } from "react"
import { motion } from "motion/react"

import { MaskedLines } from "@/components/shared/reveal"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  eyebrow: string
  title: string[]
  description?: ReactNode
  children?: ReactNode
  className?: string
}

/** Opening block for inner pages — generous, typographic, animated on load. */
export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("container-site pt-32 pb-12 md:pt-40 md:pb-16", className)}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="text-eyebrow flex items-center gap-3 text-stone"
      >
        {eyebrow}
      </motion.p>
      <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 className="text-display lg:col-span-8">
          <MaskedLines lines={title} delay={0.2} animateOnMount />
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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
