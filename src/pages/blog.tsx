import { useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Reveal } from "@/components/shared/reveal"
import { ArticleCard } from "@/features/blog/article-card"
import { posts } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

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

      <div className="container-site pb-20 md:pb-28">
        {!featured ? (
          <p className="text-lead rounded-panel bg-sand px-6 py-16 text-center text-stone">Articles are on their way — check back soon.</p>
        ) : (
          <>
            <Reveal>
              <article className="border-y border-line py-10 md:py-14">
                <p className="text-eyebrow mb-6 text-stone">Featured article</p>
                <ArticleCard post={featured} variant="featured" sizes="(min-width:1024px) 80vw, 100vw" />
              </article>
            </Reveal>

            {categories.length > 2 && (
              <div role="group" aria-label="Filter articles by category" className="-mx-5 mt-14 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                <LayoutGroup id="blog-filter">
                  <ul className="flex w-max gap-2">
                    {categories.map((c) => {
                      const selected = c === category
                      return (
                        <li key={c}>
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setCategory(c)}
                            className={cn(
                              "focus-ring relative rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                              selected ? "text-white" : "text-ink/70 ring-1 ring-ink/12 hover:text-ink hover:ring-ink/30",
                            )}
                          >
                            {selected && <motion.span layoutId="blog-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.45, ease: EASE }} />}
                            <span className="relative">{c}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </LayoutGroup>
              </div>
            )}

            <motion.ul layout className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
