import { useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react"

import { ActionButton } from "@/components/shared/action-button"
import { brick, BRICK_PATTERN } from "@/components/shared/brick"
import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal"
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
      <PageHeader image="office-interior" eyebrow="Contact" title={["Let's start a", "conversation."]} description="Call, message or write to us — or use the form to send an enquiry or request a site visit." />

      <div className="container-site pb-16 md:pb-20">
        {/* Ways to reach us — one brick each */}
        <section aria-labelledby="reach-title">
          <h2 id="reach-title" className="sr-only">
            Ways to reach us
          </h2>
          <RevealGroup as="ul" className={cn("grid sm:grid-cols-2 xl:grid-cols-4", brick.panel, brick.gap)}>
            <ContactBrick icon={Phone} label="Phone" href={site.contact.phoneHref} value={site.contact.phoneDisplay} />
            <ContactBrick icon={MessageCircle} label="WhatsApp" href={whatsappHref()} value="Message us" external />
            <ContactBrick icon={Mail} label="Email" href={`mailto:${site.contact.email}`} value={site.contact.email} />
            <ContactBrick icon={Clock} label="Office hours" value={site.contact.hours} />
          </RevealGroup>
        </section>

        {/* Form beside the office details, set in the same mortar panel */}
        <div className={cn("mt-4 grid items-stretch sm:mt-5 lg:grid-cols-12", brick.panel, brick.gap)}>
          <Reveal className="lg:col-span-7">
            <section aria-labelledby="form-title" className={cn(brick.surface, "h-full p-6 sm:p-8 lg:p-9")}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 id="form-title" className="text-title text-ink">
                  Send us a message
                </h2>
                <LayoutGroup id="contact-tabs">
                  <div role="tablist" aria-label="Enquiry type" className="inline-flex self-start rounded-media bg-sand p-1">
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
                          className={cn(
                            "focus-ring relative flex h-11 items-center rounded-btn px-4 text-[0.74rem] font-semibold tracking-[0.12em] uppercase transition-colors sm:px-5",
                            selected ? "text-white" : "text-ink/70 hover:text-ink",
                          )}
                        >
                          {selected && <motion.span layoutId="contact-tab" className="absolute inset-0 rounded-btn bg-ink" transition={{ duration: 0.45, ease: EASE }} />}
                          <span className="relative">{t.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </LayoutGroup>
              </div>

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
                  <p className="mt-4 text-stone">{active.intro}</p>
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
            </section>
          </Reveal>

          <Reveal delay={0.1} className={cn("flex flex-col lg:col-span-5", brick.gap)}>
            <OfficeBrick />
            <MapBrick />
          </Reveal>
        </div>
      </div>
    </>
  )
}

function ContactBrick({
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
      <span className={cn(brick.icon, brick.iconHover)}>
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="text-eyebrow block text-stone">{label}</span>
        <span className="mt-1.5 block font-semibold text-ink [overflow-wrap:anywhere]">
          <ValueText value={value} />
        </span>
      </span>
    </>
  )
  // Every contact brick gets the same lift, link or not, so the row feels like one set.
  const base = cn(brick.surface, brick.lift, "flex h-full items-center gap-4 p-5")
  return (
    <RevealItem as="li">
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={cn(base, "focus-ring")}
        >
          {content}
        </a>
      ) : (
        <div className={base}>{content}</div>
      )}
    </RevealItem>
  )
}

/**
 * Values like "Mon – Sat · 9:00 – 18:00" only wrap at the " · ", so a day range
 * or a time range is never split across two lines.
 */
function ValueText({ value }: { value: string }) {
  const parts = value.split(" · ")
  if (parts.length === 1) return <>{value}</>
  return (
    <>
      {parts.map((part, i) => (
        <span key={part}>
          {i > 0 && " · "}
          <span className="whitespace-nowrap">{part}</span>
        </span>
      ))}
    </>
  )
}

/** Dark brick with the office address, matching the dark half-brick on the wall. */
function OfficeBrick() {
  return (
    <div
      className="rounded-brick bg-night p-6 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_2px_0_rgb(20_20_20/0.12)] sm:p-8"
      style={{ backgroundImage: BRICK_PATTERN }}
    >
      <p className="text-eyebrow text-white/65">Our office</p>
      <address className="mt-4 text-lg leading-snug font-semibold not-italic">
        {site.contact.addressLines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <p className="mt-3 text-sm leading-relaxed text-white/70">Building across Chennai and its surrounding areas.</p>
      <ActionButton href={mapLinkHref} external variant="outline-light" size="md" className="mt-6">
        Get directions
      </ActionButton>
    </div>
  )
}

/**
 * Click-to-load map: avoids loading Google's scripts and cookies until the
 * visitor asks for the map (faster page, better privacy).
 */
function MapBrick() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={cn(brick.surface, "relative min-h-72 flex-1 overflow-hidden")}>
      {loaded ? (
        <iframe
          title={`Map showing ${site.legalName} office`}
          src={mapEmbedSrc}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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
            <ActionButton size="md" icon={MapPin} onClick={() => setLoaded(true)}>
              Load interactive map
            </ActionButton>
            <p className="text-meta max-w-60 text-stone">Tap to show the map. This loads Google Maps, which may set cookies.</p>
          </div>
        </>
      )}
    </div>
  )
}
