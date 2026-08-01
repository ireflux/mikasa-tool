<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="t('tool.datecalculator.title')"></DetailHeader>

    <div class="tool-card">
      <el-tabs v-model="activeTab">
        <!-- ===== 日期推算 ===== -->
        <el-tab-pane :label="t('datecalc.calc')" name="calc">
          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="10">
                <span class="tool-label">{{ t('datecalc.baseDate') }}</span>
                <el-date-picker v-model="baseDate" type="date" style="width: 100%" />
              </el-col>
              <el-col :span="7">
                <span class="tool-label">{{ t('datecalc.offset') }}</span>
                <el-input-number v-model="offsetDays" :step="1" style="width: 100%" />
              </el-col>
              <el-col :span="7">
                <span class="tool-label">{{ t('datecalc.unit') }}</span>
                <el-select v-model="offsetUnit" style="width: 100%">
                  <el-option :label="t('datecalc.day')" value="day" />
                  <el-option :label="t('datecalc.week')" value="week" />
                  <el-option :label="t('datecalc.month')" value="month" />
                  <el-option :label="t('datecalc.year')" value="year" />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="tool-section tool-actions">
            <el-button type="primary" @click="calcOffset">{{ t('datecalc.calc') }}</el-button>
          </div>
          <div v-if="calcResult" class="tool-section calc-result">
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.resultDate') }}</span>
              <span class="calc-result-value">{{ calcResult }}</span>
            </div>
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.weekday') }}</span>
              <span class="calc-result-value">{{ weekdayText(calcResultDate) }}</span>
            </div>
          </div>
        </el-tab-pane>

        <!-- ===== 日期差 ===== -->
        <el-tab-pane :label="t('datecalc.diff')" name="diff">
          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="12">
                <span class="tool-label">{{ t('datecalc.startDate') }}</span>
                <el-date-picker v-model="diffStart" type="date" style="width: 100%" />
              </el-col>
              <el-col :span="12">
                <span class="tool-label">{{ t('datecalc.endDate') }}</span>
                <el-date-picker v-model="diffEnd" type="date" style="width: 100%" />
              </el-col>
            </el-row>
          </div>
          <div class="tool-section tool-actions">
            <el-button type="primary" @click="calcDiff">{{ t('datecalc.calcDiff') }}</el-button>
          </div>
          <div v-if="diffResult" class="tool-section calc-result">
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.diffDays') }}</span>
              <span class="calc-result-value calc-result-big">{{ diffResult.days }}</span>
            </div>
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.diffWeeks') }}</span>
              <span class="calc-result-value">{{ diffResult.weeksText }}</span>
            </div>
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.diffHours') }}</span>
              <span class="calc-result-value">{{ diffResult.hours }}</span>
            </div>
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.diffMinutes') }}</span>
              <span class="calc-result-value">{{ diffResult.minutes }}</span>
            </div>
            <div class="calc-result-row">
              <span class="calc-result-label">{{ t('datecalc.diffSeconds') }}</span>
              <span class="calc-result-value">{{ diffResult.seconds }}</span>
            </div>
          </div>
        </el-tab-pane>

        <!-- ===== 倒数日 ===== -->
        <el-tab-pane :label="t('datecalc.countdown')" name="countdown">
          <div class="tool-section">
            <span class="tool-label">{{ t('datecalc.eventName') }}</span>
            <el-input v-model="eventName" :placeholder="t('datecalc.eventNamePh')" />
          </div>
          <div class="tool-section">
            <span class="tool-label">{{ t('datecalc.eventDate') }}</span>
            <el-date-picker v-model="eventDate" type="date" style="width: 100%" />
          </div>
          <div class="tool-section tool-actions">
            <el-button type="primary" @click="addEvent">{{ t('datecalc.addEvent') }}</el-button>
          </div>

          <div v-if="events.length" class="countdown-list">
            <div v-for="event in events" :key="event.id" class="countdown-item">
              <div class="countdown-item-info">
                <div class="countdown-item-name">{{ event.name }}</div>
                <div class="countdown-item-date">{{ event.date }}</div>
              </div>
              <div class="countdown-item-days">
                <template v-if="(daysToEvent.get(event.id) ?? 0) > 0">
                  <span class="countdown-days-big">{{ daysToEvent.get(event.id) }}</span>
                  <span class="countdown-days-label">{{ t('datecalc.daysLeft') }}</span>
                </template>
                <template v-else-if="(daysToEvent.get(event.id) ?? 0) < 0">
                  <span class="countdown-days-big countdown-past">{{ -(daysToEvent.get(event.id) ?? 0) }}</span>
                  <span class="countdown-days-label">{{ t('datecalc.daysPast') }}</span>
                </template>
                <template v-else>
                  <span class="countdown-days-label">{{ t('datecalc.isToday') }}</span>
                </template>
              </div>
              <el-button size="small" type="danger" plain @click="removeEvent(event.id)">
                {{ t('datecalc.remove') }}
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

