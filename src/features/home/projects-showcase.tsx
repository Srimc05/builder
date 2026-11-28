import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { BRICK_PATTERN } from "@/components/shared/brick"
import { Reveal } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Project } from "@/content/types"
import { categoryLabel, projects } from "@/lib/content"
import { spotlight } from "@/lib/spotlight"
import { cn } from "@/lib/utils"

/** How many projects rise through the headline (an even number fills the two columns). */
const LIMIT = 6

/**
 * "Rising cards": the section headline stays pinned in the middle of the
 * screen while project cards rise up through it, each one growing and opening
 * out as it enters, then passing over the headline and on up the page.
 * Laptops get two staggered columns, phones one. The cards are the dark and
 * terracotta half-bricks from the brick wall, so they stand out on the white
 * page and belong to the same set.
 */
export function ProjectsShowcase() {
  if (projects.length === 0) return null
  const shown = projects.slice(0, LIMIT)

  return (
    <section aria-labelledby="work-title" className="bg-canvas">
      <div className="relative">
        {/* Pinned headline: the cards scroll over it. */}
        <div className="sticky top-0 grid h-svh place-items-center px-5 text-center">
          <Reveal>
            <h2
              id="work-title"
              className="text-[clamp(2.6rem,1.4rem+5vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            >
              <span className="block text-ink">Every wall we raise</span>
              {/* Large text: ink at 55% still meets the 3:1 contrast for large text. */}
              <span className="block text-ink/55">carries our name.</span>
            </h2>
          </Reveal>
        </div>

        {/* The cards start below the fold; the section ends soon after the last one passes the headline.
            On laptops the right-hand column is set lower, so cards rise alternately. */}
        <ol className="relative z-10 mx-auto -mt-[100svh] grid max-w-[74rem] grid-cols-1 gap-y-[16svh] px-5 pt-[78svh] pb-[12svh] sm:px-8 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-[14svh]">
          {shown.map((project, i) => (
            <RisingCard key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function RisingCard({ project, index }: { project: Project; index: number }) {
  // Measured on the list item, which is never transformed, so the timing stays exact.
  const ref = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion() ?? false
  // 0 when the card's top meets the bottom of the screen, 1 once it is 45% of the way up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.55"] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  // Opens out from a narrower, shorter window as it rises.
  const clipPath = useTransform(scrollYProgress, (v) => {
    const k = 1 - Math.min(1, Math.max(0, v))
    return `inset(${(k * 16).toFixed(2)}% ${(k * 12).toFixed(2)}% 0% ${(k * 12).toFixed(2)}% round 0.625rem)`
  })

  // Alternate the wall's two half-brick colours: night, terracotta, night…
  const terracotta = index % 2 === 1

  return (
    <li ref={ref} className={cn("mx-auto w-full max-w-[34rem]", "lg:even:mt-[24svh]")}>
      <motion.div style={reduce ? undefined : { scale, y, clipPath }} className="origin-bottom will-change-transform">
        <Link
          ref={spotlight}
          to={`/projects/${project.slug}`}
          className={cn(
            "focus-ring group grid grid-cols-[44%_1fr] overflow-hidden rounded-media text-white",
            "shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_30px_60px_-30px_rgb(20_20_20/0.55)]",
            terracotta ? "bg-bronze-deep" : "bg-night",
          )}
          style={{ backgroundImage: BRICK_PATTERN }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <ResponsiveImage
              name={project.cover.name}
              alt={project.cover.alt}
              sizes="(min-width: 640px) 240px, 44vw"
              className="size-full"
              imgClassName="transition-transform duration-[1.2s] ease-architect group-hover:scale-[1.05] motion-safe:group-spot:scale-[1.05]"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-between p-4 sm:p-6">
            {/* Full white on terracotta: its lighter tints would fall below 4.5:1. */}
            <div className={cn("text-meta flex items-start justify-between gap-3 tabular-nums", terracotta ? "text-white" : "text-white/65")}>
              <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-right">
                {categoryLabel(project.category)} · {project.year}
              </span>
            </div>
            <div>
              <h3 className="flex items-start justify-between gap-2 text-base leading-snug font-semibold tracking-[-0.02em] sm:text-xl">
                {project.name}
                <ArrowUpRight
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 transition-transform duration-500 ease-architect group-hover:rotate-45 motion-safe:group-spot:rotate-45 sm:size-5"
                />
              </h3>
              <p className={cn("mt-1.5 text-[0.8rem] leading-relaxed sm:text-sm", terracotta ? "text-white" : "text-white/70")}>
                {/* Each part stays on one line ("42,000 sq ft" never splits). */}
                <span className="whitespace-nowrap">{project.location}</span>
                <span aria-hidden> · </span>
                <span className="whitespace-nowrap">{project.builtUpArea}</span>
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </li>
  )
}
