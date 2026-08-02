<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div v-if="!originalUrl" class="compress-dropzone" @click="pickFile" @dragover.prevent @drop.prevent="onDrop">
        <el-icon :size="40" class="compress-upload-icon"><UploadFilled /></el-icon>
        <div class="compress-dropzone-text">{{ t('compress.dropHint') }}</div>
        <el-text type="info" size="small">{{ t('compress.dropSub') }}</el-text>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onPick" />
      </div>

      <template v-else>
        <el-row :gutter="16">
          <el-col :span="12" class="compress-col">
            <div class="compress-col-label">{{ t('compress.original') }} ({{ formatSize(originalSize) }})</div>
            <el-image :src="originalUrl" fit="contain" class="compress-preview" />
          </el-col>
          <el-col :span="12" class="compress-col">
            <div class="compress-col-label">{{ t('compress.compressed') }} ({{ formatSize(compressedSize) }})</div>
            <el-image v-if="compressedUrl" :src="compressedUrl" fit="contain" class="compress-preview" />
            <div v-else class="compress-empty">--</div>
          </el-col>
        </el-row>

        <div class="tool-section">
          <el-row :gutter="16">
            <el-col :span="8">
              <span class="tool-label">{{ t('compress.quality') }}: {{ quality }}</span>
              <el-slider v-model="quality" :min="1" :max="100" />
            </el-col>
            <el-col :span="8">
              <span class="tool-label">{{ t('compress.format') }}</span>
              <el-select v-model="outputFormat" style="width: 100%">
                <el-option v-for="fmt in formats" :key="fmt" :label="fmt.toUpperCase()" :value="fmt" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <span class="tool-label">{{ t('compress.maxDim') }}</span>
              <el-input-number v-model="maxDim" :min="0" :max="8192" :step="256" style="width: 100%" />
              <div class="compress-hint">{{ t('compress.maxDimTip') }}</div>
            </el-col>
          </el-row>
        </div>

        <div class="tool-section tool-actions">
          <el-button type="primary" @click="compress">{{ t('compress.compress') }}</el-button>
          <el-button v-if="compressedUrl" type="success" @click="download">{{ t('compress.download') }}</el-button>
          <el-button @click="reset">{{ t('compress.reset') }}</el-button>
        </div>
      </template>
    </div>

    <div class="mt-3 rounded-2xl p-4 tech-detail-section">
      <el-divider content-position="left" class="tech-divider">{{ t('cron.note') }}</el-divider>
      <div class="m-4">
        <el-text>{{ t('compress.noteDesc') }}</el-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

const fileInput = ref<HTMLInputElement>()
const originalUrl = ref('')
const compressedUrl = ref('')
const originalSize = ref(0)
const compressedSize = ref(0)
const fileName = ref('')
const quality = ref(80)
const outputFormat = ref('jpeg')
const maxDim = ref(1920)
const formats = ['jpeg', 'webp', 'png']
let sourceImage: HTMLImageElement | null = null

const pickFile = () => fileInput.value?.click()

const onPick = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) handleFile(file)
  ;(e.target as HTMLInputElement).value = ''
}

const onDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file) handleFile(file)
}

const handleFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    ElMessage.warning(t('compress.notImage'))
    return
  }
  fileName.value = file.name.replace(/\.[^.]+$/, '')
  originalSize.value = file.size
  originalUrl.value = URL.createObjectURL(file)
  compressedUrl.value = ''
  compressedSize.value = 0
  const img = new Image()
  img.onload = () => {
    sourceImage = img
  }
  img.src = originalUrl.value
}

const compress = () => {
  if (!sourceImage) return
  const { width, height } = sourceImage
  const scale = maxDim.value > 0 ? Math.min(1, maxDim.value / Math.max(width, height)) : 1
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height)
  const mime = `image/${outputFormat.value}`
  const dataUrl = canvas.toDataURL(mime, quality.value / 100)
  compressedUrl.value = dataUrl
  compressedSize.value = dataUrl.length * 0.75
}

const download = () => {
  if (!compressedUrl.value) return
  const a = document.createElement('a')
  a.href = compressedUrl.value
  a.download = `${fileName.value}-compressed.${outputFormat.value}`
  a.click()
}

const reset = () => {
  originalUrl.value = ''
  compressedUrl.value = ''
  originalSize.value = 0
  compressedSize.value = 0
  sourceImage = null
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

watch(originalUrl, (url) => {
  if (url) URL.revokeObjectURL(url)
})
</script>

<style scoped>
.compress-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 24px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.compress-dropzone:hover {
  border-color: var(--color-primary);
}

.compress-upload-icon {
  color: var(--color-primary);
}

.compress-dropzone-text {
  font-size: 16px;
  font-weight: 500;
}

.compress-col {
  text-align: center;
}

.compress-col-label {
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.compress-preview {
  width: 100%;
  height: 260px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: repeating-conic-gradient(#f5f5f5 0% 25%, #fff 0% 50%) 0 0 / 20px 20px;
}

.compress-empty {
  height: 260px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-third);
}

.compress-hint {
  font-size: 12px;
  color: var(--color-text-third);
  margin-top: 2px;
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
