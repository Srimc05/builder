# Construction company website

A premium, responsive marketing site for a design-led construction company.

**Stack:** React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · shadcn/ui (Radix) · Aceternity UI · Motion · Lucide / Tabler icons · React Router.

> Before launch, work through **[CONTENT.md](CONTENT.md)** — all company details, projects, testimonials and photography are placeholders.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (sample content included) |
| `npm run build` | Production build — sample content **excluded** |
| `npm run build:showcase` | Production build **with** sample content, for design review |
| `npm run preview` | Serve the last build |
| `npm run typecheck` / `npm run lint` | TypeScript and oxlint |
| `npm run images` | Convert `assets/photos/*` into responsive WebP + blur placeholders |

## Configuration (`.env.local`, see `.env.example`)

- `VITE_ENQUIRY_ENDPOINT` — JSON POST endpoint for all enquiry forms. When empty, forms show a clear "not connected yet" error with phone/email fallbacks.
- `VITE_INCLUDE_SAMPLE_CONTENT` — `"true"` to include items marked `sample: true`.

The site is a single-page app: configure the host to serve `index.html` for all routes (SPA fallback).

## Structure

```
src/
  content/          All copy and data (site config, services, projects, testimonials, blog, process)
  lib/              Business logic — enquiry submission & validation, content gating, motion tokens
  hooks/            Generic hooks
  components/
    ui/             shadcn/ui primitives + adapted Aceternity components
    layout/         Header, mobile nav, footer, root layout
    shared/         Reusable presentation (responsive image, reveals, headings…)
  features/         Feature modules (home sections, enquiry, process illustration, projects, blog)
  pages/            Route components (lazy-loaded except home)
assets/photos/      Source photography (processed by `npm run images`)
public/images/      Generated WebP variants (640 / 1280 / 1920)
```

## Notable implementation details

- **Stateful Button** (`components/ui/stateful-button.tsx`) — Aceternity original with its loader → check sequence and timings preserved; adds brand colour, a controlled `status` mode for forms, a duplicate-submission guard, an error state, `aria-busy`, and reduced-motion support. The shared `layoutId` was removed so several buttons can coexist.
- **Animated Testimonials** (`components/ui/animated-testimonials.tsx`) — Aceternity original with stable per-card tilt, reduced-motion crossfade, optional (off by default) autoplay that pauses on hover/focus/hidden tab, labelled 44px controls, arrow-key support and responsive images.
- **Process illustration** (`features/process/`) — a single SVG scene choreographed by scroll progress through all seven stages, ending with the completed building. Desktop: sticky scroll stage with a clickable stage list. Mobile: vertical timeline with an animated finale.
- **Consultation modal** (`features/enquiry/`) — opens once per session ~1.5s after 25% scroll; never on `/contact`, over another dialog, while a form is in use, or after an enquiry was sent. Radix Dialog provides focus trapping, Escape and scroll lock; bottom sheet on mobile.
- **Images** — WebP at three widths with `srcset`/`sizes`, intrinsic dimensions, blur placeholders, lazy loading below the fold.
- **Reduced motion** — `MotionConfig reducedMotion="user"` globally plus explicit fallbacks in scroll-driven and decorative animations.
