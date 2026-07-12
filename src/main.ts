import { createAppInstance } from './app'

const { app, router } = createAppInstance(false)

// Client-only: router afterEach for dynamic SEO meta tags
router.afterEach((to) => {
  const { title, keywords, description } = to.meta
  const detailTitle = title
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
