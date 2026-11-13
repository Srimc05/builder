import { Building2, ClipboardCheck, Receipt, UserRound, type LucideIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { ImageReveal, MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { SectionHeading } from "@/components/shared/section-heading"
import { about } from "@/content/about"

const whyIcons: LucideIcon[] = [Building2, Receipt, UserRound, ClipboardCheck]

export function AboutPage() {
  return (
    <>
      <PageMeta title="About Us" description={about.introduction} />
      <PageHeader
        eyebrow="About us"
        title={["Built on precision.", "Driven by care."]}
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
              <MaskedLines lines={["One team,", "start to finish."]} />
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
              className="border-line py-16 md:py-24 md:first:border-r md:first:pr-12 md:last:pl-12 max-md:first:border-b"
            >
              <p className="text-eyebrow text-brand">{item.label}</p>
              <p className="mt-6 text-[clamp(1.4rem,1.1rem+1.1vw,2.1rem)] leading-snug font-semibold tracking-[-0.03em] text-ink">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section aria-labelledby="values-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="Core values" title={["What we stand on."]} />
          <RevealGroup as="ul" className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-line bg-line lg:grid-cols-4">
            {about.values.map((v, i) => (
              <RevealItem as="li" key={v.title} className="bg-white p-5 sm:p-8 lg:p-10">
                <span className="text-[3.5rem] leading-none font-bold tracking-[-0.05em] text-sand-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em] text-ink">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-title" className="bg-night text-white">
        <div className="container-site grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <ImageReveal className="aspect-[4/5] rounded-media lg:col-span-5">
            <ResponsiveImage name="architect-drawing" alt="Hands sketching architectural plans at a drafting table" sizes="(min-width:1024px) 40vw, 100vw" className="size-full" />
          </ImageReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-eyebrow text-bronze">Leadership</p>
            </Reveal>
            <h2 id="leadership-title" className="sr-only">
              A message from our leadership
            </h2>
            <Reveal delay={0.1}>
              <blockquote>
                <p className="mt-8 text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)] leading-[1.3] font-medium tracking-[-0.03em]">
                  &ldquo;{about.leadership.message}&rdquo;
                </p>
                <footer className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
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
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="why-title" align="left" eyebrow="Why choose us" title={["Clarity at", "every stage."]} />
            <ImageReveal className="mt-12 hidden aspect-[4/3] rounded-media lg:block">
              <ResponsiveImage name="rebar-crew" alt="Crew fixing reinforcement on a column" sizes="40vw" className="size-full" />
            </ImageReveal>
          </div>
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1 lg:pt-24">
            {about.whyChooseUs.map((item, i) => {
              const Icon = whyIcons[i] ?? Building2
              return (
                <RevealItem as="li" key={item.title} className="flex gap-5 rounded-media border border-line p-6 transition-colors hover:border-ink/20 md:p-8">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
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
