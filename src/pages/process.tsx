import { CalendarCheck, FileText, MessageSquareText, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { FeatureGrid, type FeatureItem } from "@/components/shared/feature-grid"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProcessSection } from "@/features/process/process-section"

const commitments: FeatureItem[] = [
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
        image="roof-framing"
        className="mb-0 md:mb-0"
        eyebrow="Our process"
        title={["A clear path from", "idea to handover."]}
        description="A well-defined process removes uncertainty. Here is how every project moves from your first call to the day you receive the keys."
      />
      <ProcessSection index="" />
      <section aria-labelledby="commitments-title" className="section-y bg-sand">
        <div className="container-site">
          <SectionHeading
            id="commitments-title"
            eyebrow="Throughout the journey"
            title={["What you can", "count on."]}
            description="However large or small the project, this is how we keep you informed and in control."
          />
          <FeatureGrid className="mt-10" items={commitments} />
        </div>
      </section>
    </>
  )
}
