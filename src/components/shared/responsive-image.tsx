import { useEffect, useRef, useState } from "react"

import type { ImageName } from "@/content/types"
import images from "@/generated/images.json"
import { IMAGE_WIDTHS, imageSrc } from "@/lib/images"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps {
  name: ImageName
  alt: string
  /** `sizes` attribute — describe the rendered width so the browser picks the right file. */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  className?: string
  imgClassName?: string
}

/**
 * Responsive WebP image with a blurred placeholder and a soft fade-in.
 * Fills its container (the parent controls aspect ratio / size).
 */
export function ResponsiveImage({
  name,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
}: ResponsiveImageProps) {
  const meta = images[name]
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <div className={cn("relative overflow-hidden bg-sand-deep", className)}>
      <img
        src={meta.blur}
        alt=""
        aria-hidden
        className={cn(
          "absolute inset-0 size-full scale-110 object-cover blur-xl transition-opacity duration-700",
          loaded && "opacity-0",
        )}
      />
      <img
        ref={ref}
        src={imageSrc(name)}
        srcSet={IMAGE_WIDTHS.map((w) => `${imageSrc(name, w)} ${Math.min(w, meta.width)}w`).join(", ")}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          "relative size-full object-cover transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  )
}
