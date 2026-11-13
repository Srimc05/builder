/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint that receives enquiry JSON. Leave empty until a backend exists. */
  readonly VITE_ENQUIRY_ENDPOINT?: string
  /** "true" to include placeholder projects, testimonials and articles. */
  readonly VITE_INCLUDE_SAMPLE_CONTENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
