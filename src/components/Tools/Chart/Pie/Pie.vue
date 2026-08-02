<script setup lang="ts">
import { ref } from 'vue'
import { toEchartsPieData, tranObjAndColumn } from '@/utils/echarts'
import { useChart } from '@/composables/useChart'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const chartDom = ref<HTMLElement | null>(null)
const dataFileRef = ref()

const {
  setOptionName,
  sacleSize, widthCanvas, heightCanvas, downType,
  titlePos, title, subTitle,
  titleSwitch, subTitleSwitch,
  watermarkSwitch, waterMarkText,
  drawer, fileList,
  canvasHandle, downEchartsImg, editData, updateDataFile, handleExceed,
} = useChart(chartDom, dataFileRef, {
  defaultColumns: ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'],
  defaultValues: [1048, 735, 580, 484, 300],
  buildOption: (ctx) => ({

    title: {
      text: ctx.title.value,
      subtext: ctx.subTitle.value,
      left: ctx.titlePos.value
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: ctx.seriesData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
    ],
    tooltip: {}
  }),
  updateChartData: (ctx) => ({
    series: [
      {
        data: ctx.seriesData.value,
      }
    ]
  }),
  onSpreadsheetChange: (data, ctx) => {
    ctx.seriesData.value = toEchartsPieData(data)
  },
  onBeforeInit: (ctx) => {
    ctx.seriesData.value = tranObjAndColumn([
      ctx.colunmData.value, ctx.valueData.value
    ])
  },
  onFileDataLoaded: (ctx) => {
    ctx.seriesData.value = tranObjAndColumn([
      ctx.colunmData.value, ctx.valueData.value
    ])
  },
  reloadCallsDataUpdate: true,
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card flex">
      <div class="w-4/6">
        <div class="flex flex-row-reverse mb-4">
          <el-input-number v-model="sacleSize" :min="1" :max="100" :step="5" step-strictly @change="canvasHandle('scale')"/>
          <el-text>缩放：</el-text>
        </div>
        <div class="flex justify-center items-center max-h-[500px] max-w-[1000px] overflow-auto">
          <div ref="chartDom" class="bg-[var(--color-surface)]"></div>
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

    <el-drawer v-model="drawer" direction="btt" class="sheet">
      <div ref="sheetContainer" class="sheet-container"></div>
    </el-drawer>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        饼图是通过一个圆来展示数据，用圆内各扇形的角度来表示数据之间的占比关系。<br>
        能够很好地展示不同分类的变量之间或单个分类变量与整体之间的占比情况，常用来强调某个突出的分类变量或表示表示占比关系。<br>
        在线图表制作工具，在线制作饼图<br>
        支持导入表格并在线编辑表格生成饼图，支持png和jpeg格式导出<br>
        支持超全的自定义配置，轻松实现你的个性化图表需求<br>
      </el-text>
    </ToolDetail>
  </div>
</template>

<style scoped>
.sheet-container{
  height: 100%;
  overflow: auto;
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
