import type { ComponentType, MouseEventHandler, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

type Variant = "primary" | "light" | "outline" | "outline-light"
type Size = "md" | "lg"

const variants: Record<Variant, { base: string; fill: string; label: string; icon: string }> = {
  // Dark pill — the default call to action on light backgrounds.
  primary: { base: "bg-ink text-white", fill: "bg-brand", label: "", icon: "text-white" },
  // White pill — the call to action on photographs and dark sections.
  light: { base: "bg-white text-ink", fill: "bg-brand", label: "group-hover/action:text-white group-focus-visible/action:text-white", icon: "text-white" },
  // Secondary action on light backgrounds.
  outline: { base: "border border-ink/15 text-ink", fill: "bg-ink", label: "group-hover/action:text-white group-focus-visible/action:text-white", icon: "text-white" },
  // Secondary action on photographs and dark sections.
  "outline-light": { base: "border border-white/35 text-white", fill: "bg-white", label: "group-hover/action:text-ink group-focus-visible/action:text-ink", icon: "text-ink" },
}

const sizes: Record<Size, { root: string; disc: string; grow: string }> = {
  md: { root: "h-11 gap-3 pl-5 pr-1 text-[0.74rem]", disc: "size-9", grow: "w-9" },
  lg: { root: "h-12 gap-3.5 pl-6 pr-1 text-[0.78rem]", disc: "size-10", grow: "w-10" },
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Icon shown in the disc (defaults to an up-right arrow). */
  icon?: ComponentType<{ className?: string }>
  className?: string
}

type ActionButtonProps = CommonProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never }
    | { href: string; to?: never; onClick?: never; type?: never; external?: boolean }
    | { onClick?: MouseEventHandler<HTMLButtonElement>; type?: "button" | "submit"; to?: never; href?: never }
  )

/**
 * The site's signature button — rectangular, brick-like. A coloured block sits at the right edge; on
 * hover or keyboard focus it grows to fill the whole pill while the arrow
 * slides out and back in. Renders a router link, an anchor or a button.
 */
export function ActionButton(props: ActionButtonProps) {
  const { children, variant = "primary", size = "lg", icon: Icon = ArrowUpRight, className } = props
  const v = variants[variant]
  const s = sizes[size]

  const classes = cn(
    "group/action relative isolate inline-flex shrink-0 items-center justify-between overflow-hidden rounded-btn font-semibold tracking-[0.12em] whitespace-nowrap uppercase select-none",
    "transition-transform duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
    v.base,
    s.root,
    className,
  )

  const content = (
    <>
      {/* The disc that expands into a full fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 right-1 -z-10 rounded-brick transition-[width] duration-500 ease-architect",
          "group-hover/action:w-[calc(100%-0.5rem)] group-focus-visible/action:w-[calc(100%-0.5rem)]",
          v.fill,
          s.grow,
        )}
      />
      <span className={cn("transition-colors duration-500", v.label)}>{children}</span>
      <span aria-hidden className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-brick", s.disc, v.icon)}>
        <Icon className="size-4 transition-transform duration-500 ease-architect group-hover/action:translate-x-[180%] group-hover/action:-translate-y-[180%]" />
        <Icon className="absolute size-4 -translate-x-[180%] translate-y-[180%] transition-transform duration-500 ease-architect group-hover/action:translate-x-0 group-hover/action:translate-y-0" />
      </span>
    </>
  )

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }
  if ("href" in props && props.href) {
    const external = "external" in props && props.external
    return (
      <a href={props.href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {content}
      </a>
    )
  }
  const { onClick, type = "button" } = props as { onClick?: MouseEventHandler<HTMLButtonElement>; type?: "button" | "submit" }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
