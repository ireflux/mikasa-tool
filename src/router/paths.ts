import { constantRoute } from './router'

/**
 * Extract route paths for SSR prerendering.
 * Excludes catch-all wildcard routes and redirect-only routes.
 * This file is safe to import from Node context (vite.config.ts / ssr.config.ts)
 * because the component lazy-import functions in constantRoute are never invoked.
 */
export const routePaths: string[] = constantRoute
  .filter((route) => {
    // Exclude catch-all wildcard routes and redirect-only routes
    return !route.redirect && !route.path.includes(':pathMatch')
  })
  .map((route) => route.path)
