<script setup lang="ts">
import {  ref } from 'vue';
const appDesc = ref(import.meta.env.VITE_APP_DESC || '')
const currentYear: number = new Date().getFullYear();
</script>

<template>
  <div class="w-full rounded-2xl z-10 p-5 text-center tech-footer">
    <el-text>{{ appDesc }}  © {{ currentYear }} <a href="https://github.com/ireflux/mikasa-tool" target="_blank" class="text-blue-700 tech-link">Mikasa-Tool</a></el-text>
  </div>
</template>

<style scoped>
/* 简约页脚 */
.tech-footer {
  background: transparent;
  border: none;
}

/* 链接 */
.tech-link {
  transition: color var(--transition-fast);
  text-decoration: none;
  color: var(--color-primary);
}

.tech-link:hover {
  color: var(--color-primary-hover);
}
</style>