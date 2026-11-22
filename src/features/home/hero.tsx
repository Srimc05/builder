import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { ActionButton } from "@/components/shared/action-button"
import { MaskedLines } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { useBootReady } from "@/lib/boot"
import { EASE } from "@/lib/motion"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { openConsultation } = useConsultation()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0])

  // Entrance animations start as the loading screen lifts, not underneath it.
  const booted = useBootReady()
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: booted ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      {/* Background photograph */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="size-full"
          initial={{ scale: 1.14, opacity: 0.4 }}
          animate={booted ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <ResponsiveImage
            name="hero-residence-dusk"
            alt="Contemporary two-storey residence at dusk, its timber and glass facade glowing with warm interior light"
            priority
            sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
            className="size-full"
            imgClassName="object-[60%_center]"
          />
        </motion.div>
      </motion.div>
      {/* Readability overlays — kept subtle so the architecture leads */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/50 to-night/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-night/55 via-night/10 to-transparent" />

      <motion.div style={{ opacity: contentOpacity }} className="container-site flex flex-1 flex-col justify-end pt-32 pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h1 id="hero-title" className="text-display">
              <MaskedLines lines={["Building Trust.", "Creating Homes."]} delay={0.45} animateOnMount />
            </h1>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <motion.p {...enter(0.9)} className="text-lead max-w-md text-white/80">
              Your build is one of the biggest decisions you&rsquo;ll make. Since 2001, we&rsquo;ve stood
              beside families and businesses from the first plan to the final key &mdash; and long after.
            </motion.p>
            <motion.div {...enter(1.05)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
              <ActionButton variant="light" size="md" className="w-full sm:w-auto" onClick={openConsultation}>
                Tell Us About Your Project
              </ActionButton>
              <ActionButton variant="outline-light" size="md" className="w-full sm:w-auto" to="/projects">
                Explore Our Projects
              </ActionButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
