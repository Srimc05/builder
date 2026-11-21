/**
 * Company-wide configuration.
 *
 * Everything in this file is placeholder brand information and MUST be
 * replaced with the company's confirmed details before launch — see
 * CONTENT.md for the full checklist.
 */
export const site = {
  name: "Hari Shankar Builders",
  legalName: "Hari Shankar Builders",
  formerName: "JS Associates",
  descriptor: "",
  founder: "Shankar",
  established: 2001,
  tagline: "Building Trust. Creating Homes. Since 2001.",
  description:
    "Established builder and property developer in South India, building homes and industrial spaces with direct involvement at every stage and long customer relationships.",

  contact: {
    phoneDisplay: "+00 000 000 0000",
    phoneHref: "tel:+000000000000",
    whatsappNumber: "000000000000",
    email: "hello@example.com",
    addressLines: ["Office address line 1", "Office address line 2", "City, Postcode"],
    mapQuery: "Office address, City",
    hours: "Mon – Sat · 9:00 – 18:00",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
} as const

export const whatsappHref = (message = "Hello, I'd like to discuss a construction project.") =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`
export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Our Process", to: "/process" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const

/** Options shown in every enquiry form's "Construction type" field. */
export const constructionTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Renovation / Remodeling",
  "Other",
] as const
