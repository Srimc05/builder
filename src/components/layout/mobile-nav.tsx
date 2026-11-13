import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, MessageCircle, Phone, X } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { navigation, site, whatsappHref } from "@/content/site"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

export function MobileNav({ overDark, isActive }: { overDark: boolean; isActive: (to: string) => boolean }) {
  const [open, setOpen] = useState(false)
  const { openConsultation } = useConsultation()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "focus-ring group grid size-11 place-items-center rounded-full transition-colors xl:hidden",
            overDark ? "bg-white/12 text-white backdrop-blur hover:bg-white/20" : "bg-ink text-white hover:bg-black",
          )}
          aria-label="Open menu"
        >
          <span aria-hidden className="flex w-4.5 flex-col gap-[5px]">
            <span className="h-[1.5px] w-full rounded-full bg-current" />
            <span className="h-[1.5px] w-2/3 rounded-full bg-current transition-all duration-300 group-hover:w-full" />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-none bg-white p-0 sm:max-w-md data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="flex h-[4.5rem] items-center justify-between px-5 sm:px-8">
          <Logo />
          <SheetClose asChild>
            <button type="button" className="focus-ring grid size-11 place-items-center rounded-full bg-sand text-ink hover:bg-sand-deep" aria-label="Close menu">
              <X className="size-5" />
            </button>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-6 sm:px-8">
          <ul className="flex flex-col">
            {navigation.map((item, i) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.045, ease: EASE }}
                className="border-b border-line"
              >
                <Link
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="focus-ring group flex items-center justify-between py-4 text-[1.65rem] font-semibold tracking-[-0.03em] text-ink"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-meta w-6 font-medium text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn(isActive(item.to) && "text-brand")}>{item.label}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 text-stone transition-transform duration-300 group-hover:rotate-45 group-hover:text-brand" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="grid gap-4 border-t border-line bg-sand px-5 py-6 sm:px-8"
        >
          <Button
            variant="brand"
            size="pill-lg"
            className="w-full"
            onClick={() => {
              setOpen(false)
              // Let the sheet close (and release focus/scroll lock) before opening the modal.
              window.setTimeout(openConsultation, 250)
            }}
          >
            Get a Quote
          </Button>
          <div className="grid grid-cols-3 gap-2 text-sm font-semibold">
            <a href={site.contact.phoneHref} className="focus-ring flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-ink">
              <Phone aria-hidden className="size-4 text-brand" /> Call
            </a>
            <a href={whatsappHref()} target="_blank" rel="noreferrer" className="focus-ring flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-ink">
              <MessageCircle aria-hidden className="size-4 text-brand" /> WhatsApp
            </a>
            <a href={`mailto:${site.contact.email}`} className="focus-ring flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-ink">
              <Mail aria-hidden className="size-4 text-brand" /> Email
            </a>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
