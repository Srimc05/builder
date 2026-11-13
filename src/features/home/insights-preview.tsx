import { ArrowLink } from "@/components/shared/arrow-link"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { ArticleCard } from "@/features/blog/article-card"
import { posts } from "@/lib/content"

export function InsightsPreview({ index = "06" }: { index?: string }) {
  if (posts.length === 0) return null
  const featured = posts.find((p) => p.featured) ?? posts[0]!
  const others = posts.filter((p) => p.slug !== featured.slug).slice(0, 3)

  return (
    <section aria-labelledby="insights-title" className="section-y bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="insights-title"
          index={index}
          eyebrow="Insights"
          title={["Notes on planning,", "design and building."]}
          action={<ArrowLink to="/blog">All articles</ArrowLink>}
        />
        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ArticleCard post={featured} variant="featured" sizes="(min-width: 1024px) 55vw, 100vw" />
          </Reveal>
          <RevealGroup as="ul" className="flex flex-col divide-y divide-line lg:col-span-5">
            {others.map((post) => (
              <RevealItem as="li" key={post.slug} className="py-6 first:pt-0">
                <ArticleCard post={post} variant="compact" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
