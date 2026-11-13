import type { Project, ProjectCategory } from "./types"

export const projectCategories: ProjectCategory[] = [
  { slug: "residential", label: "Residential" },
  { slug: "commercial", label: "Commercial" },
  { slug: "industrial", label: "Industrial" },
  { slug: "interiors", label: "Interiors" },
]

/**
 * The company's real, confirmed projects. Add entries here (see the sample
 * file for the full shape). Placeholder projects live in ./sample/projects.ts.
 */
export const projects: Project[] = []
