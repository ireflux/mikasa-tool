<script setup lang="ts">
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
// import { copy } from '@/utils/string'

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        示例...
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>