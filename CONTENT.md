# Pre-launch content checklist

The site was built without the company's real details. Everything below is
placeholder content and **must** be replaced or confirmed before launch.
No credentials, figures, awards, clients or testimonials have been invented —
anything that would state a fact about the company is either generic brand
copy (to be confirmed) or explicitly marked as sample content.

## 1. Company details — `src/content/site.ts`

- [ ] Company name, legal name and descriptor (currently "Stratum")
- [ ] Phone number (display + `tel:` link) and WhatsApp number
- [ ] Email address (currently `hello@example.com`)
- [ ] Office address and `mapQuery` (drives the Google Maps embed and directions link)
- [ ] Office hours
- [ ] Social media profile URLs (currently point to each platform's home page)
- [ ] Construction types offered in the enquiry forms
- [ ] Replace the placeholder logo mark in `src/components/layout/logo.tsx` and `public/favicon.svg`

## 2. About copy — `src/content/about.ts`

- [ ] Introduction, background, vision, mission, values and "why choose us"
- [ ] Leadership name, role and message (currently "Founder Name")

## 3. Services — `src/content/services.ts`

- [ ] Delete any service the company does not offer (the brief: show only confirmed services)
- [ ] Confirm descriptions and deliverables

## 4. Sample content (excluded from production builds automatically)

Placeholder items live in `src/content/sample/`. They are shown in development and in
`npm run build:showcase`, and are not bundled at all by `npm run build`. Sections with no real items hide themselves
(testimonials, insights) or show a graceful empty state (projects, blog).

- [ ] **Projects** — add real projects to `src/content/projects.ts` (same shape as `src/content/sample/projects.ts`), with real photography and specifications.
- [ ] **Testimonials** — add real client feedback to `src/content/testimonials.ts`, with each client's permission.
- [ ] **Blog articles** — move reviewed articles from `src/content/sample/blog.ts` into `src/content/blog.ts` with real publication dates (drop `sample: true`).

## 5. Photography — `assets/photos/`

All photographs are Unsplash stand-ins (see `assets/photos/CREDITS.md`).
Replace with the company's own photography, keeping the same file names or
updating the references in `src/content/*`, then run `npm run images`.

## 6. Enquiry backend

- [ ] Set `VITE_ENQUIRY_ENDPOINT` to a JSON POST endpoint (Formspree, Basin, Getform, or an in-house API). Until it is set, forms show an honest "not connected yet" message with phone/email fallbacks — they never fake success.
- [ ] Confirm submissions arrive (fields: `kind`, `fullName`, `phone`, `email`, `location`, `constructionType`, `description`, `preferredDate`, `page`, `submittedAt`).

## 7. Legal

- [ ] Have `src/pages/privacy.tsx` reviewed for your jurisdiction.
