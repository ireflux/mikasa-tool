<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import UnitConverter from './UnitConverter.vue'
import { unitConverters } from '@/data/units'

const { t } = useI18n()

const activeName = ref('length')

const route = useRoute()

onMounted(() => {
  if (route.query.active) {
    const id = String(route.query.active)
    if (unitConverters.some((c) => c.id === id)) {
      activeName.value = id
    }
  }
})
</script>

<template>
  <div>
    <DetailHeader></DetailHeader>
    <div>
      <div class="tool-card">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane
            v-for="converter in unitConverters"
            :key="converter.id"
            :label="t(`unit.tab.${converter.id}`)"
            :name="converter.id"
          >
            <UnitConverter :config="converter" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('common.desc')">
      <el-text>
        {{ t('tool.unit.desc') }}
      </el-text>
    </ToolDetail>
  </div>
</template>
