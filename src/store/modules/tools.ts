//创建tools相关的小工具
import { defineStore } from 'pinia'
import { searchTools, getToolCategories, localizeTools, localizeCategories } from '@/data/tools'
import type { ToolsReqData, ToolsInfo, ToolCate } from '@/data/tools.type'

export const useToolsStore = defineStore('tools', {
  //用来存放变量（内部数据 title/desc/cate 均为 i18n key）
  state: () => ({
    list: [] as ToolsInfo[],
    currentTool: {} as ToolsInfo,
    cates: [] as ToolCate[],
    recommends: [] as ToolsInfo[],
  }),
  //本地化后的数据（切换语言自动更新）
  getters: {
    localizedList: (state): ToolsInfo[] => localizeTools(state.list),
    localizedCurrentTool: (state): ToolsInfo => {
      if (!state.currentTool || !state.currentTool.title) return state.currentTool
      return localizeTools([state.currentTool])[0]
    },
    localizedCates: (state): ToolCate[] => localizeCategories(state.cates),
    localizedRecommends: (state): ToolsInfo[] => localizeTools(state.recommends),
  },
  //方法
  actions: {
    //获取tools
    async getTools(data: ToolsReqData) {
      //发送请求
      const result: ToolsInfo[] = await searchTools(data)
      this.list = result
      return result
    },
    //获取tool info
    async getToolInfo(data: ToolsReqData) {
      //发送请求
      const result: ToolsInfo[] = await searchTools(data)
      this.currentTool = result[0] || {}
      return result
    },
    //获取tools cate
    async getToolCate() {
      //发送请求
      this.cates = await getToolCategories()
    },
    //随机推荐
    async getRecommend() {
      const all = await getToolCategories()
      const flat: ToolsInfo[] = []
      for (const cate of all) flat.push(...cate.list)
      this.recommends = flat.sort(() => Math.random() - 0.5).slice(0, 8)
    },
  }
})