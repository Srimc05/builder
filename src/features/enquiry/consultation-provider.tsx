import { useCallback, useMemo, useRef, useState, type ReactNode } from "react"

import { SESSION_KEYS, sessionFlags } from "@/lib/session"

import { ConsultationContext } from "./consultation-context"

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false)
  const activeForms = useRef(new Set<string>())

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next)
    // Opening or dismissing (either way) counts as "seen" for this session.
    sessionFlags.set(SESSION_KEYS.consultationShown)
  }, [])

  const openConsultation = useCallback(() => setOpen(true), [setOpen])

  const setFormActive = useCallback((formId: string, active: boolean) => {
    if (active) activeForms.current.add(formId)
    else activeForms.current.delete(formId)
  }, [])

  const isAnyFormActive = useCallback(() => activeForms.current.size > 0, [])

  const value = useMemo(
    () => ({ open, openConsultation, setOpen, setFormActive, isAnyFormActive }),
    [open, openConsultation, setOpen, setFormActive, isAnyFormActive],
  )

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>
}
