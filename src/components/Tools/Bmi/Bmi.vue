<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="tool-section">
        <el-row :gutter="16">
          <el-col :span="8">
            <span class="tool-label">{{ t('bmi.height') }} (cm)</span>
            <el-input-number v-model="height" :min="50" :max="300" style="width: 100%" />
          </el-col>
          <el-col :span="8">
            <span class="tool-label">{{ t('bmi.weight') }} (kg)</span>
            <el-input-number v-model="weight" :min="1" :max="500" style="width: 100%" />
          </el-col>
          <el-col :span="8">
            <span class="tool-label">{{ t('bmi.age') }}</span>
            <el-input-number v-model="age" :min="1" :max="120" style="width: 100%" />
          </el-col>
        </el-row>
      </div>
      <div class="tool-section tool-actions">
        <el-button type="primary" @click="calcBmi">{{ t('bmi.calc') }}</el-button>
      </div>
      <div v-if="bmiResult" class="tool-section bmi-result">
        <div class="bmi-big">
          <span class="bmi-value">{{ bmiResult.value.toFixed(1) }}</span>
          <el-tag :type="bmiResult.type" size="large">{{ t(bmiResult.labelKey) }}</el-tag>
        </div>
        <el-progress
          :percentage="bmiPercent()"
          :stroke-width="14"
          :show-text="false"
          :color="bmiColors"
        />
        <div class="bmi-scale">
          <span>{{ t('bmi.underweight') }}</span>
          <span>{{ t('bmi.normal') }}</span>
          <span>{{ t('bmi.overweight') }}</span>
          <span>{{ t('bmi.obese') }}</span>
        </div>
        <div class="bmi-detail">
          <span class="bmi-detail-label">{{ t('bmi.healthyRange') }}</span>
          <span class="bmi-detail-value">
            {{ bmiResult.rangeMin.toFixed(1) }} - {{ bmiResult.rangeMax.toFixed(1) }} kg
          </span>
        </div>
        <div class="bmi-detail">
          <span class="bmi-detail-label">{{ t('bmi.standardWeight') }}</span>
          <span class="bmi-detail-value">{{ bmiResult.standard.toFixed(1) }} kg</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

const height = ref(170)
const weight = ref(65)
const age = ref(30)
const bmiResult = ref<{
  value: number
  type: 'success' | 'warning' | 'danger' | 'primary'
  labelKey: string
  rangeMin: number
  rangeMax: number
  standard: number
} | null>(null)

const calcBmi = () => {
  const h = height.value / 100
  const bmi = weight.value / (h * h)
  let type: 'success' | 'warning' | 'danger' | 'primary' = 'success'
  let labelKey = 'bmi.normal'
  if (bmi < 18.5) {
    type = 'warning'
    labelKey = 'bmi.underweight'
  } else if (bmi >= 28) {
    type = 'danger'
    labelKey = 'bmi.obese'
  } else if (bmi >= 24) {
    type = 'warning'
    labelKey = 'bmi.overweight'
  }
  bmiResult.value = {
    value: bmi,
    type,
    labelKey,
    rangeMin: 18.5 * h * h,
    rangeMax: 23.9 * h * h,
    standard: 22 * h * h,
  }
}

const bmiPercent = () => {
  const bmi = bmiResult.value?.value ?? 0
  return Math.min(100, Math.max(0, (bmi / 40) * 100))
}

const bmiColors = [
  { color: '#409eff', percentage: 18.5 / 40 / 100 },
  { color: '#67c23a', percentage: 24 / 40 / 100 },
  { color: '#e6a23c', percentage: 28 / 40 / 100 },
  { color: '#f56c6c', percentage: 100 },
]
</script>

<style scoped>
.bmi-result {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bmi-big {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bmi-value {
  font-size: 40px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.bmi-scale {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.bmi-detail {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px dashed var(--color-border);
}

.bmi-detail-label {
  color: var(--color-text-secondary);
}

.bmi-detail-value {
  font-weight: 500;
}
</style>