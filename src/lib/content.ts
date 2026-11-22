import { blogPosts } from "@/content/blog"
import { projectCategories, projects as realProjects } from "@/content/projects"
import { samplePosts, sampleProjects, sampleTestimonials } from "@/content/sample"
import { testimonials as realTestimonials } from "@/content/testimonials"

/**
 * Placeholder (sample) content is included in development and the
 * `showcase` build only. The flag is replaced at build time, so in a default
 * production build the sample modules are unreferenced and tree-shaken out
 * of the bundle entirely — they are never shipped to visitors.
 */
const includeSamples = import.meta.env.VITE_INCLUDE_SAMPLE_CONTENT === "true"

export const projects = includeSamples ? [...realProjects, ...sampleProjects] : realProjects
export const testimonials = includeSamples ? [...realTestimonials, ...sampleTestimonials] : realTestimonials
export const posts = (includeSamples ? [...blogPosts, ...samplePosts] : blogPosts).toSorted((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
)

export const hasSampleContent = includeSamples

/**
 * Testimonials for the About page's scattered cards. Until real testimonials
 * are added, the local dev server shows the samples so the design can be
 * reviewed. `import.meta.env.DEV` is false in every build, so a production
 * build never falls back to them (the showcase build includes them anyway).
 */
export const aboutTestimonials =
  testimonials.length > 0 ? testimonials : import.meta.env.DEV ? sampleTestimonials : []

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
export const getPost = (slug: string | undefined) => posts.find((p) => p.slug === slug)
export const categoryLabel = (slug: string) => projectCategories.find((c) => c.slug === slug)?.label ?? slug

/** Only list categories that actually contain at least one project. */
export const activeCategories = projectCategories.filter((c) => projects.some((p) => p.category === c.slug))

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso))
