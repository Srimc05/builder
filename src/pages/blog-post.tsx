import { motion, useScroll, useSpring } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"

import { PageMeta } from "@/components/shared/page-meta"
import { ImageReveal, MaskedLines, Reveal } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { ArticleBody } from "@/features/blog/article-body"
import { ArticleCard, ArticleMeta } from "@/features/blog/article-card"
import { getPost, posts } from "@/lib/content"
import { EASE } from "@/lib/motion"
import { NotFoundPage } from "@/pages/not-found"

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  if (!post) return <NotFoundPage />

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article>
      <PageMeta title={post.title} description={post.excerpt} />
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand" style={{ scaleX: progress }} />

      <header className="container-site pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Link to="/blog" className="focus-ring -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-stone hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> All articles
            </Link>
            <ArticleMeta post={post} className="mt-6" />
          </motion.div>
          <h1 className="text-headline mt-5 text-ink">
            <MaskedLines lines={[post.title]} delay={0.15} animateOnMount />
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }} className="text-lead mt-6 text-stone">
            {post.excerpt}
          </motion.p>
        </div>
        <ImageReveal className="mt-14 aspect-[16/9] rounded-panel md:mt-20">
          <ResponsiveImage name={post.cover.name} alt={post.cover.alt} sizes="100vw" priority className="size-full" />
        </ImageReveal>
      </header>

      <div className="container-site py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl">
          <ArticleBody blocks={post.body} />
        </Reveal>
      </div>

      {related.length > 0 && (
        <aside aria-labelledby="related-title" className="border-t border-line bg-sand">
          <div className="container-site py-16 md:py-24">
            <h2 id="related-title" className="text-title text-ink">
              Keep reading
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ArticleCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  )
}
