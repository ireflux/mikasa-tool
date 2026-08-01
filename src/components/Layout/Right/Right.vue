<script setup lang="ts">
import { Tools } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import { useToolsStore } from '@/store/modules/tools'
const info = reactive({
  feedbackUrl: import.meta.env.VITE_FEEDBACK_URL || 'javascript:void(0)',
  advShow: import.meta.env.VITE_ADV_SHOW || 'false',
  advList: [
    {
      img: 'https://img.jutuike.com/taokeout/banner/ele_hongbao_banner.png',
      url: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/adv/elm_adv.jpeg'
    },
    {
      img: 'https://s3plus.sankuai.com/v1/mss_5017c592a8a946d2a54eb62a76ba299c/nebulafile/910fa09a310aadd229e90e4ad872d86e.png',
      url: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/adv/meituan_adv.png'
    }
  ]
})

//store
const toolsStore = useToolsStore()
const { t } = useI18n()

onMounted(() => {
  toolsStore.getRecommend()
})

//点击走马灯
const clickCarousel = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <!-- adv -->
    <div v-if="info.advShow === 'true'" class="mt-3">
      <el-carousel
        height="130px"
        :autoplay="true"
        :interval="5000"
      >
        <el-carousel-item v-for="(item, index) in info.advList" :key="index" @click="clickCarousel(item.url)">
          <el-image :src="item.img" fit="fill" class="h-full w-full"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- hot tools -->
    <div class="mt-3 rounded-[10px] border border-solid p-3 c-xs:mr-3 c-xs:ml-3" style="border-color: var(--color-border);">
      <div class="text-base font-bold" style="color: var(--color-text-secondary);">{{ t('ui.randomRecommend') }}</div>
      <ul class="mt-3">
        <RouterLink v-for="(item, index) in toolsStore.localizedRecommends" :key="index" :to="item.url" class="flex items-center p-1.5 rounded-md transition-colors" style="color: var(--color-text);">
          <el-icon class="mr-1"><Tools /></el-icon>
          <div>{{ item.title }}</div>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 随机推荐项 hover */
a:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
</style>