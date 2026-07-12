<script setup lang="ts">
import { ref } from 'vue'
import { toEchartsData } from '@/utils/echarts'
import { useChart } from '@/composables/useChart'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const chartTitle = '柱状图'
const chartDom = ref<HTMLElement | null>(null)
const dataFileRef = ref()

const {
  setOptionName,
  sacleSize, widthCanvas, heightCanvas, downType,
  attrColor, titlePos, title, subTitle,
  titleSwitch, subTitleSwitch,
  watermarkSwitch, waterMarkText,
  drawer, fileList,
  canvasHandle, downEchartsImg, editData, updateDataFile, handleExceed,
} = useChart(chartDom, dataFileRef, {
  defaultColumns: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  defaultValues: ['23', '24', '18', '25', '27', '28', '25'],
  buildOption: (ctx) => ({
    backgroundColor: '#fff',
    title: {
      text: ctx.title.value,
      subtext: ctx.subTitle.value,
      left: ctx.titlePos.value
    },
    xAxis: {
      data: ctx.colunmData.value,
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: ctx.valueData.value,
        itemStyle: {
          color: ctx.attrColor.value
        }
      }
    ],
    tooltip: {}
  }),
  updateChartData: (ctx) => ({
    xAxis: {
      data: ctx.colunmData.value,
    },
    series: [
      {
        data: ctx.valueData.value,
      }
    ]
  }),
  onSpreadsheetChange: (data, ctx) => {
    const tmp = toEchartsData(data)
    ctx.colunmData.value = tmp[0]
    ctx.valueData.value = tmp[1]
  },
  reloadCallsDataUpdate: false,
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="chartTitle"></DetailHeader>

    <div class="tool-card flex">
      <div class="w-4/6">
        <div class="flex flex-row-reverse mb-4">
          <el-input-number v-model="sacleSize" :min="1" :max="100" :step="5" step-strictly @change="canvasHandle('scale')"/>
          <el-text>缩放：</el-text>
        </div>
        <div class="flex justify-center items-center max-h-[500px] max-w-[1000px] overflow-auto">
          <div ref="chartDom" class="bg-white"></div>
        </div>
      </div>
      <div class="w-2/6 ml-3 tool-card" style="padding: 0.75rem;">
        <div class="mb-3">
          <el-button class="w-full mb-3" type="primary" size="large" @click="downEchartsImg">下载图表</el-button>
          <div class="flex items-center ml-1">
            <el-text>文件类型</el-text>
            <el-radio-group v-model="downType" class="ml-4">
              <el-radio size="large" label="1">PNG</el-radio>
              <el-radio size="large" label="2">JPEG</el-radio>
            </el-radio-group>
          </div>
          <div class="flex w-full">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="支持上传：xls, xlsx, csv文件"
              placement="top-start"
            >
              <el-button class="w-1/2">
                <el-upload
                  ref="dataFileRef"
                  v-model:file-list="fileList"
                  class="dataFileRef flex"
                  accept=".xls,.xlsx,.csv"
                  :http-request="updateDataFile"
                  :on-exceed="handleExceed"
                  :limit="1"
                >
                上传数据
                </el-upload>
              </el-button>
            </el-tooltip>
            <el-button class="w-1/2" @click="editData">编辑数据</el-button>
          </div>
        </div>
        <el-collapse v-model="setOptionName" accordion>
          <el-collapse-item title="画布设置" name="1">
            <div class="flex">
              <el-text class="w-16 text-right">宽度</el-text>
              <el-input-number
                v-model="widthCanvas"
                :min="1"
                :max="4000"
                :step="10"
                controls-position="right"
                class="h-8 w-60 max-w-[60%] ml-3"
                @change="canvasHandle('size')"
              />
            </div>
            <div class="flex mt-3">
              <el-text class="w-16 text-right">高度</el-text>
              <el-input-number
                v-model="heightCanvas"
                :min="1"
                :max="4000"
                :step="10"
                controls-position="right"
                class="h-8 w-60 max-w-[60%] ml-3"
                @change="canvasHandle('size')"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item title="标题设置" name="2">
            <div class="flex">
              <el-text class="w-16 text-right">位置</el-text>
              <el-radio-group v-model="titlePos" class="ml-3" @change="canvasHandle('title')">
                <el-radio-button label="left" value="left">左</el-radio-button>
                <el-radio-button label="center" value="center">中</el-radio-button>
                <el-radio-button label="right" value="right">右</el-radio-button>
              </el-radio-group>
            </div>
            <el-divider content-position="left" class="pl-10">标题</el-divider>
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="titleSwitch" class="ml-3" @change="canvasHandle('title')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">标题</el-text>
              <el-input v-model="title" class="h-8 w-60 max-w-[60%] ml-3" @blur="canvasHandle('title')"></el-input>
            </div>
            <el-divider content-position="left">副标题</el-divider>
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="subTitleSwitch" class="ml-3" @change="canvasHandle('title')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">副标题</el-text>
              <el-input v-model="subTitle" class="h-8 w-60 max-w-[60%] ml-3"  @blur="canvasHandle('title')"></el-input>
            </div>
          </el-collapse-item>
          <el-collapse-item title="图形属性" name="3">
            <div class="flex">
              <el-text class="w-16 text-right">颜色</el-text>
              <el-color-picker v-model="attrColor" class="ml-3" @change="canvasHandle('color')"/>
            </div>
          </el-collapse-item>
          <el-collapse-item title="水印设置" name="4">
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="watermarkSwitch" class="ml-3" @change="canvasHandle('watermark')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">水印内容</el-text>
              <el-input v-model="waterMarkText" class="h-8 w-60 max-w-[60%] ml-3" @change="canvasHandle('watermark')"></el-input>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <el-drawer id="x-spreadsheet" v-model="drawer" direction="btt" class="sheet" style="">
    </el-drawer>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线图表制作工具，在线制作柱状图<br>
        在线编辑表格生成柱状图，支持png和jpeg格式导出<br>
        柱状图是采用垂直柱子,即矩形块的宽度一样,用高度来代表数值大小。<br>
        能让使用者更为直观地看到不同类别数据或不同时间阶段的比较情况及发展趋势，通常利用于较小的数据集分析。<br>
        无需任何基础即可上手，并且支持超全的自定义配置，轻松实现你的个性化图表需求<br>
      </el-text>
    </ToolDetail>
  </div>
</template>

<style scoped>
:deep(.el-drawer__body){
  display: none !important;
}
:deep(.el-drawer__header){
  display: none !important;
  margin-bottom: 0 !important;
}
:deep(.el-drawer){
  height: 50% !important;
}
:deep(.el-upload-list){
  display: none !important;
}
</style>
