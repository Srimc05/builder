import { ArrowLink } from "@/components/shared/arrow-link"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { SectionHeading } from "@/components/shared/section-heading"
import { Card, Carousel } from "@/components/ui/apple-cards-carousel"
import type { BlogPost } from "@/content/types"
import { ArticleBody } from "@/features/blog/article-body"
import { formatDate, posts } from "@/lib/content"
import { IMAGE_WIDTHS, imageSrc } from "@/lib/images"

/**
 * Insights as an Apple-style card carousel. Each card opens the full article
 * in an overlay.
 */
export function InsightsPreview({ index = "06" }: { index?: string }) {
  if (posts.length === 0) return null
  const featured = posts.find((p) => p.featured) ?? posts[0]!
  const ordered = [featured, ...posts.filter((p) => p.slug !== featured.slug)]

  const cards = ordered.map((post, i) => (
    <Card
      key={post.slug}
      index={i}
      card={{
        category: post.category,
        title: post.title,
        src: imageSrc(post.cover.name, 1280),
        srcSet: IMAGE_WIDTHS.map((w) => `${imageSrc(post.cover.name, w)} ${w}w`).join(", "),
        alt: post.cover.alt,
        content: <InsightContent post={post} />,
      }}
    />
  ))

  return (
    <section aria-labelledby="insights-title" className="overflow-hidden bg-sand pt-16 pb-12 md:pt-22 md:pb-16 lg:pt-26">
      <div className="container-site">
        <SectionHeading
          id="insights-title"
          index={index}
          eyebrow="Insights"
          title={["Know before", "you build."]}
          description="Practical guidance for planning a home or building — from first budgets and materials to what to expect on site."
          action={<ArrowLink to="/blog">All articles</ArrowLink>}
        />
      </div>
      <Carousel items={cards} autoplay />
    </section>
  )
}

/** What opens when a card is tapped: the full article. */
function InsightContent({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-meta text-stone">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden> · </span>
        {post.readingMinutes} min read
      </p>
      <p className="text-lead mt-4 text-ink">{post.excerpt}</p>
      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
        <ResponsiveImage name={post.cover.name} alt={post.cover.alt} sizes="(min-width: 1024px) 768px, 100vw" className="size-full" />
      </div>
      <div className="mt-10">
        <ArticleBody blocks={post.body} />
      </div>
    </article>
  )
}
