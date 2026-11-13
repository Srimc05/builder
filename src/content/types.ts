import type images from "@/generated/images.json"

/** Name of a photo processed by `npm run images` (see assets/photos). */
export type ImageName = keyof typeof images

export interface Photo {
  name: ImageName
  alt: string
}

/**
 * Marks placeholder items. Sample content lives in src/content/sample and is
 * only bundled when VITE_INCLUDE_SAMPLE_CONTENT is "true" (see src/lib/content.ts).
 */
export interface Verifiable {
  sample?: boolean
}

export interface Service {
  slug: string
  title: string
  summary: string
  description: string
  deliverables: string[]
  image: Photo
}

export type ProjectStatus = "Completed" | "Under construction" | "In design"

export interface ProjectCategory {
  slug: string
  label: string
}

export interface Project extends Verifiable {
  slug: string
  name: string
  location: string
  category: ProjectCategory["slug"]
  year: number
  builtUpArea: string
  status: ProjectStatus
  cover: Photo
  gallery: Photo[]
  excerpt: string
  overview: string[]
  specifications: { label: string; value: string }[]
  scope: string[]
  constructionDetails: string[]
  challenges: { challenge: string; solution: string }[]
  completion: string
}

export interface Testimonial extends Verifiable {
  id: string
  clientName: string
  projectName: string
  location: string
  feedback: string
  image: Photo
}

export interface BlogBlock {
  type: "paragraph" | "heading" | "list" | "quote"
  text?: string
  items?: string[]
}

export interface BlogPost extends Verifiable {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingMinutes: number
  cover: Photo
  featured?: boolean
  body: BlogBlock[]
}

export interface ProcessStage {
  id: string
  title: string
  summary: string
  detail: string
}
