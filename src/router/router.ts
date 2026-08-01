import type { RouteRecordRaw } from 'vue-router'

import { pageRoutes } from './modules/pages'
import { queryRoutes } from './modules/query'
import { registryRoutes } from '@/data/toolRegistry'

//对外暴露配置路由(常量路由)：页面路由 + 特殊查询路由 + 注册表生成的工具路由
export const constantRoute: RouteRecordRaw[] = [
  ...pageRoutes,
  ...queryRoutes,
  ...registryRoutes,
]
