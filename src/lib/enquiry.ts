/**
 * Enquiry submission — the single place forms talk to the backend.
 *
 * Submissions are POSTed as JSON to VITE_ENQUIRY_ENDPOINT (e.g. a Formspree,
 * Basin, Getform, or in-house API endpoint). There is deliberately no mock or
 * simulated delay: if the endpoint is not configured the submission fails
 * with a clear message so visitors are directed to phone / email instead.
 */
import { constructionTypes } from "@/content/site"

export type EnquiryKind = "consultation" | "contact" | "site-visit"

export interface EnquiryValues {
  fullName: string
  phone: string
  email: string
  location: string
  constructionType: string
  description: string
  preferredDate: string
  /** Honeypot — real visitors never see or fill this field. */
  website: string
}

export type EnquiryField = Exclude<keyof EnquiryValues, "website">
export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export const emptyEnquiry: EnquiryValues = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  constructionType: "",
  description: "",
  preferredDate: "",
  website: "",
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[\d\s()-]{7,20}$/

export function validateEnquiry(values: EnquiryValues, kind: EnquiryKind): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const name = values.fullName.trim()
  if (name.length < 2) errors.fullName = "What should we call you?"
  if (!PHONE.test(values.phone.trim()) || values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "That number doesn't look right. Could you check it?"
  if (!EMAIL.test(values.email.trim())) errors.email = "That email doesn't look right. Could you check it?"
  if (values.location.trim().length < 2) errors.location = "Where is your project?"
  if (!(constructionTypes as readonly string[]).includes(values.constructionType))
    errors.constructionType = "What would you like us to build?"
  if (kind !== "site-visit" && values.description.trim().length < 10)
    errors.description = "A few words about your project would help us."
  if (kind === "site-visit") {
    if (!values.preferredDate) errors.preferredDate = "Please choose a preferred date."
    else if (values.preferredDate < todayISO()) errors.preferredDate = "Please choose a date in the future."
  }
  return errors
}

export function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export type EnquiryErrorReason = "not-configured" | "network" | "server" | "timeout"

export class EnquiryError extends Error {
  readonly reason: EnquiryErrorReason
  constructor(reason: EnquiryErrorReason) {
    super(reason)
    this.name = "EnquiryError"
    this.reason = reason
  }
}

export const enquiryErrorMessage: Record<EnquiryErrorReason, string> = {
  "not-configured":
    "Online enquiries aren't connected yet. Please call or email us and we'll get back to you promptly.",
  network: "We couldn't reach our server. Please check your connection and try again.",
  timeout: "That took longer than expected. Please try again.",
  server: "Sorry, something went wrong on our end. Please call or email us and we'll sort it out.",
}

const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim()

export async function submitEnquiry(kind: EnquiryKind, values: EnquiryValues): Promise<void> {
  // Bots fill hidden fields; silently accept without sending.
  if (values.website) return
  if (!endpoint) throw new EnquiryError("not-configured")

  const { website: _honeypot, ...fields } = values
  const payload = {
    kind,
    ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.trim()])),
    page: typeof window !== "undefined" ? window.location.href : "",
    submittedAt: new Date().toISOString(),
  }

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") throw new EnquiryError("timeout")
    throw new EnquiryError("network")
  }
  if (!response.ok) throw new EnquiryError("server")
}
