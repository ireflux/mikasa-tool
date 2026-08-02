import { defineComponent, h, ref, onMounted, defineAsyncComponent, type Component } from 'vue'

/**
 * 包装浏览器专属组件：SSR/预渲染阶段渲染占位符（避免浏览器依赖在 Node 中被导入），
 * 客户端挂载后再异步加载真实组件。解决富文本/图表/图片编辑器等页面预渲染为空的问题。
 */
export function withClientOnly(loader: () => Promise<{ default: Component }>): Component {
  return defineComponent({
    name: 'ClientOnly',
    inheritAttrs: true,
    setup(_props, { attrs, slots }) {
      if (typeof window === 'undefined') {
        //SSR/预渲染：不导入浏览器专属模块
        return () => h('div', { class: 'client-only-placeholder', 'data-client-only': '' })
      }
      const comp = ref<Component | null>(null)
      onMounted(() => {
        comp.value = defineAsyncComponent(loader)
      })
      return () => {
        const c = comp.value
        if (!c) {
          return h('div', { class: 'client-only-placeholder', 'data-client-only': '' })
        }
        return h(c, { ...attrs }, slots.default ? slots.default() : undefined)
      }
    },
  })
}
