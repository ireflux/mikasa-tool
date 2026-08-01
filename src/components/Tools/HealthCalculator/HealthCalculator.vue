<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="t('tool.healthcalculator.title')"></DetailHeader>

    <div class="tool-card">
      <el-tabs v-model="activeTab">
        <!-- ===== BMI ===== -->
        <el-tab-pane :label="t('health.bmi')" name="bmi">
          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="8">
                <span class="tool-label">{{ t('health.height') }} (cm)</span>
                <el-input-number v-model="height" :min="50" :max="300" style="width: 100%" />
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('health.weight') }} (kg)</span>
                <el-input-number v-model="weight" :min="1" :max="500" style="width: 100%" />
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('health.age') }}</span>
                <el-input-number v-model="age" :min="1" :max="120" style="width: 100%" />
              </el-col>
            </el-row>
          </div>
          <div class="tool-section tool-actions">
            <el-button type="primary" @click="calcBmi">{{ t('health.calcBmi') }}</el-button>
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
              <span>{{ t('health.underweight') }}</span>
              <span>{{ t('health.normal') }}</span>
              <span>{{ t('health.overweight') }}</span>
              <span>{{ t('health.obese') }}</span>
            </div>
            <div class="bmi-detail">
              <span class="bmi-detail-label">{{ t('health.healthyRange') }}</span>
              <span class="bmi-detail-value">
                {{ bmiResult.rangeMin.toFixed(1) }} - {{ bmiResult.rangeMax.toFixed(1) }} kg
              </span>
            </div>
            <div class="bmi-detail">
              <span class="bmi-detail-label">{{ t('health.standardWeight') }}</span>
              <span class="bmi-detail-value">{{ bmiResult.standard.toFixed(1) }} kg</span>
            </div>
          </div>
        </el-tab-pane>

        <!-- ===== 房贷 ===== -->
        <el-tab-pane :label="t('health.mortgage')" name="mortgage">
          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="8">
                <span class="tool-label">{{ t('health.loanAmount') }} ({{ t('health.wan') }})</span>
                <el-input-number v-model="loanAmount" :min="1" :max="100000" style="width: 100%" />
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('health.rate') }} (%)</span>
                <el-input-number v-model="rate" :min="0.1" :max="20" :precision="2" :step="0.05" style="width: 100%" />
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('health.years') }}</span>
                <el-input-number v-model="years" :min="1" :max="50" style="width: 100%" />
              </el-col>
            </el-row>
          </div>
          <div class="tool-section">
            <span class="tool-label">{{ t('health.method') }}</span>
            <el-radio-group v-model="method">
              <el-radio-button value="equal-payment">{{ t('health.equalPayment') }}</el-radio-button>
              <el-radio-button value="equal-principal">{{ t('health.equalPrincipal') }}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="tool-section tool-actions">
            <el-button type="primary" @click="calcMortgage">{{ t('health.calcMortgage') }}</el-button>
          </div>

          <div v-if="mortgageResult" class="tool-section">
            <div class="mortgage-summary">
              <div class="mortgage-cell">
                <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.monthlyPayment) }}</div>
                <div class="mortgage-cell-label">{{ t('health.monthlyPayment') }}</div>
              </div>
              <div class="mortgage-cell">
                <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.totalInterest) }}</div>
                <div class="mortgage-cell-label">{{ t('health.totalInterest') }}</div>
              </div>
              <div class="mortgage-cell">
                <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.totalPayment) }}</div>
                <div class="mortgage-cell-label">{{ t('health.totalPayment') }}</div>
              </div>
            </div>

            <div v-if="method === 'equal-principal'" class="mortgage-extra">
              <div class="bmi-detail">
                <span class="bmi-detail-label">{{ t('health.firstPayment') }}</span>
                <span class="bmi-detail-value">{{ formatMoney(mortgageResult.firstPayment) }}</span>
              </div>
              <div class="bmi-detail">
                <span class="bmi-detail-label">{{ t('health.lastPayment') }}</span>
                <span class="bmi-detail-value">{{ formatMoney(mortgageResult.lastPayment) }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

const activeTab = ref('bmi')

// ===== BMI =====
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
  let labelKey = 'health.normal'
  if (bmi < 18.5) {
    type = 'warning'
    labelKey = 'health.underweight'
  } else if (bmi >= 28) {
    type = 'danger'
    labelKey = 'health.obese'
  } else if (bmi >= 24) {
    type = 'warning'
    labelKey = 'health.overweight'
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

// ===== 房贷 =====
const loanAmount = ref(100)
const rate = ref(3.85)
const years = ref(30)
const method = ref('equal-payment')
const mortgageResult = ref<{
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  firstPayment: number
  lastPayment: number
} | null>(null)

const calcMortgage = () => {
  const total = loanAmount.value * 10000
  const monthlyRate = rate.value / 100 / 12
  const months = years.value * 12
  if (method.value === 'equal-payment') {
    const factor = Math.pow(1 + monthlyRate, months)
    const monthly = (total * monthlyRate * factor) / (factor - 1)
    mortgageResult.value = {
      monthlyPayment: monthly,
      totalPayment: monthly * months,
      totalInterest: monthly * months - total,
      firstPayment: monthly,
      lastPayment: monthly,
    }
  } else {
    const principalPerMonth = total / months
    const first = principalPerMonth + total * monthlyRate
    const last = principalPerMonth + principalPerMonth * monthlyRate
    const totalInterest = ((total + principalPerMonth) / 2) * months * monthlyRate
    mortgageResult.value = {
      monthlyPayment: first,
      totalPayment: total + totalInterest,
      totalInterest,
      firstPayment: first,
      lastPayment: last,
    }
  }
}

const formatMoney = (n: number) => {
  const str = n.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return `¥${str}`
}
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

.mortgage-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.mortgage-cell {
  text-align: center;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 8px;
}

.mortgage-cell-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}

.mortgage-cell-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 6px;
}

.mortgage-extra {
  margin-top: 12px;
}
</style>
