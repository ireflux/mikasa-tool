<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { copy } from '@/utils/string'

const info = reactive({
  content: '',
  tranRes: '',
})


//编码
const toEncode = () => {
  info.tranRes = ''
  info.tranRes = encodeURIComponent(info.content)
}

//解码
const toDecode = () => {
  info.tranRes = ''
  info.tranRes = decodeURIComponent(info.content)
}

//clear
const clear = () => {
  info.content = ''
  info.tranRes = ''
}

//copy
const copyRes = async () => {
  copy(info.tranRes)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div>
        <el-input v-model="info.content" type="textarea" :rows="8"></el-input>
      </div>

      <div class="mt-4 flex flex-wrap gap-2 button-container">
        <el-button type="primary" @click="toEncode">UrlEncode编码</el-button>
        <el-button type="primary" @click="toDecode">UrlDecode解码</el-button>
        <el-button type="primary" @click="copyRes">复制结果</el-button>
        <el-button type="danger" @click="clear">清空内容</el-button>
      </div>

      <div class="mt-3 min-h-md bg-[var(--glass-bg-strong)] p-3 mb-3">
        <el-input v-model="info.tranRes" type="textarea" :rows="8"></el-input>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        在线url编码，在线url解码工具
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
.button-container .el-button {
  margin-right: 12px;
  margin-left: 0px;
}
</style>