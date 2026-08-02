import type { RouteRecordRaw } from 'vue-router'

// 非工具页面：首页、关于、404
export const pageRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'home',
    meta: {
      titleKey: 'seo.home.title',
      keywordsKey: 'seo.home.keywords',
      descriptionKey: 'seo.home.description',
      keywords: 'mikasa-tool,在线工具,开发人员工具,时间戳转换,加密,解密,md5,进制转换,二维码,正则表达式,json格式化,照片处理,字数统计',
      description: 'mikasa-tool,在线工具,在线工具大全,开发人员工具,日常生活工具,办公助手,时间戳转换,加密,解密,md5,进制转换,二维码,正则表达式,json格式化,照片处理,字数统计',
    }
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
    name: 'about',
    meta: {
      titleKey: 'about.title',
      keywordsKey: 'seo.about.keywords',
      descriptionKey: 'about.desc',
      title: "关于",
      keywords: '关于ranblogs,关于工具站',
      description: '',
    }
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound.vue'),
    name: '404',
    meta: {
      titleKey: 'ui.notFound',
      keywordsKey: 'seo.404.keywords',
      descriptionKey: 'ui.notFound',
      title: "404"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
