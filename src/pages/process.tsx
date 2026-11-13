import { CalendarCheck, FileText, MessageSquareText, ShieldCheck, type LucideIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { RevealGroup, RevealItem } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProcessSection } from "@/features/process/process-section"

const commitments: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageSquareText, title: "Regular updates", text: "Scheduled progress reports and site visits so you always know where things stand." },
  { icon: FileText, title: "Documented decisions", text: "Every change is recorded with its effect on cost and programme before it is approved." },
  { icon: CalendarCheck, title: "Milestone sign-offs", text: "Each stage is inspected and signed off before the next one begins." },
  { icon: ShieldCheck, title: "Safety first", text: "Site safety procedures are planned, briefed and monitored throughout construction." },
]

export function ProcessPage() {
  return (
    <>
      <PageMeta title="Our Process" description="Seven clear stages from initial consultation to project handover." />
      <PageHeader
        eyebrow="Our process"
        title={["A clear path from", "idea to handover."]}
        description="A well-defined process removes uncertainty. Here is how every project moves from your first call to the day you receive the keys."
      />
      <ProcessSection index="" />
      <section aria-labelledby="commitments-title" className="section-y bg-sand">
        <div className="container-site">
          <SectionHeading id="commitments-title" eyebrow="Throughout the journey" title={["What you can", "count on."]} />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ icon: Icon, title, text }) => (
              <RevealItem as="li" key={title} className="rounded-media bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
