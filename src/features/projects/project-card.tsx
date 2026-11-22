import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Project } from "@/content/types"
import { categoryLabel } from "@/lib/content"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  aspect: string
  sizes: string
  variant?: "standard" | "feature"
  priority?: boolean
}

export function ProjectCard({ project, aspect, sizes, variant = "standard", priority }: ProjectCardProps) {
  const feature = variant === "feature"
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="focus-ring group block rounded-media"
      aria-label={`${project.name} — ${categoryLabel(project.category)}, ${project.location}`}
    >
      <div className={cn("relative overflow-hidden rounded-media", aspect)}>
        <ResponsiveImage
          name={project.cover.name}
          alt={project.cover.alt}
          sizes={sizes}
          priority={priority}
          className="size-full"
          imgClassName="transition-transform duration-[1.4s] ease-architect group-hover:scale-[1.045]"
        />
        <span
          aria-hidden
          className="absolute top-4 right-4 grid size-11 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-architect group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>

        {feature && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night/80 via-night/30 to-transparent p-6 pt-24 text-white md:p-8 md:pt-28">
            <p className="text-eyebrow text-white/70">
              {categoryLabel(project.category)} · {project.year}
            </p>
            <h3 className="mt-2 text-[clamp(1.4rem,1.1rem+1.2vw,2.1rem)] leading-tight font-semibold tracking-[-0.03em]">
              {project.name}
            </h3>
            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/75">
              <MetaItem label="Location" value={project.location} />
              <MetaItem label="Built-up area" value={project.builtUpArea} />
            </dl>
          </div>
        )}
      </div>

      {!feature && (
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand md:text-xl">
              {project.name}
            </h3>
            <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone">
              <MetaItem label="Location" value={project.location} />
              <MetaItem label="Built-up area" value={project.builtUpArea} />
            </dl>
          </div>
          <p className="text-meta shrink-0 pt-1.5 text-right font-semibold text-stone">
            {categoryLabel(project.category)}
            <span className="block font-medium text-stone/80 tabular-nums">{project.year}</span>
          </p>
        </div>
      )}
    </Link>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1.5">
      <dt className="sr-only">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
