import { createContext, useContext, useEffect } from "react"

export interface ConsultationContextValue {
  open: boolean
  openConsultation: () => void
  setOpen: (open: boolean) => void
  /** Forms report when the visitor is interacting with them (focused or dirty). */
  setFormActive: (formId: string, active: boolean) => void
  isAnyFormActive: () => boolean
}

export const ConsultationContext = createContext<ConsultationContextValue | null>(null)

export function useConsultation() {
  const ctx = useContext(ConsultationContext)
  if (!ctx) throw new Error("useConsultation must be used inside <ConsultationProvider>")
  return ctx
}

/** Registers a form as "active" while it is focused or has unsent input. */
export function useReportFormActivity(formId: string, active: boolean) {
  const { setFormActive } = useConsultation()
  useEffect(() => {
    setFormActive(formId, active)
    return () => setFormActive(formId, false)
  }, [formId, active, setFormActive])
}
