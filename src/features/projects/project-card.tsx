import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { Project, ProjectStatus } from "@/content/types"
import { categoryLabel } from "@/lib/content"
import { cn } from "@/lib/utils"

const statusDot: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500",
  "Under construction": "bg-bronze",
  "In design": "bg-brand",
}

export function StatusBadge({ status, tone = "light" }: { status: ProjectStatus; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "dark" ? "bg-night/55 text-white ring-1 ring-white/15 backdrop-blur-md" : "bg-white text-ink ring-1 ring-line",
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", statusDot[status])} />
      {status}
    </span>
  )
}

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
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <StatusBadge status={project.status} tone={feature ? "dark" : "light"} />
        </div>
        <span
          aria-hidden
          className="absolute top-4 right-4 grid size-11 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-architect group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>

        {feature && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night/80 via-night/30 to-transparent p-6 pt-24 text-white md:p-9 md:pt-32">
            <p className="text-eyebrow text-white/70">
              {categoryLabel(project.category)} · {project.year}
            </p>
            <h3 className="mt-3 text-[clamp(1.6rem,1rem+2vw,2.75rem)] leading-tight font-semibold tracking-[-0.035em]">
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
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink transition-colors group-hover:text-brand md:text-[1.4rem]">
              {project.name}
            </h3>
            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone">
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
