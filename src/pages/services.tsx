import { useEffect } from "react"
import { Check } from "lucide-react"
import { useLocation } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { ImageReveal, Reveal } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { services } from "@/content/services"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { cn } from "@/lib/utils"

export function ServicesPage() {
  const { hash } = useLocation()
  const { openConsultation } = useConsultation()

  // Lazy-loaded route: scroll to the requested service once it has rendered.
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }))
  }, [hash])

  return (
    <>
      <PageMeta title="Services" description="Residential, commercial and industrial construction and renovation, delivered with direct involvement at every stage." />
      <PageHeader
        eyebrow="Services"
        title={["Residential, commercial", "and industrial."]}
        description="Construction and renovation services, delivered with direct involvement at every stage."
      >
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="focus-ring flex h-11 items-center rounded-btn border border-line px-4 sm:h-10 text-sm font-semibold text-ink/75 transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="container-site pb-16 md:pb-20">
        {services.map((service, i) => {
          const flip = i % 2 === 1
          return (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid scroll-mt-28 items-center gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-14"
            >
              <ImageReveal className={cn("aspect-[4/3] rounded-media lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                <ResponsiveImage name={service.image.name} alt={service.image.alt} sizes="(min-width:1024px) 48vw, 100vw" className="size-full" />
              </ImageReveal>
              <Reveal delay={0.1} className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
                <p className="text-meta font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${service.slug}-title`} className="text-title mt-3 text-ink">
                  {service.title}
                </h2>
                <p className="text-lead mt-4 text-stone">{service.description}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[0.95rem] text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <ActionButton size="md" className="mt-8" onClick={openConsultation}>
                  Discuss this service
                </ActionButton>
              </Reveal>
            </article>
          )
        })}
      </div>
    </>
  )
}
