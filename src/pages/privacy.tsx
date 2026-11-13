import { PageHeader } from "@/components/shared/page-header"
import { PageMeta } from "@/components/shared/page-meta"
import { site } from "@/content/site"

/**
 * Template privacy notice. It describes how this website actually handles
 * data, but it is NOT legal advice — have it reviewed for your jurisdiction
 * before launch.
 */
export function PrivacyPage() {
  return (
    <>
      <PageMeta title="Privacy Policy" />
      <PageHeader eyebrow="Legal" title={["Privacy policy."]} description="How we collect, use and protect the information you share with us." />
      <div className="container-site pb-20 md:pb-28">
        <div className="mx-auto max-w-2xl space-y-10 text-[1.02rem] leading-relaxed text-ink-soft [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink">
          <section>
            <h2>Information we collect</h2>
            <p>
              When you submit an enquiry, consultation or site-visit request, we collect the details you provide: your name, phone
              number, email address, project location, construction type, project description and, for site visits, your preferred
              date.
            </p>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>
              We use this information only to respond to your enquiry, arrange consultations or site visits, and provide the
              services you request. We do not sell your information.
            </p>
          </section>
          <section>
            <h2>Third-party services</h2>
            <p>
              The interactive map on our contact page is provided by Google Maps and is only loaded if you choose to load it.
              Links to WhatsApp and social media take you to those services, which have their own privacy policies.
            </p>
          </section>
          <section>
            <h2>Storage on your device</h2>
            <p>
              We store a small flag in your browser&rsquo;s session storage so the consultation prompt is shown at most once per
              visit. It is cleared when you close the browser tab.
            </p>
          </section>
          <section>
            <h2>Your rights &amp; contact</h2>
            <p>
              To access, correct or delete the information you have shared with us, contact {site.legalName} at{" "}
              <a className="font-semibold text-brand underline-offset-4 hover:underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
