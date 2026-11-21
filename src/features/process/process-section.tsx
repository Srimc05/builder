import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react"
import { ClipboardCheck, HardHat, KeyRound, MessagesSquare, PencilRuler, ScanSearch, Stamp, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"
import { processStages } from "@/content/process"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ProcessScene } from "./process-scene"

const ICONS: Record<string, LucideIcon> = {
  consultation: MessagesSquare,
  "site-assessment": ScanSearch,
  design: PencilRuler,
  approvals: Stamp,
  construction: HardHat,
  inspection: ClipboardCheck,
  handover: KeyRound,
}

const N = processStages.length

export function ProcessSection({ index = "04" }: { index?: string }) {
  return (
    <section aria-labelledby="process-title" className="bg-canvas pt-16 md:pt-22 lg:pt-26">
      <div className="container-site">
        <SectionHeading
          id="process-title"
          index={index}
          eyebrow="Our process"
          title={["From first conversation", "to final handover."]}
          description="Seven clear stages, one accountable team with you throughout. Scroll to watch a project take shape — from the brief on the table to the keys in your hand."
        />
      </div>
      <DesktopJourney />
      <MobileJourney />
    </section>
  )
}

/* ---------------------------------------------------------------- Desktop */

function DesktopJourney() {
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.35", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 })
  const progress = reduce ? scrollYProgress : smooth
  const [active, setActive] = useState(0)

  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))))
  })

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const start = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35
    const length = el.offsetHeight - window.innerHeight + window.innerHeight * 0.35
    window.scrollTo({ top: start + length * ((i + 0.62) / N), behavior: reduce ? "auto" : "smooth" })
  }

  const current = processStages[active]

  return (
    <div ref={track} data-process-track className="relative hidden h-[520vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-site grid grid-cols-12 items-center gap-12 pt-16">
          <ol className="relative col-span-4 flex flex-col" aria-label="Construction stages">
            {/* Connecting rail, drawn progressively */}
            <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line" />
            <motion.span aria-hidden className="absolute top-5 bottom-5 left-5 w-px origin-top bg-brand" style={{ scaleY: progress }} />
            {processStages.map((stage, i) => {
              const Icon = ICONS[stage.id] ?? MessagesSquare
              const isActive = i === active
              const done = i < active
              return (
                <li key={stage.id} className="relative">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    className="focus-ring group flex w-full items-start gap-5 rounded-xl py-2.5 text-left"
                  >
                    <span
                      className={cn(
                        "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-architect",
                        isActive
                          ? "scale-110 border-brand bg-brand text-white shadow-[0_0_0_6px_var(--color-brand-soft)]"
                          : done
                            ? "border-brand/40 bg-white text-brand"
                            : "border-line bg-white text-stone group-hover:border-ink/30 group-hover:text-ink",
                      )}
                    >
                      <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 pt-2">
                      <span className="flex items-baseline gap-3">
                        <span className={cn("text-meta font-semibold tabular-nums", isActive ? "text-brand" : "text-stone")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-[0.95rem] font-semibold tracking-[-0.015em] transition-colors duration-500",
                            isActive ? "text-ink" : done ? "text-ink/80" : "text-stone group-hover:text-ink",
                          )}
                        >
                          {stage.title}
                        </span>
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-sm pt-2 pb-1 pl-8 text-[0.92rem] leading-relaxed text-stone">{stage.detail}</span>
                      </motion.span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="col-span-8">
            <div className="relative overflow-hidden rounded-panel border border-line bg-sand shadow-soft">
              <div className="mx-auto aspect-[4/3] max-h-[calc(100vh-12rem)] w-full">
                <ProcessScene progress={progress} label={current?.title ?? ""} />
              </div>
              <div className="flex items-center justify-between border-t border-line bg-white px-6 py-4">
                <motion.p
                  key={current?.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-sm font-semibold text-ink"
                  aria-live="polite"
                >
                  <span className="text-brand">Stage {String(active + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-stone/60">/</span>
                  {current?.summary}
                </motion.p>
                <div className="flex gap-1.5" aria-hidden>
                  {processStages.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn("h-1 rounded-full transition-all duration-500", i <= active ? "w-6 bg-brand" : "w-3 bg-ink/15")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Mobile */

function MobileJourney() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.7", "end 0.6"] })

  return (
    <div className="container-site pt-10 pb-16 md:pb-22 lg:hidden">
      <ol ref={list} className="relative" aria-label="Construction stages">
        <span aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-line" />
        <motion.span aria-hidden className="absolute top-2 bottom-2 left-5 w-px origin-top bg-brand" style={{ scaleY: scrollYProgress }} />
        {processStages.map((stage, i) => (
          <MobileStage key={stage.id} index={i} />
        ))}
      </ol>
      <CompletedBuilding />
    </div>
  )
}

function MobileStage({ index }: { index: number }) {
  const stage = processStages[index]!
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const Icon = ICONS[stage.id] ?? MessagesSquare
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={seen ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative flex gap-5 pb-8 last:pb-0"
    >
      <span
        className={cn(
          "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
          inView ? "border-brand bg-brand text-white shadow-[0_0_0_6px_var(--color-brand-soft)]" : "border-line bg-white text-stone",
        )}
      >
        <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
      </span>
      <div className="pt-1.5">
        <p className={cn("text-meta font-semibold tabular-nums", inView ? "text-brand" : "text-stone")}>
          Stage {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1 text-base font-semibold tracking-[-0.015em] text-ink">{stage.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{stage.detail}</p>
      </div>
    </motion.li>
  )
}

/** Mobile finale — the illustration plays from construction to the finished building. */
function CompletedBuilding() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" })
  const reduce = useReducedMotion()
  const progress = useMotionValue(reduce ? 1 : 4 / 7)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(progress, 1, { duration: 4.2, ease: [0.45, 0, 0.25, 1] })
    return () => controls.stop()
  }, [inView, reduce, progress])

  return (
    <div ref={ref} className="mt-12 overflow-hidden rounded-media border border-line bg-sand">
      <div className="aspect-[4/3]">
        <ProcessScene progress={progress} label="Project handover — the completed building" />
      </div>
      <p className="border-t border-line bg-white px-5 py-4 text-sm font-semibold text-ink">
        <span className="text-brand">Handover</span>
        <span className="mx-2 text-stone/60">/</span>
        Ready for life.
      </p>
    </div>
  )
}
