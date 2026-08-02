<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { Codemirror } from "vue-codemirror"
import { copy } from '@/utils/string'


const info = reactive({
  // extensions: [lineNumbers()],
  content: '',
  tranRes: '',
})

const clearRes = () => {
  info.tranRes = ''
}

//to zh
//值转换中文
const toZH = () => {
  //clear
  clearRes()
  let str = info.content
  str = str.replace(/\\/g, "%");
  // 转换中文
  str = unescape(str);
  info.tranRes = str
}
//to unicode
const toUnicode = () => {
  //clear
  clearRes()
  //只转换中文
  for (let i = 0; i < info.content.length; i++) {
    if (/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(info.content[i])) {
      let code = info.content.charCodeAt(i).toString(16)
      info.tranRes += '\\u' + code
    } else {
      info.tranRes += info.content[i]
    }
  }
}

//copy
const copyRes = async () => {
  copy(info.tranRes)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div  class="tool-card">
      <div>
        <codemirror
          v-model="info.content"
          placeholder=""
          :style="{ height: '200px' }"
          :autofocus="true"
          :indent-with-tab="true" 
          :tab-size="2"
        />
      </div>

      <div class="mt-4">
        <el-button type="primary" @click="toZH">unicode转中文</el-button>
        <el-button type="primary" @click="toUnicode">中文转unicode</el-button>
        <el-button type="primary" @click="copyRes">复制结果</el-button>
      </div>

      <div class="mt-3 min-h-md bg-[var(--glass-bg-strong)] p-3 mb-3">
        <el-input v-model="info.tranRes" type="textarea" :rows="8"></el-input>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        Unicode是计算机科学领域里的一项业界标准，有时候我们需要对一段文本或者一段内容进行重新排版编译的时候就需要将获取的值进行转码。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
</style>