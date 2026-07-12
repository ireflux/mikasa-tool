import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import Spreadsheet from 'x-data-spreadsheet'
import 'x-data-spreadsheet/dist/locale/zh-cn'
import { type UploadProps, type UploadRawFile, genFileId } from 'element-plus'
import * as echarts from 'echarts'
import * as XLSX from 'xlsx'
import { toSpreadsheetData } from '@/utils/echarts'

type ChartHandleType = 'scale' | 'size' | 'title' | 'color' | 'watermark' | 'data'

export interface ChartContext {
  colunmData: Ref<any[]>
  valueData: Ref<any[]>
  seriesData: Ref<any[]>
  title: Ref<string>
  subTitle: Ref<string>
  titlePos: Ref<string>
  attrColor: Ref<string>
}

export interface UseChartOptions {
  defaultColumns: any[]
  defaultValues: any[]
  buildOption: (ctx: ChartContext) => Record<string, any>
  updateChartData: (ctx: ChartContext) => Record<string, any>
  onSpreadsheetChange: (data: any, ctx: ChartContext) => void
  onFileDataLoaded?: (ctx: ChartContext) => void
  onBeforeInit?: (ctx: ChartContext) => void
  reloadCallsDataUpdate: boolean
}

export function useChart(
  chartDom: Ref<HTMLElement | null>,
  dataFileRef: Ref<any>,
  options: UseChartOptions
) {
  const myChart = ref<echarts.ECharts | null>(null)

  const setOptionName = ref(1)
  const sacleSize = ref(100)
  const widthCanvas = ref(720)
  const heightCanvas = ref(400)
  const downType = ref('1')
  const attrColor = ref('#5470c6')
  const titlePos = ref('center')
  const title = ref('Mikasa-Tool')
  const subTitle = ref('在线图表制作工具')
  const titleSwitch = ref(true)
  const subTitleSwitch = ref(true)
  const watermarkSwitch = ref(false)
  const waterMarkText = ref('Mikasa-Tool')

  const colunmData = ref<any[]>(options.defaultColumns)
  const valueData = ref<any[]>(options.defaultValues)
  const seriesData = ref<any[]>([])

  const drawer = ref(false)
  const rowsData = ref<Record<number, any>>({})
  const fileList = ref()

  const ctx: ChartContext = {
    colunmData,
    valueData,
    seriesData,
    title,
    subTitle,
    titlePos,
    attrColor,
  }

  const createWatermark = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas')
    const ctx2d = canvas.getContext('2d')!
    canvas.width = canvas.height = 100
    ctx2d.textAlign = 'center'
    ctx2d.textBaseline = 'middle'
    ctx2d.globalAlpha = 0.08
    ctx2d.font = '20px Microsoft Yahei'
    ctx2d.translate(50, 50)
    ctx2d.rotate(-Math.PI / 4)
    ctx2d.fillText(waterMarkText.value, 0, 0)
    return canvas
  }

  const reloadCanvas = (): void => {
    if (!chartDom.value) return
    myChart.value?.dispose()
    myChart.value = echarts.init(chartDom.value)
    myChart.value.clear()
    myChart.value.resize({
      width: widthCanvas.value,
      height: heightCanvas.value
    })
    myChart.value.setOption(options.buildOption(ctx))
    if (options.reloadCallsDataUpdate) {
      canvasHandle('data')
    }
  }

  const canvasHandle = (type: ChartHandleType): void => {
    const element = chartDom.value
    if (!element) return

    switch (type) {
      case 'scale': {
        const scale = sacleSize.value / 100
        element.style.transform = `scale(${scale})`
        break
      }
      case 'size': {
        element.style.width = widthCanvas.value + 'px'
        element.style.height = heightCanvas.value + 'px'
        reloadCanvas()
        break
      }
      case 'title': {
        let fakerTitle = ''
        let fakerSubTitle = ''
        if (titleSwitch.value) {
          fakerTitle = title.value
        }
        if (subTitleSwitch.value) {
          fakerSubTitle = subTitle.value
        }
        myChart.value?.setOption({
          title: {
            text: fakerTitle,
            subtext: fakerSubTitle,
            left: titlePos.value
          }
        })
        break
      }
      case 'color': {
        myChart.value?.setOption({
          series: [
            {
              itemStyle: {
                color: attrColor.value
              }
            }
          ]
        })
        break
      }
      case 'watermark': {
        if (watermarkSwitch.value) {
          myChart.value?.setOption({
            backgroundColor: {
              image: createWatermark(),
            }
          })
        } else {
          myChart.value?.setOption({
            backgroundColor: '#fff'
          })
        }
        break
      }
      case 'data': {
        if (myChart.value) {
          myChart.value.setOption(options.updateChartData(ctx))
        }
        break
      }
    }
  }

  const downEchartsImg = (): void => {
    const ext = downType.value === '1' ? 'png' : 'jpeg'
    const imgUrl = myChart.value?.getDataURL({
      type: ext as 'png' | 'jpeg',
      pixelRatio: 2,
    })
    if (imgUrl !== undefined) {
      const downloadLink = document.createElement('a')
      downloadLink.href = imgUrl
      downloadLink.download = 'echart.' + ext
      downloadLink.click()
    }
  }

  const editData = (): void => {
    if (drawer.value) {
      drawer.value = false
    } else {
      drawer.value = true
      Spreadsheet.locale('zh-cn', (window.x_spreadsheet as any).$messages['zh-cn'])
      new Spreadsheet('#x-spreadsheet', {
        showToolbar: false,
        showBottomBar: false,
        view: {
          height: () => document.documentElement.clientHeight / 2,
          width: () => document.documentElement.clientWidth,
        }
      })
        .loadData({
          styles: [
            {
              bgcolor: '#f4f5f8',
              textwrap: true,
              color: '#900b09',
              border: {
                top: ['thin', '#0366d6'],
                bottom: ['thin', '#0366d6'],
                right: ['thin', '#0366d6'],
                left: ['thin', '#0366d6'],
              },
            },
          ],
          rows: rowsData.value
        })
        .change((data: any) => {
          options.onSpreadsheetChange(data, ctx)
          canvasHandle('data')
        })
    }
  }

  const updateDataFile = async (params: { file: File }): Promise<void> => {
    const _file = params.file
    const fileReader = new FileReader()
    fileReader.onload = (ev) => {
      try {
        if (!ev.target) {
          return
        }
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        let useCount = 0
        const tmpColumnData: any[] = []
        const tmpValueData: any[] = []
        for (const sheet of Object.keys(workbook.Sheets)) {
          if (useCount > 0) {
            continue
          }
          const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: ['0', '1'] })
          if (sheetArray.length === 0) {
            continue
          }
          for (const row of sheetArray) {
            if (row != null) {
              tmpColumnData.push((row as any)[0])
              tmpValueData.push((row as any)[1])
            }
          }
          useCount++
        }
        colunmData.value = tmpColumnData
        valueData.value = tmpValueData
        if (options.onFileDataLoaded) {
          options.onFileDataLoaded(ctx)
        }
        canvasHandle('data')
        rowsData.value = toSpreadsheetData([
          colunmData, valueData
        ])
      } catch (e) {
        console.error('Failed to process file:', e)
      }
    }
    fileReader.readAsArrayBuffer(_file)
  }

  const handleExceed: UploadProps['onExceed'] = (files) => {
    dataFileRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    dataFileRef.value!.handleStart(file)
    dataFileRef.value!.submit()
  }

  const init = (): void => {
    if (options.onBeforeInit) {
      options.onBeforeInit(ctx)
    }
    canvasHandle('size')
    rowsData.value = toSpreadsheetData([
      colunmData, valueData
    ])
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    myChart.value?.dispose()
  })

  return {
    setOptionName,
    sacleSize,
    widthCanvas,
    heightCanvas,
    downType,
    attrColor,
    titlePos,
    title,
    subTitle,
    titleSwitch,
    subTitleSwitch,
    watermarkSwitch,
    waterMarkText,
    drawer,
    rowsData,
    fileList,
    colunmData,
    valueData,
    seriesData,
    canvasHandle,
    reloadCanvas,
    downEchartsImg,
    editData,
    updateDataFile,
    handleExceed,
    init,
  }
}
