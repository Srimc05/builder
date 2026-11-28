import { IconBrandInstagram } from "@tabler/icons-react"
import { ArrowUp } from "lucide-react"
import { Link } from "react-router"

import { ActionButton } from "@/components/shared/action-button"
import { MaskedLines, Reveal } from "@/components/shared/reveal"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { site } from "@/content/site"
import { useConsultation } from "@/features/enquiry/consultation-context"
import { scrollToY } from "@/lib/smooth-scroll"

import { FooterScene } from "./footer-scene"

const YEAR = new Date().getFullYear()
const instagram = site.social.find((s) => s.label === "Instagram")

export function SiteFooter() {
  const { openConsultation } = useConsultation()

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="container-site pt-16 md:pt-20">
        {/* Closing call to action */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-headline max-w-3xl">
              <MaskedLines lines={["Have a project", "in mind?"]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton variant="light" className="w-full sm:w-auto" onClick={openConsultation}>
              Tell us about your project
            </ActionButton>
            <div className="flex gap-3">
              <WhatsAppButton className="flex-1 sm:flex-none" />
              {instagram && (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.name} on Instagram`}
                  className="focus-ring group relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-btn border border-white/25 text-white transition-colors duration-300 hover:border-transparent"
                >
                  {/* Instagram's own gradient fills the button on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <IconBrandInstagram aria-hidden className="relative size-5" stroke={1.7} />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-12 max-w-md text-[0.95rem] leading-relaxed text-white/65 md:mt-14">
            <span className="text-bronze">Homes across Chennai and its surrounding areas</span> — built with care since{" "}
            {site.established}, and still building.
          </p>
        </Reveal>
      </div>

      {/* The neighbourhood: windows light up as the footer comes into view */}
      <FooterScene className="mt-4 block h-[clamp(210px,22vw,330px)] w-full" />

      {/* Bottom bar continues the street */}
      <div className="bg-[#090909]">
        <div className="container-site flex flex-col gap-1 py-4 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2">
            © {YEAR} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="focus-ring inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white">
              Privacy policy
            </Link>
            <button
              type="button"
              onClick={() => scrollToY(0)}
              className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-white"
            >
              Back to top
              <ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
