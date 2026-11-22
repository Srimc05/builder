import { createBrowserRouter, RouterProvider } from "react-router"

import { RootLayout } from "@/components/layout/root-layout"
import { RouteError } from "@/pages/route-error"
import { HomePage } from "@/pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <RouteError />,
    // Shown only while a lazily-loaded route resolves on first page load.
    HydrateFallback: () => <div className="min-h-svh bg-canvas" aria-busy="true" />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", lazy: async () => ({ Component: (await import("@/pages/about")).AboutPage }) },
      { path: "services", lazy: async () => ({ Component: (await import("@/pages/services")).ServicesPage }) },
      { path: "projects", lazy: async () => ({ Component: (await import("@/pages/projects")).ProjectsPage }) },
      {
        path: "projects/:slug",
        lazy: async () => ({ Component: (await import("@/pages/project-detail")).ProjectDetailPage }),
      },
      { path: "process", lazy: async () => ({ Component: (await import("@/pages/process")).ProcessPage }) },
      { path: "blog", lazy: async () => ({ Component: (await import("@/pages/blog")).BlogPage }) },
      { path: "blog/:slug", lazy: async () => ({ Component: (await import("@/pages/blog-post")).BlogPostPage }) },
      { path: "contact", lazy: async () => ({ Component: (await import("@/pages/contact")).ContactPage }) },
      { path: "privacy", lazy: async () => ({ Component: (await import("@/pages/privacy")).PrivacyPage }) },
      // Component demo, development only (left out of production builds).
      ...(import.meta.env.DEV
        ? [
            {
              path: "dev/text-generate",
              lazy: async () => {
                const { default: Demo } = await import("@/components/text-generate-effect-demo")
                return {
                  Component: () => (
                    <div className="container-site pt-32 pb-24">
                      <Demo />
                    </div>
                  ),
                }
              },
            },
          ]
        : []),
      { path: "*", lazy: async () => ({ Component: (await import("@/pages/not-found")).NotFoundPage }) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
