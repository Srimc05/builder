import { IconBrandWhatsapp } from "@tabler/icons-react"

import { StatefulButton } from "@/components/ui/stateful-button"
import { whatsappHref } from "@/content/site"
import { cn } from "@/lib/utils"

/**
 * WhatsApp call to action built on the Aceternity Stateful Button: the
 * loader runs while the chat opens, then the success tick confirms it.
 * Green is darkened from the source's green-500 to green-700 so white text
 * meets WCAG AA contrast (5:1).
 */
export function WhatsAppButton({ className, label = "Chat on WhatsApp" }: { className?: string; label?: string }) {
  // Runs synchronously inside the click so browsers treat it as user-initiated.
  const openChat = () => {
    const url = whatsappHref()
    const win = window.open(url, "_blank")
    if (win) win.opener = null
    else window.location.href = url // popup blocked — open in this tab instead
  }

  return (
    <StatefulButton
      onClick={openChat}
      className={cn("h-12 gap-2 bg-green-700 px-6 ring-offset-night hover:ring-green-600 focus-visible:ring-green-500", className)}
    >
      <span className="flex items-center gap-2">
        <IconBrandWhatsapp aria-hidden className="size-5" stroke={1.75} />
        {label}
      </span>
    </StatefulButton>
  )
}
