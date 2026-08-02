<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="tool-section">
        <el-row :gutter="16">
          <el-col :span="8">
            <span class="tool-label">{{ t('mortgage.loanAmount') }} ({{ t('mortgage.wan') }})</span>
            <el-input-number v-model="loanAmount" :min="1" :max="100000" style="width: 100%" />
          </el-col>
          <el-col :span="8">
            <span class="tool-label">{{ t('mortgage.rate') }} (%)</span>
            <el-input-number v-model="rate" :min="0.1" :max="20" :precision="2" :step="0.05" style="width: 100%" />
          </el-col>
          <el-col :span="8">
            <span class="tool-label">{{ t('mortgage.years') }}</span>
            <el-input-number v-model="years" :min="1" :max="50" style="width: 100%" />
          </el-col>
        </el-row>
      </div>
      <div class="tool-section">
        <span class="tool-label">{{ t('mortgage.method') }}</span>
        <el-radio-group v-model="method">
          <el-radio-button value="equal-payment">{{ t('mortgage.equalPayment') }}</el-radio-button>
          <el-radio-button value="equal-principal">{{ t('mortgage.equalPrincipal') }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tool-section tool-actions">
        <el-button type="primary" @click="calcMortgage">{{ t('mortgage.calc') }}</el-button>
      </div>

      <div v-if="mortgageResult" class="tool-section">
        <div class="mortgage-summary">
          <div class="mortgage-cell">
            <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.monthlyPayment) }}</div>
            <div class="mortgage-cell-label">{{ t('mortgage.monthlyPayment') }}</div>
          </div>
          <div class="mortgage-cell">
            <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.totalInterest) }}</div>
            <div class="mortgage-cell-label">{{ t('mortgage.totalInterest') }}</div>
          </div>
          <div class="mortgage-cell">
            <div class="mortgage-cell-value">{{ formatMoney(mortgageResult.totalPayment) }}</div>
            <div class="mortgage-cell-label">{{ t('mortgage.totalPayment') }}</div>
          </div>
        </div>

        <div v-if="method === 'equal-principal'" class="mortgage-extra">
          <div class="mortgage-detail">
            <span class="mortgage-detail-label">{{ t('mortgage.firstPayment') }}</span>
            <span class="mortgage-detail-value">{{ formatMoney(mortgageResult.firstPayment) }}</span>
          </div>
          <div class="mortgage-detail">
            <span class="mortgage-detail-label">{{ t('mortgage.lastPayment') }}</span>
            <span class="mortgage-detail-value">{{ formatMoney(mortgageResult.lastPayment) }}</span>
          </div>
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

.mortgage-detail {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  margin-top: 12px;
  border-top: 1px dashed var(--color-border);
}

.mortgage-detail-label {
  color: var(--color-text-secondary);
}

.mortgage-detail-value {
  font-weight: 500;
}
</style>