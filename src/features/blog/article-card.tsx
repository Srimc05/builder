import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { brick } from "@/components/shared/brick"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { BlogPost } from "@/content/types"
import { formatDate } from "@/lib/content"
import { spotlight } from "@/lib/spotlight"
import { cn } from "@/lib/utils"

export function ArticleMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={cn("text-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-stone", className)}>
      <span className="font-semibold text-bronze-deep">{post.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  )
}

export function ArticleCard({
  post,
  variant = "standard",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 36vw",
}: {
  post: BlogPost
  variant?: "standard" | "compact" | "cover"
  sizes?: string
}) {
  if (variant === "compact") {
    return (
      <Link ref={spotlight} to={`/blog/${post.slug}`} className="focus-ring group grid grid-cols-[7rem_1fr] items-center gap-5 rounded-media sm:grid-cols-[9rem_1fr]">
        <div className="aspect-square overflow-hidden rounded-media">
          <ResponsiveImage name={post.cover.name} alt="" sizes="144px" className="size-full" imgClassName="transition-transform duration-700 ease-architect group-hover:scale-105 motion-safe:group-spot:scale-105" />
        </div>
        <div>
          <ArticleMeta post={post} />
          <h3 className="mt-2 text-lg leading-snug font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand group-spot:text-brand">{post.title}</h3>
        </div>
      </Link>
    )
  }

  if (variant === "cover") {
    return (
      <Link
        ref={spotlight}
        to={`/blog/${post.slug}`}
        className="focus-ring group relative isolate flex min-h-[26rem] overflow-hidden rounded-panel bg-night text-white md:min-h-[28rem] lg:min-h-[30rem]"
      >
        <ResponsiveImage
          name={post.cover.name}
          alt={post.cover.alt}
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="absolute inset-0 -z-10 size-full"
          imgClassName="transition-transform duration-[1.4s] ease-architect group-hover:scale-[1.03] motion-safe:group-spot:scale-[1.03]"
        />
        {/* Darkens the lower half so the text always reads, whatever the photo */}
        <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/5" />
        <div className="mt-auto max-w-3xl p-6 sm:p-8 lg:p-10">
          <span className="text-meta inline-flex rounded-btn bg-white/15 px-2.5 py-1 font-semibold tracking-[0.12em] uppercase backdrop-blur-md">
            Cover story
          </span>
          <p className="text-meta mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80">
            <span className="font-semibold text-white">{post.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
          <h3 className="text-headline mt-3 text-white">{post.title}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85 md:text-lg">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase">
            Read article
            <span className="grid size-7 place-items-center rounded-brick bg-brand transition-transform duration-500 ease-architect group-hover:rotate-45 motion-safe:group-spot:rotate-45">
              <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      ref={spotlight}
      to={`/blog/${post.slug}`}
      // The site-wide 3D lift (shared with every card), on a bordered white card.
      className={cn("focus-ring flex h-full flex-row overflow-hidden rounded-btn bg-white ring-1 ring-line sm:flex-col", brick.lift)}
    >
      {/* Phones: photo beside the text, so the list stays compact */}
      <div className="w-[36%] shrink-0 overflow-hidden sm:aspect-[16/10] sm:w-auto">
        <ResponsiveImage
          name={post.cover.name}
          alt={post.cover.alt}
          sizes={sizes}
          className="size-full"
          imgClassName={cn("transition-transform group-hover:scale-[1.04] motion-safe:group-spot:scale-[1.04]", brick.timing)}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <ArticleMeta post={post} />
        <h3 className="mt-2 text-base leading-snug sm:mt-2.5 sm:text-lg font-semibold tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-brand group-spot:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 hidden text-[0.95rem] leading-relaxed text-stone sm:block">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.74rem] sm:pt-5 font-semibold tracking-[0.12em] text-ink uppercase">
          Read article
          <ArrowUpRight aria-hidden className={cn("size-4 text-brand transition-transform group-hover:rotate-45 motion-safe:group-spot:rotate-45", brick.timing)} />
        </span>
      </div>
    </Link>
  )
}
