<script setup lang="ts">
import { Star, StarFilled } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToolsStore } from '@/store/modules/tools'
import { useCollectionStore } from '@/store/modules/collection'
import { ElMessage } from 'element-plus'
import {rtrim} from '@/utils/string'
const props = defineProps({  title: String,  id: Number})
const route = useRoute()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: ''
})
//store
const toolsStore = useToolsStore()
const collectionStore = useCollectionStore()
const isCollected = ref(false)

//根据路由查询tool id
const getToolInfo = async () => {
  let routeStr = route.path
  searchParam.route = rtrim(routeStr, '/')
  await toolsStore.getToolInfo(searchParam)
  // 检查收藏状态
  isCollected.value = collectionStore.isCollected(searchParam.route)
}

// 收藏/取消收藏
const toggleCollect = () => {
  const toolInfo = toolsStore.currentTool
  if (!toolInfo) {
    ElMessage.warning('获取工具信息失败');
    return;
  }
  
  if (isCollected.value) {
    // 取消收藏
    const success = collectionStore.removeCollect(toolInfo.url)
    if (success) {
      isCollected.value = false
      ElMessage.success('已取消收藏');
    } else {
      ElMessage.error('取消收藏失败');
    }
  } else {
    // 添加收藏
    const success = collectionStore.addCollect(toolInfo)
    if (success) {
      isCollected.value = true
      ElMessage.success('收藏成功');
    } else {
      ElMessage.error('收藏失败，可能已经收藏过了');
    }
  }
}

onMounted(() => {
  collectionStore.loadCollectedTools()
  getToolInfo()
})

</script>

<template>
  <div class="flex justify-between items-center rounded-2xl p-4 mt-5 mb-5 tech-detail-header">
    <div class="text-xl tech-title">
      {{ props.title }}
    </div>
    <div>
      <el-button 
        :icon="isCollected ? StarFilled : Star" 
        :type="isCollected ? 'warning' : 'default'"
        @click="toggleCollect"
        class="tech-button"
        size="default"
      >
        {{ isCollected ? '已收藏' : '收藏' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
/* 详情页头部 — 磨砂玻璃 */
.tech-detail-header {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  position: relative;
}

/* 标题 */
.tech-title {
  position: relative;
  font-weight: 600;
  color: var(--color-text);
}

/* 按钮 */
.tech-button {
  position: relative;
  border-radius: 999px;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.tech-button:active {
  transform: scale(0.98);
}

/* 收藏状态按钮样式 */
.tech-button.is-warning {
  background: var(--color-warning);
  border-color: var(--color-warning);
  color: #fff;
}

.tech-button.is-warning:hover {
  background: #b45309;
  border-color: #b45309;
}

/* 未收藏状态按钮样式 */
.tech-button.is-default {
  background: rgba(255, 255, 255, 0.7);
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

.tech-button.is-default:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>