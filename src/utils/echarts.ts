/**
 * 转换成Spreadsheet数据格式
 */
export function toSpreadsheetData(data: { value: (string | number)[] }[], type = 'bar'): Record<number, { cells: Record<number, { text: string }> }> {
  let res: Record<number, { cells: Record<number, { text: string }> }> = {}
  let columnLen = data[0].value.length
  switch(type) {
    case 'bar':
      for (let i = 0; i < columnLen; i++) {
        res[i] = {
          cells: {
            0: {text: String(data[0].value[i] ?? '')},
            1: {text: String(data[1].value[i] ?? '')}
          }
        }
      }
      break;
    default:
      break;
  }
  return res
}

/**
 * 转换成echarts使用的数据 - 基础格式(适用于柱状图、折线图等)
 */
export function toEchartsData(data: any): [string[], string[]] {
  let tmpColumn: string[] = [];
  let tmpValue: string[] = [];
  for (const item of Object.keys(data.rows)) {
    if (item === 'len') {
      continue
    }
    tmpColumn.push(data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '')
    tmpValue.push(data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : '')
  }
  return [tmpColumn, tmpValue];
}

/**
 * 转换成echarts使用的数据 - 适用于饼图
 * 
 * @param data 
 * @returns 
 */
export function toEchartsPieData(data: any): { name: string; value: string }[] {
  let tmpArr: { name: string; value: string }[] = []
  for (const item of Object.keys(data.rows)) {
    if (item === 'len') {
      continue
    }
    tmpArr.push({
      name: data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '',
      value: data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : ''
    })
  }
  return tmpArr;
}

/**
 * 数据格式转换 - 根据type转换格式
 * 对象格式{name: '', value: ''};  列格式： nameArr = [], valueArr = []
 * @param data 
 * @returns 
 */
export function tranObjAndColumn(data: any, type = 'toObj'): any[] {
  let returnData = [] as any[];
  if (type === 'toObj') {
    if (data.len === 0 || data[0].len === 0) {
      return returnData;
    }
    //转换成饼图使用的obj
    let nameArr = data[0];
    let valueArr = data[1];
    let tmpArr: Array<Object> = []

    for (const item of Object.keys(nameArr)) {
      if (item === 'len') {
        continue
      }
      tmpArr.push({
        name: nameArr[item] ? nameArr[item] : '',
        value: valueArr[item] ? valueArr[item] : '',
      })
    }
    returnData = tmpArr
  } else if (type === 'toColumn') {
    //饼图对象转换成列数组
    let nameArr = [] as string[]
    let valueArr = [] as number[]
    for (const item of Object.keys(data)) {
      nameArr.push(data[item]?.name)
      valueArr.push(data[item]?.value)
    }
    returnData = [nameArr, valueArr]
  } else if (type === "toCoord") {
    //转换成坐标(散点图用到)
    if (data.len === 0 || data[0].len === 0) {
      return returnData;
    }
    //转换成饼图使用的obj
    let nameArr = data[0];
    let valueArr = data[1];
    let tmpArr: Array<any> = []

    for (const item of Object.keys(nameArr)) {
      if (item === 'len') {
        continue
      }
      tmpArr.push([
        nameArr[item] ? nameArr[item] : 0,
        valueArr[item] ? valueArr[item] : 0,
      ])
    }
    returnData = tmpArr
  }
  return returnData;
}


const EchartsUtils = {
  toSpreadsheetData,
  toEchartsData,
  toEchartsPieData,
  tranObjAndColumn,
}
export default EchartsUtils