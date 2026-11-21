import type { BlogBlock } from "@/content/types"

/** Renders an article's content blocks (used by the article page and the Insights carousel). */
export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
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
