import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const isSSRBuild = process.argv.includes('--ssr')

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  let env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      // PWA 仅客户端构建启用（SSR 构建只生成 meta）
      ...(!isSSRBuild
        ? [VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg'],
            manifest: {
              name: 'Mikasa Tool',
              short_name: 'Mikasa Tool',
              description: 'A free online toolbox running entirely in the browser',
              lang: 'zh-CN',
              theme_color: '#1a73e8',
              background_color: '#f8faff',
              display: 'standalone',
              start_url: './',
              icons: [
                {
                  src: 'pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable',
                },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
              navigateFallback: '/index.html',
              runtimeCaching: [
                {
                  // 图片资源 — 缓存优先
                  urlPattern: /\/images\//,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'tool-images',
                    expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 3600 },
                  },
                },
              ],
            },
          })]
        : []),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: false })],
        dts: 'src/components.d.ts',
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),  //相对路径别名配置， 使用@替代src
        "v-code-diff": path.resolve("./node_modules/v-code-diff/dist/v3/index.es.js")
      }
    },
    build: {
      emptyOutDir: !isSSRBuild,
    },
    server: {
      host: env.VITE_HOST,
      proxy: env.VITE_SERVE
        ? {
            [env.VITE_APP_BASE_API]: {
              target: env.VITE_SERVE,
              changeOrigin: true,
            },
          }
        : undefined,
    },
    ssr: {
      noExternal: [
        'element-plus',
        'v-code-diff',
        'vue-clipboard3',
        'lodash',
        'qrcode-vue3',
        'vue3-danmaku',
        'x-data-spreadsheet',
        'echarts-wordcloud',
        'jsencrypt',
      ]
    }
  }
})
