import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { ArrowLink } from "@/components/shared/arrow-link"
import { ImageReveal, Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { about } from "@/content/about"

export function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const floatY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["18%", "-18%"])

  return (
    <section id="about" aria-labelledby="about-title" className="section-y scroll-mt-20 bg-canvas">
      <div className="container-site">
        <Reveal>
          <p className="text-eyebrow flex items-center gap-3 text-stone">
            <span className="text-brand">01</span>
            <span aria-hidden className="h-px w-8 bg-ink/20" />
            About us
          </p>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="about-title" className="text-[clamp(1.6rem,1.1rem+1.9vw,2.85rem)] leading-[1.18] font-semibold tracking-[-0.03em] text-ink">
                We are a design-led construction company.{" "}
                <span className="text-stone">
                  Architects, engineers and builders under one roof — so what is designed is exactly what gets built.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid max-w-2xl gap-6 text-[1.02rem] leading-relaxed text-stone sm:grid-cols-2">
              {about.background.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <ArrowLink to="/about">More about us</ArrowLink>
            </Reveal>
          </div>

          <div ref={ref} className="relative lg:col-span-5">
            <ImageReveal className="aspect-[4/5] rounded-media">
              <ResponsiveImage
                name="engineers-on-site"
                alt="Two engineers in hard hats reviewing progress on a construction site"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full"
              />
            </ImageReveal>
            <motion.div
              style={{ y: floatY }}
              className="absolute -bottom-10 -left-6 hidden w-[46%] rounded-media border-[6px] border-canvas shadow-lift sm:block lg:-left-16"
            >
              <ImageReveal delay={0.2} className="aspect-square rounded-[calc(var(--radius-media)-6px)]">
                <ResponsiveImage name="architect-drawing" alt="Architect sketching plans by hand" sizes="20vw" className="size-full" />
              </ImageReveal>
            </motion.div>
          </div>
        </div>

        <RevealGroup as="ul" className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:mt-32 lg:grid-cols-4">
          {about.values.map((v, i) => (
            <RevealItem as="li" key={v.title} className="border-t border-ink/15 pt-6">
              <span className="text-meta font-semibold text-bronze-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">{v.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{v.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
