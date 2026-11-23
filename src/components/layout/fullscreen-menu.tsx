/**
 * Full-screen menu — the cinematic alternative to `MobileNav` (kept intact).
 * Switched by `HERO_VARIANT` in `src/lib/experiments.ts`.
 *
 * A night-dark curtain drops over the page; page names rise out of masks one
 * after another; on wider screens a photograph of each page previews beside
 * the list as you hover or focus it. Built on Radix Dialog, so focus is
 * trapped, Escape closes it, scrolling is locked and focus returns to the
 * menu button afterwards.
 */
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Mail, MessageCircle, Phone, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { Link, useLocation } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { navigation, site, whatsappHref } from "@/content/site"
import type { ImageName } from "@/content/types"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

/** The photograph each page opens with, so the preview matches where you're going. */
const previews: Record<(typeof navigation)[number]["to"], { name: ImageName; caption: string }> = {
  "/": { name: "hero-residence-dusk", caption: "Building trust. Creating homes." },
  "/about": { name: "site-team-slab", caption: "Since 2001, led by Mr Shankar" },
  "/services": { name: "tower-cranes", caption: "Residential, commercial, industrial" },
  "/projects": { name: "facade-timber-night", caption: "Selected work across Chennai" },
  "/process": { name: "roof-framing", caption: "From first plan to final key" },
  "/blog": { name: "architect-drawing", caption: "Notes from the site" },
  "/contact": { name: "office-interior", caption: "Talk to us about your build" },
}

