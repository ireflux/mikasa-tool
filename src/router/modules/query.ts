import type { RouteRecordRaw } from 'vue-router'

// 特殊查询工具（不在工具注册表/目录中展示，仅保留路由）
export const queryRoutes: RouteRecordRaw[] = [
  {
    path: '/webinfo',
    component: () => import('@/components/Tools/WebInfo/WebInfo.vue'),
    name: 'webInfo',
    meta: {
      titleKey: 'tool.webinfo.title',
      keywordsKey: 'seo.webinfo.keywords',
      descriptionKey: 'tool.webinfo.desc',
      title: "网站favicon获取",
      keywords: '获取网站logo,获取网站icon,获取网站favicon,获取网站标题,获取网站关键词,获取网站描述',
      description: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
    }
  },
]
