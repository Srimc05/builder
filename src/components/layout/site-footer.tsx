import type { ReactNode } from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { MaskedLines, Reveal } from "@/components/shared/reveal"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { services } from "@/content/services"
import { navigation, site } from "@/content/site"
import { useConsultation } from "@/features/enquiry/consultation-context"

import { Logo } from "./logo"

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  const { openConsultation } = useConsultation()

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="container-site pt-16 md:pt-20">
        {/* Closing call to action */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="text-eyebrow text-bronze">Start a conversation</p>
            </Reveal>
            <h2 className="text-headline mt-4 max-w-3xl">
              <MaskedLines lines={["Have a project", "in mind?"]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton variant="light" className="w-full sm:w-auto" onClick={openConsultation}>
              Tell us about your project
            </ActionButton>
            <WhatsAppButton className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{site.description}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs font-semibold text-white/80 transition-colors hover:border-white hover:bg-white hover:text-ink sm:h-9"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Explore" className="lg:col-span-2">
            {navigation.map((item) => (
              <li key={item.to}>
                <FooterLink to={item.to}>{item.label}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services" className="lg:col-span-3">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <FooterLink to={`/services#${s.slug}`}>{s.title}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="lg:col-span-3">
            <li>
              <a href={site.contact.phoneHref} className="focus-ring inline-flex min-h-11 items-center rounded-sm text-white/80 transition-colors hover:text-white lg:min-h-9">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="focus-ring inline-flex min-h-11 items-center rounded-sm text-white/80 transition-colors hover:text-white lg:min-h-9">
                {site.contact.email}
              </a>
            </li>
            <li className="mt-2 text-white/60">
              <address className="not-italic leading-relaxed">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="mt-3 text-white/60">{site.contact.hours}</li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="focus-ring inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white">
              Privacy policy
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-white"
            >
              Back to top
              <ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — an architectural signature at the base of every page */}
      <div aria-hidden className="pointer-events-none container-site select-none">
        <p
          data-wordmark={site.name}
          className="-mb-[0.18em] overflow-hidden text-[clamp(1.25rem,7.6vw,7rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-white/[0.04] before:content-[attr(data-wordmark)]"
        />
      </div>
    </footer>
  )
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h3 className="text-eyebrow text-white/55">{title}</h3>
      <ul className="mt-3 grid text-[0.95rem] lg:mt-4">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="focus-ring inline-flex min-h-11 items-center rounded-sm text-white/80 transition-colors hover:text-white lg:min-h-9">
      {children}
    </Link>
  )
}
