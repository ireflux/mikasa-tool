import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { constantRoute } from './router'

export function createAppRouter(isSSR = false) {
  const base = import.meta.env.BASE_URL
  return createRouter({
    history: isSSR ? createMemoryHistory(base) : createWebHistory(base),
    routes: constantRoute,
    scrollBehavior() {
      return {
        left: 0,
        top: 0,
      }
    },
  })
}
