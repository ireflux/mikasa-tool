<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Search, Moon, Sunny } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToolsStore } from '@/store/modules/tools'
import { useComponentStore } from '@/store/modules/component'
import { useThemeStore } from '@/store/modules/theme'
import { localizeTools } from '@/data/tools'
import { setLocale } from '@/i18n'
import type { Locale } from '@/i18n'
import 'element-plus/theme-chalk/display.css'
import { ToolsInfo } from '@/data/tools.type';

const router = useRouter()
const loading = ref(false)
const options = ref<ToolsInfo[]>([])
const appName = ref(import.meta.env.VITE_APP_TITLE || 'Mikasa Tool')
const { t, locale } = useI18n()
//store
const toolsStore = useToolsStore()
const componentStore = useComponentStore()
const themeStore = useThemeStore()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: '',
})

//本地化后的搜索结果（切换语言自动更新）
const localizedOptions = computed(() => localizeTools(options.value))

//搜索工具
const searchTools = async (query: string) => {
  loading.value = true
  options.value = []
  if (query) {
    searchParam.title = query
    options.value = await toolsStore.getTools(searchParam)
  }
  loading.value = false
}

//保存到桌面
const createUrlShortcut = async () => {
  try {
    const blob = new Blob(
      [`[InternetShortcut]\nURL=${encodeURI(window.location.href)}`],
      { type: 'text/plain' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Mikasa-Tool.url';
    a.click();
  } catch (error) {
    console.error('创建URL快捷方式失败:', error);
  }
}

//PWA 安装
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const canInstall = ref(false)

const installPwa = async () => {
  if (!deferredPrompt.value) {
    createUrlShortcut()
    return
  }
  await deferredPrompt.value.prompt()
  deferredPrompt.value = null
  canInstall.value = false
}

const onBeforeInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt.value = e as BeforeInstallPromptEvent
  canInstall.value = true
}

//客户端监听安装事件
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
}

const optionClick = (url: string) => {
  router.push(url)
}

const toggleSidebar = () => {
  componentStore.setLeftComStatus(!componentStore.leftCom)
}

//主题切换
const themeOptions = [
  { value: 'system', label: 'ui.themeSystem' },
  { value: 'light', label: 'ui.themeLight' },
  { value: 'dark', label: 'ui.themeDark' },
]

const setTheme = (mode: 'system' | 'light' | 'dark') => {
  themeStore.setMode(mode)
}

//语言切换
const languageOptions: { value: Locale; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
]

const setLanguage = (lang: Locale) => {
  setLocale(lang)
}

</script>

