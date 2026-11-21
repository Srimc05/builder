# Pre-launch content checklist

The site is for **Hari Shankar Builders** (Chennai, established 2001, founder
Mr Shankar). The brand, positioning and copy are in place; the items below are
still placeholders or need the company's confirmation before launch. No
awards, figures or testimonials have been invented beyond the confirmed
positioning (established 2001, over 50 projects, direct involvement at every
stage, long customer relationships).

## 1. Company details — `src/content/site.ts`

- [x] Company name, tagline and description
- [x] Services offered and enquiry-form construction types
- [ ] Confirm "founded 2001", "over 50 projects" and the areas served (Pallavaram, Chromepet, Chitlapakkam and surroundings)
- [ ] Phone number (display + `tel:` link) and WhatsApp number
- [ ] Email address (currently `hello@example.com`)
- [ ] Office address and `mapQuery` (drives the Google Maps embed and directions link)
- [ ] Office hours
- [ ] Real Instagram and Facebook page links (currently each platform's home page)
- [ ] Replace the placeholder logo mark in `src/components/layout/logo.tsx` and `public/favicon.svg`

## 2. About copy — `src/content/about.ts`

- [x] Introduction, background, vision, mission, values and "why choose us"
- [ ] Mr Shankar's approval of the founder message
- [ ] A photo of Mr Shankar (the leadership block currently shows a house photo)

## 3. Services — `src/content/services.ts`

- [x] Residential, Commercial, Industrial, Renovation & Remodeling (others removed)
- [ ] Confirm descriptions and deliverables

## 4. Projects, testimonials and articles

Placeholder projects and testimonials live in `src/content/sample/`. They are switched
**off** in development (`.env.development`), are shown only by `npm run build:showcase`,
and are never bundled by `npm run build`. Sections with no real items hide themselves
(testimonials) or show a graceful empty state (projects).

- [ ] **Projects** — add real projects to `src/content/projects.ts` (same shape as `src/content/sample/projects.ts`): a few flats and the 2018 industrial building in Maraimalai Nagar, with names, areas, years and photos.
- [ ] **Testimonials** — add real client feedback to `src/content/testimonials.ts`, with each client's permission.
- [ ] **Blog articles** — the six articles in `src/content/blog.ts` are published, but still have placeholder dates (Sept–Oct 2026) and generic wording (some mention design and architecture). Review them, set real dates, or replace them.

## 5. Photography — `assets/photos/`

All photographs are Unsplash stand-ins (see `assets/photos/CREDITS.md`).
Replace with the company's own photography, keeping the same file names or
updating the references in `src/content/*`, then run `npm run images`.

## 6. Enquiry backend

- [ ] Set `VITE_ENQUIRY_ENDPOINT` to a JSON POST endpoint (Formspree, Basin, Getform, or an in-house API). Until it is set, forms show an honest "not connected yet" message with phone/email fallbacks — they never fake success.
- [ ] Confirm submissions arrive (fields: `kind`, `fullName`, `phone`, `email`, `location`, `constructionType`, `description`, `preferredDate`, `page`, `submittedAt`).

## 7. Legal

- [ ] Have `src/pages/privacy.tsx` reviewed for your jurisdiction.
