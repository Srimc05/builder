import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"

import { ResponsiveImage } from "@/components/shared/responsive-image"
import { ImageReveal } from "@/components/shared/reveal"
import type { Photo } from "@/content/types"
import { imageSrc } from "@/lib/images"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Editorial image grid that opens a full-screen, keyboard-navigable viewer. */
export function ProjectGalleryGrid({ photos, title }: { photos: Photo[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, step])

  const current = index !== null ? photos[index] : undefined

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:gap-4">
        {photos.map((photo, i) => (
          <li key={`${photo.name}-${i}`} className={cn(i % 3 === 0 && "col-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="focus-ring group relative block w-full overflow-hidden rounded-media"
              aria-label={`Open image ${i + 1} of ${photos.length}: ${photo.alt}`}
            >
              <ImageReveal className={cn(i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]")} delay={(i % 3) * 0.08}>
                <ResponsiveImage
                  name={photo.name}
                  alt={photo.alt}
                  sizes={i % 3 === 0 ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 28vw, 50vw"}
                  className="size-full"
                  imgClassName="transition-transform duration-[1.2s] ease-architect group-hover:scale-[1.04]"
                />
              </ImageReveal>
              <span aria-hidden className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <AnimatePresence>
          {open && current && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div className="fixed inset-0 z-50 bg-night/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-0 z-50 flex flex-col text-white outline-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between px-4 py-4 sm:px-8">
                    <DialogPrimitive.Title className="text-sm font-semibold">
                      {title}
                      <span className="ml-3 font-medium text-white/50 tabular-nums">
                        {(index ?? 0) + 1} / {photos.length}
                      </span>
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Close className="focus-ring grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close gallery">
                      <X className="size-5" />
                    </DialogPrimitive.Close>
                  </div>
                  <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={current.name + index}
                        src={imageSrc(current.name, 1920)}
                        alt={current.alt}
                        className="max-h-full max-w-full rounded-xl object-contain"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    </AnimatePresence>
                    {photos.length > 1 && (
                      <>
                        <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="focus-ring absolute left-2 grid size-12 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 sm:left-6">
                          <ArrowLeft className="size-5" />
                        </button>
                        <button type="button" onClick={() => step(1)} aria-label="Next image" className="focus-ring absolute right-2 grid size-12 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 sm:right-6">
                          <ArrowRight className="size-5" />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="px-4 py-5 text-center text-sm text-white/60 sm:px-8">{current.alt}</p>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </>
  )
}
