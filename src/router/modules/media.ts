import type { RouteRecordRaw } from 'vue-router'

// 媒体处理工具
export const mediaRoutes: RouteRecordRaw[] = [
  {
    path: '/signimage',
    component: () => import('@/components/Tools/SignImage/SignImage.vue'),
    name: 'signimage',
    meta: {
      title: "在线编辑图片",
      keywords: '在线图片裁剪,图片标注,图片滤镜,图片画笔、图片旋转、图片文字,图片美,图片尺寸调整化',
      description: '在线图片裁剪，图片标注，图片滤镜，图片画笔、图片旋转、图片文字,图片尺寸调整等操作',
    }
  },
  {
    path: '/qrcode',
    component: () => import('@/components/Tools/Qrcode/Qrcode.vue'),
    name: 'qrcode',
    meta: {
      title: "二维码生成",
      keywords: '二维码,qrcode,二维码制作,二维码生成,微信二维码',
      description: '在线生成二维码,logo二维码',
    }
  },
  {
    path: '/imgcut',
    component: () => import('@/components/Tools/ImgCut/ImgCut.vue'),
    name: 'imgCut',
    meta: {
      title: "图片切割",
      keywords: '图片分割,图片切割,四宫格,九宫格,十六宫格',
      description: '将图片分割成四宫格、九宫格、十六宫格，支持自定义行与列',
    }
  },
  {
    path: '/colorpicker',
    component: () => import('@/components/Tools/ColorPicker/ColorPicker.vue'),
    name: 'colorPicker',
    meta: {
      title: "Color选择器",
      keywords: '颜色选择器,Color选择器',
      description: '颜色选择器、在各种颜色空间如十六进制、rgb、hsl、css等等之间转换颜色',
    }
  },
  {
    path: '/imagecolorpicker',
    component: () => import('@/components/Tools/ImageColorPicker/ImageColorPicker.vue'),
    name: 'imagecolorpicker',
    meta: {
      title: "传图取色",
      keywords: '图片取色,颜色提取,色彩分析',
      description: '上传图片并点击图片获取颜色值',
    }
  },
  {
    path: '/imagewatermark',
    component: () => import('@/components/Tools/ImageWatermark/ImageWatermark.vue'),
    name: 'imagewatermark',
    meta: {
      title: "图片水印添加",
      keywords: '图片水印,水印添加,图片处理',
      description: '上传图片并添加文字水印',
    }
  },
  {
    path: '/colorpalette',
    component: () => import('@/components/Tools/ColorPalette/ColorPalette.vue'),
    name: 'colorpalette',
    meta: {
      title: "色板工具",
      keywords: '色板,颜色,渐变色,Material Design',
      description: '提供各种颜色的色板，点击颜色可复制颜色值',
    }
  },
]
