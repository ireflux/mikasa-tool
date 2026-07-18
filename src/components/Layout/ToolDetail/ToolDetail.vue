<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '描述'
  }
})
</script>

<template>
  <!-- desc -->
  <div class="mt-3 rounded-2xl p-4 tech-detail-section">
    <el-divider content-position="left" class="tech-divider">{{ props.title }}</el-divider>
    <div class="m-4">
      <slot></slot>
    </div> 
  </div>
</template>

<style scoped>
/* 详情区块 — 磨砂玻璃 */
.tech-detail-section {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  position: relative;
}

/* 分割线 — 去掉横线，标题化展示 */
.tech-divider {
  border: none;
  position: relative;
}

.tech-divider :deep(.el-divider__text) {
  background: transparent;
  padding: 0 16px;
  font-weight: 600;
  color: var(--color-text);
  display: inline-flex;
  align-items: center;
}

/* 标题左侧 Google Blue 强调条 */
.tech-divider :deep(.el-divider__text)::before {
  content: '';
  display: block;
  width: 4px;
  height: 16px;
  background: var(--color-primary);
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}
</style>