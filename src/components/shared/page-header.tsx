import type { ReactNode } from "react"
import { motion } from "motion/react"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import { MaskedLines } from "@/components/shared/reveal"
import type { ImageName } from "@/content/types"
import { useBootReady } from "@/lib/boot"
import { useRegisterDarkHero } from "@/lib/dark-hero"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  eyebrow: string
  title: string[]
  description?: ReactNode
  children?: ReactNode
  /** Smaller title and tighter spacing, for pages that lead straight into content. */
  compact?: boolean
  /**
   * Full-bleed background photo. The header turns light-on-dark over a
   * darkening overlay, and the site header starts light-on-dark to match.
   */
  image?: ImageName
  className?: string
}

/** Opening block for inner pages — typographic, animated on load, optionally over a photo. */
export function PageHeader({ eyebrow, title, description, children, compact = false, image, className }: PageHeaderProps) {
  const booted = useBootReady()
  useRegisterDarkHero(Boolean(image))
  const onPhoto = Boolean(image)

  const content = (
    <>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={booted ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={cn("text-eyebrow flex items-center gap-3", onPhoto ? "text-white/75" : "text-stone")}
      >
        {eyebrow}
      </motion.p>
      <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 className={cn(compact ? "text-headline" : "text-display", onPhoto && "text-white", "lg:col-span-8")}>
          <MaskedLines lines={title} delay={0.2} animateOnMount />
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={booted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className={cn("text-lead max-w-md lg:col-span-4 lg:pb-2", onPhoto ? "text-white/85" : "text-stone")}
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </>
  )

  if (!image) {
    return (
      <header className={cn("container-site", compact ? "pt-28 pb-8 md:pt-32 md:pb-10" : "pt-32 pb-12 md:pt-40 md:pb-16", className)}>
        {content}
      </header>
    )
  }

  return (
    <header
      className={cn(
        "relative isolate mb-10 flex flex-col justify-end overflow-hidden bg-night md:mb-14",
        compact ? "min-h-[24rem] md:min-h-[26rem]" : "min-h-[28rem] md:min-h-[32rem]",
        className,
      )}
    >
      {/* Slow settle-in of the photo; MotionConfig skips it for reduced motion */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.08 }}
        animate={booted ? { scale: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <ResponsiveImage name={image} alt="" sizes="100vw" priority className="size-full" />
      </motion.div>
      {/* Darkens the photo so white text always reads: stronger at the bottom-left, where the text sits */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/50 to-black/35" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-black/45 to-transparent" />
      <div className={cn("container-site w-full", compact ? "pt-32 pb-10 md:pt-36 md:pb-12" : "pt-36 pb-12 md:pt-44 md:pb-16")}>{content}</div>
    </header>
  )
}
