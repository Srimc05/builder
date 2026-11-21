import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import type { BlogPost } from "@/content/types"
import { formatDate } from "@/lib/content"
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
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  post: BlogPost
  variant?: "standard" | "featured" | "compact" | "horizontal"
  sizes?: string
}) {
  if (variant === "compact") {
    return (
      <Link to={`/blog/${post.slug}`} className="focus-ring group grid grid-cols-[7rem_1fr] items-center gap-5 rounded-media sm:grid-cols-[9rem_1fr]">
        <div className="aspect-square overflow-hidden rounded-2xl">
          <ResponsiveImage name={post.cover.name} alt="" sizes="144px" className="size-full" imgClassName="transition-transform duration-700 ease-architect group-hover:scale-105" />
        </div>
        <div>
          <ArticleMeta post={post} />
          <h3 className="mt-2 text-lg leading-snug font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">{post.title}</h3>
        </div>
      </Link>
    )
  }

  if (variant === "horizontal") {
    return (
      <Link to={`/blog/${post.slug}`} className="focus-ring group grid items-center gap-6 rounded-media md:grid-cols-12 md:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-media md:col-span-7">
          <ResponsiveImage
            name={post.cover.name}
            alt={post.cover.alt}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="size-full"
            imgClassName="transition-transform duration-[1.2s] ease-architect group-hover:scale-[1.04]"
          />
        </div>
        <div className="md:col-span-5">
          <ArticleMeta post={post} />
          <h3 className="text-title mt-3 text-ink transition-colors group-hover:text-brand">{post.title}</h3>
          <p className="mt-3 leading-relaxed text-stone">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            Read article <ArrowUpRight aria-hidden className="size-4" />
          </span>
        </div>
      </Link>
    )
  }

  const featured = variant === "featured"
  return (
    <Link to={`/blog/${post.slug}`} className="focus-ring group block rounded-media">
      <div className={cn("relative overflow-hidden rounded-media", "aspect-[3/2]")}>
        <ResponsiveImage
          name={post.cover.name}
          alt={post.cover.alt}
          sizes={sizes}
          className="size-full"
          imgClassName="transition-transform duration-[1.2s] ease-architect group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="size-4.5" />
        </span>
      </div>
      <ArticleMeta post={post} className="mt-5" />
      <h3 className={cn("mt-3 font-semibold tracking-[-0.025em] text-ink transition-colors group-hover:text-brand", featured ? "text-title" : "text-lg leading-snug")}>
        {post.title}
      </h3>
      <p className={cn("mt-3 leading-relaxed text-stone", featured ? "max-w-xl" : "text-[0.95rem]")}>{post.excerpt}</p>
    </Link>
  )
}
