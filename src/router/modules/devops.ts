import type { RouteRecordRaw } from 'vue-router'

// 开发运维工具
export const devopsRoutes: RouteRecordRaw[] = [
  {
    path: '/timetran',
    component: () => import('@/components/Tools/TimeTran/TimeTran.vue'),
    name: 'timetran',
    meta: {
      title: "时间戳转换",
      keywords: '时间,日期转换时间戳,Unix时间戳',
      description: 'Unix时间戳转换可以把Unix时间转成北京时间。',
    }
  },
  {
    path: '/md5',
    component: () => import('@/components/Tools/MD5/MD5.vue'),
    name: 'md5',
    meta: {
      title: "MD5在线加密",
      keywords: 'md5加密,md5在线加密,md5',
      description: '在线md5加密，一键生成md5加密字符串，可生成16位或32位md5加密字符串，md5双重加密',
    }
  },
  {
    path: '/json',
    component: () => import('@/components/Tools/JsonTran/JsonTran.vue'),
    name: 'json',
    meta: {
      title: "Json在线转换",
      keywords: 'json编辑器,json格式化,json压缩,json转义,json去转义',
      description: '提供实时编辑和预览JSON 数据，语法高亮、校验、格式化、转义，去转义、压缩等功能，可以提高阅读修改的效率和准确性',
    }
  },
  {
    path: '/reg',
    component: () => import('@/components/Tools/RegTest/RegTest.vue'),
    name: 'reg',
    meta: {
      title: "正则表达式测试",
      keywords: '正则表达式测试工具,常用正则表达式,在线正则表达式',
      description: '正则表达式测试工具,常用正则表达式,在线正则表达式',
    }
  },
  {
    path: '/scaletran',
    component: () => import('@/components/Tools/ScaleTran/ScaleTran.vue'),
    name: 'scaletran',
    meta: {
      title: "常用进制转换",
      keywords: '进制转换,进制转换工具,10进制转2进制,2进制转10进制,10进制转62进制,62进制转10进制',
      description: '常用进制转换工具，支持32进制以上进制转换',
    }
  },
  {
    path: '/randompassword',
    component: () => import('@/components/Tools/RandomPassword/RandomPassword.vue'),
    name: 'randomPassword',
    meta: {
      title: "随机密码生成",
      keywords: '在线生成随机密码,批量生成随机密码,密码生成',
      description: '在线随机密码生成',
    }
  },
  {
    path: '/uuid',
    component: () => import('@/components/Tools/UUID/UUID.vue'),
    name: 'uuid',
    meta: {
      title: "UUID生成器",
      keywords: 'UUID生成器',
      description: 'uuid生成器，批量uuid生成',
    }
  },
  {
    path: '/unit',
    component: () => import('@/components/Tools/Unit/Unit.vue'),
    name: 'unit',
    meta: {
      title: "单位转换",
      keywords: '在线单位换算,长度单位换算,面积单位换算,时间单位换算,重量单位换算,温度单位换算,压力单位换算,热量单位换算,功率单位换算。',
      description: '在线单位换算,长度单位换算,面积单位换算,时间单位换算,重量单位换算,温度单位换算,压力单位换算,热量单位换算,功率单位换算。',
    }
  },
  {
    path: '/baseconverter',
    component: () => import('@/components/Tools/BaseConverter/BaseConverter.vue'),
    name: 'baseconverter',
    meta: {
      title: "进制转换计算器",
      keywords: '进制转换,二进制,八进制,十进制,十六进制,进制计算器',
      description: '在线进制转换计算器，支持二进制、八进制、十进制、十六进制等多种进制之间的相互转换',
    }
  },
  {
    path: '/storageconverter',
    component: () => import('@/components/Tools/StorageConverter/StorageConverter.vue'),
    name: 'storageconverter',
    meta: {
      title: "数据存储单位换算",
      keywords: '存储单位换算,字节,KB,MB,GB,TB,PB,EB',
      description: '在线数据存储单位换算工具，支持字节、KB、MB、GB、TB、PB、EB等存储单位之间的相互转换',
    }
  },
  {
    path: '/hashcalculator',
    component: () => import('@/components/Tools/HashCalculator/HashCalculator.vue'),
    name: 'hashcalculator',
    meta: {
      title: "Hash计算器",
      keywords: 'Hash计算器,MD5,SHA-1,SHA-256,SHA-384,SHA-512',
      description: '在线Hash计算器，支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法',
    }
  },
]
