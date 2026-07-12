import type { RouteRecordRaw } from 'vue-router'

import { pageRoutes } from './modules/pages'
import { devopsRoutes } from './modules/devops'
import { textRoutes } from './modules/text'
import { encodingRoutes } from './modules/encoding'
import { mediaRoutes } from './modules/media'
import { chartRoutes } from './modules/chart'
import { lifeRoutes } from './modules/life'
import { queryRoutes } from './modules/query'
import { formatRoutes } from './modules/format'

//对外暴露配置路由(常量路由)
export const constantRoute: RouteRecordRaw[] = [
  ...pageRoutes,
  ...devopsRoutes,
  ...textRoutes,
  ...encodingRoutes,
  ...mediaRoutes,
  ...chartRoutes,
  ...lifeRoutes,
  ...queryRoutes,
  ...formatRoutes,
]
