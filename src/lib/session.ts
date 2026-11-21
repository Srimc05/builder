/** sessionStorage helpers that never throw (private mode, blocked storage). */
export const sessionFlags = {
  get(key: string): boolean {
    try {
      return window.sessionStorage.getItem(key) === "1"
    } catch {
      return false
    }
  },
  set(key: string) {
    try {
      window.sessionStorage.setItem(key, "1")
    } catch {
      /* storage unavailable — fall back to in-memory behaviour */
    }
  },
}

export const SESSION_KEYS = {
  consultationShown: "hsb:consultation-shown",
  enquirySubmitted: "hsb:enquiry-submitted",
} as const
