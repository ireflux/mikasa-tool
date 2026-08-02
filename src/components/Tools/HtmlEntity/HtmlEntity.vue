<script setup lang="ts">
import { ref,onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { escape, unescape } from 'lodash';
import { copy } from '@/utils/string'

const content = ref('')
const cleanContent = ref('')

const parser = (type: string) => {
  if (type == 'toHTML') {
    //转html
    cleanContent.value = unescape(content.value)
  } else {
    //转实体
    cleanContent.value = escape(content.value)
  }
}

//清空输入框
const clear = () => {
  content.value = ''
  cleanContent.value = ''
}


onMounted(() => {
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="mb-6">
        <el-input v-model="content" :rows="10" type="textarea" placeholder="请输入内容" @change="parser"></el-input>
        <div class="mt-3">
          <el-button type="primary" @click="parser('toEntity')">HTML转实体</el-button>
          <el-button type="primary" @click="parser('toHTML')">实体转HTML</el-button>
          <el-button type="primary" @click="copy(cleanContent)">复制结果</el-button>
          <el-button type="primary" @click="clear">清除</el-button>
        </div>
      </div>

      <div>
        <el-input v-model="cleanContent" :rows="10" type="textarea" placeholder="" @change="parser"></el-input>
      </div>


      <!-- desc -->
      <ToolDetail>
        <el-text>
          html实体转义，实体转义成html
        </el-text> 
      </ToolDetail>
    </div>
  </div>
</template>

<style scoped>

</style>