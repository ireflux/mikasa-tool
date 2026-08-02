<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <el-tabs v-model="activeTab">
        <!-- ===== AES ===== -->
        <el-tab-pane :label="t('crypto.aes')" name="aes">
          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="8">
                <span class="tool-label">{{ t('crypto.algo') }}</span>
                <el-select v-model="aes.size" style="width: 100%">
                  <el-option label="AES-128" :value="128" />
                  <el-option label="AES-256" :value="256" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('crypto.mode') }}</span>
                <el-select v-model="aes.mode" style="width: 100%">
                  <el-option label="ECB" value="ECB" />
                  <el-option label="CBC" value="CBC" />
                  <el-option label="CTR" value="CTR" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <span class="tool-label">{{ t('crypto.keySize') }}</span>
                <el-select v-model="aes.keyType" style="width: 100%">
                  <el-option label="UTF-8 (16/32 字符)" value="utf8" />
                  <el-option label="Hex (32/64 位)" value="hex" />
                </el-select>
              </el-col>
            </el-row>
          </div>

          <div class="tool-section">
            <el-row :gutter="16">
              <el-col :span="12">
                <span class="tool-label">{{ t('crypto.key') }}</span>
                <el-input
                  v-model="aes.key"
                  :placeholder="aes.keyType === 'utf8' ? (aes.size === 128 ? '1234567890123456' : '12345678901234567890123456789012') : (aes.size === 128 ? '32 位 hex' : '64 位 hex')"
                  show-password
                />
              </el-col>
              <el-col :span="12">
                <span class="tool-label">{{ t('crypto.iv') }} ({{ t('crypto.ivTip') }})</span>
                <el-input
                  v-model="aes.iv"
                  :disabled="aes.mode === 'ECB'"
                  placeholder="1234567890123456"
                />
              </el-col>
            </el-row>
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.input') }}</span>
            <el-input v-model="aes.input" type="textarea" :rows="5" />
          </div>

          <div class="tool-section tool-actions">
            <el-button type="primary" @click="aesEncrypt">{{ t('crypto.encrypt') }}</el-button>
            <el-button type="warning" @click="aesDecrypt">{{ t('crypto.decrypt') }}</el-button>
            <el-button @click="clearAes">{{ t('crypto.clear') }}</el-button>
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.output') }}</span>
            <el-input v-model="aes.output" type="textarea" :rows="5" readonly />
            <div class="tool-actions mt-2">
              <el-button size="small" @click="copyText(aes.output)">{{ t('crypto.copy') }}</el-button>
            </div>
          </div>
        </el-tab-pane>

        <!-- ===== RSA ===== -->
        <el-tab-pane :label="t('crypto.rsa')" name="rsa">
          <div class="tool-section tool-actions">
            <span class="tool-label" style="margin-bottom: 0">{{ t('crypto.rsaKeyGen') }}</span>
            <el-select v-model="rsa.bits" style="width: 120px">
              <el-option label="1024" :value="1024" />
              <el-option label="2048" :value="2048" />
              <el-option label="4096" :value="4096" />
            </el-select>
            <el-button type="primary" :loading="rsa.generating" @click="generateRsa">
              {{ t('crypto.rsaGenerate') }}
            </el-button>
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.publicKey') }}</span>
            <el-input v-model="rsa.publicKey" type="textarea" :rows="4" />
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.privateKey') }}</span>
            <el-input v-model="rsa.privateKey" type="textarea" :rows="4" show-password />
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.input') }}</span>
            <el-input v-model="rsa.input" type="textarea" :rows="4" />
          </div>

          <div class="tool-section tool-actions">
            <el-button type="primary" @click="rsaEncrypt">{{ t('crypto.rsaEncrypt') }}</el-button>
            <el-button type="warning" @click="rsaDecrypt">{{ t('crypto.rsaDecrypt') }}</el-button>
            <el-button @click="clearRsa">{{ t('crypto.clear') }}</el-button>
          </div>

          <div class="tool-section">
            <span class="tool-label">{{ t('crypto.output') }}</span>
            <el-input v-model="rsa.output" type="textarea" :rows="4" readonly />
            <div class="tool-actions mt-2">
              <el-button size="small" @click="copyText(rsa.output)">{{ t('crypto.copy') }}</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="mt-3 rounded-2xl p-4 tech-detail-section">
      <el-divider content-position="left" class="tech-divider">{{ t('crypto.note') }}</el-divider>
      <div class="m-4">
        <el-text>{{ t('crypto.noteDesc') }}</el-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const { t } = useI18n()

