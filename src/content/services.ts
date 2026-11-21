import type { Service } from "./types"

/**
 * Confirmed services only: residential, commercial, industrial and renovation.
 */
export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    summary: "Homes and villas built around how you live, from foundation to finishing.",
    description:
      "We build independent homes, villas and residential developments with a focus on structural integrity, natural light and finishes that age gracefully. A single team stays accountable from groundbreaking to handover.",
    deliverables: ["Independent homes & villas", "Multi-unit residences", "Structural & MEP coordination", "Finishing & landscaping"],
    image: { name: "house-timber-cladding", alt: "Contemporary two-storey home with timber cladding and a landscaped lawn" },
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    summary: "Offices, retail and hospitality spaces delivered on programme.",
    description:
      "Commercial buildings demand predictable schedules and disciplined site management. We plan sequencing carefully, coordinate trades closely and keep stakeholders informed at every milestone.",
    deliverables: ["Office buildings", "Retail & showrooms", "Hospitality", "Shell & core works"],
    image: { name: "commercial-block", alt: "Modern commercial building with a black and white facade" },
  },
  {
    slug: "industrial-construction",
    title: "Industrial Construction",
    summary: "Warehouses and production facilities engineered for heavy use.",
    description:
      "We deliver industrial facilities with large clear spans, heavy-duty flooring and services designed around operational workflows, while maintaining strict safety standards on site.",
    deliverables: ["Warehouses & logistics", "Pre-engineered buildings", "Industrial flooring", "Site infrastructure"],
    image: { name: "warehouse-interior", alt: "High-bay warehouse interior with racking aisles" },
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    summary: "Breathing new life into existing buildings.",
    description:
      "From structural alterations to complete refurbishments, we assess what exists, protect what works and upgrade what doesn't — with careful attention to occupied spaces.",
    deliverables: ["Condition assessment", "Structural alterations", "Extensions", "Complete refurbishment"],
    image: { name: "roof-framing", alt: "Carpenter working on timber roof framing" },
  },
]
