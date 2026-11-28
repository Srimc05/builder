import { useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ArrowLink } from "@/components/shared/arrow-link"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { SectionHeading } from "@/components/shared/section-heading"
import { services } from "@/content/services"
import { imageSrc } from "@/lib/images"
import { EASE } from "@/lib/motion"
import { spotlightX } from "@/lib/spotlight"
import { cn } from "@/lib/utils"

import { BrickLaidImage } from "./brick-laid-image"

export function ServicesShowcase() {
  const [active, setActive] = useState(0)
  // Each change lays a new photo on top of the last, so it needs its own key and stacking order.
  const [layer, setLayer] = useState(0)
  const current = services[active] ?? services[0]

  const select = (i: number) => {
    if (i === active) return
    setActive(i)
    setLayer((l) => l + 1)
  }

  // Fetch every service photo the first time the list is approached, so a wall is never laid with an empty photo.
  const preloaded = useRef(false)
  const preload = () => {
    if (preloaded.current) return
    preloaded.current = true
    for (const s of services) new Image().src = imageSrc(s.image.name, 1280)
  }

  return (
    <section aria-labelledby="services-title" className="section-y bg-sand">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow="Services"
          title={["What we build,", "and how we build it."]}
          description="Residential, commercial and industrial construction, plus renovation — each handled with direct involvement from start to finish."
          action={<ArrowLink to="/services">All services</ArrowLink>}
        />

        {/* Desktop: editorial index with a responsive image stage */}
        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-12">
          <ol className="lg:col-span-6" onPointerEnter={preload} onFocus={preload}>
            {services.map((service, i) => {
              const isActive = i === active
              return (
                <li key={service.slug} className="border-t border-ink/10 last:border-b">
                  <Link
                    to={`/services#${service.slug}`}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    className="focus-ring group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-5 outline-offset-[-2px]"
                  >
                    <span className={cn("text-meta pt-1.5 font-semibold tabular-nums transition-colors duration-500", isActive ? "text-brand" : "text-stone")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={cn(
                          // Ink fill: the active title fills with ink from left to right.
                          "block bg-[linear-gradient(90deg,var(--color-ink)_50%,rgb(34_34_34/0.6)_50%)] bg-size-[200%_100%] bg-clip-text text-[1.45rem] leading-tight font-semibold tracking-[-0.025em] text-transparent",
                          "transition-[background-position] duration-700 ease-architect motion-reduce:duration-0",
                          "forced-colors:bg-none forced-colors:text-[CanvasText]",
                          isActive ? "bg-left" : "bg-right",
                        )}
                      >
                        {service.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-md pt-2 text-[0.95rem] leading-relaxed text-stone">{service.summary}</span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                          Learn more <ArrowUpRight aria-hidden className="size-4" />
                        </span>
                      </motion.span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid size-8 place-items-center rounded-btn border transition-all duration-500 ease-architect",
                        isActive ? "rotate-45 border-brand bg-brand text-white" : "border-ink/15 text-ink/40",
                      )}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>

          <div className="lg:col-span-6">
            <div className="sticky top-28">
              <Reveal className="relative aspect-[4/3] overflow-hidden rounded-media bg-sand-deep">
                {/* Each new photo is laid brick by brick over the last one. `isolate` keeps
                    their growing stacking order below the caption. */}
                <div className="absolute inset-0 isolate">
                  <AnimatePresence initial={false}>
                    {current && <BrickLaidImage key={layer} photo={current.image} z={layer} />}
                  </AnimatePresence>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-linear-to-t from-night/70 to-transparent p-6 pt-20 text-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={current?.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="text-sm font-semibold"
                    >
                      {current?.deliverables.slice(0, 3).join(" · ")}
                    </motion.p>
                  </AnimatePresence>
                  <span className="text-meta font-semibold tabular-nums text-white/70">
                    {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Mobile & tablet: swipeable editorial cards */}
        <RevealGroup
          as="ul"
          className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => (
            <RevealItem as="li" key={service.slug} className="w-[72vw] max-w-[19rem] shrink-0 snap-start">
              <Link ref={spotlightX} to={`/services#${service.slug}`} className="focus-ring group block rounded-media">
                <div className="relative aspect-[5/4] overflow-hidden rounded-media">
                  <ResponsiveImage
                    name={service.image.name}
                    alt={service.image.alt}
                    sizes="78vw"
                    className="size-full"
                    imgClassName="transition-transform duration-700 ease-architect group-hover:scale-105 motion-safe:group-spot:scale-105"
                  />
                  <span className="text-meta absolute top-4 left-4 rounded-full bg-white/90 px-2.5 py-1 font-semibold tabular-nums text-ink backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">{service.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone">{service.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
