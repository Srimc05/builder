import type { ProcessStage } from "./types"

export const processStages: ProcessStage[] = [
  {
    id: "consultation",
    title: "Initial Consultation",
    summary: "We listen first.",
    detail: "We discuss your goals, budget, timeline and site so we understand what success looks like for you.",
  },
  {
    id: "site-assessment",
    title: "Site Assessment",
    summary: "Understanding the ground.",
    detail: "Our engineers survey the site, study soil conditions, access and services, and identify constraints early.",
  },
  {
    id: "design",
    title: "Architectural Design & Estimation",
    summary: "Ideas become drawings.",
    detail: "We develop the design with you and prepare a transparent, itemised estimate so cost is clear from the start.",
  },
  {
    id: "approvals",
    title: "Planning & Approvals",
    summary: "Permits, schedules, procurement.",
    detail: "We prepare documentation, secure statutory approvals and build a detailed programme before work begins.",
  },
  {
    id: "construction",
    title: "Construction Execution",
    summary: "Precision on site.",
    detail: "Foundations to finishes, managed by a dedicated site team with regular progress updates and site visits.",
  },
  {
    id: "inspection",
    title: "Quality Inspection",
    summary: "Checked at every stage.",
    detail: "Structured inspections and testing at each milestone ensure the work meets specification before we move on.",
  },
  {
    id: "handover",
    title: "Project Handover",
    summary: "Ready for life.",
    detail: "A final walkthrough, documentation and warranties — and we stay available long after the keys change hands.",
  },
]
