/// <reference types="vite/client" />

declare module 'virtual:svg-icons-register'

declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'default-passive-events'
declare module 'csso'
declare module 'lodash'
declare module '@wangeditor/editor-for-vue'
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module 'prismjs'
declare module 'uuid'

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESC: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_SERVE: string
  readonly VITE_HOST: string
  readonly VITE_FEEDBACK_URL: string
  readonly VITE_ADV_SHOW: string
  readonly VITE_LEFT_ADV: string
  readonly VITE_IS_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
