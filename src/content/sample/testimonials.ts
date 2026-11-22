import type { Testimonial } from "../types"

/**
 * SAMPLE TESTIMONIALS — fictional placeholders for design review only.
 * The names, projects and quotes below are NOT real clients. Replace them with
 * genuine client feedback (with each client's permission) in
 * `src/content/testimonials.ts` before launch. Sample items are shown in
 * development and the showcase build only, and are excluded from production
 * builds automatically.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    sample: true,
    id: "courtyard-residence",
    clientName: "Priya & Arun",
    projectName: "Independent house",
    location: "Pallavaram",
    feedback:
      "Building our first home felt overwhelming until we met the team. Every decision was explained clearly, we had updates every week, and the house we moved into was finished better than we had imagined.",
    image: { name: "hero-residence-dusk", alt: "Independent house at dusk" },
  },
  {
    sample: true,
    id: "azure-terrace",
    clientName: "Mr Raghavan",
    projectName: "Villa with terrace",
    location: "Chromepet",
    feedback:
      "From the first drawings to the final walkthrough, one team was responsible for everything. The budget we agreed at the start was the budget we paid.",
    image: { name: "villa-terrace-pool", alt: "Villa terraces and pool" },
  },
  {
    sample: true,
    id: "apartment-block",
    clientName: "Lakshmi S.",
    projectName: "Apartment block",
    location: "Chitlapakkam",
    feedback:
      "Mr Shankar was on site himself, week after week. Whenever something came up, it was raised early and always came with a solution attached.",
    image: { name: "apartments-balconies", alt: "Apartment block with balconies" },
  },
  {
    sample: true,
    id: "warehouse",
    clientName: "Karthik M.",
    projectName: "Warehouse",
    location: "Chennai outskirts",
    feedback:
      "We needed a large clear-span building on a tight schedule. They planned the work carefully, kept us informed at every stage and handed over on the date they promised.",
    image: { name: "warehouse-interior", alt: "Warehouse interior with racking" },
  },
  {
    sample: true,
    id: "renovation",
    clientName: "The Venkatesan family",
    projectName: "Home renovation",
    location: "Chromepet",
    feedback:
      "Renovating while living in the house is never easy, but they protected what we wanted to keep, kept the site tidy and finished the extension without fuss.",
    image: { name: "interior-living", alt: "Renovated living room" },
  },
  {
    sample: true,
    id: "meridian",
    clientName: "Suresh R.",
    projectName: "Office building",
    location: "Chennai",
    feedback:
      "Ten years after handover, we still call them first. That says more about the relationship than anything else could.",
    image: { name: "white-pavilion", alt: "Office building facade" },
  },
]
