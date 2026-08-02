import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    titleKey?: string
    keywords?: string
    keywordsKey?: string
    description?: string
    descriptionKey?: string
  }
}
