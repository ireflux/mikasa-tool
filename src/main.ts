import { createAppInstance } from './app'
import { i18n } from './i18n'
import { registerSW } from 'virtual:pwa-register'

// PWA Service Worker 注册（自动更新）
registerSW({ immediate: true })

const { app, router } = createAppInstance(false)

// Client-only: router afterEach for dynamic SEO meta tags
router.afterEach((to) => {
  const t = i18n.global.t
  // 优先使用 i18n key（跟随当前语言），缺失时回退到中文 meta
  const title = to.meta.titleKey ? t(to.meta.titleKey as string) : to.meta.title
  const keywords = to.meta.keywordsKey ? t(to.meta.keywordsKey as string) : to.meta.keywords
  const description = to.meta.descriptionKey
    ? t(to.meta.descriptionKey as string)
    : to.meta.description

  const detailTitle = title as string
  if (detailTitle) {
    document.title = detailTitle + '-' + import.meta.env.VITE_APP_TITLE
  } else {
    document.title = import.meta.env.VITE_APP_TITLE + '-' + import.meta.env.VITE_APP_DESC
  }

  document.querySelector('meta[name="keywords"]')?.setAttribute("content", `${keywords}`)
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${description}`)
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", `${document.title}`)
  document.querySelector('meta[property="og:site_name"]')?.setAttribute("content", `${document.title}`)
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${description}`)
})

app.mount('#app')
