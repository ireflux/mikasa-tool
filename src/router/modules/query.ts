import type { RouteRecordRaw } from 'vue-router'

// 查询工具
export const queryRoutes: RouteRecordRaw[] = [
  {
    path: '/webinfo',
    component: () => import('@/components/Tools/WebInfo/WebInfo.vue'),
    name: 'webInfo',
    meta: {
      title: "网站favicon获取",
      keywords: '获取网站logo,获取网站icon,获取网站favicon,获取网站标题,获取网站关键词,获取网站描述',
      description: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
    }
  },
  {
    path: '/httpstatuscode',
    component: () => import('@/components/Tools/HttpStatusCode/HttpStatusCode.vue'),
    name: 'httpStatusCode',
    meta: {
      title: "HTTP状态码",
      keywords: 'http状态码',
      description: '所有http状态对应的名称和含义解释',
    }
  },
  {
    path: '/jwt',
    component: () => import('@/components/Tools/JWT/JWT.vue'),
    name: 'jwt',
    meta: {
      title: "JWT解析",
      keywords: 'jwt解析,jwt解码,JSON Web Token解析',
      description: '解析和解码JSON Web Token（jwt）',
    }
  },
  {
    path: '/m3u8player',
    component: () => import('@/components/Tools/M3U8Player/M3U8Player.vue'),
    name: 'm3u8player',
    meta: {
      title: "m3u8在线播放",
      keywords: 'm3u8,视频播放,流媒体',
      description: '播放m3u8格式的视频流',
    }
  },
]
