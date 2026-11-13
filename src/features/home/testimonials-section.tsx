import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { testimonials } from "@/lib/content"

/** Renders nothing until verified testimonials exist. */
export function TestimonialsSection({ index = "05" }: { index?: string }) {
  if (testimonials.length === 0) return null
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-sand">
      <div className="container-site">
        <SectionHeading
          id="testimonials-title"
          index={index}
          eyebrow="Client stories"
          title={["Trusted by the people", "we build for."]}
        />
        <Reveal className="mt-14 md:mt-20">
          <AnimatedTestimonials testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  )
}
