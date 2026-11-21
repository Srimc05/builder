import { useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Reveal } from "@/components/shared/reveal"
import { ActionButton } from "@/components/shared/action-button"
import { mapEmbedSrc, mapLinkHref, site, whatsappHref } from "@/content/site"
import { EnquiryForm } from "@/features/enquiry/enquiry-form"
import { EnquirySuccess } from "@/features/enquiry/enquiry-success"
import type { EnquiryKind } from "@/lib/enquiry"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

const tabs: { kind: EnquiryKind; label: string; intro: string }[] = [
  { kind: "contact", label: "Enquiry", intro: "Tell us about your project and we'll get back to you." },
  { kind: "site-visit", label: "Site visit", intro: "Choose a date and our engineer will visit your site to assess it." },
]

export function ContactPage() {
  const [kind, setKind] = useState<EnquiryKind>("contact")
  const active = tabs.find((t) => t.kind === kind) ?? tabs[0]!

  return (
    <>
      <PageMeta title="Contact" description="Talk to our team about your construction project, or request a site visit." />
      <PageHeader eyebrow="Contact" title={["Let's start a", "conversation."]} description="Call, message or write to us — or use the form to send an enquiry or request a site visit." />

      <div className="container-site grid gap-12 pb-16 md:pb-20 lg:grid-cols-12 lg:gap-14">
        {/* Direct contact */}
        <aside className="lg:col-span-5" aria-label="Contact details">
          <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ContactRow icon={Phone} label="Phone" href={site.contact.phoneHref} value={site.contact.phoneDisplay} />
            <ContactRow icon={MessageCircle} label="WhatsApp" href={whatsappHref()} value="Message us on WhatsApp" external />
            <ContactRow icon={Mail} label="Email" href={`mailto:${site.contact.email}`} value={site.contact.email} />
            <ContactRow icon={Clock} label="Office hours" value={site.contact.hours} />
          </Reveal>
          <Reveal delay={0.1} className="mt-3">
            <MapCard />
          </Reveal>
        </aside>

        {/* Forms */}
        <section aria-labelledby="form-title" className="lg:col-span-7">
          <Reveal className="rounded-panel border border-line p-6 sm:p-8 lg:p-9">
            <h2 id="form-title" className="sr-only">
              Enquiry form
            </h2>
            <LayoutGroup id="contact-tabs">
              <div role="tablist" aria-label="Enquiry type" className="inline-flex rounded-full bg-sand p-1">
                {tabs.map((t) => {
                  const selected = t.kind === kind
                  return (
                    <button
                      key={t.kind}
                      role="tab"
                      type="button"
                      id={`tab-${t.kind}`}
                      aria-selected={selected}
                      aria-controls={`panel-${t.kind}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setKind(t.kind)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          const next = tabs[(tabs.indexOf(t) + 1) % tabs.length]!
                          setKind(next.kind)
                          document.getElementById(`tab-${next.kind}`)?.focus()
                        }
                      }}
                      className={cn("focus-ring relative flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors sm:px-5", selected ? "text-white" : "text-ink/70 hover:text-ink")}
                    >
                      {selected && <motion.span layoutId="contact-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.45, ease: EASE }} />}
                      <span className="relative">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={kind}
                role="tabpanel"
                id={`panel-${kind}`}
                aria-labelledby={`tab-${kind}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="mt-6 text-stone">{active.intro}</p>
                <EnquiryForm
                  kind={kind}
                  className="mt-6"
                  submitLabel={kind === "site-visit" ? "Book a Site Visit" : "Send enquiry"}
                  renderSuccess={(firstName, reset) => (
                    <EnquirySuccess
                      firstName={firstName}
                      message={
                        kind === "site-visit"
                          ? "We've received your site-visit request and will call to confirm a time."
                          : "Your enquiry is with our team. We'll be in touch shortly."
                      }
                      action={
                        <ActionButton variant="outline" size="md" onClick={reset}>
                          Send another enquiry
                        </ActionButton>
                      }
                    />
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </section>
      </div>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand ring-1 ring-line transition-colors group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
        <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="text-eyebrow block text-stone">{label}</span>
        <span className="mt-1.5 block truncate font-semibold text-ink">{value}</span>
      </span>
    </>
  )
  const base = "flex items-center gap-4 rounded-media bg-sand p-5"
  return href ? (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cn(base, "focus-ring group transition-colors hover:bg-sand-deep")}>
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  )
}

/**
 * Click-to-load map: avoids loading Google's scripts and cookies until the
 * visitor asks for the map (faster page, better privacy).
 */
function MapCard() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="overflow-hidden rounded-media border border-line">
      <div className="relative aspect-[4/3] bg-sand">
        {loaded ? (
          <iframe title={`Map showing ${site.legalName} office`} src={mapEmbedSrc} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <>
            <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
              <rect width="400" height="300" fill="#f3f1ec" />
              <g stroke="#e3e0d8" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M-20 80 C 80 60, 160 120, 420 90" />
                <path d="M60 -20 C 90 120, 140 200, 120 320" />
                <path d="M-20 230 C 120 210, 260 260, 420 220" />
                <path d="M280 -20 C 250 100, 300 200, 270 320" />
              </g>
              <g stroke="#ebe8e1" strokeWidth="4" fill="none">
                <path d="M-20 150 H420" />
                <path d="M200 -20 V320" />
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-[0_0_0_10px_rgb(100_37_232/0.12)]">
                <MapPin aria-hidden className="size-6" />
              </span>
              <ActionButton size="md" icon={MapPin} onClick={() => setLoaded(true)}>
                Load interactive map
              </ActionButton>
              <p className="text-meta max-w-60 text-stone">Tap to show the map. This loads Google Maps, which may set cookies.</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
        <address className="text-sm leading-relaxed text-ink not-italic">
          <span className="text-eyebrow mb-2 block text-stone">Office</span>
          {site.contact.addressLines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
        <a href={mapLinkHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 shrink-0 items-center rounded-sm text-sm font-semibold text-brand underline-offset-4 hover:underline sm:min-h-0">
          Get directions ↗
        </a>
      </div>
    </div>
  )
}
