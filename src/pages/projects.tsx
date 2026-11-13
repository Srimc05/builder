import { Link } from "react-router"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Button } from "@/components/ui/button"
import { ProjectGallery } from "@/features/projects/project-gallery"
import { projects } from "@/lib/content"

export function ProjectsPage() {
  return (
    <>
      <PageMeta title="Projects" description="A portfolio of residential, commercial and industrial construction projects." />
      <PageHeader
        eyebrow="Projects"
        title={["Selected work."]}
        description="Homes, workplaces and industrial facilities — each planned carefully, built precisely and finished with care."
      />
      <section aria-label="Project portfolio" className="container-site pb-20 md:pb-28">
        {projects.length > 0 ? (
          <ProjectGallery projects={projects} />
        ) : (
          <div className="rounded-panel border border-dashed border-ink/15 bg-sand px-6 py-20 text-center">
            <h2 className="text-title text-ink">Our portfolio is being prepared.</h2>
            <p className="text-lead mx-auto mt-4 max-w-md text-stone">
              We&rsquo;re photographing our latest work. In the meantime, we&rsquo;re happy to share relevant examples on request.
            </p>
            <Button variant="ink" size="pill" className="mt-8" asChild>
              <Link to="/contact">Request examples</Link>
            </Button>
          </div>
        )}
      </section>
    </>
  )
}
