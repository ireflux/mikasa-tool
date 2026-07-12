import type { RouteRecordRaw } from 'vue-router'

// 文本处理工具
export const textRoutes: RouteRecordRaw[] = [
  {
    path: '/wordcount',
    component: () => import('@/components/Tools/WordCount/WordCount.vue'),
    name: 'wordcount',
    meta: {
      title: "在线字数统计",
      keywords: '在线字数计算器,计算字数,在线字数统计器,字数计数器',
      description: '在线字数计数器,主要是方便计算字数，以控制文字数量的小工具(小说作者、论文、文案文档、文字编辑必备工具)。',
    }
  },
  {
    path: '/diff',
    component: () => import('@/components/Tools/Diff/Diff.vue'),
    name: 'diff',
    meta: {
      title: "文本对比",
      keywords: '中文比对,代码比对,代码对比,文本比对,英文比对',
      description: '文本差异比对支持中文、英文、代码比对',
    }
  },
  {
    path: '/texttoimg',
    component: () => import('@/components/Tools/TextToImg/TextToImg.vue'),
    name: 'textToImg',
    meta: {
      title: "文本转图片",
      keywords: '文本生成图片,文本生成长图,推广长图',
      description: '把文本转换成图片，生成长图，具有超多个性文字排版',
    }
  },
  {
    path: '/textremoveduplicate',
    component: () => import('@/components/Tools/TextRemoveDuplicate/TextRemoveDuplicate.vue'),
    name: 'textRemoveDuplicate',
    meta: {
      title: "文本去重",
      keywords: '文本去重,文本排重,文本去除重复',
      description: '可以删除或去除文本或字符串中的重复行',
    }
  },
  {
    path: '/textreplace',
    component: () => import('@/components/Tools/TextReplace/TextReplace.vue'),
    name: 'textreplace',
    meta: {
      title: "文本替换",
      keywords: '文本替换,正则表达式替换,批量替换',
      description: '在线文本替换工具，支持普通文本和正则表达式替换，可用于批量修改文本内容',
    }
  },
  {
    path: '/textworkflow',
    component: () => import('@/components/Tools/TextWorkflow/TextWorkflow.vue'),
    name: 'textworkflow',
    meta: {
      title: "文本处理工作流",
      keywords: '文本处理,工作流,批量处理',
      description: '在线文本处理工作流工具，允许用户定义一系列文本处理步骤并按顺序执行',
    }
  },
  {
    path: '/wordfrequency',
    component: () => import('@/components/Tools/WordFrequency/WordFrequency.vue'),
    name: 'wordfrequency',
    meta: {
      title: "词频统计",
      keywords: '词频统计,文本分析,关键词提取',
      description: '在线词频统计工具，用于统计文本中单词出现的频率，可用于文本分析、关键词提取等场景',
    }
  },
  {
    path: '/wordcloud',
    component: () => import('@/components/Tools/WordCloud/WordCloud.vue'),
    name: 'wordcloud',
    meta: {
      title: "词云生成",
      keywords: '词云,文本可视化,词频分析',
      description: '根据输入文本生成词云图，支持自定义词云形状和颜色',
    }
  },
]
