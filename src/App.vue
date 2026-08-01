<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Header from '@/components/Layout/Header/Header.vue'
import Left from '@/components/Layout/Left/Left.vue'
import Floor from '@/components/Layout/Floor/Floor.vue'
import { useComponentStore } from '@/store/modules/component'
import { useThemeStore } from '@/store/modules/theme'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

//store
const componentStore = useComponentStore()
const themeStore = useThemeStore()
const { locale } = useI18n()

//Element Plus 组件语言包
const elLocale = computed(() => (locale.value === 'zh' ? zhCn : en))

onMounted(() => {
  themeStore.init()
})

</script>

<template>
  <el-config-provider :locale="elLocale">
    <div>
      <!-- Aurora background — Google pastel 极光色块 -->
      <div class="aurora-bg" aria-hidden="true">
        <div class="aurora-blob aurora-blob--blue"></div>
        <div class="aurora-blob aurora-blob--green"></div>
        <div class="aurora-blob aurora-blob--yellow"></div>
      </div>

      <!-- Full-width header — Gmail 风格，logo 和搜索栏在同一行 -->
      <Header />

      <!-- left sidebar — 始终可见，宽度随折叠状态变化，从 header 下方开始 -->
      <el-aside class="sidebar-wrapper fixed top-24 left-0 bottom-0 z-10 c-md:block c-sm:hidden c-xs:hidden" :width="componentStore.leftCom ? '72px' : '240px'">
        <Left></Left>
      </el-aside>

      <el-drawer 
        v-model="componentStore.leftComDrawer"
        show-close 
        size="240px" 
        :with-header="false" 
        direction="ltr"
        >
        <Left :in-drawer="true"></Left>
      </el-drawer>

      <!-- main content -->
      <el-container direction="vertical" :class="componentStore.leftCom ? 'c-md:ml-[72px]' : 'c-md:ml-[240px]'" class="main-container">
        <el-main>
          <router-view v-slot="{ Component, route }">
            <transition name="page" mode="out-in">
              <component :is="Component" :key="route.path"></component>
            </transition>
          </router-view>
        </el-main>
        <el-footer class="md:mb-6 mt-12 c-xs:mb-12">
          <Floor />
        </el-footer>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style scoped>
/* 侧边栏宽度过渡 */
.sidebar-wrapper {
  transition: width 0.25s ease;
  overflow: visible !important;
}

/* 主内容区域动画 */
.main-container {
  transition: margin-left 0.25s ease;
}
</style>

<style>
/* 全局样式已在 tailwind.css 中定义 */
</style>
