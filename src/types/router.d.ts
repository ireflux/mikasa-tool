import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keywords?: string
    description?: string
  }
}
