//创建tools相关的小工具
import { defineStore } from 'pinia'
import { searchTools, getToolCategories, localizeTools, localizeCategories } from '@/data/tools'
import { getIp } from '@/api/ip'
import type { ToolsReqData, ToolsInfo, ToolCate } from '@/data/tools.type'
import type { IpReqData, IpInfo, getIpResponseData } from '@/api/ip/type'
import type { WebInfo, WebInfoReqData, getWebInfoResponseData } from '@/api/webinfo/type'
import { fetchWebInfo } from '@/api/webinfo'

export const useToolsStore = defineStore('tools', {
  //用来存放变量（内部数据 title/desc/cate 均为 i18n key）
  state: () => ({
    list: [] as ToolsInfo[],
    currentTool: {} as ToolsInfo,
    cates: [] as ToolCate[],
    recommends: [] as ToolsInfo[],
    ipData: {} as IpInfo,
    webInfo: {} as WebInfo,
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
    //获取ip
    async getIp(data: IpReqData) {
      const result: getIpResponseData = await getIp(data)
      if (result.code === 200) {
        this.ipData = result.data
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取网站信息
    async getWebInfo(data: WebInfoReqData) {
      const result: getWebInfoResponseData = await fetchWebInfo(data)
      if (result.code === 200) {
        this.webInfo = result.data
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  }
})