const activeTab = ref('aes')

const aes = reactive({
  size: 128,
  mode: 'CBC',
  keyType: 'utf8',
  key: '',
  iv: '',
  input: '',
  output: '',
})

const rsa = reactive({
  bits: 2048,
  publicKey: '',
  privateKey: '',
  input: '',
  output: '',
  generating: false,
})

//密钥解析：utf8 或 hex
function parseKey(key: string, size: number) {
  if (aes.keyType === 'hex') {
    if (!/^[0-9a-fA-F]+$/.test(key) || key.length !== size / 4) {
      throw new Error(t('crypto.keyError'))
    }
    return CryptoJS.enc.Hex.parse(key)
  }
  return CryptoJS.enc.Utf8.parse(key)
}

function parseIv(iv: string) {
  if (!iv) return CryptoJS.enc.Utf8.parse('')
  return CryptoJS.enc.Utf8.parse(iv)
}

function getCfg() {
  const key = parseKey(aes.key, aes.size)
  const cfg: Record<string, unknown> = { padding: CryptoJS.pad.Pkcs7 }
  if (aes.mode === 'ECB') {
    cfg.mode = CryptoJS.mode.ECB
  } else if (aes.mode === 'CBC') {
    cfg.mode = CryptoJS.mode.CBC
    cfg.iv = parseIv(aes.iv)
  } else {
    cfg.mode = CryptoJS.mode.CTR
    cfg.iv = parseIv(aes.iv)
  }
  return { key, cfg }
}

const aesEncrypt = () => {
  try {
    if (!aes.key) {
      ElMessage.warning(t('crypto.needKey'))
      return
    }
    const { key, cfg } = getCfg()
    const encrypted = CryptoJS.AES.encrypt(aes.input, key, cfg)
    aes.output = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  } catch (e) {
    ElMessage.error((e as Error).message || t('crypto.fail'))
  }
}

const aesDecrypt = () => {
  try {
    if (!aes.key) {
      ElMessage.warning(t('crypto.needKey'))
      return
    }
    const { key, cfg } = getCfg()
    const decrypted = CryptoJS.AES.decrypt(aes.input, key, cfg)
    aes.output = decrypted.toString(CryptoJS.enc.Utf8)
  } catch (e) {
    ElMessage.error((e as Error).message || t('crypto.fail'))
  }
}

const clearAes = () => {
  aes.key = ''
  aes.iv = ''
  aes.input = ''
  aes.output = ''
}

// ===== RSA =====
const generateRsa = async () => {
  rsa.generating = true
  try {
    const encrypt = new JSEncrypt({ default_key_size: `${rsa.bits}` })
    rsa.publicKey = encrypt.getPublicKey()
    rsa.privateKey = encrypt.getPrivateKey()
  } finally {
    rsa.generating = false
  }
}

const rsaEncrypt = () => {
  try {
    if (!rsa.publicKey) {
      ElMessage.warning(t('crypto.needPublicKey'))
      return
    }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(rsa.publicKey)
    const result = encrypt.encrypt(rsa.input)
    if (!result) {
      ElMessage.error(t('crypto.rsaInputTooLong'))
      return
    }
    rsa.output = result
  } catch {
    ElMessage.error(t('crypto.fail'))
  }
}

const rsaDecrypt = () => {
  try {
    if (!rsa.privateKey) {
      ElMessage.warning(t('crypto.needPrivateKey'))
      return
    }
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(rsa.privateKey)
    const result = decrypt.decrypt(rsa.input)
    if (!result) {
      ElMessage.error(t('crypto.fail'))
      return
    }
    rsa.output = result
  } catch {
    ElMessage.error(t('crypto.fail'))
  }
}

const clearRsa = () => {
  rsa.publicKey = ''
  rsa.privateKey = ''
  rsa.input = ''
  rsa.output = ''
}

const copyText = async (text: string) => {
  if (!text) return
  const { copy } = useClipboard({ source: text })
  await copy()
  ElMessage.success(t('crypto.copied'))
}
</script>

<style scoped>
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
