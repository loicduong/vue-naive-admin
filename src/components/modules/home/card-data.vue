<script setup lang="ts">
import { $t } from '@/locales'

defineOptions({ name: 'CardData' })

interface CardData {
  key: string
  title: string
  value: number
  unit: string
  color: {
    start: string
    end: string
  }
  icon: string
}

const cardData = computed<CardData[]>(() => [
  {
    key: 'visitCount',
    title: $t('page.home.visitCount'),
    value: 9725,
    unit: '',
    color: {
      start: 'rgb(var(--primary-color))',
      end: 'rgb(var(--primary-600-color))',
    },
    icon: 'ant-design:bar-chart-outlined',
  },
  {
    key: 'turnover',
    title: $t('page.home.turnover'),
    value: 1026,
    unit: '$',
    color: {
      start: 'rgb(var(--primary-color))',
      end: 'rgb(var(--primary-600-color))',
    },
    icon: 'ant-design:money-collect-outlined',
  },
  {
    key: 'downloadCount',
    title: $t('page.home.downloadCount'),
    value: 970925,
    unit: '',
    color: {
      start: 'rgb(var(--primary-color))',
      end: 'rgb(var(--primary-600-color))',
    },
    icon: 'carbon:document-download',
  },
  {
    key: 'dealCount',
    title: $t('page.home.dealCount'),
    value: 9527,
    unit: '',
    color: {
      start: 'rgb(var(--primary-color))',
      end: 'rgb(var(--primary-600-color))',
    },
    icon: 'ant-design:trademark-circle-outlined',
  },
])

interface GradientBgProps {
  gradientColor: string
}

const [DefineGradientBg, GradientBg] = createReusableTemplate<GradientBgProps>()

function getGradientColor(color: CardData['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <!-- define component start: GradientBg -->
    <DefineGradientBg v-slot="{ $slots, gradientColor }">
      <div
        class="rd-8px px-16px pb-4px pt-8px text-white"
        :style="{ backgroundImage: gradientColor }"
      >
        <component :is="$slots.default" />
      </div>
    </DefineGradientBg>
    <!-- define component end: GradientBg -->

    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-16px">
            {{ item.title }}
          </h3>
          <div class="flex justify-between pt-12px">
            <SvgIcon :icon="item.icon" class="text-32px" />
            <CountTo
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-30px text-white dark:text-dark"
            />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
