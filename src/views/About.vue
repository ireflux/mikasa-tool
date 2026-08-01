<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col mt-8 flex-1 items-center tool-card p-10">
    <div class="p-5 w-2/3">
      <h1 class="text-2xl font-bold">{{ t('about.title') }}</h1>
      <p class="mt-6">
        <el-text>
          <i18n-t keypath="about.desc">
            <template #link>
              <el-link href="https://github.com/ireflux/mikasa-tool" target="_blank" type="primary">Mikasa Tool</el-link>
            </template>
          </i18n-t>
        </el-text>
      </p>

      <h1 class="text-2xl font-bold mt-6 mb-6">{{ t('about.techTitle') }}</h1>
      <p>
        <el-text>
          <i18n-t keypath="about.techDesc">
            <template #file>
              <el-link href="https://github.com/ireflux/mikasa-tool/blob/master/package.json" target="_blank" type="primary">package.json</el-link>
            </template>
          </i18n-t>
        </el-text>
      </p>
      <h1 class="text-2xl font-bold mt-6 mb-6">{{ t('about.bugTitle') }}</h1>
      <p>
        <el-text>
          <i18n-t keypath="about.bugDesc">
            <template #issues>
              <el-link type="primary" target="_blank" href="https://github.com/ireflux/mikasa-tool/issues/new" class="">issues</el-link>
            </template>
          </i18n-t>
        </el-text>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
