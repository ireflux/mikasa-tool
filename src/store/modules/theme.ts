import { defineStore } from 'pinia'

export type ThemeMode = 'system' | 'light' | 'dark'

const THEME_KEY = 'theme_mode'
const VALID_MODES: ThemeMode[] = ['system', 'light', 'dark']

function isDark(mode: ThemeMode): boolean {
  if (typeof window === 'undefined') return false
  if (mode === 'dark') return true
  if (mode === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark(mode))
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'system' as ThemeMode,
  }),
  getters: {
    // 当前是否深色（含 system 解析结果）
    currentDark: (state): boolean => {
      return isDark(state.mode)
    },
  },
  actions: {
    // 初始化：读取本地偏好 + 监听系统主题变化
    init() {
      if (typeof window === 'undefined') return
      const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null
      this.mode = saved && VALID_MODES.includes(saved) ? saved : 'system'
      applyTheme(this.mode)
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.mode === 'system') applyTheme(this.mode)
      })
    },
    setMode(mode: ThemeMode) {
      this.mode = mode
      localStorage.setItem(THEME_KEY, mode)
      applyTheme(mode)
    },
  },
})
