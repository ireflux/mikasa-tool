import type { ToolsReqData, ToolsInfo, ToolCate } from './tools.type'
import { i18n } from '@/i18n'
import { toolRegistry, toolCategories } from './toolRegistry'

//将工具列表本地化（title/desc/cate 由 i18n key 解析为当前语言文本）
export function localizeTools(list: ToolsInfo[]): ToolsInfo[] {
  const t = i18n.global.t
  return list.map(item => ({
    ...item,
    title: t(item.title),
    desc: t(item.desc),
    cate: t(item.cate),
  }))
}

//将分类及工具列表本地化
export function localizeCategories(cates: ToolCate[]): ToolCate[] {
  const t = i18n.global.t
  return cates.map(cate => ({
    ...cate,
    title: t(cate.title),
    list: localizeTools(cate.list),
  }))
}

//获取tools分类与对应的工具（title/desc/cate 均为 i18n key，由统一注册表生成）
export function getToolCategories() {
  const base = import.meta.env.BASE_URL
  return toolCategories.map(cate => {
    const list = toolRegistry
      .filter(tool => tool.categoryId === cate.id)
      .map(tool => {
        const item: ToolsInfo = {
          title: tool.titleKey,
          logo: tool.logo,
          desc: tool.descKey,
          url: `/${tool.id.toLowerCase()}/`,
          cateId: cate.id,
          cate: cate.cateKey,
        }
        if (item.logo.startsWith('/')) {
          item.logo = base + item.logo.slice(1)
        }
        return item
      })
    return {
      id: cate.id,
      title: cate.titleKey,
      icon: '',
      list,
    } as ToolCate
  })
}

//工具list
export function toolsList(): ToolsInfo[] {
  const list = [] as ToolsInfo[]
  const toolsCate = getToolCategories()
  for (const item of toolsCate) {
    for (const _item of item.list) {
      list.push(_item)
    }
  }
  return list
}

//获取工具
export function searchTools(data: ToolsReqData) {
  //接收参数
  const { cateId, title, route } = data
  //获取工具list（本地化为当前语言文本后再匹配）
  let list = localizeTools(toolsList())
  //标题筛选
  if (title != '') {
    list = list.filter(item => {
      const tmpValue = item.title.toLowerCase()
      const tmpDesc = item.desc.toLowerCase()
      return tmpValue.indexOf(title.toLowerCase()) !== -1 || tmpDesc.indexOf(title.toLowerCase()) !== -1;
    });
  }
  //分类筛选
  if (cateId > 0) {
    list = list.filter(item => {
      return item.cateId === cateId;  
    });
  }
  //路由筛选
  if (route != '') {
    list = list.filter(item => {
      // 移除末尾的斜杠后比较
      const itemUrl = item.url.replace(/\/$/, '');
      const routeUrl = route.replace(/\/$/, '');
      return itemUrl === routeUrl;
    });
  }
  return list
}
