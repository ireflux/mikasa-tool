<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="tool-section">
        <el-row :gutter="16" align="middle">
          <el-col :span="8">
            <span class="tool-label">{{ t('convert.targetFormat') }}</span>
            <el-select v-model="targetFormat" style="width: 100%">
              <el-option v-for="fmt in formats" :key="fmt" :label="fmt.toUpperCase()" :value="fmt" />
            </el-select>
          </el-col>
          <el-col :span="16" class="tool-actions">
            <el-button type="primary" @click="pickFile">
              {{ t('convert.addImages') }}
            </el-button>
            <el-button v-if="convertedList.length" type="success" @click="convertAll">
              {{ t('convert.convertAll') }}
            </el-button>
            <el-button v-if="convertedList.length" @click="clearAll">
              {{ t('convert.clear') }}
            </el-button>
            <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onPick" />
          </el-col>
        </el-row>
      </div>

      <el-empty
        v-if="!convertedList.length"
        :description="t('convert.empty')"
        :image-size="80"
      />

      <div v-else class="convert-grid">
        <div v-for="item in convertedList" :key="item.id" class="convert-card">
          <div class="convert-card-name" :title="item.name">{{ item.name }}</div>
          <div class="convert-card-badge">
            <el-tag size="small">{{ item.fromFormat.toUpperCase() }} → {{ targetFormat.toUpperCase() }}</el-tag>
          </div>
          <el-image :src="item.url" fit="contain" class="convert-thumb" :preview-src-list="[item.url]" />
          <div class="convert-card-sizes">
            <span>{{ formatSize(item.size) }}</span>
            <span class="convert-arrow">→</span>
            <span>{{ formatSize(item.resultSize) }}</span>
          </div>
          <div class="tool-actions convert-card-actions">
            <el-button size="small" type="primary" @click="convertOne(item)">{{ t('convert.convert') }}</el-button>
            <el-button size="small" :disabled="!item.resultUrl" @click="downloadOne(item)">
              {{ t('convert.download') }}
            </el-button>
            <el-button size="small" type="danger" plain @click="removeItem(item.id)">{{ t('convert.remove') }}</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 rounded-2xl p-4 tech-detail-section">
      <el-divider content-position="left" class="tech-divider">{{ t('cron.note') }}</el-divider>
      <div class="m-4">
        <el-text>{{ t('convert.noteDesc') }}</el-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

interface ConvertItem {
  id: number
  name: string
  baseName: string
  fromFormat: string
  size: number
  url: string
  resultUrl: string
  resultSize: number
  image: HTMLImageElement | null
}

const fileInput = ref<HTMLInputElement>()
const targetFormat = ref('png')
const formats = ['png', 'jpeg', 'webp']
const convertedList = reactive<ConvertItem[]>([])
let idCounter = 0

const pickFile = () => fileInput.value?.click()

const onPick = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  ;(e.target as HTMLInputElement).value = ''
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    const baseName = file.name.replace(/\.[^.]+$/, '')
    const fromFormat = (file.name.split('.').pop() ?? '').toLowerCase()
    const item: ConvertItem = {
      id: ++idCounter,
      name: file.name,
      baseName,
      fromFormat,
      size: file.size,
      url: URL.createObjectURL(file),
      resultUrl: '',
      resultSize: 0,
      image: null,
    }
    const img = new Image()
    img.onload = () => {
      item.image = img
    }
    img.src = item.url
    convertedList.push(item)
  }
}

const convertOne = (item: ConvertItem) => {
  if (!item.image) {
    ElMessage.warning(t('convert.notLoaded'))
    return
  }
  const canvas = document.createElement('canvas')
  canvas.width = item.image.width
  canvas.height = item.image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(item.image, 0, 0)
  const mime = `image/${targetFormat.value}`
  const dataUrl = canvas.toDataURL(mime, 0.92)
  item.resultUrl = dataUrl
  item.resultSize = dataUrl.length * 0.75
}

const convertAll = () => {
  for (const item of convertedList) convertOne(item)
}

const downloadOne = (item: ConvertItem) => {
  if (!item.resultUrl) return
  const a = document.createElement('a')
  a.href = item.resultUrl
  a.download = `${item.baseName}.${targetFormat.value}`
  a.click()
}

const removeItem = (id: number) => {
  const index = convertedList.findIndex((i) => i.id === id)
  if (index > -1) {
    URL.revokeObjectURL(convertedList[index].url)
    convertedList.splice(index, 1)
  }
}

const clearAll = () => {
  for (const item of convertedList) URL.revokeObjectURL(item.url)
  convertedList.length = 0
}

const formatSize = (bytes: number) => {
  if (bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i++
  }
  return `${size.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}
</script>

<style scoped>
.convert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.convert-card {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.convert-card-name {
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.convert-card-badge {
  display: flex;
  justify-content: flex-start;
}

.convert-thumb {
  width: 100%;
  height: 140px;
  border-radius: 6px;
  background: repeating-conic-gradient(#f5f5f5 0% 25%, #fff 0% 50%) 0 0 / 20px 20px;
}

.convert-card-sizes {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.convert-arrow {
  color: var(--color-primary);
}

.convert-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.hidden {
  display: none;
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
