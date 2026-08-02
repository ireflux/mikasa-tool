import type { RouteRecordRaw } from 'vue-router'

import { pageRoutes } from './modules/pages'
import { registryRoutes } from '@/data/toolRegistry'

//对外暴露配置路由(常量路由)：页面路由 + 注册表生成的工具路由
export const constantRoute: RouteRecordRaw[] = [
  ...pageRoutes,
  ...registryRoutes,
]
