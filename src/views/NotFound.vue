<template>
  <div>
    <el-empty :image-size="200" :description="t('ui.notFound')" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped lang="scss">
</style>
