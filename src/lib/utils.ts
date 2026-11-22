import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge must know about the custom type-scale utilities defined in
 * index.css; otherwise `text-headline` and a colour like `text-ink` look like
 * the same group and one of them is silently dropped.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "headline", "title", "lead", "eyebrow", "meta"] }],
      shadow: [{ shadow: ["soft", "lift"] }],
      rounded: [{ rounded: ["media", "panel", "btn", "brick"] }],
      ease: [{ ease: ["architect"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