export function FullscreenMenu({ overDark, isActive }: { overDark: boolean; isActive: (to: string) => boolean }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion() ?? false
  const { openConsultation } = useConsultation()
  const { pathname } = useLocation()
  const current = navigation.find((n) => isActive(n.to))?.to ?? "/"
  const [preview, setPreview] = useState<string>(current)

  // Close on navigation (covers links, back/forward and programmatic moves).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }
  // Each time it opens, the preview starts on the page you're on.
  const onOpenChange = (next: boolean) => {
    if (next) setPreview(current)
    setOpen(next)
  }

  const curtain = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { clipPath: "inset(0% 0% 100% 0%)" },
        animate: { clipPath: "inset(0% 0% 0% 0%)" },
        exit: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.6, ease: EASE, delay: 0.1 } },
        transition: { duration: 0.8, ease: EASE },
      }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            "focus-ring group grid size-11 place-items-center rounded-btn transition-colors min-[72rem]:hidden",
            overDark ? "bg-white/12 text-white backdrop-blur hover:bg-white/20" : "bg-ink text-white hover:bg-black",
          )}
          aria-label="Open menu"
        >
          <span aria-hidden className="flex w-4.5 flex-col gap-[5px]">
            <span className="h-[1.5px] w-full rounded-full bg-current" />
            <span className="h-[1.5px] w-2/3 rounded-full bg-current transition-all duration-300 group-hover:w-full" />
          </span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount asChild>
              <motion.div {...curtain} className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-night text-white outline-none">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Site navigation and contact options</Dialog.Description>
                {/* Faint blueprint grid */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
                    backgroundSize: "100% 44px, 120px 88px",
                  }}
                />

                {/* Top bar — mirrors the header so the logo and button don't jump */}
                <div className="container-site relative flex h-[4.5rem] shrink-0 items-center justify-between">
                  <Logo tone="light" />
                  <Dialog.Close asChild>
                    <motion.button
                      type="button"
                      initial={reduce ? false : { rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                      className="focus-ring grid size-11 place-items-center rounded-btn bg-white/10 text-white transition-colors hover:bg-white/20"
                      aria-label="Close menu"
                    >
                      <X aria-hidden className="size-5" />
                    </motion.button>
                  </Dialog.Close>
                </div>

                <div className="container-site relative grid min-h-0 flex-1 gap-10 py-6 md:grid-cols-12 md:py-10">
                  <nav aria-label="Menu" className="min-h-0 self-center overflow-y-auto md:col-span-7">
                    <ul className="group/list">
                      {navigation.map((item, i) => {
                        const active = isActive(item.to)
                        return (
                          <li key={item.to} className="overflow-hidden">
                            <motion.div
                              initial={reduce ? false : { y: "110%" }}
                              animate={{ y: "0%" }}
                              exit={reduce ? undefined : { y: "-110%", transition: { duration: 0.35, ease: EASE } }}
                              transition={{ duration: 0.9, delay: 0.22 + i * 0.055, ease: EASE }}
                            >
                              <Link
                                to={item.to}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setPreview(item.to)}
                                onFocus={() => setPreview(item.to)}
                                className={cn(
                                  "focus-ring group flex items-baseline gap-4 rounded-btn py-1.5 transition-[opacity,translate] duration-500 ease-architect md:py-1",
                                  // Hovering the list dims the others and nudges the chosen one along.
                                  "group-hover/list:opacity-40 hover:translate-x-2 hover:opacity-100! focus-visible:opacity-100! motion-reduce:hover:translate-x-0",
                                )}
                              >
                                <span className="text-meta w-7 shrink-0 font-medium text-white/45 tabular-nums">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.04em]">
                                  {item.label}
                                </span>
                                {active && <span aria-hidden className="size-2 shrink-0 self-center rounded-full bg-bronze" />}
                                <ArrowUpRight
                                  aria-hidden
                                  className="ml-auto size-6 shrink-0 self-center text-white/0 transition-[color,rotate] duration-500 group-hover:rotate-45 group-hover:text-white/80 group-focus-visible:text-white/80"
                                />
                              </Link>
                            </motion.div>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>

                  {/* Page preview — tablets and up */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 1, delay: 0.35, ease: EASE }}
                    className="relative hidden md:col-span-5 md:block md:self-center"
                  >
                    <div className="relative aspect-[4/5] max-h-[62svh] w-full overflow-hidden rounded-media">
                      {navigation.map((item) => {
                        const shown = preview === item.to
                        return (
                          <motion.div
                            key={item.to}
                            aria-hidden
                            className="absolute inset-0"
                            initial={false}
                            animate={{ opacity: shown ? 1 : 0, scale: shown || reduce ? 1 : 1.08 }}
                            transition={{ opacity: { duration: 0.6, ease: EASE }, scale: { duration: 1.2, ease: EASE } }}
                          >
                            <ResponsiveImage name={previews[item.to].name} alt="" sizes="40vw" className="size-full bg-night" />
                          </motion.div>
                        )
                      })}
                      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night/75 via-transparent to-transparent" />
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={preview}
                          aria-hidden
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="absolute inset-x-5 bottom-5 text-sm font-medium text-white/90"
                        >
                          {previews[preview as keyof typeof previews]?.caption}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>

                {/* Contact row */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                  className="relative shrink-0 border-t border-white/10"
                >
                  <div className="container-site flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <ActionButton
                      variant="light"
                      size="md"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        setOpen(false)
                        // Let the menu close (and release focus/scroll lock) before the modal opens.
                        window.setTimeout(openConsultation, 450)
                      }}
                    >
                      Get a Free Quote
                    </ActionButton>
                    <ul className="grid grid-cols-3 gap-2 text-sm font-semibold sm:flex sm:gap-6">
                      <li>
                        <a href={site.contact.phoneHref} className="focus-ring flex items-center justify-center gap-2 rounded-btn bg-white/8 py-3 text-white/85 hover:text-white sm:bg-transparent sm:py-2">
                          <Phone aria-hidden className="size-4 text-bronze" /> Call
                        </a>
                      </li>
                      <li>
                        <a href={whatsappHref()} target="_blank" rel="noreferrer" className="focus-ring flex items-center justify-center gap-2 rounded-btn bg-white/8 py-3 text-white/85 hover:text-white sm:bg-transparent sm:py-2">
                          <MessageCircle aria-hidden className="size-4 text-bronze" /> WhatsApp
                        </a>
                      </li>
                      <li>
                        <a href={`mailto:${site.contact.email}`} className="focus-ring flex items-center justify-center gap-2 rounded-btn bg-white/8 py-3 text-white/85 hover:text-white sm:bg-transparent sm:py-2">
                          <Mail aria-hidden className="size-4 text-bronze" /> Email
                        </a>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
