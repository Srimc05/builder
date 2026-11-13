import type { Service } from "./types"

/**
 * Services offered. The brief asks to show only services the company has
 * confirmed — delete any entry that does not apply before launch.
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
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    summary: "One contract, one point of contact — design to handover.",
    description:
      "Our turnkey service brings design, approvals, construction and interiors under a single contract, so you get one schedule, one budget and one team responsible for the outcome.",
    deliverables: ["Single-point responsibility", "Design & approvals", "Construction & interiors", "Handover documentation"],
    image: { name: "villa-pool", alt: "Contemporary villa with an infinity pool" },
  },
  {
    slug: "architectural-design",
    title: "Architectural Design",
    summary: "Considered design that balances form, function and budget.",
    description:
      "Our design process starts with how a space will be used. We translate your brief into plans, elevations and 3D studies, refining them with you before anything is built.",
    deliverables: ["Concept design", "Planning drawings", "3D visualisation", "Working drawings"],
    image: { name: "architect-drawing", alt: "Architect sketching building plans at a drafting table" },
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    summary: "Structures designed for safety, efficiency and longevity.",
    description:
      "We design and verify structural systems appropriate to the site, soil conditions and building use, coordinating closely with architecture and services so the structure supports the design rather than constraining it.",
    deliverables: ["Structural analysis & design", "Foundation design", "Steel & RCC detailing", "Site supervision"],
    image: { name: "structure-framing", alt: "Multi-storey building structure under construction" },
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    summary: "Interiors that feel calm, purposeful and complete.",
    description:
      "We design and execute interiors that carry the architecture inside — material palettes, joinery, lighting and furniture selected to work together as a whole.",
    deliverables: ["Space planning", "Material & finish selection", "Custom joinery", "Lighting design"],
    image: { name: "interior-living", alt: "Bright living room with timber wall panelling" },
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
  {
    slug: "project-management",
    title: "Project Management",
    summary: "Clear schedules, controlled budgets and transparent reporting.",
    description:
      "Our project managers plan, coordinate and report on every aspect of delivery — cost, programme, quality and safety — so you always know where your project stands.",
    deliverables: ["Programme planning", "Cost control", "Quality assurance", "Progress reporting"],
    image: { name: "engineers-on-site", alt: "Two engineers in hard hats reviewing a construction site" },
  },
]
