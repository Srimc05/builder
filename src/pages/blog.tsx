import { useId, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Search } from "lucide-react"

import { FilterChips } from "@/components/shared/filter-chips"
import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Reveal } from "@/components/shared/reveal"
import { ArticleCard } from "@/features/blog/article-card"
import { posts } from "@/lib/content"
import { EASE } from "@/lib/motion"

export function BlogPage() {
  const searchId = useId()
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const archive = useMemo(() => posts.filter((p) => p !== featured), [featured])
  const categories = useMemo(() => ["All", ...new Set(archive.map((p) => p.category))], [archive])

  const needle = query.trim().toLowerCase()
  const list = archive.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!needle || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(needle)),
  )

  return (
    <>
      <PageMeta title="Blog" description="Insights on construction planning, architectural design, materials and cost." />
      <PageHeader
        compact
        eyebrow="Blog & insights"
        title={["Notes on planning,", "design and building."]}
        description="Practical guidance for anyone planning a build — from first budgets to final finishes."
      />

      <div className="container-site pb-16 md:pb-20">
        {!featured ? (
          <p className="text-lead rounded-panel bg-sand px-6 py-16 text-center text-stone">Articles are on their way — check back soon.</p>
        ) : (
          <>
            <section aria-labelledby="cover-title">
              <h2 id="cover-title" className="sr-only">
                Cover story
              </h2>
              <Reveal>
                <ArticleCard post={featured} variant="cover" />
              </Reveal>
            </section>

            {archive.length > 0 && (
              <section aria-labelledby="archive-title" className="mt-14 md:mt-16">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <h2 id="archive-title" className="text-title text-ink">
                    From the archive
                  </h2>
                  <div className="relative w-full md:w-80">
                    <label htmlFor={searchId} className="sr-only">
                      Search articles
                    </label>
                    <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-stone" />
                    <input
                      id={searchId}
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by title or topic…"
                      className="h-11 w-full rounded-btn border border-line bg-white pr-4 pl-10 text-base text-ink transition-colors placeholder:text-stone hover:border-ink/20 focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/15 focus-visible:outline-none md:text-[0.95rem]"
                    />
                  </div>
                </div>

                {categories.length > 2 && (
                  <FilterChips
                    className="mt-5"
                    label="Filter articles by category"
                    options={categories.map((c) => ({
                      value: c,
                      label: c,
                      count: c === "All" ? archive.length : archive.filter((p) => p.category === c).length,
                    }))}
                    value={category}
                    onChange={setCategory}
                  />
                )}

                <p className="sr-only" aria-live="polite">
                  {list.length === 1 ? "1 article shown" : `${list.length} articles shown`}
                </p>
                <motion.ul layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {list.map((post) => (
                      <motion.li
                        key={post.slug}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <ArticleCard post={post} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
                {list.length === 0 && (
                  <p className="mt-6 rounded-media bg-sand px-6 py-10 text-center text-stone">
                    No articles match {needle ? <>&ldquo;{query.trim()}&rdquo;</> : "this category"}.{" "}
                    <button
                      type="button"
                      className="focus-ring rounded-btn font-semibold text-brand underline underline-offset-4"
                      onClick={() => {
                        setQuery("")
                        setCategory("All")
                      }}
                    >
                      Show all articles
                    </button>
                  </p>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </>
  )
}
