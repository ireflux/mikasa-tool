import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { constantRoute } from './router'

export function createAppRouter(isSSR = false) {
  return createRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes: constantRoute,
    scrollBehavior() {
      return {
        left: 0,
        top: 0,
      }
    },
  })
}
