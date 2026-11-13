import type { Testimonial } from "../types"

/**
 * SAMPLE TESTIMONIALS — placeholders that demonstrate the layout only.
 * The brief requires real testimonials: replace these with genuine client
 * feedback (with the client's permission) before launch. Sample items are
 * excluded from production builds automatically.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    sample: true,
    id: "courtyard-residence",
    clientName: "Sample Client A",
    projectName: "The Courtyard Residence",
    location: "Hillside District",
    feedback:
      "Placeholder testimonial. The team explained every decision clearly, kept us updated weekly and handed over a home that was finished to a standard we hadn't expected.",
    image: { name: "hero-residence-dusk", alt: "The Courtyard Residence at dusk" },
  },
  {
    sample: true,
    id: "azure-terrace",
    clientName: "Sample Client B",
    projectName: "Azure Terrace Villa",
    location: "Coastal Road",
    feedback:
      "Placeholder testimonial. From the first drawings to the final walkthrough, there was one team responsible for everything. The budget we agreed was the budget we paid.",
    image: { name: "villa-terrace-pool", alt: "Azure Terrace Villa terraces and pool" },
  },
  {
    sample: true,
    id: "perforated-house",
    clientName: "Sample Client C",
    projectName: "The Perforated House",
    location: "Greenfield Layout",
    feedback:
      "Placeholder testimonial. The attention to detail on site was remarkable. Problems were raised early and always came with a solution attached.",
    image: { name: "house-courtyard", alt: "The Perforated House courtyard" },
  },
  {
    sample: true,
    id: "meridian",
    clientName: "Sample Client D",
    projectName: "Meridian Business Centre",
    location: "Central Business District",
    feedback:
      "Placeholder testimonial. On a constrained city-centre site, their planning and coordination kept the programme on track and our neighbours on side.",
    image: { name: "white-pavilion", alt: "Meridian Business Centre facade" },
  },
]
