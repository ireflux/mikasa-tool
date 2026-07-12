import type { RouteRecordRaw } from 'vue-router'

// 编码转换工具
export const encodingRoutes: RouteRecordRaw[] = [
  {
    path: '/unicode',
    component: () => import('@/components/Tools/Unicode/Unicode.vue'),
    name: 'unicode',
    meta: {
      title: "Unicode转中文",
      keywords: '在线Unicode编码转换,中文转Unicode,Unicode转中文',
      description: '在线Unicode编码转换，中文转Unicode，Unicode转中文，在文本框里输入要转换的内容，然后点击要转换的类型按钮，转换完成后即可看到对应的内容。..',
    }
  },
  {
    path: '/urlencode',
    component: () => import('@/components/Tools/UrlEncode/UrlEncode.vue'),
    name: 'urlencode',
    meta: {
      title: "URL编码/解码",
      keywords: 'url编码,url解码,url加密,url解密',
      description: '在线url编码，在线url解码工具',
    }
  },
  {
    path: '/ascii',
    component: () => import('@/components/Tools/ASCII/ASCII.vue'),
    name: 'ascii',
    meta: {
      title: "ASCII码表",
      keywords: 'ascii,ascii码表,ascii对照表,ascii控制字符,ascii打印字符,ascii扩展码',
      description: 'ascii全面对照表，包含控制字符，打印字符，扩展码',
    }
  },
  {
    path: '/morse',
    component: () => import('@/components/Tools/Morse/Morse.vue'),
    name: 'morse',
    meta: {
      title: "摩斯电码",
      keywords: 'morse电码,摩斯电码',
      description: '摩斯电码编码解码',
    }
  },
  {
    path: '/htmlentity',
    component: () => import('@/components/Tools/HtmlEntity/HtmlEntity.vue'),
    name: 'htmlEntity',
    meta: {
      title: "html实体转义",
      keywords: 'html实体转义',
      description: 'html实体转义，实体转义成html',
    }
  },
  {
    path: '/asciiwordpic',
    component: () => import('@/components/Tools/ASCIIWordPic/ASCIIWordPic.vue'),
    name: 'asciiWordPic',
    meta: {
      title: "ASCII字形生成器",
      keywords: 'ASCII画,字形画,字形生成器',
      description: '在线生成字形ASCII画',
    }
  },
  {
    path: '/base64',
    component: () => import('@/components/Tools/Base64/Base64.vue'),
    name: 'base64',
    meta: {
      title: "Base64加解密",
      keywords: 'Base64,base64加密,base64解密,base64编码,base64解码',
      description: '在线Base64加解密工具，支持文本的Base64编码和解码',
    }
  },
]
