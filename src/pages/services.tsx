import { useEffect } from "react"
import { Check } from "lucide-react"
import { useLocation } from "react-router"

import { ButtonArrow } from "@/components/shared/arrow-link"
import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { ImageReveal, Reveal } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { Button } from "@/components/ui/button"
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
      <PageMeta title="Services" description="Design, engineering and construction services delivered by one accountable team." />
      <PageHeader
        eyebrow="Services"
        title={["Design, engineering", "and construction."]}
        description="Everything needed to take a project from idea to occupation — delivered by one accountable team."
      >
        <nav aria-label="Services on this page" className="mt-14 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-ink/75 ring-1 ring-ink/12 transition-colors hover:bg-ink hover:text-white hover:ring-ink"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="container-site pb-20 md:pb-28">
        {services.map((service, i) => {
          const flip = i % 2 === 1
          return (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid scroll-mt-28 items-center gap-10 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-16"
            >
              <ImageReveal className={cn("aspect-[4/3] rounded-media lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                <ResponsiveImage name={service.image.name} alt={service.image.alt} sizes="(min-width:1024px) 48vw, 100vw" className="size-full" />
              </ImageReveal>
              <Reveal delay={0.1} className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
                <p className="text-meta font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${service.slug}-title`} className="text-title mt-4 text-ink md:text-[2.4rem]">
                  {service.title}
                </h2>
                <p className="text-lead mt-5 text-stone">{service.description}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[0.95rem] text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <Button variant="ink" size="pill" className="group/button mt-10" onClick={openConsultation}>
                  Discuss this service
                  <ButtonArrow />
                </Button>
              </Reveal>
            </article>
          )
        })}
      </div>
    </>
  )
}
