import { useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import type { Project } from "@/content/types"
import { activeCategories } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ProjectCard } from "./project-card"

/**
 * Editorial rhythm for the portfolio grid (desktop): one panoramic feature,
 * then alternating wide/narrow pairs with offset heights.
 */
const RHYTHM = [
  { col: "md:col-span-2 lg:col-span-12", aspect: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]", sizes: "100vw", variant: "feature" as const },
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 58vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-5 lg:mt-24", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-5", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-7 lg:mt-24", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 58vw, (min-width:768px) 50vw, 100vw" },
]

interface ProjectGalleryProps {
  projects: Project[]
  limit?: number
}

export function ProjectGallery({ projects, limit }: ProjectGalleryProps) {
  const [category, setCategory] = useState<string>("all")

  const visible = useMemo(() => {
    const filtered = category === "all" ? projects : projects.filter((p) => p.category === category)
    return limit ? filtered.slice(0, limit) : filtered
  }, [projects, category, limit])

  const filters = [{ slug: "all", label: "All projects" }, ...activeCategories]
  const count = (slug: string) => (slug === "all" ? projects.length : projects.filter((p) => p.category === slug).length)

  return (
    <div>
      {activeCategories.length > 1 && (
        <div role="group" aria-label="Filter projects by category" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <LayoutGroup id="project-filter">
            <ul className="flex w-max gap-2">
              {filters.map((f) => {
                const selected = f.slug === category
                return (
                  <li key={f.slug}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCategory(f.slug)}
                      className={cn(
                        "focus-ring relative rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                        selected ? "text-white" : "text-ink/70 ring-1 ring-ink/12 hover:text-ink hover:ring-ink/30",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      )}
                      <span className="relative">
                        {f.label}
                        <sup className={cn("ml-1 text-[0.65rem] tabular-nums", selected ? "text-white/60" : "text-stone")}>
                          {count(f.slug)}
                        </sup>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </LayoutGroup>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const slot = RHYTHM[i % RHYTHM.length] ?? RHYTHM[1]!
            return (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, ease: EASE, delay: Math.min(i, 4) * 0.06 }}
                className={cn("min-w-0", slot.col)}
              >
                <ProjectCard project={project} aspect={slot.aspect} sizes={slot.sizes} variant={slot.variant} />
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
