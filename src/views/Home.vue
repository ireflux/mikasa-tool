<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from "vue-router"
import { StarFilled, ArrowDown } from '@element-plus/icons-vue'
import { useToolsStore } from '@/store/modules/tools'
import { useCollectionStore } from '@/store/modules/collection'
import { ElMessage } from 'element-plus'
import { useRoute } from "vue-router"
//store
const toolsStore = useToolsStore()
const collectionStore = useCollectionStore()
const route = useRoute()

// 收藏区域折叠状态 — 空时默认收起，有内容默认展开
const collectCollapsed = ref(true)

// 切换折叠
const toggleCollect = () => {
  collectCollapsed.value = !collectCollapsed.value
}

// 取消收藏
const removeCollect = (url: string) => {
  const success = collectionStore.removeCollect(url)
  if (success) {
    ElMessage.success('已取消收藏');
  } else {
    ElMessage.error('取消收藏失败');
  }
}

onMounted(() => {
  collectionStore.loadCollectedTools()
  // 有收藏内容时默认展开
  if (collectionStore.collectedTools.length > 0) {
    collectCollapsed.value = false
  }
  if (route.query && route.query.value) {//底部导航跳转过来的则定位到响应位置
      document?.querySelector('#' + `${route.query.value}`)?.scrollIntoView();
  } else {//其他位置跳转过来不需要定位的则定位到顶部
      document?.querySelector('#collect')?.scrollIntoView()
  }
})
</script>

<template>
  <div class="md:mr-6 c-xs:mr-0">
    <!-- 收藏工具 -->
    <div id="collect">
      <!-- 收藏标题 — 可点击展开/收起 -->
      <div class="collect-header mt-8 mb-3" @click="toggleCollect">
        <span class="text-xl font-bold text-[--base-black] tech-title">收藏工具</span>
        <el-icon class="collect-arrow" :class="{ 'is-collapsed': collectCollapsed }">
          <ArrowDown />
        </el-icon>
      </div>
      <!-- 收藏卡片 — 展开时显示 -->
      <div v-show="!collectCollapsed">
        <div v-if="collectionStore.collectedTools.length > 0" class="flex justify-between flex-wrap self-card-div c-xs:ml-0" :gutter="10">
            <router-link 
              v-for="(item, index) in collectionStore.collectedTools" 
              :key="index" 
              :to="item.url" 
              class="flex flex-col mt-4 border-solid rounded-[10px] w-[24%] p-2 bg-white c-xs:w-[99.5%] c-md:w-[24%] c-sm:w-[32%] p-5 tech-card stagger-item"
              :style="{ '--stagger-i': index % 8 }"
            >
              <div class="flex items-center border-b pb-2">
                <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
                <div class="flex flex-col ml-2 w-full">
                  <div class="flex justify-between">
                    <div class="font-semibold text-lg line-clamp-1">{{ item.title }}</div>
                    <el-button 
                      :icon="StarFilled" 
                      circle 
                      size="small" 
                      @click.prevent="removeCollect(item.url)" 
                      type="warning"
                    />
                  </div>
                  <div class="flex justify-between">
                    <el-text size="small">{{ item.cate }}</el-text>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <el-text line-clamp="2">{{ item.desc }}</el-text>
              </div>
            </router-link>
            <!-- 占位 div -->
            <div class="w-[24%] c-md:w-[24%] c-sm:w-[32%] "></div>
        </div>
        <div v-else class="mt-5 p-4 bg-white rounded-2xl">
          <el-empty description="暂无收藏工具" class="collect-empty" />
        </div>
      </div>
    </div>

    <!-- 工具分类列表 -->
    <div v-for="(cate, index) in toolsStore.cates" :key="index">
      <!-- cate title -->
      <div class="mt-8 mb-3 text-xl font-bold text-[--base-black] tech-title" :id="'cate_' + cate.id">
        {{ cate.title }}
      </div>
      <!-- card -->
      <div class="flex justify-between flex-wrap self-card-div c-xs:ml-0" :gutter="10">
          <router-link 
            v-for="(item, index) in cate.list" 
            :key="index" 
            :to="item.url" 
            class="flex flex-col mt-4 border-solid rounded-[10px] w-[24%] p-2 bg-white c-xs:w-[99.5%] c-md:w-[24%] c-sm:w-[32%] p-5 tech-card stagger-item"
            :style="{ '--stagger-i': index % 8 }"
          >
            <div class="flex items-center border-b pb-2">
              <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
              <div class="flex flex-col ml-2 w-full">
                <div class="flex">
                  <div class="font-semibold text-lg line-clamp-1">{{ item.title }}</div>
                </div>
                <div class="flex justify-between">
                  <el-text size="small">{{ item.cate }}</el-text>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <el-text line-clamp="2">{{ item.desc }}</el-text>
            </div>
          </router-link>
          <!-- 占位 div -->
          <div class="w-[24%] c-md:w-[24%] c-sm:w-[32%] "></div>
      </div>
    </div>

    <!-- 返回顶部 -->
    <el-backtop :right="10" :bottom="50" />
  </div>
</template>

<style scoped>
.self-card-div:after {
  content: "";
  width: 24%;
}

/* 扁平卡片样式 */
.router-link-active .tech-card {
  border-color: var(--color-primary);
}

.tech-card {
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.tech-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-card);
}

/* 标题样式 — Google Material Design 风格：左侧竖向强调条替代下划线 */
.tech-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.25rem;
  scroll-margin-top: 100px;
}

.tech-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 18px;
  background: var(--color-primary);
  border-radius: 2px;
  margin-right: 10px;
  transition: height var(--transition-fast);
  flex-shrink: 0;
}

.tech-title:hover::before {
  height: 22px;
}

/* 收藏区域容器 — 滚动定位补偿 */
#collect {
  scroll-margin-top: 100px;
}

/* 收藏区域折叠头部 */
.collect-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 0.5rem;
}

.collect-header .tech-title {
  margin-bottom: 0;
}

.collect-header:hover .tech-title {
  color: var(--color-primary);
}

.collect-arrow {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  transition: transform 0.25s ease, color var(--transition-fast);
}

.collect-arrow.is-collapsed {
  transform: rotate(-90deg);
}

.collect-header:hover .collect-arrow {
  color: var(--color-primary);
}

/* 空状态组件 — 紧凑布局 */
.collect-empty {
  --el-empty-padding: 0px 0;
  --el-empty-image-width: 80px;
  --el-empty-description-margin-top: 15px;
}
</style>
