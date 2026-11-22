import { Handshake, HardHat, History, UserRound, type LucideIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { brick } from "@/components/shared/brick"
import { BrickWall } from "@/components/shared/brick-wall"
import { cn } from "@/lib/utils"
import { ImageReveal, MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { GeneratedText, STATEMENT_STAGGER } from "@/components/ui/text-generate-effect"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { SectionHeading } from "@/components/shared/section-heading"
import { about } from "@/content/about"

/** Icons follow the order of `about.whyChooseUs`. */
const whyIcons: LucideIcon[] = [UserRound, HardHat, History, Handshake]

export function AboutPage() {
  return (
    <>
      <PageMeta title="About Us" description={about.introduction} />
      <PageHeader
        eyebrow="About us"
        title={["Building trust", "since 2001."]}
        description={about.introduction}
      />

      <div className="container-site">
        <ImageReveal className="aspect-[4/3] rounded-panel sm:aspect-[16/9] lg:aspect-[21/9]">
          <ResponsiveImage
            name="site-team-slab"
            alt="Construction team gathered on a concrete slab reviewing the site"
            sizes="100vw"
            priority
            className="size-full"
          />
        </ImageReveal>
      </div>

      {/* Background */}
      <section aria-labelledby="story-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-eyebrow text-stone">Our background</p>
            </Reveal>
            <h2 id="story-title" className="text-headline mt-6">
              <MaskedLines lines={["Hands-on,", "start to finish."]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="grid gap-6 text-lead text-stone lg:col-span-6 lg:col-start-7 lg:pt-14">
            {about.background.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section aria-label="Vision and mission" className="bg-sand">
        <div className="container-site grid md:grid-cols-2">
          {[
            { label: "Vision", text: about.vision },
            { label: "Mission", text: about.mission },
          ].map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.1}
              className="border-line py-12 md:py-16 md:first:border-r md:first:pr-12 md:last:pl-12 max-md:first:border-b"
            >
              <p className="text-eyebrow text-brand">{item.label}</p>
              <p className="mt-4 text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] leading-snug font-semibold tracking-[-0.02em] text-ink">
                <GeneratedText words={item.text} stagger={STATEMENT_STAGGER} />
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section aria-labelledby="values-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="values-title"
            eyebrow="Core values"
            title={["What we stand on."]}
            description="The principles behind every project we take on, whatever its size."
          />
          <BrickWall
            className="mt-10"
            halves={[
              { value: "50+", label: "Projects completed", countUp: true },
              { value: "2001", label: "Building since" },
            ]}
            items={about.values.map((v) => ({ key: v.title, image: v.image, title: v.title, text: v.text }))}
          />
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-title" className="bg-night text-white">
        <div className="container-site grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="aspect-[4/3] rounded-media lg:col-span-4 lg:aspect-square">
            <ResponsiveImage name="white-house" alt="Modern white house with large windows" sizes="(min-width:1024px) 40vw, 100vw" className="size-full" />
          </ImageReveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="leadership-title" className="sr-only">
              A message from our leadership
            </h2>
            <Reveal delay={0.1}>
              <blockquote>
                <p className="text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.4] font-medium tracking-[-0.02em]">
                  <GeneratedText words={`“${about.leadership.message}”`} stagger={STATEMENT_STAGGER} />
                </p>
                <footer className="mt-8 flex items-center gap-4 border-t border-white/15 pt-5">
                  <span className="grid size-12 place-items-center rounded-full bg-white/10 text-sm font-bold" aria-hidden>
                    {about.leadership.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold">{about.leadership.name}</span>
                    <span className="block text-sm text-white/60">{about.leadership.role}</span>
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="why-title" align="left" eyebrow="Why choose us" title={["Involved at", "every stage."]} />
            <ImageReveal className="mt-10 hidden aspect-[4/3] rounded-media lg:block">
              <ResponsiveImage name="rebar-crew" alt="Crew fixing reinforcement on a column" sizes="40vw" className="size-full" />
            </ImageReveal>
          </div>
          <RevealGroup
            as="ul"
            className={cn("grid self-start sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:mt-16 lg:grid-cols-1", brick.panel, brick.gap)}
          >
            {about.whyChooseUs.map((item, i) => {
              const Icon = whyIcons[i] ?? UserRound
              return (
                <RevealItem as="li" key={item.title} className={cn(brick.surface, brick.lift, "flex gap-4 p-5 md:p-6")}>
                  <span className={cn(brick.icon, brick.iconHover)}>
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-stone">{item.text}</p>
                  </span>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
