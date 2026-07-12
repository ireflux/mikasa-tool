export function isUrl(str: string): boolean {  
  const urlPattern = new RegExp(  
    '^(https?:\\/\\/)?'+ // protocol  
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})','i'); // fragment locator  
  return urlPattern.test(str);  
}

const UrlUtils = {
  isUrl
}

export default UrlUtils
