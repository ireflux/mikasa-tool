<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UnitConverterConfig, UnitItem } from '@/utils/unit'
import { convertUnits } from '@/utils/unit'

const props = defineProps<{ config: UnitConverterConfig }>()

const { t } = useI18n()

const values = reactive<Record<string, string | number>>(
  Object.fromEntries(props.config.groups.flatMap((g) => g.units.map((u) => [u.key, '']))),
)

const clear = () => {
  for (const key in values) {
    values[key] = ''
  }
}

const tran = (key: string) => {
  convertUnits(props.config, values, key)
}

const chunkUnits = (units: UnitItem[], size: number): UnitItem[][] => {
  const rows: UnitItem[][] = []
  for (let i = 0; i < units.length; i += size) {
    rows.push(units.slice(i, i + size))
  }
  return rows
}
</script>

<template>
  <div>
    <div>
      <template v-for="group in props.config.groups" :key="group.title">
        <el-divider content-position="left">{{ t(group.title) }}</el-divider>
        <div v-for="row in chunkUnits(group.units, 2)" :key="row[0].key" class="custom-box">
          <div v-for="unit in row" :key="unit.key" class="custom-box-single">
            <el-text class="custom-box-text">{{ t(unit.label) }}</el-text>
            <el-input v-model="values[unit.key]" placeholder="" class="input-with-select">
              <template #append>
                <el-button @click="tran(unit.key)">{{ t('unit.convert') }}</el-button>
              </template>
            </el-input>
          </div>
        </div>
      </template>
    </div>

    <div class="w-full text-center">
      <el-button type="primary" @click="clear">{{ t('unit.clear') }}</el-button>
    </div>
  </div>
</template>

<style scoped>
.custom-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem /* 12px */;
}
.custom-box-single {
  display: flex;
  width: 50%;
}
.custom-box-text {
  text-align: center;
  width: 5rem /* 80px */;
  flex-shrink: 0;
}
</style>
