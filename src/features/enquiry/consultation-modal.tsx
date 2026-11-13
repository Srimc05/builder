import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { X } from "lucide-react"

import { LogoMark } from "@/components/layout/logo"
import { ResponsiveImage } from "@/components/shared/responsive-image"
import { Button } from "@/components/ui/button"
import { site } from "@/content/site"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE } from "@/lib/motion"

import { useConsultation } from "./consultation-context"
import { EnquiryForm } from "./enquiry-form"
import { EnquirySuccess } from "./enquiry-success"
import { useConsultationTrigger } from "./use-consultation-trigger"

export function ConsultationModal() {
  const { open, setOpen } = useConsultation()
  useConsultationTrigger()
  const desktop = useMediaQuery("(min-width: 768px)")
  const reduce = useReducedMotion()

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : desktop
      ? {
          initial: { opacity: 0, y: 32, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
          exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.3, ease: EASE } },
        }
      : {
          initial: { y: "100%" },
          animate: { y: 0, transition: { duration: 0.6, ease: EASE } },
          exit: { y: "100%", transition: { duration: 0.35, ease: EASE } },
        }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-night/55 backdrop-blur-[3px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount aria-describedby="consultation-description">
              <motion.div
                {...panel}
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[94dvh] flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-lift outline-none md:inset-auto md:top-1/2 md:left-1/2 md:h-[min(780px,calc(100dvh-2.5rem))] md:max-h-none md:w-[min(1080px,calc(100vw-3rem))] md:-translate-x-1/2 md:-translate-y-1/2 md:flex-row md:rounded-panel"
              >
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="absolute top-3 right-3 z-20 rounded-full bg-white/90 text-ink backdrop-blur hover:bg-white md:top-5 md:right-5 md:bg-sand md:hover:bg-sand-deep"
                  >
                    <X className="size-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogPrimitive.Close>

                {/* Mobile drag-handle affordance */}
                <span aria-hidden className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-ink/15 md:hidden" />

                <aside className="relative hidden shrink-0 md:block md:w-[44%]">
                  <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.12 }}
                    animate={{ scale: 1, transition: { duration: 1.6, ease: EASE } }}
                  >
                    <ResponsiveImage
                      name="facade-timber-night"
                      alt="Timber-screened facade of a contemporary home at dusk"
                      sizes="480px"
                      className="size-full"
                      priority
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-linear-to-t from-night/85 via-night/10 to-night/20" />
                  <div className="absolute inset-x-0 top-0 flex items-center gap-2.5 p-7 text-white">
                    <LogoMark className="size-7 text-white" />
                    <span className="text-sm font-bold tracking-[-0.02em]">{site.name}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-eyebrow text-bronze">One accountable team</p>
                    <p className="mt-3 max-w-xs text-xl leading-snug font-semibold tracking-[-0.02em]">
                      From the first conversation to the final handover.
                    </p>
                    <ul className="mt-6 grid gap-2.5 text-sm text-white/80">
                      {["Design & build under one roof", "Transparent, itemised estimates", "A dedicated project manager"].map(
                        (item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </aside>

                <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-8 sm:px-8 md:px-10 md:py-10 lg:px-12">
                  <div className="md:pr-10">
                    <p className="text-eyebrow text-brand">Book a consultation</p>
                    <DialogPrimitive.Title className="text-title mt-4 max-w-md text-ink md:text-[2.1rem]">
                      Let&rsquo;s Build Something Great Together
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description id="consultation-description" className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-stone">
                      Share a few details about your project and our team will reach out to arrange a consultation.
                    </DialogPrimitive.Description>
                  </div>
                  <EnquiryForm
                    kind="consultation"
                    density="compact"
                    submitLabel="Request consultation"
                    className="mt-8"
                    renderSuccess={(firstName) => (
                      <EnquirySuccess
                        firstName={firstName}
                        message="Your enquiry is with our team. We'll contact you shortly to arrange a consultation."
                        action={
                          <DialogPrimitive.Close asChild>
                            <Button variant="outline-ink" size="pill">
                              Continue browsing
                            </Button>
                          </DialogPrimitive.Close>
                        }
                      />
                    )}
                  />
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
