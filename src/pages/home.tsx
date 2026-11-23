import { PageMeta } from "@/components/shared/page-meta"
import { AboutIntro } from "@/features/home/about-intro"
import { Hero } from "@/features/home/hero"
import { HeroCinematic } from "@/features/home/hero-cinematic"
import { InsightsPreview } from "@/features/home/insights-preview"
import { ProjectsShowcase } from "@/features/home/projects-showcase"
import { ServicesShowcase } from "@/features/home/services-showcase"
import { TestimonialsSection } from "@/features/home/testimonials-section"
import { ProcessSection } from "@/features/process/process-section"
import { posts, projects, testimonials } from "@/lib/content"
import { isCinematic } from "@/lib/experiments"

// Sections that depend on content hide themselves when empty; keep numbering continuous.
const order = [
  "about",
  "services",
  projects.length > 0 && "work",
  "process",
  testimonials.length > 0 && "testimonials",
  posts.length > 0 && "insights",
].filter(Boolean)
const n = (key: string) => String(order.indexOf(key) + 1).padStart(2, "0")

export function HomePage() {
  return (
    <>
      <PageMeta />
      {/* Original hero kept; switch in src/lib/experiments.ts */}
      {isCinematic ? <HeroCinematic /> : <Hero />}
      <AboutIntro />
      <ServicesShowcase />
      <ProjectsShowcase index={n("work")} />
      <ProcessSection index={n("process")} />
      <TestimonialsSection index={n("testimonials")} />
      <InsightsPreview index={n("insights")} />
    </>
  )
}
