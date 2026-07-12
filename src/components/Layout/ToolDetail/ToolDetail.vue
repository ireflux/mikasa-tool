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
/* 详情区块 — 扁平设计 */
.tech-detail-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  position: relative;
}

/* 分割线 */
.tech-divider {
  position: relative;
}

.tech-divider :deep(.el-divider__text) {
  background: var(--color-surface);
  padding: 0 16px;
  font-weight: 600;
  color: var(--color-text);
}

.tech-divider :deep(.el-divider__text::before),
.tech-divider :deep(.el-divider__text::after) {
  border-color: var(--color-border);
}
</style>