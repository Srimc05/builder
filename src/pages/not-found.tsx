import { Link } from "react-router"

import { PageMeta } from "@/components/shared/page-meta"
import { MaskedLines } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-36 pb-24">
      <PageMeta title="Page not found" />
      <p className="text-eyebrow text-brand">Error 404</p>
      <h1 className="text-display mt-6">
        <MaskedLines lines={["This space is", "still unbuilt."]} animateOnMount />
      </h1>
      <p className="text-lead mt-6 max-w-md text-stone">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="ink" size="pill-lg" asChild>
          <Link to="/">Back to home</Link>
        </Button>
        <Button variant="outline-ink" size="pill-lg" asChild>
          <Link to="/projects">View projects</Link>
        </Button>
      </div>
    </section>
  )
}
