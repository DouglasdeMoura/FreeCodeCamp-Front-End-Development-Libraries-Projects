/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_QUOTES_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
