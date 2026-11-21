import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { ActionButton } from "@/components/shared/action-button"
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
      <section aria-label="Project portfolio" className="container-site pb-16 md:pb-20">
        {projects.length > 0 ? (
          <ProjectGallery projects={projects} />
        ) : (
          <div className="rounded-panel border border-dashed border-ink/15 bg-sand px-6 py-20 text-center">
            <h2 className="text-title text-ink">New project photos are coming soon.</h2>
            <p className="text-lead mx-auto mt-4 max-w-md text-stone">
              We&rsquo;re gathering photos of our latest homes. Ask us and we&rsquo;ll gladly show you examples.
            </p>
            <ActionButton size="md" className="mt-8" to="/contact">
              Ask for Examples
            </ActionButton>
          </div>
        )}
      </section>
    </>
  )
}
