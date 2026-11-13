import { useCallback, useRef, useState, type FormEvent } from "react"

import type { ButtonStatus } from "@/components/ui/stateful-button"
import {
  EnquiryError,
  emptyEnquiry,
  enquiryErrorMessage,
  submitEnquiry,
  validateEnquiry,
  type EnquiryErrorReason,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryKind,
  type EnquiryValues,
} from "@/lib/enquiry"
import { SESSION_KEYS, sessionFlags } from "@/lib/session"

const FIELD_ORDER: EnquiryField[] = [
  "fullName",
  "phone",
  "email",
  "location",
  "constructionType",
  "preferredDate",
  "description",
]

/** Form state, validation and submission — no presentation concerns. */
export function useEnquiryForm(kind: EnquiryKind, formId: string) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [failure, setFailure] = useState<EnquiryErrorReason | null>(null)
  const inFlight = useRef(false)

  const fieldId = useCallback((field: EnquiryField) => `${formId}-${field}`, [formId])

  const setField = useCallback(
    (field: keyof EnquiryValues, value: string) => {
      const next = { ...values, [field]: value }
      setValues(next)
      // Once the visitor has tried to submit, validate as they correct fields.
      if (attempted && field !== "website") {
        const fieldError = validateEnquiry(next, kind)[field]
        setErrors((e) => ({ ...e, [field]: fieldError }))
      }
      if (status === "error") setStatus("idle")
    },
    [values, attempted, kind, status],
  )

  const validateField = useCallback(
    (field: EnquiryField) => {
      const value = values[field]
      if (!value && !attempted) return
      setErrors((e) => ({ ...e, [field]: validateEnquiry(values, kind)[field] }))
    },
    [values, attempted, kind],
  )

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inFlight.current || status === "loading" || status === "success") return

      setAttempted(true)
      const found = validateEnquiry(values, kind)
      setErrors(found)
      const firstInvalid = FIELD_ORDER.find((f) => found[f])
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid))?.focus()
        return
      }

      inFlight.current = true
      setFailure(null)
      setStatus("loading")
      try {
        await submitEnquiry(kind, values)
        sessionFlags.set(SESSION_KEYS.enquirySubmitted)
        setStatus("success")
      } catch (error) {
        setFailure(error instanceof EnquiryError ? error.reason : "server")
        setStatus("error")
      } finally {
        inFlight.current = false
      }
    },
    [values, kind, status, fieldId],
  )

  const reset = useCallback(() => {
    setValues(emptyEnquiry)
    setErrors({})
    setAttempted(false)
    setFailure(null)
    setStatus("idle")
  }, [])

  const isDirty = Object.entries(values).some(([key, v]) => key !== "website" && v.trim() !== "")

  return {
    values,
    errors,
    status,
    failure,
    failureMessage: failure ? enquiryErrorMessage[failure] : null,
    isDirty,
    fieldId,
    setField,
    validateField,
    submit,
    reset,
  }
}
