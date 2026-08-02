<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
const info = reactive({
  content: '',
})


//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="">
      <v-md-editor v-model="info.content" height="500px"></v-md-editor>
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        在线编辑Markdown
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>