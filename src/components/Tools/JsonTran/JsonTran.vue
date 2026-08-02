<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { transferred, copy } from '@/utils/string';

import { Codemirror } from "vue-codemirror";
import { json } from '@codemirror/lang-json';
import '@codemirror/search';
import '@codemirror/state';
import '@codemirror/commands';

const info = reactive({
  code: '',
  extensions: [json()],  //[json(), lineNumbers()],
  isParseErr: false,
  parseErr: ''
})


//格式化json
const formatJson = () => {
  try {
    //初始化错误信息
    info.isParseErr = false;
    info.parseErr = ''
    // 1、JSON.parse：把JSON字符串转换为JSON对象
    // 2、JSON.stringify：把JSON对象 转换为 有缩进的 JSON字符串格式
    info.code = JSON.stringify(JSON.parse(info.code), null, '\t');
  } catch(error) {
    info.isParseErr = true;
    // info.parseErr = (error as Error).message
    info.parseErr = '无效的JSON'
  }
}

//压缩
const compress = () => {
  info.code = info.code.replace(/[\r\n\t]/g, "")
}

//转义
const tran = () => {
  info.code = transferred(info.code, "\"")
}

//去转义
const unTransferred = () => {
  info.code = info.code.replace(/[\\]/g, ``)
}

//清空输入框
const clear = () => {
  info.code = ''
}

const copyRes = async () => {
  copy(info.code)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      
      <div>
        <!-- 
          tabSize: tab键前进的个数
          style： 自定义样式
          autofocus： 挂载后立即聚焦在编辑器
          indent-with-tab：绑定键盘tab事件
          extensions： 扩展，传数组
          
          @ready="console.log('ready', $event)"
          @change="console.log('change', $event)"
          @focus="console.log('focus', $event)"
          @blur="console.log('blur', $event)"
         -->
        <codemirror
          v-model="info.code"
          placeholder="这里是代码..."
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true" 
          :tab-size="2"
          :extensions="info.extensions"
        />
      </div>
      
      <div class="mt-4">
        <el-button type="primary" @click="formatJson">校验/格式化</el-button>
        <el-button type="primary" @click="compress">压缩</el-button>
        <el-button type="primary" @click="tran">转义</el-button>
        <el-button type="primary" @click="unTransferred">去转义</el-button>
        <!-- <el-button type="primary">unicode转中文</el-button> -->
        <!-- <el-button type="primary">中文转unicode</el-button> -->
        <el-button type="primary" @click="copyRes">复制</el-button>
        <el-button type="primary" @click="clear">清空</el-button>
      </div>

      <div v-show="info.isParseErr" class="mt-3 min-h-md bg-[var(--el-color-danger-light-9)] p-3 mb-3">
        <el-text type="danger">{{ info.parseErr }}</el-text>
      </div>
    </div>

    <!-- 高级版本外链 -->
    <a
      class="pro-link-card"
      href="https://ireflux.github.io/JSON-Formatter/"
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
          <span class="pro-link-title">JSON Formatter</span>
          <span class="pro-link-desc">Monaco 编辑器 · Diff 对比 · 自动格式化 · 快捷键</span>
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
        JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它基于JavaScript的一个子集，但与语言无关，因此在多种编程环境中广泛使用。JSON格式易于人阅读和编写，同时也易于机器解析和生成。它通常用于网络应用程序中服务器与客户端之间的数据传输。<br>
        JSON 工具提供实时编辑和预览JSON 数据，语法高亮、校验、格式化、转义，去转义、压缩等功能，可以提高阅读修改的效率和准确性
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