<template>
  <header class="h-24 w-full flex justify-between px-4 pt-2 pb-2 c-xs:h-16 items-center">
    <div class="flex items-center w-full">
      <!-- Desktop: toggle + logo (Gmail style) -->
      <div class="hidden c-md:flex items-center flex-shrink-0">
        <div class="header-toggle" @click="toggleSidebar">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
        <router-link to="/" class="logo-link flex items-center ml-2">
          <img class="h-8 w-auto rounded-lg mr-2" src="@/assets/logo.svg" :alt="appName">
          <span class="logo-title">{{ appName }}</span>
        </router-link>
      </div>

      <!-- Mobile: toggle (opens drawer) -->
      <div class="hidden c-sm:block c-md:hidden c-xs:block">
        <svg :class="['icon', { 'rotate': componentStore.leftComDrawer }]" t="1702978210636" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7618" width="30" height="30" @click="componentStore.setleftComDrawerStatus(!componentStore.leftComDrawer)">
          <path fill="currentColor" fill-opacity=".9" d="M895.936 256l-768-0.896 0.128-64L896 192l-0.064 64zM179.2 689.152l202.688-152a32 32 0 0 0 0-51.2L179.2 333.952a32 32 0 0 0-51.2 25.6v304a32 32 0 0 0 51.2 25.6z m12.8-89.6v-176l117.312 88L192 599.552zM896 544H480v-64H896v64z m-0.064 288l-768-0.896 0.128-64L896 768l-0.064 64z" p-id="7619"></path>
        </svg>
      </div>
      
      <div class="c-xs:w-[85%] w-full mr-3 ml-3">
        <el-select
          v-model="searchParam.title"
          filterable
          remote
          reserve-keyword
          :placeholder="t('ui.searchPlaceholder')"
          :remote-method="searchTools"
          :loading="loading"
          class="gmail-search"
          size="large"
          popper-class="gmail-search-dropdown"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
          <el-option
            v-for="item in localizedOptions"
            :key="item.url"
            :label="item.title + ' - ' + item.desc"
            :value="item.url"
            @click="optionClick(item.url)"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class=" w-full md:w-auto flex md:block c-xs:w-auto">
      <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end items-center c-xs:mt-0">
        <!-- 语言切换 -->
        <li class="ml-3">
          <el-dropdown trigger="click" @command="setLanguage">
            <div class="header-icon-btn">
              <span class="text-sm font-medium">{{ locale === 'zh' ? '中' : 'EN' }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="opt in languageOptions"
                  :key="opt.value"
                  :command="opt.value"
                  :class="{ 'is-selected': locale === opt.value }"
                >
                  {{ opt.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <!-- 主题切换 -->
        <li class="ml-3 c-xs:hidden">
          <el-dropdown trigger="click" @command="setTheme">
            <div class="header-icon-btn">
              <el-icon :size="20"><Moon v-if="themeStore.currentDark" /><Sunny v-else /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="opt in themeOptions"
                  :key="opt.value"
                  :command="opt.value"
                  :class="{ 'is-selected': themeStore.mode === opt.value }"
                >
                  {{ t(opt.label) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <!-- 安装到桌面（PWA）/ 保存到桌面兜底 -->
        <li class="ml-3 c-xs:hidden">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="canInstall ? t('ui.installApp') : t('ui.saveToDesktop')"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="installPwa">
              <svg v-if="canInstall" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
              </svg>
            </div>
          </el-tooltip>
        </li>
        <!-- github -->
        <li class="ml-3">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="t('ui.github')"
              placement="bottom"
            >
            <a href="https://github.com/ireflux/mikasa-tool" target="_blank" class="header-icon-btn">
              <svg t="1715594665374" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4334" width="24" height="24"><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z" fill="currentColor" p-id="4335"></path></svg>
            </a>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* 搜索框 — 玻璃胶囊 */
.gmail-search :deep(.el-select__wrapper) {
  background: var(--glass-bg-soft);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 28px;
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: none;
  min-height: 48px;
}

.gmail-search :deep(.el-select__wrapper:hover) {
  background: var(--glass-bg-strong);
  box-shadow: none;
}

.gmail-search :deep(.el-select__wrapper.is-focus) {
  background: var(--glass-overlay-bg);
  box-shadow: 0 4px 16px var(--shadow-dropdown);
}

/* 前缀搜索图标 */
.gmail-search :deep(.el-select__prefix) {
  color: var(--color-text-secondary);
  margin-right: 8px;
  font-size: 18px;
}

/* 折叠按钮 — Gmail 风格圆形 */
.header-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: background-color var(--transition-fast), color var(--transition-fast);
  flex-shrink: 0;
}

.header-toggle:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

/* 右侧图标按钮 — Gmail 规范 40px 圆形 */
.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.header-icon-btn:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

/* Logo */
.logo-link {
  transition: opacity var(--transition-fast);
}

.logo-link:hover {
  opacity: 0.85;
}

.logo-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: var(--color-text);
}

/* 移动端折叠图标 */
.icon {
  transition: opacity var(--transition-fast);
  cursor: pointer;
  color: var(--color-text-secondary);
}

.icon:hover {
  opacity: 0.7;
}

/* 旋转动画 */
.icon.rotate {
  transform: rotate(180deg);
}

/* Header — 磨砂玻璃吸顶 */
header {
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur-strong);
  -webkit-backdrop-filter: var(--glass-blur-strong);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>

<style>
/* 搜索下拉 — Gmail 风格圆角 */
.gmail-search-dropdown {
  border-radius: 12px !important;
  overflow: hidden !important;
}
</style>