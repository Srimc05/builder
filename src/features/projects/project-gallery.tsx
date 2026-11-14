import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { FilterChips } from "@/components/shared/filter-chips"
import type { Project } from "@/content/types"
import { activeCategories } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ProjectCard } from "./project-card"

/**
 * Editorial rhythm for the portfolio grid (desktop): one panoramic feature,
 * then alternating wide/narrow pairs with gently offset heights.
 */
const RHYTHM = [
  { col: "md:col-span-2 lg:col-span-12", aspect: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]", sizes: "(min-width:1280px) 1184px, 100vw", variant: "feature" as const },
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 55vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-5 lg:mt-12", aspect: "aspect-square", sizes: "(min-width:1024px) 40vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-5", aspect: "aspect-square", sizes: "(min-width:1024px) 40vw, (min-width:768px) 50vw, 100vw" },
  { col: "lg:col-span-7 lg:mt-12", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 55vw, (min-width:768px) 50vw, 100vw" },
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

  const options = [
    { value: "all", label: "All projects", count: projects.length },
    ...activeCategories.map((c) => ({
      value: c.slug,
      label: c.label,
      count: projects.filter((p) => p.category === c.slug).length,
    })),
  ]

  return (
    <div>
      {activeCategories.length > 1 && (
        <FilterChips label="Filter projects by category" options={options} value={category} onChange={setCategory} />
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const slot = RHYTHM[i % RHYTHM.length] ?? RHYTHM[1]!
            return (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 4) * 0.05 }}
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
