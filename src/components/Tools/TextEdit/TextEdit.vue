<script setup lang="ts">
import { reactive, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import '@wangeditor/editor/dist/css/style.css' // 引入富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'  //富文本组件
import { copy } from '@/utils/string'
const info = reactive({
  title: "在线文本编辑/HTML获取",
  mode: 'default',
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容
const content = ref(``)
// html
const html = ref('')

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    "uploadImage",
    "group-video",
    "insertLink",
  ]
}

//编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // html = editor.getHtml()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleChange = (editor: any) => {
  html.value = editor.getHtml()
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onMounted(() => {

})

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="tool-card h-[510px]">
      <div class="border z-10 mt-3 h-96">
        <Toolbar
          class=""
          :editor="editorRef"
          :default-config="toolbarConfig"
          :mode="info.mode"
        />
        <Editor
          v-model="content"
          class="border"
          :default-config="editorConfig"
          :mode="info.mode"
          @on-created="handleCreated"
          @on-change="handleChange"
        />
      </div>
      
    </div>

    <div class="tool-card mt-3">
      <el-button type="primary" @click="copyRes(html)">复制HTML</el-button>
      <el-input
        v-model="html"
        disabled
        class="mt-3"
        type="textarea"
        autosize
        placeholder="html预览处"
      />
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线富文本编辑, html实时预览，在线编辑文本，文本编辑获取html
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
.downext-select{
  @apply w-24
}
</style>