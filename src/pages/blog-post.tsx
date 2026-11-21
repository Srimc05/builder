import { motion, useScroll, useSpring } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"

import { PageMeta } from "@/components/shared/page-meta"
import { ImageReveal, MaskedLines, Reveal } from "@/components/shared/reveal"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { BlogBlock } from "@/content/types"
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
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
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

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-12 mb-4 text-[1.6rem] leading-tight font-semibold tracking-[-0.025em] text-ink first:mt-0">{block.text}</h2>
    case "list":
      return (
        <ul className="my-6 grid gap-3">
          {block.items?.map((item) => (
            <li key={item} className="flex gap-3 text-[1.08rem] leading-relaxed text-ink-soft">
              <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-bronze pl-6 text-[1.5rem] leading-snug font-medium tracking-[-0.02em] text-ink">
          {block.text}
        </blockquote>
      )
    default:
      return <p className="mb-6 text-[1.08rem] leading-[1.8] text-ink-soft">{block.text}</p>
  }
}
