/**
 * base64 dataURL 转 objectURL
 * 支持 "data:image/png;base64,...." 与纯 base64 字符串
 * @param base64String 
 * @returns 
 */
export function base64ToBlob(base64String: string): string {
  if (!base64String) return ''
  const [meta = '', b64 = ''] = base64String.split(',')
  if (!b64) return ''
  const binaryData = window.atob(b64)
  const ia = new Uint8Array(binaryData.length)
  for (let i = 0; i < binaryData.length; i++) {
    //获取unicode值
    ia[i] = binaryData.charCodeAt(i)
  }
  //从 dataURL 前缀中解析 MIME 类型（无前缀时默认 image/png）
  const mimeMatch = /^data:([^;]+)/.exec(meta)
  const type = mimeMatch ? mimeMatch[1] : 'image/png'
  //创建blob对象，以便将二进制数据转换为对象
  const blob = new Blob([ia], { type })
  //转换url
  const url = URL.createObjectURL(blob)
  return url
}

/**
 * 直接下载
 * @param url 下载的文件url
 * @param filename 文件名
 */
export function autoDown(url: string, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;  
    downloadLink.target = '_blank';
    downloadLink.download = filename; // 指定下载的文件名  
    // 将下载链接添加到 DOM 中并模拟点击下载  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

/**
 * 获取文件后缀
 */
export function getFileExtension(filename: string): string {  
  const dotIndex = filename.lastIndexOf('.');  
  if (dotIndex === -1) {  
    return ''; // 没有找到'.'，返回空字符串  
  }  
  return filename.slice(dotIndex + 1); // 返回'.'之后的部分作为后缀名  
}

const FileUtils = {
  base64ToBlob,
  autoDown,
  getFileExtension
}
export default FileUtils