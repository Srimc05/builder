import { motion } from "motion/react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Link, useParams } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { PageMeta } from "@/components/shared/page-meta"
import { MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { GeneratedText, STATEMENT_STAGGER } from "@/components/ui/text-generate-effect"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { StatusBadge } from "@/features/projects/project-card"
import { ProjectGalleryGrid } from "@/features/projects/gallery-lightbox"
import { categoryLabel, getProject, projects } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { NotFoundPage } from "@/pages/not-found"

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { openConsultation } = useConsultation()
  if (!project) return <NotFoundPage />

  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]

  const facts = [
    { label: "Location", value: project.location },
    { label: "Category", value: categoryLabel(project.category) },
    { label: "Completion", value: project.status === "Completed" ? String(project.year) : `Est. ${project.year}` },
    { label: "Built-up area", value: project.builtUpArea },
  ]

  return (
    <article>
      <PageMeta title={project.name} description={project.excerpt} />

      {/* Hero */}
      <header className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-night text-white">
        <motion.div className="absolute inset-0 -z-10" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: EASE }}>
          <ResponsiveImage name={project.cover.name} alt={project.cover.alt} priority sizes="100vw" className="size-full" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/30 to-night/40" />
        <div className="container-site pt-32 pb-10 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="flex flex-wrap items-center gap-4">
            <Link to="/projects" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-white/80 hover:text-white">
              <ArrowLeft aria-hidden className="size-4" /> All projects
            </Link>
            <StatusBadge status={project.status} tone="dark" />
          </motion.div>
          <h1 className="text-display mt-6 max-w-5xl">
            <MaskedLines lines={[project.name]} delay={0.3} animateOnMount />
          </h1>
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 grid grid-cols-2 gap-y-5 border-t border-white/15 pt-5 md:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.label} className="pr-4">
                <dt className="text-eyebrow text-white/50">{f.label}</dt>
                <dd className="mt-1.5 text-base font-semibold tracking-[-0.015em]">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-14">
        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal className="rounded-media border border-line p-7">
              <h2 className="text-eyebrow text-stone">Specifications</h2>
              <dl className="mt-5 divide-y divide-line">
                {project.specifications.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-stone">{s.label}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <h2 className="text-eyebrow mt-8 text-stone">Scope of work</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.scope.map((s) => (
                  <li key={s} className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink">
                    {s}
                  </li>
                ))}
              </ul>
              <ActionButton size="md" className="mt-7 w-full" onClick={openConsultation}>
                Discuss a similar project
              </ActionButton>
            </Reveal>
          </div>
        </aside>

        {/* Narrative */}
        <div className="lg:col-span-7 lg:col-start-6">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title" className="text-eyebrow text-brand">
              Project overview
            </h2>
            <Reveal className="mt-6 grid gap-5">
              {project.overview.map((p, i) => (
                <p key={p.slice(0, 20)} className={i === 0 ? "text-[clamp(1.15rem,1rem+0.6vw,1.4rem)] leading-snug font-medium tracking-[-0.015em] text-ink" : "text-lead text-stone"}>
                  {i === 0 ? <GeneratedText words={p} stagger={STATEMENT_STAGGER} /> : p}
                </p>
              ))}
            </Reveal>
          </section>

          {project.gallery.length > 0 && (
            <section aria-labelledby="gallery-title" className="mt-14">
              <h2 id="gallery-title" className="text-eyebrow text-brand">
                Gallery
              </h2>
              <div className="mt-6">
                <ProjectGalleryGrid photos={project.gallery} title={project.name} />
              </div>
            </section>
          )}

          <section aria-labelledby="details-title" className="mt-14">
            <h2 id="details-title" className="text-eyebrow text-brand">
              Construction details
            </h2>
            <RevealGroup as="ol" className="mt-6 divide-y divide-line border-y border-line">
              {project.constructionDetails.map((d, i) => (
                <RevealItem as="li" key={d} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                  <span className="text-meta pt-0.5 font-semibold text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed text-ink">{d}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <section aria-labelledby="challenges-title" className="mt-14">
            <h2 id="challenges-title" className="text-eyebrow text-brand">
              Challenges &amp; solutions
            </h2>
            <RevealGroup as="ul" className="mt-6 grid gap-4">
              {project.challenges.map((c) => (
                <RevealItem as="li" key={c.challenge} className="grid overflow-hidden rounded-media border border-line md:grid-cols-2">
                  <div className="bg-sand p-6 md:p-7">
                    <p className="text-eyebrow text-stone">Challenge</p>
                    <p className="mt-3 leading-relaxed text-ink">{c.challenge}</p>
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-eyebrow text-brand">Solution</p>
                    <p className="mt-3 leading-relaxed text-ink">{c.solution}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <section aria-labelledby="completion-title" className="mt-14">
            <h2 id="completion-title" className="text-eyebrow text-brand">
              Completion
            </h2>
            <Reveal className="mt-6 rounded-media bg-night p-7 text-white md:p-9">
              <p className="text-lg leading-relaxed">
                <GeneratedText words={project.completion} stagger={STATEMENT_STAGGER} />
              </p>
              <p className="text-meta mt-5 text-white/55">
                {project.status} · {project.year}
              </p>
            </Reveal>
          </section>
        </div>
      </div>

      {next && next.slug !== project.slug && (
        <Link to={`/projects/${next.slug}`} className="focus-ring group relative isolate block overflow-hidden bg-night text-white">
          <ResponsiveImage
            name={next.cover.name}
            alt=""
            sizes="100vw"
            className="absolute inset-0 -z-10 size-full opacity-50"
            imgClassName="transition-transform duration-[1.6s] ease-architect group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-night/90 to-night/30" />
          <div className="container-site flex items-end justify-between gap-6 py-14 md:py-18">
            <div>
              <p className="text-eyebrow text-white/60">Next project</p>
              <p className="text-headline mt-4">{next.name}</p>
            </div>
            <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45 md:size-14">
              <ArrowUpRight className="size-5 md:size-6" />
            </span>
          </div>
        </Link>
      )}
    </article>
  )
}
