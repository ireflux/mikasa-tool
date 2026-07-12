import { defineStore } from 'pinia'
import type { ToolsInfo } from '@/data/tools.type'

// 收藏工具列表存储键名
const COLLECTED_TOOLS_KEY = 'collected_tools';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collectedTools: [] as ToolsInfo[],
  }),
  actions: {
    // 加载收藏工具
    loadCollectedTools() {
      try {
        const stored = localStorage.getItem(COLLECTED_TOOLS_KEY);
        if (stored) {
          this.collectedTools = JSON.parse(stored);
        }
      } catch (error) {
        console.error('加载收藏工具失败:', error);
        this.collectedTools = [];
      }
    },
    // 保存收藏工具到本地存储
    saveCollectedTools() {
      try {
        localStorage.setItem(COLLECTED_TOOLS_KEY, JSON.stringify(this.collectedTools));
      } catch (error) {
        console.error('保存收藏工具失败:', error);
      }
    },
    // 添加收藏
    addCollect(tool: ToolsInfo) {
      const isCollected = this.collectedTools.some(t => t.url === tool.url);
      if (!isCollected) {
        this.collectedTools.push(tool);
        this.saveCollectedTools();
        return true;
      }
      return false;
    },
    // 移除收藏
    removeCollect(url: string) {
      const index = this.collectedTools.findIndex(tool => tool.url === url);
      if (index > -1) {
        this.collectedTools.splice(index, 1);
        this.saveCollectedTools();
        return true;
      }
      return false;
    },
    // 检查是否已收藏
    isCollected(url: string) {
      const normalizedUrl = url.replace(/\/$/, '');
      return this.collectedTools.some(tool => {
        const toolUrl = tool.url.replace(/\/$/, '');
        return toolUrl === normalizedUrl;
      });
    },
  }
})
