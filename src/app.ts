import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

export function createAppInstance(isSSR = false) {
  const app = createApp(App)
  const pinia = createPinia()
  const router = createAppRouter(isSSR)

  app.use(pinia)
  app.use(router)

  if (!isSSR) {
    // Browser-only plugins - skipped during SSR
    import('virtual:svg-icons-register')
    import('default-passive-events')
    import('./plugins/v-md-editor').then(m => m.setupMdEditor(app))
    import('./styles/tailwind.css')
  }

  return { app, router, pinia }
}
