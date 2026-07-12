import type { RouteRecordRaw } from 'vue-router'

// 格式化
export const formatRoutes: RouteRecordRaw[] = [
  {
    path: '/markdown',
    component: () => import('@/components/Tools/Markdown/Markdown.vue'),
    name: 'markdown',
    meta: {
      title: "markdown编辑器",
      keywords: '在线创建或编辑markdown, 实时预览,导出markdown',
      description: '在线markdown编辑器',
    }
  },
  {
    path: '/jsformat',
    component: () => import('@/components/Tools/JSFormat/JSFormat.vue'),
    name: 'jsFormat',
    meta: {
      title: "js代码格式化/压缩",
      keywords: 'js代码格式化,js格式化,js压缩,javascript格式化',
      description: 'JS格式化/压缩工具,提供在线JS格式化、JS压缩、JS混淆、JS解密',
    }
  },
  {
    path: '/htmlformat',
    component: () => import('@/components/Tools/HtmlFormat/HtmlFormat.vue'),
    name: 'htmlFormat',
    meta: {
      title: "html代码格式化",
      keywords: 'html格式化,xml格式化',
      description: '提供在线html、xml格式化',
    }
  },
  {
    path: '/cssformat',
    component: () => import('@/components/Tools/CssFormat/CssFormat.vue'),
    name: 'cssFormat',
    meta: {
      title: "css代码格式化/压缩",
      keywords: 'css格式化,css压缩',
      description: '提供在线css格式化,在线css压缩工具',
    }
  },
  {
    path: '/textedit',
    component: () => import('@/components/Tools/TextEdit/TextEdit.vue'),
    name: 'textEdit',
    meta: {
      title: "在线文本编辑/HTML获取",
      keywords: '文本编辑,富文本预览,在线编辑文本,文本编辑获取html',
      description: '在线富文本编辑, html实时预览，在线编辑文本，文本编辑获取html',
    }
  },
  {
    path: '/xmlformat',
    component: () => import('@/components/Tools/XmlFormat/XmlFormat.vue'),
    name: 'xmlformat',
    meta: {
      title: "XML格式化",
      keywords: 'XML格式化,XML压缩,XML美化',
      description: '在线XML格式化工具，用于美化和压缩XML代码，支持自定义缩进大小',
    }
  },
  {
    path: '/sqlformat',
    component: () => import('@/components/Tools/SqlFormat/SqlFormat.vue'),
    name: 'sqlformat',
    meta: {
      title: "SQL格式化",
      keywords: 'SQL格式化,SQL压缩,SQL美化',
      description: '在线SQL格式化工具，用于美化和压缩SQL代码，支持自定义缩进大小',
    }
  },
  // Backward compatibility redirect for old typo URL
  {
    path: '/jsforamt',
    redirect: '/jsformat'
  },
]
