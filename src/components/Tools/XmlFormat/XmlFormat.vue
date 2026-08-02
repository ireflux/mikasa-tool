<script setup lang="ts">
import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'


// 状态管理
const inputText = ref('')
const outputText = ref('')
const indentSize = ref(4)

// 格式化XML
const formatXml = () => {
  if (!inputText.value) {
    ElMessage.warning('请输入要格式化的XML文本')
    return
  }
  
  try {
    // 使用DOMParser解析XML
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(inputText.value, 'text/xml')
    
    // 检查解析是否成功
    const errorNode = xmlDoc.querySelector('parsererror')
    if (errorNode) {
      throw new Error('XML解析错误: ' + errorNode.textContent)
    }
    
    // 格式化XML
    const formatted = formatXmlNode(xmlDoc.documentElement, 0)
    outputText.value = formatted
    ElMessage.success('格式化成功')
  } catch (error) {
    outputText.value = '格式化失败'
    ElMessage.error('格式化失败：' + error)
  }
}

// 递归格式化XML节点
const formatXmlNode = (node: Node, indent: number): string => {
  const indentStr = ' '.repeat(indent * indentSize.value)
  let result = ''
  
  if (node.nodeType === Node.ELEMENT_NODE) {
    result += `${indentStr}<${node.nodeName}`
    
    // 处理属性
    if ((node as Element).attributes && (node as Element).attributes.length > 0) {
      for (let i = 0; i < (node as Element).attributes.length; i++) {
        const attr = (node as Element).attributes[i]
        result += ` ${attr.name}="${attr.value}"`
      }
    }
    
    if (node.childNodes.length === 0) {
      // 空标签
      result += '/>\n'
    } else {
      result += '>\n'
      
      // 处理子节点
      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i]
        if (childNode.nodeType === Node.TEXT_NODE && childNode.textContent?.trim() === '') {
          // 跳过空白文本节点
          continue
        }
        result += formatXmlNode(childNode, indent + 1)
      }
      
      result += `${indentStr}</${node.nodeName}>\n`
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim()
    if (text) {
      result += `${indentStr}${text}\n`
    }
  } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
    result += `${indentStr}<![CDATA[${node.textContent}]]>\n`
  } else if (node.nodeType === Node.COMMENT_NODE) {
    result += `${indentStr}<!--${node.textContent}-->\n`
  }
  
  return result
}

// 压缩XML
const minifyXml = () => {
  if (!inputText.value) {
    ElMessage.warning('请输入要压缩的XML文本')
    return
  }
  
  try {
    // 压缩XML（去除空格和换行）
    const minified = inputText.value
      .replace(/\s+/g, ' ') // 替换多个空白字符为单个空格
      .replace(/\s*<\s*/g, '<') // 去除标签周围的空格
      .replace(/\s*>\s*/g, '>') // 去除标签周围的空格
      .trim()
    
    outputText.value = minified
    ElMessage.success('压缩成功')
  } catch (error) {
    outputText.value = '压缩失败'
    ElMessage.error('压缩失败：' + error)
  }
}

// 复制结果
const copyResult = () => {
  if (!outputText.value || outputText.value === '格式化失败' || outputText.value === '压缩失败') {
    ElMessage.warning('没有可复制的内容')
    return
  }
  
  copy(outputText.value)
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <!-- 输入部分 -->
      <div class="mb-4">
        <el-input
          v-model="inputText"
          type="textarea"
          :rows="6"
          placeholder="请输入要格式化的XML文本"
          class="mb-2"
        />
        
        <div class="flex items-center gap-2 mb-2">
          <el-text>缩进大小：</el-text>
          <el-input-number v-model="indentSize" :min="1" :max="8" size="small" />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="formatXml">格式化</el-button>
        <el-button type="success" @click="minifyXml">压缩</el-button>
        <el-button @click="clearInput">清空</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div>
        <el-input
          v-model="outputText"
          type="textarea"
          :rows="6"
          placeholder="格式化结果"
          readonly
        >
          <template #append>
            <el-button @click="copyResult">复制</el-button>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 高级版本外链 -->
    <a
      class="pro-link-card"
      href="https://ireflux.github.io/XML-Formatter/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="pro-link-left">
        <span class="pro-link-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </span>
        <div class="pro-link-text">
          <span class="pro-link-title">XML Formatter</span>
          <span class="pro-link-desc">实时统计 · 主题切换 · 快捷键 · 本地处理不上传</span>
        </div>
      </div>
      <span class="pro-link-action">
        打开
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </span>
    </a>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        在线XML格式化工具，用于美化和压缩XML代码，支持自定义缩进大小，使XML代码更易于阅读和维护。
      </el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>
/* 高级版本外链卡片 */
.pro-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding: 14px 20px;
  border-radius: var(--radius-card, 16px);
  background: linear-gradient(135deg, rgba(232, 240, 254, 0.7), var(--glass-bg, rgba(255, 255, 255, 0.65)));
  backdrop-filter: var(--glass-blur, blur(16px));
  -webkit-backdrop-filter: var(--glass-blur, blur(16px));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.6));
  box-shadow: var(--shadow-card, 0 4px 24px rgba(60, 64, 67, 0.08));
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.pro-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(26, 115, 232, 0.12);
  border-color: rgba(26, 115, 232, 0.3);
}

.pro-link-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.pro-link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--color-primary-light, #e8f0fe);
  color: var(--color-primary, #1a73e8);
  flex-shrink: 0;
}

.pro-link-icon svg {
  width: 18px;
  height: 18px;
}

.pro-link-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.pro-link-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text, #1f1f1f);
}

.pro-link-desc {
  font-size: 12px;
  color: var(--color-text-secondary, #5f6368);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pro-link-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-primary, #1a73e8);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.pro-link-card:hover .pro-link-action {
  background: var(--color-primary-hover, #0b57d0);
}

.pro-link-action svg {
  width: 14px;
  height: 14px;
}

@media (max-width: 480px) {
  .pro-link-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .pro-link-action {
    align-self: stretch;
    justify-content: center;
  }
}
</style>