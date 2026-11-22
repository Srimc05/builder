import { isRouteErrorResponse, useRouteError } from "react-router"

/** Last-resort error screen (rendered outside the layout, so kept self-contained). */
export function RouteError() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : 500
  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-6 bg-canvas px-6 sm:px-16">
      <p className="text-eyebrow text-brand">Error {status}</p>
      <h1 className="text-headline max-w-2xl text-ink">Something went wrong loading this page.</h1>
      <p className="text-lead max-w-md text-stone">Please refresh, or return to the home page.</p>
      <a href="/" className="rounded-btn bg-ink px-6 py-3 text-[0.78rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-black">
        Back to home
      </a>
    </main>
  )
}