const activeTab = ref('calc')

// ===== 日期推算 =====
const baseDate = ref(new Date())
const offsetDays = ref(30)
const offsetUnit = ref('day')
const calcResult = ref('')
const calcResultDate = ref<Date | null>(null)

const calcOffset = () => {
  const date = new Date(baseDate.value)
  const amount = offsetDays.value
  if (offsetUnit.value === 'day') date.setDate(date.getDate() + amount)
  else if (offsetUnit.value === 'week') date.setDate(date.getDate() + amount * 7)
  else if (offsetUnit.value === 'month') date.setMonth(date.getMonth() + amount)
  else date.setFullYear(date.getFullYear() + amount)
  calcResultDate.value = date
  calcResult.value = formatDate(date)
}

// ===== 日期差 =====
const diffStart = ref(new Date())
const diffEnd = ref(new Date(Date.now() + 86400000))
const diffResult = ref<{
  days: number
  weeksText: string
  hours: number
  minutes: number
  seconds: number
} | null>(null)

const calcDiff = () => {
  const start = new Date(diffStart.value)
  const end = new Date(diffEnd.value)
  const ms = end.getTime() - start.getTime()
  const sign = ms < 0 ? -1 : 1
  const absMs = Math.abs(ms)
  const days = Math.floor(absMs / 86400000)
  const hours = Math.floor(absMs / 3600000)
  const minutes = Math.floor(absMs / 60000)
  const seconds = Math.floor(absMs / 1000)
  const weeks = Math.floor(days / 7)
  const remainDays = days % 7
  diffResult.value = {
    days: sign * days,
    weeksText:
      weeks > 0
        ? `${sign < 0 ? '-' : ''}${weeks} ${t('datecalc.weeks')} ${remainDays} ${t('datecalc.days')}`
        : `${sign < 0 ? '-' : ''}${days} ${t('datecalc.days')}`,
    hours: sign * hours,
    minutes: sign * minutes,
    seconds: sign * seconds,
  }
}

// ===== 倒数日 =====
interface CountdownEvent {
  id: number
  name: string
  date: string
}

const eventName = ref('')
const eventDate = ref(new Date())
const events = reactive<CountdownEvent[]>(loadEvents())

function loadEvents(): CountdownEvent[] {
  try {
    const raw = localStorage.getItem('mikasa_countdown_events')
    return raw ? (JSON.parse(raw) as CountdownEvent[]) : []
  } catch {
    return []
  }
}

function saveEvents() {
  localStorage.setItem('mikasa_countdown_events', JSON.stringify(events))
}

const addEvent = () => {
  if (!eventName.value.trim()) return
  events.push({
    id: Date.now(),
    name: eventName.value.trim(),
    date: formatDate(eventDate.value),
  })
  eventName.value = ''
  saveEvents()
}

const removeEvent = (id: number) => {
  const index = events.findIndex((e) => e.id === id)
  if (index > -1) {
    events.splice(index, 1)
    saveEvents()
  }
}

const daysToEvent = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = formatDate(today)
  const map = new Map<number, number>()
  for (const event of events) {
    const diffMs = new Date(event.date + 'T00:00:00').getTime() - new Date(todayStr + 'T00:00:00').getTime()
    map.set(event.id, Math.round(diffMs / 86400000))
  }
  return map
})

// ===== 通用 =====
const weekdayText = (date: Date | null) => {
  if (!date) return ''
  const weekdays = [
    t('datecalc.sunday'),
    t('datecalc.monday'),
    t('datecalc.tuesday'),
    t('datecalc.wednesday'),
    t('datecalc.thursday'),
    t('datecalc.friday'),
    t('datecalc.saturday'),
  ]
  return weekdays[date.getDay()]
}

const formatDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
</script>

<style scoped>
.calc-result {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px;
}

.calc-result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.calc-result-row + .calc-result-row {
  border-top: 1px dashed var(--color-border);
}

.calc-result-label {
  color: var(--color-text-secondary);
}

.calc-result-value {
  font-weight: 500;
}

.calc-result-big {
  font-size: 24px;
  color: var(--color-primary);
  font-weight: 700;
}

.countdown-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.countdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 16px;
}

.countdown-item-info {
  flex: 1;
  min-width: 0;
}

.countdown-item-name {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.countdown-item-date {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.countdown-item-days {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.countdown-days-big {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.countdown-days-big.countdown-past {
  color: var(--el-color-danger);
}

.countdown-days-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>
