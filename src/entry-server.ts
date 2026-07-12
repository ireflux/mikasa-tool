import { renderToString } from '@vue/server-renderer'
import { createAppInstance } from './app'
import { constantRoute } from './router/router'
export { routePaths } from './router/paths'

function getRouteMeta(routePath: string) {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Mikasa Tool'
  const appDesc = import.meta.env.VITE_APP_DESC || ''
  const route = constantRoute.find(r => r.path === routePath)
  const title = route?.meta?.title
    ? `${route.meta.title}-${appTitle}`
    : `${appTitle}-${appDesc}`
  const keywords = (route?.meta?.keywords as string) || ''
  const description = (route?.meta?.description as string) || ''
  return { title, keywords, description }
}

export async function render(routePath: string) {
  // Extract meta from route definition first (always works)
  const meta = getRouteMeta(routePath)

  let html = ''
  try {
    // Collect SSR warnings/errors instead of fully silencing them
    const ssrWarnings: string[] = []
    const ssrErrors: string[] = []
    const origWarn = console.warn
    const origError = console.error
    console.warn = (...args: unknown[]) => { ssrWarnings.push(args.map(String).join(' ')) }
    console.error = (...args: unknown[]) => { ssrErrors.push(args.map(String).join(' ')) }

    try {
      const { app, router } = createAppInstance(true)
      await router.push(routePath)
      await router.isReady()

      try {
        html = await renderToString(app)
      } catch {
        // Component rendering failed (browser-only APIs)
        html = ''
      }
    } catch {
      // App creation or route loading failed (browser-only module side effects)
      html = ''
    } finally {
      console.warn = origWarn
      console.error = origError
      if (ssrWarnings.length > 0) {
        origWarn(`[SSR] ${ssrWarnings.length} warning(s) for route: ${routePath}`)
      }
      if (ssrErrors.length > 0) {
        origError(`[SSR] ${ssrErrors.length} error(s) for route: ${routePath}`)
      }
    }
  } catch {
    html = ''
  }

  return { html, ...meta }
}
