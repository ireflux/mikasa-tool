import { ElMessage } from 'element-plus';
import clipboard3 from 'vue-clipboard3'

/**
 * 转义特殊字符
 * str: string: 需处理的字符串
 * reg: string: 需转义的特殊字符
 * 
 * @param reg 
 */
export function transferred(str: string, reg: string = "`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）;—|【】‘；：”“'。，、？") {
    const pattern = new RegExp("[" + reg + "]");
    let res = '';
    Array.from(str).forEach((char: any) => {
      res += char.replace(pattern, `\\${char}`);
    });
    return res;
}

/**
 * 复制文本
 * @param resStr 文本内容
 * @returns 
 */
export async function copy(resStr: string) {
  try {
    //check
    if (resStr == '') {
      ElMessage({
        message: "无可复制内容",
        type: "warning",
        duration: 1500
      })
      return
    }
    //copy
    const {toClipboard} = clipboard3()
    await toClipboard(resStr)
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1500
    })
  } catch (error) {
    ElMessage({
      message: "复制失败",
      type: "error",
      duration: 1500
    })
  }
}

/**
 * 按指定字符生成随机字符串(场景：生成随机密码)
 * 
 * @param char 
 * @param length 
 * @returns 
 */
export function genRandomStrByChars(chars: string, length: number): string {
  if (!chars || length <= 0) return ''
  const randoms = new Uint32Array(length)
  crypto.getRandomValues(randoms)
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars[randoms[i] % chars.length]
  }
  return password
}

/**
 * 数字转中文
 * @param num 
 * @returns 
 */
export function numberToChinese(num: number): string {
  const chars = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const smallUnits = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿', '万亿']

  if (!Number.isFinite(num) || num < 0 || !Number.isInteger(num)) {
    ElMessage({
      message: "请输入有效的非负整数",
      type: "error",
      duration: 1500
    })
    return ''
  }
  if (num >= 1e13) {
    ElMessage({
      message: "金额太大无法转换",
      type: "error",
      duration: 1500
    })
    return ''
  }
  if (num === 0) {
    return chars[0]
  }

  //按 4 位一组拆分（groups[0] 为最低组）
  const groups: number[] = []
  let n = num
  while (n > 0) {
    groups.push(n % 10000)
    n = Math.floor(n / 10000)
  }

  //0-9999 转中文（组内处理中间的零）
  const groupToChinese = (group: number): string => {
    const gStr = String(group)
    let res = ''
    let zeroPending = false
    for (let i = 0; i < gStr.length; i++) {
      const d = parseInt(gStr[i])
      if (d === 0) {
        zeroPending = true
      } else {
        if (zeroPending) res += chars[0]
        zeroPending = false
        res += chars[d] + smallUnits[gStr.length - i - 1]
      }
    }
    return res
  }

  let result = ''
  let zeroGap = false
  for (let g = groups.length - 1; g >= 0; g--) {
    const group = groups[g]
    if (group === 0) {
      zeroGap = true
      continue
    }
    //整组为空（级间空位）或本组不足四位（级内前导零），需要补"零"
    if (zeroGap || (result !== '' && group < 1000)) {
      result += chars[0]
    }
    zeroGap = false
    result += groupToChinese(group) + bigUnits[g]
  }
  return result
}

//rtrim: 删除右侧指定字符， 默认删除空格
export function rtrim(str: string, char = ' '): string {
    return str.replace(new RegExp('\\'+char+'+$', 'g'), '');
}

const StringUtils = {
  transferred,
  copy,
  genRandomStrByChars,
  numberToChinese,
  rtrim,
}

export default StringUtils