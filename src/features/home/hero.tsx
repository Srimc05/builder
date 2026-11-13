import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ButtonArrow } from "@/components/shared/arrow-link"
import { MaskedLines } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { Button } from "@/components/ui/button"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { categoryLabel, projects } from "@/lib/content"
import { EASE } from "@/lib/motion"

const disciplines = ["Residential", "Commercial", "Industrial", "Turnkey"]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { openConsultation } = useConsultation()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0])
  const featured = projects[0]

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      {/* Background photograph */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="size-full"
          initial={{ scale: 1.14, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <ResponsiveImage
            name="hero-residence-dusk"
            alt="Contemporary two-storey residence at dusk, its timber and glass facade glowing with warm interior light"
            priority
            sizes="100vw"
            className="size-full"
            imgClassName="object-[60%_center]"
          />
        </motion.div>
      </motion.div>
      {/* Readability overlays — kept subtle so the architecture leads */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/50 to-night/25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-night/55 via-night/10 to-transparent" />

      <motion.div style={{ opacity: contentOpacity }} className="container-site flex flex-1 flex-col justify-end pt-32 pb-10 md:pb-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p {...enter(0.3)} className="text-eyebrow flex items-center gap-3 text-white/75">
              <span aria-hidden className="h-px w-8 bg-bronze" />
              Design · Engineering · Construction
            </motion.p>
            <h1 id="hero-title" className="text-display mt-7">
              <MaskedLines lines={["Building Spaces.", "Creating Legacies."]} delay={0.45} animateOnMount />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <motion.p {...enter(0.9)} className="text-lead max-w-md text-white/80">
              From thoughtful planning to exceptional execution, we deliver construction solutions built on quality,
              precision and trust.
            </motion.p>
            <motion.div {...enter(1.05)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="light" size="pill-lg" className="group/button" onClick={openConsultation}>
                Discuss Your Project
                <ButtonArrow className="bg-ink/8" />
              </Button>
              <Button variant="outline-light" size="pill-lg" asChild>
                <Link to="/projects">Explore Our Projects</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-14 flex items-end justify-between gap-6 border-t border-white/15 pt-6 md:mt-20"
        >
          <ul className="hidden flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-white/65 md:flex" aria-label="What we build">
            {disciplines.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rounded-full bg-bronze" />
                {d}
              </li>
            ))}
          </ul>

          {featured && (
            <Link
              to={`/projects/${featured.slug}`}
              className="focus-ring group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/8 p-2 pr-4 backdrop-blur-md transition-colors hover:bg-white/15"
            >
              <ResponsiveImage name={featured.cover.name} alt="" sizes="96px" className="h-14 w-20 shrink-0 rounded-xl" />
              <span className="flex flex-col">
                <span className="text-[0.7rem] font-semibold tracking-[0.14em] text-white/60 uppercase">
                  Featured · {categoryLabel(featured.category)}
                </span>
                <span className="mt-1 text-sm font-semibold">{featured.name}</span>
              </span>
              <ArrowUpRight aria-hidden className="size-4 text-white/70 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          )}

          <a href="#about" className="focus-ring ml-auto hidden items-center gap-3 rounded-full text-xs font-semibold tracking-[0.18em] text-white/70 uppercase hover:text-white sm:flex md:ml-0">
            Scroll
            <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-white" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
