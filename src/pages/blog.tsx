import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { FilterChips } from "@/components/shared/filter-chips"
import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Reveal } from "@/components/shared/reveal"
import { ArticleCard } from "@/features/blog/article-card"
import { posts } from "@/lib/content"
import { EASE } from "@/lib/motion"

export function BlogPage() {
  const [category, setCategory] = useState("All")
  const categories = useMemo(() => ["All", ...new Set(posts.map((p) => p.category))], [])
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const list = posts.filter((p) => p !== featured && (category === "All" || p.category === category))

  return (
    <>
      <PageMeta title="Blog" description="Insights on construction planning, architectural design, materials and cost." />
      <PageHeader
        eyebrow="Blog & insights"
        title={["Notes on planning,", "design and building."]}
        description="Practical guidance for anyone planning a build — from first budgets to final finishes."
      />

      <div className="container-site pb-16 md:pb-20">
        {!featured ? (
          <p className="text-lead rounded-panel bg-sand px-6 py-16 text-center text-stone">Articles are on their way — check back soon.</p>
        ) : (
          <>
            <Reveal>
              <article className="border-y border-line py-8 md:py-10">
                <h2 className="text-eyebrow mb-6 text-stone">Featured article</h2>
                <ArticleCard post={featured} variant="horizontal" />
              </article>
            </Reveal>

            {categories.length > 2 && (
              <FilterChips
                className="mt-12"
                label="Filter articles by category"
                options={categories
                  .map((c) => ({
                    value: c,
                    label: c,
                    count: c === "All" ? posts.length - 1 : posts.filter((p) => p !== featured && p.category === c).length,
                  }))
                  .filter((o) => o.count > 0)}
                value={category}
                onChange={setCategory}
              />
            )}

            <h2 className="sr-only">More articles</h2>
            <motion.ul layout className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
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
            {list.length === 0 && <p className="mt-10 text-stone">No other articles in this category yet.</p>}
          </>
        )}
      </div>
    </>
  )
}
