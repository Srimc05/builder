import { useId, useState, type ChangeEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, CircleAlert } from "lucide-react"
import { Link } from "react-router"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatefulButton } from "@/components/ui/stateful-button"
import { Textarea } from "@/components/ui/textarea"
import { constructionTypes, site } from "@/content/site"
import { todayISO, type EnquiryField, type EnquiryKind } from "@/lib/enquiry"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { useReportFormActivity } from "./consultation-context"
import { useEnquiryForm } from "./use-enquiry-form"

interface EnquiryFormProps {
  kind: EnquiryKind
  submitLabel?: string
  /** Rendered in place of the form after a successful submission. */
  renderSuccess?: (firstName: string, reset: () => void) => ReactNode
  className?: string
  /** Visual density — the modal uses a compact two-column grid. */
  density?: "compact" | "comfortable"
}

export const fieldClass =
  "h-12 rounded-btn border-transparent bg-sand px-4 text-base text-ink shadow-none transition-colors placeholder:text-stone hover:bg-sand-deep focus-visible:border-brand focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-brand/15 aria-invalid:border-destructive aria-invalid:bg-white md:text-[0.95rem]"

export function EnquiryForm({
  kind,
  submitLabel = "Send enquiry",
  renderSuccess,
  className,
  density = "comfortable",
}: EnquiryFormProps) {
  const formId = useId().replace(/:/g, "")
  const form = useEnquiryForm(kind, formId)
  const [focused, setFocused] = useState(false)
  useReportFormActivity(formId, focused || form.isDirty)

  const showSuccess = form.status === "success"
  const firstName = form.values.fullName.trim().split(/\s+/)[0] ?? ""

  const field = (name: EnquiryField) => ({
    id: form.fieldId(name),
    name,
    value: form.values[name],
    "aria-invalid": Boolean(form.errors[name]) || undefined,
    "aria-describedby": form.errors[name] ? `${form.fieldId(name)}-error` : undefined,
    onBlur: () => form.validateField(name),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      form.setField(name, e.target.value),
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showSuccess && renderSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.9, ease: EASE } }}
          exit={{ opacity: 0 }}
          role="status"
          className={className}
        >
          {renderSuccess(firstName, form.reset)}
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={form.submit}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
          }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.3, delay: 0.9 } }}
          className={cn("grid gap-x-4", density === "compact" ? "gap-y-4 sm:grid-cols-2" : "gap-y-5 md:grid-cols-2", className)}
        >
          <Field label="Full name" htmlFor={form.fieldId("fullName")} error={form.errors.fullName} errorId={`${form.fieldId("fullName")}-error`}>
            <Input {...field("fullName")} autoComplete="name" placeholder="Your name" className={fieldClass} />
          </Field>
          <Field label="Phone number" htmlFor={form.fieldId("phone")} error={form.errors.phone} errorId={`${form.fieldId("phone")}-error`}>
            <Input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+00 000 000 0000" className={fieldClass} />
          </Field>
          <Field label="Email" htmlFor={form.fieldId("email")} error={form.errors.email} errorId={`${form.fieldId("email")}-error`}>
            <Input {...field("email")} type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" className={fieldClass} />
          </Field>
          <Field label="Project location" htmlFor={form.fieldId("location")} error={form.errors.location} errorId={`${form.fieldId("location")}-error`}>
            <Input {...field("location")} autoComplete="address-level2" placeholder="City or area" className={fieldClass} />
          </Field>
          <Field
            label="Construction type"
            htmlFor={form.fieldId("constructionType")}
            error={form.errors.constructionType}
            errorId={`${form.fieldId("constructionType")}-error`}
            className={kind === "site-visit" ? undefined : density === "compact" ? "sm:col-span-2" : "md:col-span-2"}
          >
            <div className="relative">
              <select
                {...field("constructionType")}
                className={cn(
                  fieldClass,
                  "w-full appearance-none border pr-10 outline-none",
                  !form.values.constructionType && "text-stone",
                )}
              >
                <option value="" disabled>
                  Select a type
                </option>
                {constructionTypes.map((t) => (
                  <option key={t} value={t} className="text-ink">
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-stone" />
            </div>
          </Field>
          {kind === "site-visit" && (
            <Field label="Preferred visit date" htmlFor={form.fieldId("preferredDate")} error={form.errors.preferredDate} errorId={`${form.fieldId("preferredDate")}-error`}>
              <Input {...field("preferredDate")} type="date" min={todayISO()} className={fieldClass} />
            </Field>
          )}
          <Field
            label={kind === "site-visit" ? "Notes (optional)" : "Project description"}
            htmlFor={form.fieldId("description")}
            error={form.errors.description}
            errorId={`${form.fieldId("description")}-error`}
            className={density === "compact" ? "sm:col-span-2" : "md:col-span-2"}
          >
            <Textarea
              {...field("description")}
              rows={density === "compact" ? 3 : 4}
              placeholder={
                kind === "site-visit"
                  ? "Access details, plot size, anything we should know"
                  : "Tell us about the project — size, timeline, budget range"
              }
              className={cn(fieldClass, "h-auto min-h-24 resize-y py-3 leading-relaxed")}
            />
          </Field>

          {/* Honeypot: hidden from people and assistive tech, catches naive bots. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={form.values.website}
                onChange={(e) => form.setField("website", e.target.value)}
              />
            </label>
          </div>

          <div className={cn("flex flex-col gap-4", density === "compact" ? "sm:col-span-2" : "md:col-span-2")}>
            <AnimatePresence initial={false}>
              {form.failureMessage && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 rounded-media border border-destructive/20 bg-destructive/5 p-4 text-sm text-ink">
                    <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <p>
                      {form.failureMessage}{" "}
                      <a className="font-semibold underline underline-offset-2" href={site.contact.phoneHref}>
                        {site.contact.phoneDisplay}
                      </a>{" "}
                      ·{" "}
                      <a className="font-semibold underline underline-offset-2" href={`mailto:${site.contact.email}`}>
                        {site.contact.email}
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-meta max-w-xs text-stone">
                By submitting you agree to our{" "}
                <Link to="/privacy" className="font-medium text-ink underline underline-offset-2 hover:text-brand">
                  privacy policy
                </Link>
                .
              </p>
              <StatefulButton
                type="submit"
                status={form.status}
                className="h-12 w-full px-7 sm:w-auto"
              >
                {form.status === "loading" ? "Sending your details…" : submitLabel}
              </StatefulButton>
            </div>
            <p className="sr-only" aria-live="polite">
              {form.status === "loading" ? "Sending your enquiry" : ""}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  className,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  errorId: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="text-[0.8rem] font-semibold tracking-[-0.005em] text-ink">
        {label}
      </Label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-meta text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
