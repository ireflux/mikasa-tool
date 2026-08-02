<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="tool-section">
        <span class="tool-label">{{ t('cron.expression') }}</span>
        <el-input
          v-model="expression"
          :placeholder="'* * * * * *'"
          class="cron-input"
          @keyup.enter="parse"
        >
          <template #append>
            <el-button type="primary" @click="parse">{{ t('cron.parse') }}</el-button>
          </template>
        </el-input>
        <div class="cron-field-hints">
          <span
            v-for="(field, index) in ['cron.second', 'cron.minute', 'cron.hour', 'cron.day', 'cron.month', 'cron.week']"
            :key="field"
            class="cron-field-label"
          >
            {{ t(field) }}<span v-if="index === 0" class="cron-field-optional">({{ t('cron.optional') }})</span>
          </span>
        </div>
        <div class="cron-presets">
          <el-tag
            v-for="preset in presets"
            :key="preset.expr"
            class="cron-preset-tag"
            @click="applyPreset(preset)"
          >
            {{ t(preset.labelKey) }}
          </el-tag>
        </div>
      </div>

      <div class="tool-section">
        <span class="tool-label">{{ t('cron.result') }}</span>
        <el-input :model-value="humanDesc || '--'" readonly>
          <template #prefix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </div>

      <div v-if="nextTimes.length" class="tool-section">
        <span class="tool-label">{{ t('cron.nextTimes', { count: nextTimes.length }) }}</span>
        <div class="cron-times">
          <div v-for="(time, index) in nextTimes" :key="time.getTime()" class="cron-time-row">
            <span class="cron-time-index">{{ index + 1 }}</span>
            <span>{{ formatTime(time) }}</span>
            <span class="cron-time-relative">{{ relativeTime(time) }}</span>
          </div>
        </div>
        <el-button size="small" class="mt-2" @click="loadMore">{{ t('cron.loadMore') }}</el-button>
      </div>

      <el-alert
        v-if="error"
        :title="error"
        type="error"
        show-icon
        :closable="false"
        class="mt-2"
      />
    </div>

    <div class="mt-3 rounded-2xl p-4 tech-detail-section">
      <el-divider content-position="left" class="tech-divider">{{ t('cron.note') }}</el-divider>
      <div class="m-4">
        <el-text>{{ t('cron.noteDesc') }}</el-text>
        <ul class="cron-fields mt-2">
          <li><b>秒 分 时 日 月 周</b>：0-59 | 0-59 | 0-23 | 1-31 | 1-12 | 0-7（0 和 7 都表示周日）</li>
          <li><b>*</b>：任意值 &nbsp;&nbsp;<b>,</b>：列表 &nbsp;&nbsp;<b>-</b>：区间 &nbsp;&nbsp;<b>/</b>：步长</li>
          <li><b>L</b>：最后（日、周字段） &nbsp;&nbsp;<b>W</b>：最近的工作日 &nbsp;&nbsp;<b>#</b>：第几个星期几</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Document } from '@element-plus/icons-vue'
import { CronExpressionParser } from 'cron-parser'
import ExpressionDescriptor from 'cronstrue/i18n'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t, locale } = useI18n()

const expression = ref('*/5 * * * * *')
const humanDesc = ref('')
const error = ref('')
const nextTimes = ref<Date[]>([])
const limit = ref(10)

const presets = [
  { labelKey: 'cron.every5s', expr: '*/5 * * * * *' },
  { labelKey: 'cron.everyMin', expr: '0 * * * * *' },
  { labelKey: 'cron.everyHour', expr: '0 0 * * * *' },
  { labelKey: 'cron.everyDay', expr: '0 0 0 * * *' },
  { labelKey: 'cron.everyMonday', expr: '0 0 0 * * 1' },
  { labelKey: 'cron.everyMonth', expr: '0 0 0 1 * *' },
]

const parse = () => {
  error.value = ''
  humanDesc.value = ''
  nextTimes.value = []
  limit.value = 10
  if (!expression.value.trim()) {
    error.value = t('cron.emptyExpr')
    return
  }
  try {
    const cron = CronExpressionParser.parse(expression.value)
    const lang = locale.value === 'zh-CN' ? 'zh_CN' : 'en'
    humanDesc.value = ExpressionDescriptor.toString(expression.value, { locale: lang })
    const times: Date[] = []
    let cursor = cron
    for (let i = 0; i < limit.value; i++) {
      times.push(cursor.next().toDate())
    }
    nextTimes.value = times
  } catch {
    error.value = t('cron.invalidExpr')
  }
}

const loadMore = () => {
  limit.value += 10
  parse()
}

const applyPreset = (preset: { labelKey: string; expr: string }) => {
  expression.value = preset.expr
  parse()
}

const formatTime = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const relativeTime = (date: Date) => {
  const diff = date.getTime() - Date.now()
  const totalSeconds = Math.floor(diff / 1000)
  if (totalSeconds <= 0) return t('cron.now')
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const parts: string[] = []
  if (days) parts.push(`${days}${t('cron.days')}`)
  if (hours) parts.push(`${hours}${t('cron.hours')}`)
  if (minutes) parts.push(`${minutes}${t('cron.minutes')}`)
  if (seconds || !parts.length) parts.push(`${seconds}${t('cron.seconds')}`)
  return t('cron.after', { time: parts.join(' ') })
}

parse()
</script>

<style scoped>
.cron-input :deep(.el-input-group__append) {
  padding: 0;
}

.cron-input :deep(.el-input-group__append .el-button) {
  margin: 0;
  border: none;
}

.cron-field-hints {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.cron-field-label {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.cron-field-optional {
  color: var(--color-text-third);
  font-size: 11px;
}

.cron-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.cron-preset-tag {
  cursor: pointer;
}

.cron-times {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
}

.cron-time-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  font-size: 14px;
}

.cron-time-row + .cron-time-row {
  border-top: 1px dashed var(--color-border);
}

.cron-time-index {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cron-time-relative {
  margin-left: auto;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.cron-fields {
  list-style: none;
  padding: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.tech-detail-section {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  position: relative;
}

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
