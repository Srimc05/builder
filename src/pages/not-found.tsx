import { PageMeta } from "@/components/shared/page-meta"
import { MaskedLines } from "@/components/shared/reveal"
import { ActionButton } from "@/components/shared/action-button"

export function NotFoundPage() {
  return (
    <section className="container-site flex min-h-[75svh] flex-col justify-center pt-32 pb-20">
      <PageMeta title="Page not found" />
      <p className="text-eyebrow text-brand">Error 404</p>
      <h1 className="text-display mt-6">
        <MaskedLines lines={["This space is", "still unbuilt."]} animateOnMount />
      </h1>
      <p className="text-lead mt-6 max-w-md text-stone">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ActionButton to="/">Back to home</ActionButton>
        <ActionButton variant="outline" to="/projects">
          View projects
        </ActionButton>
      </div>
    </section>
  )
}
