import { ArrowLink } from "@/components/shared/arrow-link"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProjectGallery } from "@/features/projects/project-gallery"
import { projects } from "@/lib/content"

export function ProjectsShowcase({ index = "03" }: { index?: string }) {
  if (projects.length === 0) return null
  return (
    <section aria-labelledby="work-title" className="section-y bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="work-title"
          index={index}
          eyebrow="Selected work"
          title={["Spaces that speak", "for themselves."]}
          description="A selection of homes, workplaces and industrial facilities — each one planned carefully, built precisely and finished with care."
          action={<ArrowLink to="/projects">View all projects</ArrowLink>}
        />
        <Reveal className="mt-14 md:mt-16">
          <ProjectGallery projects={projects} limit={5} />
        </Reveal>
      </div>
    </section>
  )
}
