import type { Photo } from "./types"

/**
 * About-page copy. Written as brand positioning only — no figures, awards or
 * credentials have been invented. Have the company confirm or rewrite every
 * statement, and fill in the leadership details, before launch.
 */
export const about = {
  introduction:
    "We are a design-led construction company. We bring architects, engineers and builders together under one roof so that what is designed is exactly what gets built.",
  background: [
    "Our work spans homes, commercial buildings and industrial facilities, but our approach is the same on every site: plan carefully, communicate openly and build with precision.",
    "We believe a building should outlast the people who commissioned it. That belief shapes how we select materials, how we detail junctions and how we check our own work.",
  ],
  vision:
    "To create buildings that communities are proud of for generations — spaces that are beautiful, durable and genuinely useful.",
  mission:
    "To deliver every project with engineering rigour, transparent communication and craftsmanship that stands up to close inspection.",
  values: [
    {
      title: "Integrity",
      text: "Honest estimates, clear contracts and no surprises.",
      image: { name: "cost-planning", alt: "Reviewing a project budget with a model house and calculator" },
    },
    {
      title: "Precision",
      text: "Measured twice, built once — at every scale.",
      image: { name: "structure-framing", alt: "Multi-storey building frame under construction" },
    },
    {
      title: "Accountability",
      text: "One team, responsible from first sketch to handover.",
      image: { name: "site-team-slab", alt: "Site team gathered on a concrete slab" },
    },
    {
      title: "Craft",
      text: "Details that are finished properly, even where no one looks.",
      image: { name: "interior-living", alt: "Living room with carefully detailed timber panelling" },
    },
  ],
  whyChooseUs: [
    { title: "Design and build under one roof", text: "Architects, engineers and site teams working from the same plan." },
    { title: "Transparent, itemised pricing", text: "You see what everything costs before work begins." },
    { title: "Single point of contact", text: "A dedicated project manager who knows your project in detail." },
    { title: "Quality checked at every stage", text: "Structured inspections before each milestone is signed off." },
  ],
  leadership: {
    name: "Founder Name",
    role: "Founder & Managing Director",
    message:
      "Every project we take on carries our name. We treat that as a promise — to plan honestly, build carefully and stand behind our work long after handover.",
  },
} satisfies {
  introduction: string
  background: string[]
  vision: string
  mission: string
  values: { title: string; text: string; image: Photo }[]
  whyChooseUs: { title: string; text: string }[]
  leadership: { name: string; role: string; message: string }
}
