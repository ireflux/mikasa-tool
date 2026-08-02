export function isUrl(str: string): boolean {
  if (typeof str !== 'string' || str.trim() === '' || /\s/.test(str)) return false
  try {
    const url = new URL(str.includes('://') ? str : 'http://' + str)
    if (url.protocol !== 'http:' && url.protocol !== 'https:' && url.protocol !== 'ftp:') {
      return false
    }
    return url.hostname.length > 0
  } catch {
    return false
  }
}

const UrlUtils = {
  isUrl
}

export default UrlUtils
