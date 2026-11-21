import type { Photo } from "./types"

/**
 * About-page copy, based only on the company's confirmed positioning:
 * established 2001, founder Mr Shankar, direct involvement at every stage,
 * long customer relationships. No awards, figures or credentials beyond
 * those have been added.
 */
export const about = {
  introduction:
    "Hari Shankar Builders is an established builder and property developer working in and around Chennai. Since 2001 we have built homes and industrial spaces on one principle: be directly involved in every project, from the first plan to the final handover.",
  background: [
    "Founded by Mr Shankar in 2001, we have completed over 50 projects across South India, from apartments and flats to industrial buildings. Most of our work is in Chennai, mainly in Pallavaram, Chromepet and Chitlapakkam and the neighbourhoods around them.",
    "Every project is planned and overseen by the same people who walk the site each week. Many of our customers stay in touch long after handover, and that is the measure of the work we care about most.",
  ],
  vision:
    "To be the builder families and businesses return to — known for honest work, steady relationships and homes built to last.",
  mission:
    "To build every project with direct involvement at every stage, clear communication and the care we would want for our own home.",
  values: [
    {
      title: "Trust",
      text: "Honest estimates, clear commitments and no surprises.",
      image: { name: "cost-planning", alt: "Reviewing a project budget with a model house and calculator" },
    },
    {
      title: "Involvement",
      text: "Hands-on attention at every stage, not just at handover.",
      image: { name: "rebar-crew", alt: "Site crew fixing steel reinforcement on a column" },
    },
    {
      title: "Accountability",
      text: "One team responsible from groundbreaking to the keys.",
      image: { name: "site-team-slab", alt: "Site team gathered on a concrete slab" },
    },
    {
      title: "Relationships",
      text: "Customers who stay with us long after the project ends.",
      image: { name: "living-room-dog", alt: "Bright family living room with a dog resting on the rug" },
    },
  ],
  whyChooseUs: [
    { title: "Personal attention", text: "Every project is overseen closely, with nothing left to chance." },
    { title: "Direct involvement at every stage", text: "The people who plan your project are the people who oversee it." },
    { title: "Over two decades of experience", text: "Established in 2001, with over 50 projects completed." },
    { title: "Long customer relationships", text: "We stay available well after handover." },
  ],
  leadership: {
    name: "Mr Shankar",
    role: "Founder",
    message:
      "Every home we build carries our name, and we give each one our full attention. We stand behind our work long after handover.",
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
