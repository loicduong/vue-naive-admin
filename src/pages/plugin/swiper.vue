<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { NCard, NSpace } from 'naive-ui'
import GithubLink from '@/components/custom/github-link.vue'
import WebSiteLink from '@/components/custom/web-site-link.vue'

definePage({
  meta: {
    icon: 'simple-icons:swiper',
  },
})

type SwiperExampleOptions = Pick<
  SwiperOptions,
  'navigation' | 'pagination' | 'scrollbar' | 'slidesPerView' | 'slidesPerGroup' | 'spaceBetween' | 'direction' | 'loop'
>

interface SwiperExample {
  id: number
  label: string
  options: Partial<SwiperExampleOptions>
}

SwiperCore.use([Navigation, Pagination])

const swiperExample: SwiperExample[] = [
  { id: 0, label: 'Default', options: {} },
  {
    id: 1,
    label: 'Navigation',
    options: {
      navigation: true,
    },
  },
  {
    id: 2,
    label: 'Pagination',
    options: {
      pagination: true,
    },
  },
  {
    id: 3,
    label: 'Pagination dynamic',
    options: {
      pagination: { dynamicBullets: true },
    },
  },
  {
    id: 4,
    label: 'Pagination progress',
    options: {
      navigation: true,
      pagination: {
        type: 'progressbar',
      },
    },
  },
  {
    id: 5,
    label: 'Pagination fraction',
    options: {
      navigation: true,
      pagination: {
        type: 'fraction',
      },
    },
  },
  {
    id: 6,
    label: 'Slides per view',
    options: {
      pagination: {
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  {
    id: 7,
    label: 'Infinite loop',
    options: {
      navigation: true,
      pagination: {
        clickable: true,
      },
      loop: true,
    },
  },
]
</script>

<template>
  <div>
    <NCard title="Swiper plugin" :bordered="false" class="rounded-lg shadow-xs">
      <NSpace :vertical="true">
        <GithubLink link="https://github.com/nolimits4web/swiper" />
        <WebSiteLink label="Vue 3 version documentation link: " link="https://swiperjs.com/vue" />
        <WebSiteLink label="Plugin demo address: " link="https://swiperjs.com/demos" />
      </NSpace>
      <NSpace :vertical="true">
        <div v-for="item in swiperExample" :key="item.id">
          <h3 class="py-6 text-[24px] font-bold">
            {{ item.label }}
          </h3>
          <Swiper v-bind="item.options">
            <SwiperSlide v-for="i in 5" :key="i">
              <div class="h-60 w-full flex items-center justify-center border border-[#999] text-[18px] font-bold">
                Slide{{ i }}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped></style>
