<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { copy } from '@/utils/string'
import { toMorse, toText } from '@/utils/morse'
const info = reactive({
  content: '支持中文的摩斯电码编码(Encode)解码(Decode)',
  tranRes: '',
})

const toEncode = () => {
  info.tranRes = toMorse(info.content)

}

const toDecode = () => {
  info. tranRes = toText(info.content)
}

const clear = () => {
  info.content = ''
  info.tranRes = ''
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div>
        <el-input v-model="info.content" type="textarea" :rows="8"></el-input>
      </div>

      <div class="mt-4">
        <el-button type="primary" @click="toEncode">摩斯编码</el-button>
        <el-button type="primary" @click="toDecode">摩斯解码</el-button>
        <el-button type="primary" @click="copyRes(info.tranRes)">复制结果</el-button>
        <el-button type="danger" @click="clear">清空内容</el-button>
      </div>

      <div class="mt-3 min-h-md bg-[var(--glass-bg-strong)] p-3 mb-3">
        <el-input v-model="info.tranRes" type="textarea" :rows="8"></el-input>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        摩尔斯电码（或摩斯电码，Morse code）是一种编码系统，通过不同顺序的信号表示英文字母、数字和标点符号。由美国人艾尔菲德·维尔在协助Samuel Morse发明摩尔斯电报机（1835年）时创造。今天，国际摩尔斯电码仍在使用。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>