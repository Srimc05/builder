import { site } from "@/content/site"

/** Per-page <title> and description (React 19 hoists these into <head>). */
export function PageMeta({ title, description }: { title?: string; description?: string }) {
  const fullTitle = title ? `${title} — ${site.legalName}` : `${site.legalName} — ${site.tagline}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description ?? site.description} />
    </>
  )
}
